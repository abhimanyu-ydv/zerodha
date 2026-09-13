require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const passport = require("passport");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const {
  DEMO_OPENING_BALANCE,
  demoHoldings,
  demoPositions,
} = require("./data/demoPortfolio");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const sessionSecret = process.env.SESSION_SECRET;
const allowedOrigins = (
  process.env.CLIENT_ORIGINS || "http://localhost:3000,http://localhost:3001"
)
  .split(",")
  .map((origin) => origin.trim());

if (!uri) {
  console.error(
    "MONGO_URL is not set. Add it to backend/.env before starting the server."
  );
  process.exit(1);
}

if (!sessionSecret) {
  console.error(
    "SESSION_SECRET is not set. Add it to backend/.env before starting the server."
  );
  process.exit(1);
}

const app = express();

// Any localhost port is allowed so the React apps still work if they start on
// a different port (e.g. 3003 when 3001 is busy)
const isAllowedOrigin = (origin) =>
  !origin ||
  allowedOrigins.includes(origin) ||
  /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

app.use(
  cors({
    origin: (origin, callback) => callback(null, isAllowedOrigin(origin)),
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: uri }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Please log in first" });
};

// Express 4 doesn't forward errors thrown in async handlers, so route them to next()
const asyncRoute = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

const round2 = (value) => Math.round(value * 100) / 100;

const formatPercent = (value) =>
  `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

const parseAmount = (value) => {
  const amount = round2(Number(value));
  return Number.isFinite(amount) && amount > 0 ? amount : null;
};

// ---------- Auth ----------

app.post("/signup", async (req, res, next) => {
  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "");

  if (!/^\d{10}$/.test(username)) {
    return res
      .status(400)
      .json({ message: "Enter a valid 10-digit mobile number" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  try {
    const user = await UserModel.register(
      new UserModel({ username, funds: DEMO_OPENING_BALANCE }),
      password
    );

    await HoldingsModel.insertMany(
      demoHoldings.map((holding) => ({ ...holding, userId: user._id }))
    );
    await PositionsModel.insertMany(
      demoPositions.map((position) => ({ ...position, userId: user._id }))
    );

    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json({ username: user.username });
    });
  } catch (err) {
    if (err.name === "UserExistsError") {
      return res.status(409).json({
        message: "An account with this mobile number already exists. Please log in.",
      });
    }
    next(err);
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid mobile number or password" });
    }

    req.login(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      res.json({ username: user.username });
    });
  })(req, res, next);
});

app.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: "Logged out" });
  });
});

app.get("/me", isLoggedIn, (req, res) => {
  res.json({ username: req.user.username });
});

// ---------- Portfolio ----------

app.get("/allHoldings", isLoggedIn, asyncRoute(async (req, res) => {
  const allHoldings = await HoldingsModel.find({ userId: req.user._id });
  res.json(allHoldings);
}));

app.get("/allPositions", isLoggedIn, asyncRoute(async (req, res) => {
  const allPositions = await PositionsModel.find({ userId: req.user._id });
  res.json(allPositions);
}));

app.get("/allOrders", isLoggedIn, asyncRoute(async (req, res) => {
  const allOrders = await OrdersModel.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(allOrders);
}));

app.post("/newOrder", isLoggedIn, async (req, res, next) => {
  const userId = req.user._id;
  const name = String(req.body.name || "").trim().toUpperCase();
  const qty = Number(req.body.qty);
  const price = round2(Number(req.body.price));
  const mode = String(req.body.mode || "").toUpperCase();

  if (!name) {
    return res.status(400).json({ message: "Instrument name is required" });
  }
  if (!Number.isInteger(qty) || qty <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be a whole number greater than 0" });
  }
  if (!Number.isFinite(price) || price <= 0) {
    return res.status(400).json({ message: "Price must be greater than 0" });
  }
  if (mode !== "BUY" && mode !== "SELL") {
    return res.status(400).json({ message: "Mode must be BUY or SELL" });
  }

  const orderValue = round2(qty * price);

  try {
    if (mode === "BUY") {
      // Deduct funds only if the balance covers the whole order
      const user = await UserModel.findOneAndUpdate(
        { _id: userId, funds: { $gte: orderValue } },
        { $inc: { funds: -orderValue } },
        { new: true }
      );
      if (!user) {
        return res.status(400).json({
          message: `Insufficient funds. This order needs ₹${orderValue.toFixed(2)}.`,
        });
      }

      try {
        const holding = await HoldingsModel.findOne({ userId, name });
        if (holding) {
          const totalQty = holding.qty + qty;
          holding.avg = round2((holding.avg * holding.qty + price * qty) / totalQty);
          holding.qty = totalQty;
          holding.price = price;
          holding.net = formatPercent(((price - holding.avg) / holding.avg) * 100);
          await holding.save();
        } else {
          await HoldingsModel.create({
            userId,
            name,
            qty,
            avg: price,
            price,
            net: "+0.00%",
            day: "+0.00%",
          });
        }
      } catch (err) {
        await UserModel.updateOne({ _id: userId }, { $inc: { funds: orderValue } });
        throw err;
      }
    } else {
      // Reduce quantity only if the user holds enough shares
      const holding = await HoldingsModel.findOneAndUpdate(
        { userId, name, qty: { $gte: qty } },
        { $inc: { qty: -qty }, $set: { price } },
        { new: true }
      );
      if (!holding) {
        const existing = await HoldingsModel.findOne({ userId, name });
        return res.status(400).json({
          message: `You can sell at most ${existing ? existing.qty : 0} ${name}.`,
        });
      }

      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({ _id: holding._id });
      } else {
        holding.net = formatPercent(((price - holding.avg) / holding.avg) * 100);
        await holding.save();
      }

      await UserModel.updateOne({ _id: userId }, { $inc: { funds: orderValue } });
    }

    const order = await OrdersModel.create({ userId, name, qty, price, mode });
    res.status(201).json({ message: `${mode} order placed`, order });
  } catch (err) {
    next(err);
  }
});

// ---------- Funds ----------

app.get("/funds", isLoggedIn, asyncRoute(async (req, res) => {
  const user = await UserModel.findById(req.user._id).select("funds");
  res.json({ balance: user.funds });
}));

app.post("/funds/add", isLoggedIn, asyncRoute(async (req, res) => {
  const amount = parseAmount(req.body.amount);
  if (!amount) {
    return res.status(400).json({ message: "Enter an amount greater than 0" });
  }

  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    { $inc: { funds: amount } },
    { new: true }
  );
  res.json({ balance: user.funds });
}));

app.post("/funds/withdraw", isLoggedIn, asyncRoute(async (req, res) => {
  const amount = parseAmount(req.body.amount);
  if (!amount) {
    return res.status(400).json({ message: "Enter an amount greater than 0" });
  }

  const user = await UserModel.findOneAndUpdate(
    { _id: req.user._id, funds: { $gte: amount } },
    { $inc: { funds: -amount } },
    { new: true }
  );
  if (!user) {
    return res
      .status(400)
      .json({ message: "Withdrawal amount is more than your available balance" });
  }
  res.json({ balance: user.funds });
}));

// ---------- Errors ----------

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB connected!");
    const server = app.listen(PORT, () => {
      console.log(`App started on http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Another backend is probably still running.\n` +
            `Stop it with: lsof -ti :${PORT} | xargs kill`
        );
      } else {
        console.error("Server error:", err.message);
      }
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });

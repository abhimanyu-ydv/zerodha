# Zerodha Clone

A full-stack clone of Zerodha, built as a learning project with the MERN stack (MongoDB, Express, React, Node.js). It has three apps:

| Folder       | What it is                                                      | Port |
| ------------ | --------------------------------------------------------------- | ---- |
| `frontend/`  | Landing site: home, signup/login, about, products, pricing, support | 3000 |
| `dashboard/` | Kite-style trading dashboard: watchlist, orders, holdings, positions, funds | 3001 |
| `backend/`   | Express + MongoDB API with session login (Passport)            | 3002 |

## Features

- Sign up or log in with a mobile number and password. Sessions are stored in MongoDB.
- Each new account starts with ₹10,000 and a demo portfolio.
- Buy and sell from the watchlist. You can also sell from the Holdings table by hovering a row.
- Orders check your funds and holdings on the server. Average price and P&L are recalculated after each trade.
- Add or withdraw funds.
- The dashboard pages (Summary, Orders, Holdings, Positions, Funds) read live data from the API and refresh after every trade.
- Logout from the profile menu.

## Setup

You need Node.js 18+ and a MongoDB database (for example, a free MongoDB Atlas cluster).

```bash
# 1. Install dependencies
cd backend && npm install
cd ../frontend && npm install
cd ../dashboard && npm install

# 2. Create env files from the examples
cp backend/.env.example backend/.env        # then fill in MONGO_URL and SESSION_SECRET
cp dashboard/.env.example dashboard/.env
cp frontend/.env.example frontend/.env
```

## Run

Start each app in its own terminal:

```bash
cd backend && npm start      # http://localhost:3002
cd frontend && npm start     # http://localhost:3000
cd dashboard && npm start    # http://localhost:3001
```

Open http://localhost:3000/signup and create an account. You will be sent to the dashboard.

## API

All routes except `/signup` and `/login` require a logged-in session.

| Method | Route             | Body                          |
| ------ | ----------------- | ----------------------------- |
| POST   | `/signup`         | `{ username, password }`      |
| POST   | `/login`          | `{ username, password }`      |
| POST   | `/logout`         |                               |
| GET    | `/me`             |                               |
| GET    | `/allHoldings`    |                               |
| GET    | `/allPositions`   |                               |
| GET    | `/allOrders`      |                               |
| POST   | `/newOrder`       | `{ name, qty, price, mode }`, where `mode` is `BUY` or `SELL` |
| GET    | `/funds`          |                               |
| POST   | `/funds/add`      | `{ amount }`                  |
| POST   | `/funds/withdraw` | `{ amount }`                  |

## Notes

- Market prices are static demo data. There is no live market feed, and orders fill right away at the price you enter.
- This is a learning project. It is not affiliated with Zerodha Broking Ltd. Every link stays inside the clone, and none point to real Zerodha websites.

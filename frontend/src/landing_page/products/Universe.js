import React from "react";
import { Link } from "react-router-dom";

const PARTNERS = [
  {
    logo: "/media/images/zerodhaFundhouse.png",
    name: "Zerodha Fund House",
    desc: "Our asset management venture that is creating simple and transparent index funds to help you save for your goals.",
  },
  {
    logo: "/media/images/sensibullLogo.svg",
    name: "Sensibull",
    desc: "Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.",
  },
  {
    logo: "/media/images/goldenpiLogo.png",
    name: "GoldenPi",
    desc: "Invest in bonds and debentures with transparent yields, all in one place.",
  },
  {
    logo: "/media/images/streakLogo.png",
    name: "Streak",
    desc: "Systematic trading platform that allows you to create and backtest strategies without coding.",
  },
  {
    logo: "/media/images/smallcaseLogo.png",
    name: "smallcase",
    desc: "Thematic investing platform that helps you invest in diversified baskets of stocks and ETFs.",
  },
  {
    logo: "/media/images/dittoLogo.png",
    name: "Ditto",
    desc: "Personalized advice on life and health insurance. No spam and no mis-selling.",
  },
];

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        {PARTNERS.map((partner) => (
          <div className="col-lg-4 col-md-6 p-3 mt-5" key={partner.name}>
            <img
              src={partner.logo}
              alt={partner.name}
              style={{ height: "50px", maxWidth: "100%", objectFit: "contain" }}
            />
            <p className="small text-muted mt-3 px-3">{partner.desc}</p>
          </div>
        ))}
        <Link
          to="/signup"
          className="p-2 btn btn-primary fs-5 mb-5 mt-5"
          style={{ minWidth: "200px", width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </Link>
      </div>
    </div>
  );
}

export default Universe;

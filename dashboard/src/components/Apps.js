import React from "react";
import { Link } from "react-router-dom";

const APPS = [
  {
    name: "Kite",
    path: "/",
    description: "Ultra-fast trading platform with streaming market data and advanced charts.",
  },
  {
    name: "Console",
    path: "/orders",
    description: "Reports, P&L statements and insights into your trades and investments.",
  },
  {
    name: "Coin",
    description: "Invest in direct mutual funds online, commission-free.",
  },
  {
    name: "Kite Connect",
    description: "HTTP/JSON APIs to build your own trading and investment apps.",
  },
  {
    name: "Varsity",
    description: "Free stock market lessons, from the basics to advanced trading.",
  },
  {
    name: "Sensibull",
    description: "Options trading platform to create strategies and analyze positions.",
  },
  {
    name: "Streak",
    description: "Create and backtest trading strategies without writing code.",
  },
  {
    name: "smallcase",
    description: "Invest in diversified baskets of stocks and ETFs built around themes.",
  },
];

const Apps = () => {
  return (
    <>
      <h3 className="title">Apps</h3>

      <div className="apps-grid">
        {APPS.map((app) =>
          app.path ? (
            <Link key={app.name} className="app-card" to={app.path}>
              <p className="app-name">{app.name}</p>
              <p className="app-description">{app.description}</p>
            </Link>
          ) : (
            <div key={app.name} className="app-card app-card-disabled">
              <p className="app-name">
                {app.name} <span className="app-badge">Coming soon</span>
              </p>
              <p className="app-description">{app.description}</p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Apps;

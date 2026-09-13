import React, { useContext, useEffect, useState } from "react";

import api from "../api";
import { formatCompact, formatPercent, summarizeHoldings } from "../utils";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const { user, refreshKey } = useContext(GeneralContext);
  const [holdings, setHoldings] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.get("/allHoldings"), api.get("/funds")])
      .then(([holdingsRes, fundsRes]) => {
        setHoldings(holdingsRes.data);
        setBalance(fundsRes.data.balance);
        setError("");
      })
      .catch(() => setError("Could not load your summary. Please try again."))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const { investment, currentValue, pnl, pnlPercent } =
    summarizeHoldings(holdings);

  return (
    <>
      <div className="username">
        <h6>Hi, {user ? user.username : "there"}!</h6>
        <hr className="divider" />
      </div>

      {loading && <p className="title">Loading...</p>}
      {error && <p className="title loss">{error}</p>}

      {!loading && !error && (
        <>
          <div className="section">
            <span>
              <p>Equity</p>
            </span>

            <div className="data">
              <div className="first">
                <h3>{formatCompact(balance)}</h3>
                <p>Margin available</p>
              </div>
              <hr />

              <div className="second">
                <p>
                  Margins used <span>0</span>{" "}
                </p>
                <p>
                  Available cash <span>{formatCompact(balance)}</span>{" "}
                </p>
              </div>
            </div>
            <hr className="divider" />
          </div>

          <div className="section">
            <span>
              <p>Holdings ({holdings.length})</p>
            </span>

            <div className="data">
              <div className="first">
                <h3 className={pnl >= 0 ? "profit" : "loss"}>
                  {formatCompact(pnl)} <small>{formatPercent(pnlPercent)}</small>{" "}
                </h3>
                <p>P&L</p>
              </div>
              <hr />

              <div className="second">
                <p>
                  Current Value <span>{formatCompact(currentValue)}</span>{" "}
                </p>
                <p>
                  Investment <span>{formatCompact(investment)}</span>{" "}
                </p>
              </div>
            </div>
            <hr className="divider" />
          </div>
        </>
      )}
    </>
  );
};

export default Summary;

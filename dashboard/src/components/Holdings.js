import React, { useContext, useEffect, useState } from "react";

import api from "../api";
import { formatMoney, formatPercent, isNegative, summarizeHoldings } from "../utils";
import GeneralContext from "./GeneralContext";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const { refreshKey, openSellWindow } = useContext(GeneralContext);
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/allHoldings")
      .then((res) => {
        setAllHoldings(res.data);
        setError("");
      })
      .catch(() => setError("Could not load holdings. Please try again."))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) {
    return <p className="title">Loading holdings...</p>;
  }

  if (error) {
    return <p className="title loss">{error}</p>;
  }

  if (allHoldings.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You don't have any holdings yet. Buy a stock from your watchlist.</p>
        </div>
      </div>
    );
  }

  const { investment, currentValue, pnl, pnlPercent } =
    summarizeHoldings(allHoldings);

  const data = {
    labels: allHoldings.map((stock) => stock.name),
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const [investmentWhole, investmentPaise] = formatMoney(investment).split(".");
  const [currentWhole, currentPaise] = formatMoney(currentValue).split(".");

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock) => {
              const curValue = stock.price * stock.qty;
              const stockPnl = curValue - stock.avg * stock.qty;
              const profClass = stockPnl >= 0 ? "profit" : "loss";
              const dayClass = isNegative(stock.day) ? "loss" : "profit";

              return (
                <tr key={stock._id}>
                  <td>
                    {stock.name}
                    <button
                      className="holding-sell"
                      onClick={() => openSellWindow(stock)}
                    >
                      Sell
                    </button>
                  </td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{stockPnl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {investmentWhole}.<span>{investmentPaise}</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {currentWhole}.<span>{currentPaise}</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={pnl >= 0 ? "profit" : "loss"}>
            {formatMoney(pnl)} ({formatPercent(pnlPercent)})
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;

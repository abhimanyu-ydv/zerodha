import React, { useContext, useState } from "react";

import api, { getErrorMessage } from "../api";
import { formatMoney } from "../utils";
import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ stock, mode }) => {
  const { closeBuyWindow, notifyPortfolioChanged } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(stock.price);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isBuy = mode === "BUY";
  const orderValue = (Number(stockQuantity) || 0) * (Number(stockPrice) || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await api.post("/newOrder", {
        name: stock.name,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode,
      });
      notifyPortfolioChanged();
      closeBuyWindow();
    } catch (err) {
      setError(getErrorMessage(err, "Could not place the order"));
      setSubmitting(false);
    }
  };

  return (
    <form className="container" id="buy-window" onSubmit={handleSubmit}>
      <div className={isBuy ? "header" : "header sell"}>
        <h3>
          {isBuy ? "Buy" : "Sell"} {stock.name} <span>NSE</span>
        </h3>
        <p className="market-options">
          {stockQuantity || 0} × ₹{formatMoney(Number(stockPrice) || 0)}
        </p>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              step="1"
              required
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              min="0.05"
              step="0.05"
              required
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>

        {error && <p className="order-error">{error}</p>}
      </div>

      <div className="buttons">
        <span>
          {isBuy ? "Margin required" : "You will receive"} ₹
          {formatMoney(orderValue)}
        </span>
        <div>
          <button
            type="submit"
            className={isBuy ? "btn btn-blue" : "btn btn-orange"}
            disabled={submitting}
          >
            {submitting ? "Placing..." : isBuy ? "Buy" : "Sell"}
          </button>
          <button
            type="button"
            className="btn btn-grey"
            onClick={closeBuyWindow}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default BuyActionWindow;

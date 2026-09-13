import React, { useContext, useEffect, useState } from "react";

import api, { FRONTEND_URL, getErrorMessage } from "../api";
import { formatMoney } from "../utils";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const { refreshKey, notifyPortfolioChanged } = useContext(GeneralContext);
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get("/funds")
      .then((res) => setBalance(res.data.balance))
      .catch(() =>
        setMessage({ type: "loss", text: "Could not load your funds." })
      );
  }, [refreshKey]);

  const handleTransfer = async (action) => {
    const value = Number(amount);

    if (!value || value <= 0) {
      setMessage({ type: "loss", text: "Enter an amount greater than 0" });
      return;
    }
    if (action === "withdraw" && balance !== null && value > balance) {
      setMessage({
        type: "loss",
        text: `You can withdraw at most ₹${formatMoney(balance)}`,
      });
      return;
    }

    setMessage({ type: "", text: "" });
    setSubmitting(true);

    try {
      const res = await api.post(`/funds/${action}`, { amount: value });
      setBalance(res.data.balance);
      setAmount("");
      setMessage({
        type: "profit",
        text:
          action === "add"
            ? `₹${formatMoney(value)} added to your account`
            : `₹${formatMoney(value)} withdrawn from your account`,
      });
      notifyPortfolioChanged();
    } catch (err) {
      setMessage({
        type: "loss",
        text: getErrorMessage(err, "Could not complete the transfer"),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enter key adds funds; the Withdraw button calls handleTransfer directly
    handleTransfer("add");
  };

  return (
    <>
      <form className="funds" onSubmit={handleSubmit}>
        <p>Instant, zero-cost fund transfers with UPI </p>
        <input
          type="number"
          className="funds-input"
          placeholder="Amount (₹)"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit" className="btn btn-green" disabled={submitting}>
          Add funds
        </button>
        <button
          type="button"
          className="btn btn-blue"
          disabled={submitting}
          onClick={() => handleTransfer("withdraw")}
        >
          Withdraw
        </button>
      </form>

      {message.text && (
        <p className={`funds-message ${message.type}`}>{message.text}</p>
      )}

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">
                {balance === null ? "..." : formatMoney(balance)}
              </p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">0.00</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">
                {balance === null ? "..." : formatMoney(balance)}
              </p>
            </div>
            <hr />
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <a className="btn btn-blue" href={`${FRONTEND_URL}/signup`}>
              Open Account
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api";
import { formatMoney } from "../utils";
import GeneralContext from "./GeneralContext";

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const Orders = () => {
  const { refreshKey } = useContext(GeneralContext);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/allOrders")
      .then((res) => {
        setAllOrders(res.data);
        setError("");
      })
      .catch(() => setError("Could not load orders. Please try again."))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) {
    return <p className="title">Loading orders...</p>;
  }

  if (error) {
    return <p className="title loss">{error}</p>;
  }

  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>

          <Link to="/" className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.createdAt
                    ? timeFormatter.format(new Date(order.createdAt))
                    : "-"}
                </td>
                <td className={order.mode === "SELL" ? "loss" : "profit"}>
                  {order.mode}
                </td>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{formatMoney(order.price)}</td>
                <td>{formatMoney(order.price * order.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;

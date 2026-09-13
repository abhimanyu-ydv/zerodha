import React from "react";
import { Link } from "react-router-dom";

function Education() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-lg-6 text-center">
          <img
            src="/media/images/education.svg"
            alt="Varsity and TradingQ&A"
            className="img-fluid"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-lg-6 mt-4 mt-lg-0">
          <h1 className="mb-3 fs-2">Free and open market education</h1>
          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <Link to="/product" style={{ textDecoration: "none" }}>
            Varsity <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </Link>
          <p className="mt-5">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <Link to="/support" style={{ textDecoration: "none" }}>
            TradingQ&A{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Education;

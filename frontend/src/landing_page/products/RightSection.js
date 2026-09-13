import React from "react";
import { Link } from "react-router-dom";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-lg-6 p-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <Link to={learnMore}>Learn More</Link>
          </div>
        </div>
        <div className="col-lg-6">
          <img src={imageURL} alt={productName} className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default RightSection;

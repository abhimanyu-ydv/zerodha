import React from "react";
import { Link } from "react-router-dom";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <img src={imageURL} alt={productName} className="img-fluid" />
        </div>
        <div className="col-lg-6 p-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            {tryDemo && (
              <a href={tryDemo} style={{ marginRight: "50px" }}>
                Try Demo
              </a>
            )}
            <Link to={learnMore}>Learn More</Link>
          </div>
          <div className="mt-3">
            <Link to="/signup">
              <img src="/media/images/googlePlayBadge.svg" alt="Get it on Google Play" />
            </Link>
            <Link to="/signup">
              <img
                src="/media/images/appstoreBadge.svg"
                alt="Download on the App Store"
                style={{ marginLeft: "50px" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;

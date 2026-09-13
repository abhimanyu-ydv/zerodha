import React from "react";
import { Link } from "react-router-dom";

const QUICK_LINKS = [
  "Account opening",
  "Segment addition",
  "Margins",
  "Kite",
];

const FEATURED = [
  "Corporate actions",
  "Product and order types",
];

const toSearchPath = (text) => `/support?q=${encodeURIComponent(text)}`;

function Hero({ query, onQueryChange }) {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5" id="supportWrapper">
        <h4>Support Portal</h4>
        <Link to="/support">Track Tickets</Link>
      </div>
      <div className="row p-5 m-3">
        <div className="col-lg-6 p-3">
          <h1 className="fs-3">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              placeholder="Eg. how do I activate F&O"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
            />
          </form>
          <div className="support-quick-links">
            {QUICK_LINKS.map((link) => (
              <Link key={link} to={toSearchPath(link)}>
                {link}
              </Link>
            ))}
          </div>
        </div>
        <div className="col-lg-6 p-3">
          <h1 className="fs-3">Featured</h1>
          <ol>
            {FEATURED.map((item) => (
              <li key={item}>
                <Link to={toSearchPath(item)}>{item}</Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;

import React from "react";
import { Link } from "react-router-dom";

const TOPICS = [
  {
    icon: "fa-plus-circle",
    title: "Account Opening",
    links: [
      "Online Account Opening",
      "Offline Account Opening",
      "Company, Partnership and HUF Account Opening",
      "NRI Account Opening",
      "Charges at Zerodha",
      "Zerodha IDFC FIRST Bank 3-in-1 Account",
      "Getting Started",
    ],
  },
  {
    icon: "fa-user",
    title: "Your Zerodha Account",
    links: [
      "Login Credentials",
      "Account Modification and Segment Addition",
      "DP ID and bank details",
      "Your Profile",
      "Transfer and conversion of shares",
    ],
  },
  {
    icon: "fa-bar-chart",
    title: "Trading and Markets",
    links: [
      "Trading FAQs",
      "Kite",
      "Margins",
      "Product and order types",
      "Corporate actions",
      "Kite features",
    ],
  },
  {
    icon: "fa-credit-card",
    title: "Funds",
    links: [
      "Fund withdrawal",
      "Adding funds",
      "Adding bank accounts",
      "eMandates",
    ],
  },
  {
    icon: "fa-circle-o-notch",
    title: "Console",
    links: [
      "IPO",
      "Portfolio",
      "Funds statement",
      "Profile",
      "Reports",
      "Referral program",
    ],
  },
  {
    icon: "fa-database",
    title: "Coin",
    links: [
      "Understanding mutual funds and Coin",
      "Coin app",
      "Coin web",
      "Transactions and reports",
      "National Pension Scheme (NPS)",
    ],
  },
];

const toSearchPath = (text) => `/support?q=${encodeURIComponent(text)}`;

// Keep a topic if its title or any of its links contains the search text
const filterTopics = (query) => {
  const text = query.trim().toLowerCase();
  if (!text) return TOPICS;

  return TOPICS.map((topic) => {
    if (topic.title.toLowerCase().includes(text)) return topic;
    const links = topic.links.filter((link) =>
      link.toLowerCase().includes(text)
    );
    return { ...topic, links };
  }).filter((topic) => topic.links.length > 0);
};

function CreateTicket({ query = "" }) {
  const topics = filterTopics(query);

  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2">To create a ticket, select a relevant topic</h1>
        {topics.length === 0 && (
          <p className="text-muted mt-4">
            No help topics match "{query}". Try a different search.
          </p>
        )}
        {topics.map((topic) => (
          <div className="col-lg-4 col-md-6 p-5 mt-2 mb-2" key={topic.title}>
            <h4 className="fs-5">
              <i className={`fa ${topic.icon}`} aria-hidden="true"></i>{" "}
              {topic.title}
            </h4>
            {topic.links.map((link) => (
              <React.Fragment key={link}>
                <Link
                  to={toSearchPath(link)}
                  style={{ textDecoration: "none", lineHeight: "2.5" }}
                >
                  {link}
                </Link>
                <br />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;

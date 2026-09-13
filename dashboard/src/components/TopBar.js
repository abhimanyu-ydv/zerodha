import React from "react";

import Menu from "./Menu";
import { indices } from "../data/data";
import { formatMoney, formatPercent } from "../utils";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        {indices.map((index, i) => (
          <div className={i === 0 ? "nifty" : "sensex"} key={index.name}>
            <p className="index">{index.name}</p>
            <p className={index.change < 0 ? "index-points" : "index-points up"}>
              {formatMoney(index.points)}
            </p>
            <p className="percent">{formatPercent(index.change)}</p>
          </div>
        ))}
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;

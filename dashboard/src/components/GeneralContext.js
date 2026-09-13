import React, { useCallback, useMemo, useState } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  user: null,
  refreshKey: 0,
  openBuyWindow: (stock) => {},
  openSellWindow: (stock) => {},
  closeBuyWindow: () => {},
  notifyPortfolioChanged: () => {},
});

export const GeneralContextProvider = ({ user, children }) => {
  const [orderWindow, setOrderWindow] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const openBuyWindow = useCallback((stock) => {
    setOrderWindow({ stock, mode: "BUY" });
  }, []);

  const openSellWindow = useCallback((stock) => {
    setOrderWindow({ stock, mode: "SELL" });
  }, []);

  const closeBuyWindow = useCallback(() => {
    setOrderWindow(null);
  }, []);

  // Components that show portfolio data re-fetch whenever refreshKey changes
  const notifyPortfolioChanged = useCallback(() => {
    setRefreshKey((key) => key + 1);
  }, []);

  const value = useMemo(
    () => ({
      user,
      refreshKey,
      openBuyWindow,
      openSellWindow,
      closeBuyWindow,
      notifyPortfolioChanged,
    }),
    [
      user,
      refreshKey,
      openBuyWindow,
      openSellWindow,
      closeBuyWindow,
      notifyPortfolioChanged,
    ]
  );

  return (
    <GeneralContext.Provider value={value}>
      {children}
      {orderWindow && (
        <BuyActionWindow
          key={`${orderWindow.mode}-${orderWindow.stock.name}`}
          stock={orderWindow.stock}
          mode={orderWindow.mode}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

const moneyFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatMoney = (value) => moneyFormatter.format(value || 0);

// 31428.95 -> "31.43k"
export const formatCompact = (value) => {
  const abs = Math.abs(value || 0);
  if (abs >= 1e7) return `${(value / 1e7).toFixed(2)}Cr`;
  if (abs >= 1e5) return `${(value / 1e5).toFixed(2)}L`;
  if (abs >= 1e3) return `${(value / 1e3).toFixed(2)}k`;
  return (value || 0).toFixed(2);
};

export const formatPercent = (value) =>
  `${value >= 0 ? "+" : ""}${(value || 0).toFixed(2)}%`;

export const isNegative = (percentText) =>
  String(percentText || "").trim().startsWith("-");

export const summarizeHoldings = (holdings) => {
  const investment = holdings.reduce((sum, h) => sum + h.avg * h.qty, 0);
  const currentValue = holdings.reduce((sum, h) => sum + h.price * h.qty, 0);
  const pnl = currentValue - investment;
  const pnlPercent = investment > 0 ? (pnl / investment) * 100 : 0;

  return { investment, currentValue, pnl, pnlPercent };
};

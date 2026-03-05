const getStockLogo = (symbol) => {
  if (!symbol) return null;

  const cleanSymbol = symbol
    .replace("NSE:", "")
    .trim()
    .toUpperCase();

  return `https://financialmodelingprep.com/image-stock/${cleanSymbol}.NS.png`;
};

export default getStockLogo;
import { getIndices, getTopMovers } 
  from "../services/market.service.js";
import stocks from "../data/stocks.data.js";


export const fetchIndices = async (req, res) => {
  try {
    const data = await getIndices();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const fetchMovers = async (req, res) => {
  try {
    const data = await getTopMovers();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const searchStocks = (req, res) => {
  const query = req.query.q?.toLowerCase() || "";

  if (!query) {
    return res.json([]);
  }

  const ranked = stocks
    .map((stock) => {
      const symbol = stock.symbol.toLowerCase();
      const name = stock.name.toLowerCase();

      let score = 0;

      if (symbol === query) score = 4;                
      else if (symbol.startsWith(query)) score = 3;
      else if (name.startsWith(query)) score = 2;     
      else if (symbol.includes(query) || name.includes(query)) score = 1;

      return { ...stock, score };
    })
    .filter(stock => stock.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(({ score, ...rest }) => rest);

  res.json(ranked);
};
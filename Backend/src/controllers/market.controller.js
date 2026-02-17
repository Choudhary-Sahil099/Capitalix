import { getIndices, getTopMovers } from "../services/market.service.js";

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

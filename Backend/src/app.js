import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import watchlistRoutes from "./routes/watchlist.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import newsRoutes from "./routes/news.routes.js";
import marketRoutes from "./routes/market.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/market", marketRoutes);
export default app;

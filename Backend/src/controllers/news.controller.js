import axios from "axios";

export const getStockNews = async (req, res) => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/everything",
      {
        params: {
          q: "stock market OR shares OR NSE OR NASDAQ OR Sensex",
          language: "en",
          sortBy: "publishedAt",
          pageSize: 10,
          apiKey: process.env.NEWS_API_KEY,
        },
      }
    );

    const formattedNews = response.data.articles.map((article) => {
      let impact = "Neutral";

      const text = (
        article.title +
        " " +
        (article.description || "")
      ).toLowerCase();

      if (
        text.includes("surge") ||
        text.includes("gain") ||
        text.includes("rise") ||
        text.includes("record high")
      ) {
        impact = "Positive";
      } else if (
        text.includes("fall") ||
        text.includes("drop") ||
        text.includes("decline") ||
        text.includes("loss")
      ) {
        impact = "Negative";
      }

      return {
        title: article.title,
        description: article.description || "No description available.",
        img: article.urlToImage,
        url: article.url,
        publishedAt: article.publishedAt,
        impact,
      };
    });

    res.status(200).json(formattedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching news" });
  }
};

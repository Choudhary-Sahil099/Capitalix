import { useEffect, useState } from "react";
import API from "../../api/axios";

const NewsBox = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/news");
      setNews(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    const interval = setInterval(
      () => {
        fetchNews();
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0e0d0d] w-322 h-168 rounded-xl overflow-y-auto">
      <div className="flex flex-col p-6 gap-6">
        <h1 className="text-white text-xl font-semibold">Market News</h1>

        {!loading &&
          news.map((item, index) => (
            <div
              key={index}
              className="flex gap-6 bg-[#141414] p-4 rounded-xl hover:bg-[#1a1a1a] transition-all"
            >
              <div className="flex-shrink-0 w-56 h-36">
                <img
                  src={
                    item.img ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-semibold text-lg text-white line-clamp-2">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`text-xs font-semibold ${
                      item.impact === "Positive"
                        ? "text-green-400"
                        : item.impact === "Negative"
                          ? "text-red-400"
                          : "text-yellow-400"
                    }`}
                  >
                    Impact: {item.impact}
                  </span>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-xs underline"
                  >
                    Read →
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewsBox;

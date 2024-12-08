import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import ArticleSearchBar from "./ArticleSearchBar";

const ArticlesContainer = () => {
  const { articles, loading } = useSelector((state) => state.news);
  const [search, setSearch] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles || []);

  useEffect(() => {
    const filteredArticles = articles.filter(
      (article) =>
        article?.title?.toLowerCase().includes(search.toLowerCase()) ||
        article?.description?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredArticles(filteredArticles);
  }, [search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-gray-600">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50">
      <ArticleSearchBar search={search} setSearch={setSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6  mx-auto">
        {filteredArticles?.map((article, index) => (
          <ArticleCard key={article.url || index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesContainer;

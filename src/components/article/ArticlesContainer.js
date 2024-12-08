import { useSelector } from "react-redux";
import ArticleCard from "./ArticleCard";

const ArticlesContainer = () => {
  const { articles, loading } = useSelector((state) => state.news);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-gray-600">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6  mx-auto">
        {articles.map((article, index) => (
          <ArticleCard key={article.url || index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesContainer;

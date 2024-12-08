import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import ArticleCard from "./ArticleCard";
import ArticleSearchBar from "./ArticleSearchBar";
import ArticleCount from "./ArticleCount";
import ArticlesFilter from "./ArticlesFilter";
import { isWithinInterval, parseISO } from "date-fns";

const ArticlesContainer = () => {
  const { articles = [], loading } = useSelector((state) => state.news);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    dateFrom: null,
    dateTo: null,
  });

  // Filter articles
  const filteredArticles = useMemo(() => {
    if (!articles || articles.length === 0) return [];

    return articles.filter((article) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesTitle = article?.title
          ?.toLowerCase()
          .includes(searchLower);
        const matchesDesc = article?.description
          ?.toLowerCase()
          .includes(searchLower);
        if (!matchesTitle && !matchesDesc) return false;
      }

      // Date filter
      if (filters.dateFrom || filters.dateTo) {
        try {
          const articleDate = parseISO(article.publishedAt);
          if (filters.dateFrom && articleDate < filters.dateFrom) return false;
          if (filters.dateTo && articleDate > filters.dateTo) return false;
        } catch (error) {
          return false;
        }
      }

      return true;
    });
  }, [articles, search, filters]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-gray-600 dark:text-white">
          Loading articles...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-[#18181a]">
      <ArticleSearchBar search={search} setSearch={setSearch} />
      <div className="mb-4">
        <ArticlesFilter onFilterChange={setFilters} activeFilters={filters} />
      </div>
      <ArticleCount articlesCount={filteredArticles.length} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mx-auto mt-6">
        {filteredArticles.map((article, index) => (
          <ArticleCard key={article.url || index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesContainer;

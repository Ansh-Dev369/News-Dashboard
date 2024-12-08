const ArticleCard = ({ article }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#010101] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative w-full pt-[56.25%]">
        <img
          src={
            article.urlToImage || "https://placehold.co/600x400?text=No+Image"
          }
          alt={article.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400?text=No+Image";
          }}
        />
      </div>
      <div className="flex flex-col flex-grow p-4 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full whitespace-nowrap">
            {article.source?.name || "Unknown Source"}
          </span>
          {article.author && (
            <span className="text-xs text-gray-500 dark:text-gray-300 truncate max-w-[200px]">
              by {article.author}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-lg leading-tight dark:text-white line-clamp-2 min-h-[2.5rem]">
          {article.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
          {article.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

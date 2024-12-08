const ArticleCount = ({ articlesCount }) => {
  return (
    <div className="text-md font-medium mt-4 mb-2 dark:text-white">
      Total Articles: {articlesCount}
    </div>
  );
};

export default ArticleCount;

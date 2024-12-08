import { Filter } from "lucide-react";

const ArticlesFilter = () => {
  return (
    <div className="flex flex-row items-center gap-1.5 px-2 py-1 cursor-pointer bg-gray-200 rounded-md">
      <Filter className="text-gray-700 h-4 w-4" />
      <p className="text-sm font-medium">Filter</p>
    </div>
  );
};

export default ArticlesFilter;

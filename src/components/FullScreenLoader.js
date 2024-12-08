import { Loader2 } from "lucide-react";

const FullScreenLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Loader2 className="animate-spin h-16 w-16" />
    </div>
  );
};

export default FullScreenLoader;

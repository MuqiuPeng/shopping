import { Loader2 } from "lucide-react";

export const MarketSectionLoading = () => {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
    </div>
  );
};

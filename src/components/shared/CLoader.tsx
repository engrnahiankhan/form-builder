import { Loader2 } from "lucide-react";

const CLoader = ({
  title = "Loading...",
  iconSize = "w-6 h-6",
  textSize = "text-base",
  className = "",
  iconColor = "text-blue-500",
  textColor = "text-gray-700",
}) => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Loader2 className={`${iconSize} ${iconColor} animate-spin`} />
      <span className={`${textSize} ${textColor} font-medium`}>{title}</span>
    </div>
  );
};

export default CLoader;

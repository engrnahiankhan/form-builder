interface CMessageProps {
  message: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
}

const CMessage = ({ message, variant = "default" }: CMessageProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      className={`flex items-center justify-center p-2 ${getVariantStyles()}`}>
      <p>{message}</p>
    </div>
  );
};

export default CMessage;

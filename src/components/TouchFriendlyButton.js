import { useResponsive } from "../hooks/useResponsive";

const TouchFriendlyButton = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "medium",
  disabled = false,
  ...props
}) => {
  const { isMobile, isSmallScreen } = useResponsive();

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700";
      case "secondary":
        return "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300";
      case "success":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700";
      case "danger":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700";
      case "warning":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700";
      default:
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700";
    }
  };

  const getSizeClasses = () => {
    if (isSmallScreen) {
      switch (size) {
        case "small":
          return "px-2 py-1 text-xs min-h-[36px]";
        case "medium":
          return "px-3 py-2 text-sm min-h-[40px]";
        case "large":
          return "px-4 py-3 text-base min-h-[44px]";
        default:
          return "px-3 py-2 text-sm min-h-[40px]";
      }
    } else if (isMobile) {
      switch (size) {
        case "small":
          return "px-3 py-2 text-sm min-h-[40px]";
        case "medium":
          return "px-4 py-2 text-base min-h-[44px]";
        case "large":
          return "px-5 py-3 text-lg min-h-[48px]";
        default:
          return "px-4 py-2 text-base min-h-[44px]";
      }
    } else {
      switch (size) {
        case "small":
          return "px-3 py-2 text-sm min-h-[36px]";
        case "medium":
          return "px-4 py-2 text-base min-h-[40px]";
        case "large":
          return "px-6 py-3 text-lg min-h-[44px]";
        default:
          return "px-4 py-2 text-base min-h-[40px]";
      }
    }
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    rounded-lg font-medium transition-all duration-200 
    shadow-md hover:shadow-lg active:scale-95
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md
    ${isMobile ? "touch-manipulation" : ""}
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default TouchFriendlyButton;

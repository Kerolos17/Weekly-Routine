import { useResponsive } from "../hooks/useResponsive";

const ResponsiveGrid = ({ children, className = "" }) => {
  const { isSmallScreen, isMobile, isTablet } = useResponsive();

  const getGridClasses = () => {
    if (isSmallScreen) {
      return "grid grid-cols-1 gap-4 p-3";
    } else if (isMobile) {
      return "grid grid-cols-1 gap-5 p-4 max-w-2xl mx-auto";
    } else if (isTablet) {
      return "grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-5xl mx-auto";
    } else {
      return "grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 p-6 lg:p-8 max-w-7xl mx-auto";
    }
  };

  return <div className={`${getGridClasses()} ${className}`}>{children}</div>;
};

export default ResponsiveGrid;

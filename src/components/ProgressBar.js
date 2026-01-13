import { useResponsive } from "../hooks/useResponsive";

const ProgressBar = ({ progress }) => {
  const { completed, total, percentage } = progress;
  const { isMobile, isSmallScreen } = useResponsive();

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "from-green-400 to-green-600";
    if (percentage >= 60) return "from-blue-400 to-blue-600";
    if (percentage >= 40) return "from-yellow-400 to-yellow-600";
    return "from-red-400 to-red-600";
  };

  const getProgressIcon = (percentage) => {
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "💪";
    if (percentage >= 40) return "⚡";
    return "🚀";
  };

  const getMotivationalMessage = (percentage) => {
    if (percentage === 100) return "مبروك! أكملت كل المهام 🎊";
    if (percentage >= 80) return "ممتاز! تقريباً انتهيت";
    if (percentage >= 60) return "تقدم رائع! استمر";
    if (percentage >= 40) return "بداية جيدة";
    return "ابدأ رحلتك الأسبوعية";
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-2 ${
          isSmallScreen ? "flex-col gap-1" : ""
        }`}
      >
        <div
          className={`font-medium text-gray-700 flex items-center gap-2 ${
            isSmallScreen ? "text-sm" : "text-sm"
          }`}
        >
          <span className={isSmallScreen ? "text-base" : "text-lg"}>
            {getProgressIcon(percentage)}
          </span>
          <span>تقدم الأسبوع</span>
        </div>
        <div
          className={`font-bold text-gray-800 ${
            isSmallScreen ? "text-sm" : "text-sm"
          }`}
        >
          {completed} / {total}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${getProgressColor(
            percentage
          )} transition-all duration-500 ease-out relative overflow-hidden ${
            isSmallScreen ? "h-3" : isMobile ? "h-4" : "h-4"
          }`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>

        {/* Progress text overlay */}
        {!isSmallScreen && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-700 drop-shadow-sm">
              {percentage}%
            </span>
          </div>
        )}
      </div>

      {/* Motivational message */}
      <div className="mt-2 text-center">
        <span
          className={`text-gray-600 font-medium ${
            isSmallScreen ? "text-xs" : "text-xs"
          }`}
        >
          {getMotivationalMessage(percentage)}
        </span>
        {isSmallScreen && (
          <span className="ml-2 text-xs font-bold text-gray-800">
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;

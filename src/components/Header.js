import ProgressBar from "./ProgressBar";
import ExportImport from "./ExportImport";
import { useResponsive } from "../hooks/useResponsive";

const Header = ({
  weeklyFocus,
  setWeeklyFocus,
  progress,
  onExport,
  onImport,
}) => {
  const { isMobile, isSmallScreen } = useResponsive();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg border border-blue-200 w-full">
      <div className="text-center mb-4 sm:mb-6">
        <h1
          className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 ${
            isSmallScreen ? "text-xl" : isMobile ? "text-2xl" : "text-3xl"
          }`}
        >
          ✅ Weekly Routine Checklist
        </h1>
        {/* <p
          className={`font-semibold text-gray-700 mb-1 ${
            isSmallScreen ? "text-base" : "text-lg"
          }`}
        >
          مرن وواقعي
        </p> */}
        <p
          className={`text-gray-600 max-w-2xl mx-auto leading-relaxed ${
            isSmallScreen
              ? "text-xs px-2"
              : isMobile
              ? "text-sm px-4"
              : "text-sm"
          }`}
        >
          الهدف: تمشي أسبوعك بهدوء، تخلص الأساسيات، ومن غير ضغط أو إحساس بالفشل.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Weekly Focus Input */}
        <div className="relative">
          <input
            value={weeklyFocus}
            onChange={(e) => setWeeklyFocus(e.target.value)}
            placeholder="🎯 Focus الأسبوع"
            className={`w-full border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium bg-white/80 backdrop-blur-sm ${
              isSmallScreen
                ? "p-3 pr-10 text-base"
                : isMobile
                ? "p-3 pr-11 text-lg"
                : "p-4 pr-12 text-lg"
            }`}
          />
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 text-blue-500 ${
              isSmallScreen ? "left-3" : "left-4"
            }`}
          >
            🎯
          </div>
        </div>

        {/* Progress and Controls */}
        <div
          className={`flex gap-4 items-center ${
            isMobile ? "flex-col space-y-4" : "justify-between"
          }`}
        >
          <div className={`${isMobile ? "w-full" : "flex-1"}`}>
            <ProgressBar progress={progress} />
          </div>
          <div className={`${isMobile ? "w-full flex justify-center" : ""}`}>
            <ExportImport onExport={onExport} onImport={onImport} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

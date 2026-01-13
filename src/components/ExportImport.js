import { useRef, useState } from "react";
import { useResponsive } from "../hooks/useResponsive";

const ExportImport = ({ onExport, onImport }) => {
  const fileInputRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const { isMobile, isSmallScreen } = useResponsive();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport();
      setTimeout(() => setIsExporting(false), 1000);
    } catch (error) {
      setIsExporting(false);
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsImporting(true);
      onImport(file);
      event.target.value = "";
      setTimeout(() => setIsImporting(false), 1000);
    }
  };

  const buttonClass = `flex items-center justify-center gap-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium ${
    isSmallScreen
      ? "px-3 py-2 text-xs"
      : isMobile
      ? "px-4 py-2 text-sm"
      : "px-4 py-2 text-sm"
  }`;

  return (
    <div className={`flex gap-2 ${isMobile ? "w-full" : ""}`}>
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`${buttonClass} bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${
          isMobile ? "flex-1" : ""
        }`}
      >
        {isExporting ? (
          <>
            <div
              className={`border-2 border-white border-t-transparent rounded-full animate-spin ${
                isSmallScreen ? "w-3 h-3" : "w-4 h-4"
              }`}
            ></div>
            <span className={isSmallScreen ? "hidden" : ""}>
              جاري التصدير...
            </span>
            {isSmallScreen && <span>...</span>}
          </>
        ) : (
          <>
            <svg
              className={`${isSmallScreen ? "w-3 h-3" : "w-4 h-4"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>تصدير</span>
          </>
        )}
      </button>

      <label
        className={`${buttonClass} bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 cursor-pointer ${
          isMobile ? "flex-1" : ""
        }`}
      >
        {isImporting ? (
          <>
            <div
              className={`border-2 border-white border-t-transparent rounded-full animate-spin ${
                isSmallScreen ? "w-3 h-3" : "w-4 h-4"
              }`}
            ></div>
            <span className={isSmallScreen ? "hidden" : ""}>
              جاري الاستيراد...
            </span>
            {isSmallScreen && <span>...</span>}
          </>
        ) : (
          <>
            <svg
              className={`${isSmallScreen ? "w-3 h-3" : "w-4 h-4"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
            <span>استيراد</span>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleImport}
          className="hidden"
          disabled={isImporting}
        />
      </label>
    </div>
  );
};

export default ExportImport;

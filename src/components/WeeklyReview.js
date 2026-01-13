import { useState } from "react";
import { useResponsive } from "../hooks/useResponsive";

const WeeklyReview = ({ reviews, onUpdateReview }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const { isMobile, isSmallScreen } = useResponsive();

  const reviewSections = [
    {
      key: "good",
      title: "إيه اللي مشي كويس؟",
      icon: "✅",
      placeholder: "اكتب الأشياء الإيجابية اللي حصلت الأسبوع ده...",
      bgColor: "from-green-400 to-green-600",
      borderColor: "border-green-200",
      focusColor: "focus:border-green-400",
    },
    {
      key: "hard",
      title: "إيه اللي كان تقيل؟",
      icon: "⚠️",
      placeholder: "اكتب التحديات أو الصعوبات اللي واجهتها...",
      bgColor: "from-orange-400 to-orange-600",
      borderColor: "border-orange-200",
      focusColor: "focus:border-orange-400",
    },
    {
      key: "change",
      title: "تعديل بسيط للأسبوع الجاي",
      icon: "🔄",
      placeholder: "اكتب التحسينات أو التغييرات اللي عايز تعملها...",
      bgColor: "from-blue-400 to-blue-600",
      borderColor: "border-blue-200",
      focusColor: "focus:border-blue-400",
    },
  ];

  const getWordCount = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div
        className={`bg-gradient-to-r from-purple-500 to-pink-600 text-white ${
          isSmallScreen ? "p-4" : isMobile ? "p-5" : "p-6"
        }`}
      >
        <h2
          className={`font-bold flex items-center gap-2 ${
            isSmallScreen ? "text-lg" : "text-xl"
          }`}
        >
          🔁 <span>Weekly Review</span>
        </h2>
        <p
          className={`text-purple-100 mt-1 ${
            isSmallScreen ? "text-xs" : "text-sm"
          }`}
        >
          تأمل في أسبوعك واكتب أفكارك للتحسين المستمر
        </p>
      </div>

      <div
        className={`space-y-4 ${
          isSmallScreen ? "p-4" : isMobile ? "p-5" : "p-6"
        }`}
      >
        {reviewSections.map((section) => {
          const isExpanded = expandedSection === section.key;
          const wordCount = getWordCount(reviews[section.key] || "");

          return (
            <div key={section.key} className="space-y-2">
              {/* Section Header */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setExpandedSection(isExpanded ? null : section.key)
                }
              >
                <div
                  className={`flex items-center gap-2 flex-1 min-w-0 ${
                    isSmallScreen ? "gap-2" : "gap-3"
                  }`}
                >
                  <div
                    className={`rounded-xl bg-gradient-to-r ${
                      section.bgColor
                    } flex items-center justify-center text-white shadow-md ${
                      isSmallScreen ? "w-8 h-8 text-sm" : "w-10 h-10 text-lg"
                    }`}
                  >
                    {section.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-bold text-gray-800 truncate ${
                        isSmallScreen ? "text-sm" : "text-base"
                      }`}
                    >
                      {section.title}
                    </h3>
                    <p
                      className={`text-gray-500 ${
                        isSmallScreen ? "text-xs" : "text-sm"
                      }`}
                    >
                      {wordCount > 0 ? `${wordCount} كلمة` : "لم تكتب بعد"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {wordCount > 0 && (
                    <div
                      className={`bg-green-400 rounded-full ${
                        isSmallScreen ? "w-1.5 h-1.5" : "w-2 h-2"
                      }`}
                    ></div>
                  )}
                  <svg
                    className={`text-gray-400 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    } ${isSmallScreen ? "w-4 h-4" : "w-5 h-5"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Textarea */}
              <div
                className={`transition-all duration-300 ${
                  isExpanded
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="relative">
                  <textarea
                    value={reviews[section.key] || ""}
                    onChange={(e) =>
                      onUpdateReview(section.key, e.target.value)
                    }
                    className={`w-full border-2 ${
                      section.borderColor
                    } rounded-xl ${
                      section.focusColor
                    } focus:ring-2 focus:ring-opacity-20 transition-all duration-200 resize-none text-gray-700 leading-relaxed ${
                      isSmallScreen ? "p-3 text-sm" : "p-4"
                    }`}
                    placeholder={section.placeholder}
                    rows={isSmallScreen ? "3" : "4"}
                  />

                  {/* Character count */}
                  <div
                    className={`absolute bottom-2 left-2 text-gray-400 ${
                      isSmallScreen ? "text-xs" : "text-xs"
                    }`}
                  >
                    {(reviews[section.key] || "").length} حرف
                  </div>
                </div>
              </div>

              {/* Quick expand for empty sections */}
              {!isExpanded && wordCount === 0 && (
                <button
                  onClick={() => setExpandedSection(section.key)}
                  className={`w-full border-2 border-dashed ${
                    section.borderColor
                  } rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200 ${
                    isSmallScreen ? "p-2 text-sm" : "p-3 text-sm"
                  }`}
                >
                  اضغط للكتابة...
                </button>
              )}
            </div>
          );
        })}

        {/* Summary */}
        <div
          className={`p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border ${
            isSmallScreen ? "mt-4 p-3" : "mt-8 p-4"
          }`}
        >
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-2 ${
                isSmallScreen ? "gap-1" : "gap-2"
              }`}
            >
              <span className={isSmallScreen ? "text-base" : "text-lg"}>
                📊
              </span>
              <span
                className={`font-medium text-gray-700 ${
                  isSmallScreen ? "text-sm" : "text-base"
                }`}
              >
                ملخص المراجعة
              </span>
            </div>
            <div
              className={`text-gray-600 ${
                isSmallScreen ? "text-xs" : "text-sm"
              }`}
            >
              {
                reviewSections.filter(
                  (s) => getWordCount(reviews[s.key] || "") > 0
                ).length
              }{" "}
              / {reviewSections.length} مكتمل
            </div>
          </div>

          <div className={`flex gap-1 ${isSmallScreen ? "mt-2" : "mt-3"}`}>
            {reviewSections.map((section) => (
              <div
                key={section.key}
                className={`flex-1 rounded-full ${
                  getWordCount(reviews[section.key] || "") > 0
                    ? `bg-gradient-to-r ${section.bgColor}`
                    : "bg-gray-200"
                } ${isSmallScreen ? "h-1.5" : "h-2"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReview;

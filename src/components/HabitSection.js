import { useState } from "react";
import { useResponsive } from "../hooks/useResponsive";

const HabitSection = ({
  section,
  checks,
  sectionNotes,
  onToggleCheck,
  onUpdateNote,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { isMobile, isSmallScreen } = useResponsive();

  const generateCheckId = (sectionTitle, item) => {
    return `${sectionTitle}||${item}`;
  };

  const generateNoteId = (sectionTitle, index) => {
    return `${sectionTitle}_note_${index}`;
  };

  // Calculate completion percentage for this section
  const completedItems = section.items.filter(
    (item) => checks[generateCheckId(section.title, item)]
  ).length;
  const completionPercentage = Math.round(
    (completedItems / section.items.length) * 100
  );

  const getCompletionColor = (percentage) => {
    if (percentage === 100)
      return "text-green-600 bg-green-50 border-green-200";
    if (percentage >= 75) return "text-blue-600 bg-blue-50 border-blue-200";
    if (percentage >= 50)
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  return (
    <section
      className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${getCompletionColor(
        completionPercentage
      )}`}
    >
      {/* Section Header */}
      <div
        className={`cursor-pointer ${
          isSmallScreen ? "p-4" : isMobile ? "p-5" : "p-6"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div
          className={`flex items-center justify-between ${
            isSmallScreen ? "gap-2" : "gap-3"
          }`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h2
              className={`font-bold truncate ${
                isSmallScreen ? "text-base" : isMobile ? "text-lg" : "text-xl"
              }`}
            >
              {section.title}
            </h2>
          </div>

          <div
            className={`flex items-center gap-2 flex-shrink-0 ${
              isSmallScreen ? "gap-1" : "gap-3"
            }`}
          >
            {/* Completion badge */}
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 border ${
                isSmallScreen ? "text-xs" : "text-sm"
              }`}
            >
              <span className="font-bold">
                {completedItems}/{section.items.length}
              </span>
              <div
                className={`bg-gray-200 rounded-full overflow-hidden ${
                  isSmallScreen ? "w-6 h-1.5" : "w-8 h-2"
                }`}
              >
                <div
                  className="h-full bg-current transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Expand/Collapse button */}
            <button className="p-1 rounded-full hover:bg-white/50 transition-colors">
              <svg
                className={`transition-transform duration-200 ${
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
            </button>
          </div>
        </div>
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div
          className={`space-y-3 ${
            isSmallScreen ? "px-4 pb-4" : isMobile ? "px-5 pb-5" : "px-6 pb-6"
          }`}
        >
          {/* Habit Items - Grid Layout */}
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>التقدم</span>
              <span className="font-bold">
                {completedItems}/{section.items.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            {/* Checkboxes Grid */}
            <div
              className={`grid gap-2 justify-items-center ${
                isSmallScreen
                  ? "grid-cols-4"
                  : isMobile
                  ? "grid-cols-5"
                  : "grid-cols-7"
              }`}
            >
              {section.items.map((item, index) => {
                const checkId = generateCheckId(section.title, item);
                const isChecked = !!checks[checkId];

                // Extract day name from item
                const getDayName = (item) => {
                  if (item.includes("الاحد")) return "الأحد";
                  if (item.includes("الاثنين")) return "الاثنين";
                  if (item.includes("الاثلاثاء")) return "الثلاثاء";
                  if (item.includes("الاربعاء")) return "الأربعاء";
                  if (item.includes("الخميس")) return "الخميس";
                  if (item.includes("الجمعه")) return "الجمعة";
                  if (item.includes("السبت")) return "السبت";
                  if (item.includes("مسائية")) return "مساء";
                  if (item.includes("قراءة") || item.includes("تأمل"))
                    return "قراءة";
                  if (item.includes("Session 1")) return "جلسة 1";
                  if (item.includes("Session 2")) return "جلسة 2";
                  if (item.includes("Session 3")) return "جلسة 3";
                  if (item.includes("طويل")) return "طويل";
                  if (item.includes("كارديو")) return "كارديو";
                  if (item.includes("تمطيط")) return "تمطيط";
                  if (item.includes("Day 1")) return "يوم 1";
                  if (item.includes("Day 2")) return "يوم 2";
                  if (item.includes("Day 3")) return "يوم 3";
                  if (item.includes("Day 4")) return "يوم 4";
                  if (item.includes("Day 5")) return "يوم 5";
                  if (item.includes("نوم")) return "نوم";
                  if (item.includes("مية")) return "ماء";
                  if (item.includes("سوشيال")) return "سوشيال";
                  return `${index + 1}`;
                };

                const dayName = getDayName(item);

                return (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <label className="cursor-pointer flex flex-col items-center gap-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleCheck(checkId)}
                        className="sr-only"
                      />
                      <div
                        className={`rounded-xl border-2 flex items-center justify-center transition-all duration-200 hover:shadow-md ${
                          isChecked
                            ? "bg-green-500 border-green-500 shadow-lg"
                            : "bg-white border-gray-300 hover:border-gray-400"
                        } ${
                          isSmallScreen
                            ? "w-12 h-12"
                            : isMobile
                            ? "w-14 h-14"
                            : "w-16 h-16"
                        }`}
                      >
                        {isChecked ? (
                          <svg
                            className={`text-white ${
                              isSmallScreen ? "w-6 h-6" : "w-7 h-7"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : null}
                      </div>
                      <span
                        className={`text-center font-medium leading-tight ${
                          isChecked ? "text-green-600" : "text-gray-600"
                        } ${isSmallScreen ? "text-xs" : "text-sm"} max-w-full`}
                        style={{ fontSize: isSmallScreen ? "10px" : "12px" }}
                      >
                        {dayName}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>

            {/* Item Labels for Reference */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2 text-sm">
                تفاصيل المهام:
              </h4>
              <div className="space-y-1">
                {section.items.map((item, index) => {
                  const checkId = generateCheckId(section.title, item);
                  const isChecked = !!checks[checkId];
                  return (
                    <div
                      key={index}
                      className={`text-xs ${
                        isChecked
                          ? "text-green-600 line-through"
                          : "text-gray-600"
                      }`}
                    >
                      • {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {section.notes &&
            section.notes.map((labelText, index) => {
              const noteId = generateNoteId(section.title, index);
              return (
                <div
                  key={index}
                  className={`p-3 bg-gray-50 rounded-xl border ${
                    isSmallScreen ? "mt-4 p-3" : "mt-6 p-4"
                  }`}
                >
                  <label
                    className={`block font-semibold text-gray-700 mb-2 ${
                      isSmallScreen ? "text-sm" : "text-sm"
                    }`}
                  >
                    📝 {labelText}
                  </label>
                  <textarea
                    className={`w-full border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none ${
                      isSmallScreen ? "p-2 text-sm" : "p-3"
                    }`}
                    value={sectionNotes[noteId] || ""}
                    onChange={(e) => onUpdateNote(noteId, e.target.value)}
                    rows={isSmallScreen ? "2" : "3"}
                    placeholder="اكتب ملاحظاتك هنا..."
                  />
                </div>
              );
            })}
        </div>
      )}
    </section>
  );
};

export default HabitSection;

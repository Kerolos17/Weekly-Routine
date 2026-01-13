import { useState } from "react";
import { useResponsive } from "../hooks/useResponsive";

const WeeklyRating = ({ rating, onUpdateRating }) => {
  const [hoveredRating, setHoveredRating] = useState(null);
  const { isMobile, isSmallScreen } = useResponsive();

  const ratingOptions = [
    {
      value: "ممتاز",
      emoji: "🏆",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      description: "أسبوع رائع! حققت كل أهدافك",
    },
    {
      value: "كويس جدًا",
      emoji: "🎉",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      description: "أداء ممتاز مع تحسينات بسيطة",
    },
    {
      value: "كويس",
      emoji: "👍",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      description: "تقدم جيد، استمر في المحاولة",
    },
    {
      value: "محتاج تخفيف",
      emoji: "🌱",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
      description: "خذ راحة وابدأ من جديد",
    },
  ];

  const selectedOption = ratingOptions.find(
    (option) => option.value === rating
  );
  const hoveredOption = ratingOptions.find(
    (option) => option.value === hoveredRating
  );
  const displayOption = hoveredOption || selectedOption;

  const getMotivationalMessage = (rating) => {
    if (rating === "ممتاز")
      return "مبروك! أنت تدير حياتك بشكل رائع. استمر على هذا المنوال! 🌟";
    if (rating === "كويس جدًا")
      return "أداء رائع! أنت على الطريق الصحيح. بعض التحسينات البسيطة ستجعلك في القمة! 🚀";
    if (rating === "كويس")
      return "تقدم جيد! كل خطوة صغيرة تقربك من أهدافك. لا تستسلم! 💪";
    if (rating === "محتاج تخفيف")
      return "لا بأس، الأسابيع الصعبة جزء من الرحلة. خذ راحة واعتني بنفسك أولاً. 🌸";
    return "";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div
        className={`bg-gradient-to-r from-amber-500 to-orange-600 text-white ${
          isSmallScreen ? "p-4" : isMobile ? "p-5" : "p-6"
        }`}
      >
        <h2
          className={`font-bold flex items-center gap-2 ${
            isSmallScreen ? "text-lg" : "text-xl"
          }`}
        >
          ⭐ <span>تقييم الأسبوع</span>
        </h2>
        <p
          className={`text-amber-100 mt-1 ${
            isSmallScreen ? "text-xs" : "text-sm"
          }`}
        >
          كيف كان أداؤك هذا الأسبوع؟
        </p>
      </div>

      <div className={isSmallScreen ? "p-4" : isMobile ? "p-5" : "p-6"}>
        {/* Current Selection Display */}
        {displayOption && (
          <div
            className={`mb-4 rounded-xl border-2 ${displayOption.borderColor} ${
              displayOption.bgColor
            } transition-all duration-300 ${
              isSmallScreen ? "p-3 mb-4" : "p-4 mb-6"
            }`}
          >
            <div
              className={`flex items-center gap-2 ${
                isSmallScreen ? "gap-2" : "gap-3"
              }`}
            >
              <div
                className={`rounded-full bg-gradient-to-r ${
                  displayOption.color
                } flex items-center justify-center shadow-md ${
                  isSmallScreen ? "w-10 h-10 text-lg" : "w-12 h-12 text-2xl"
                }`}
              >
                {displayOption.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold ${displayOption.textColor} ${
                    isSmallScreen ? "text-base" : "text-lg"
                  }`}
                >
                  {displayOption.value}
                </h3>
                <p
                  className={`text-gray-600 ${
                    isSmallScreen ? "text-xs" : "text-sm"
                  }`}
                >
                  {displayOption.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Rating Options */}
        <div
          className={`space-y-2 ${isSmallScreen ? "space-y-2" : "space-y-3"}`}
        >
          {ratingOptions.map((option) => {
            const isSelected = rating === option.value;
            const isHovered = hoveredRating === option.value;

            return (
              <label
                key={option.value}
                className={`flex items-center gap-3 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected
                    ? `${option.borderColor} ${option.bgColor}`
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                } ${isSmallScreen ? "p-3 gap-2" : "p-4"}`}
                onMouseEnter={() => !isMobile && setHoveredRating(option.value)}
                onMouseLeave={() => !isMobile && setHoveredRating(null)}
                onTouchStart={() => isMobile && setHoveredRating(option.value)}
                onTouchEnd={() => isMobile && setHoveredRating(null)}
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="radio"
                    name="weeklyRating"
                    value={option.value}
                    checked={isSelected}
                    onChange={(e) => onUpdateRating(e.target.value)}
                    className="sr-only"
                  />

                  {/* Custom Radio Button */}
                  <div
                    className={`rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? `bg-gradient-to-r ${option.color} border-transparent`
                        : "border-gray-300 hover:border-gray-400"
                    } ${isSmallScreen ? "w-5 h-5" : "w-6 h-6"}`}
                  >
                    {isSelected && (
                      <div
                        className={`bg-white rounded-full ${
                          isSmallScreen ? "w-1.5 h-1.5" : "w-2 h-2"
                        }`}
                      ></div>
                    )}
                  </div>
                </div>

                <div
                  className={`rounded-lg bg-gradient-to-r ${
                    option.color
                  } flex items-center justify-center shadow-sm transition-transform duration-200 flex-shrink-0 ${
                    isHovered ? "scale-110" : ""
                  } ${
                    isSmallScreen ? "w-8 h-8 text-base" : "w-10 h-10 text-xl"
                  }`}
                >
                  {option.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={`font-semibold transition-colors duration-200 ${
                      isSelected ? option.textColor : "text-gray-700"
                    } ${isSmallScreen ? "text-sm" : "text-base"}`}
                  >
                    {option.value}
                  </div>
                  <div
                    className={`text-gray-500 ${
                      isSmallScreen ? "text-xs" : "text-sm"
                    }`}
                  >
                    {option.description}
                  </div>
                </div>

                {isSelected && (
                  <div
                    className={`${option.textColor} flex-shrink-0 ${
                      isSmallScreen ? "text-lg" : "text-2xl"
                    }`}
                  >
                    ✓
                  </div>
                )}
              </label>
            );
          })}
        </div>

        {/* Motivational Message */}
        {rating && (
          <div
            className={`bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 ${
              isSmallScreen ? "mt-4 p-3" : "mt-6 p-4"
            }`}
          >
            <div
              className={`flex items-center gap-2 mb-2 ${
                isSmallScreen ? "gap-1 mb-1" : "gap-2 mb-2"
              }`}
            >
              <span className={isSmallScreen ? "text-base" : "text-lg"}>
                💭
              </span>
              <span
                className={`font-medium text-purple-700 ${
                  isSmallScreen ? "text-sm" : "text-base"
                }`}
              >
                رسالة تحفيزية
              </span>
            </div>
            <p
              className={`text-purple-600 leading-relaxed ${
                isSmallScreen ? "text-xs" : "text-sm"
              }`}
            >
              {getMotivationalMessage(rating)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyRating;

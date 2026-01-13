import React, { useState } from "react";
import { useResponsive } from "../hooks/useResponsive";

const TaskManager = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onClearCompleted,
}) => {
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");
  const { isMobile, isSmallScreen } = useResponsive();

  const handleAddTask = () => {
    if (taskInput.trim()) {
      onAddTask(taskInput.trim());
      setTaskInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });

  const completedCount = tasks.filter((task) => task.done).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div
        className={`bg-gradient-to-r from-indigo-500 to-purple-600 text-white ${
          isSmallScreen ? "p-4" : isMobile ? "p-5" : "p-6"
        }`}
      >
        <div
          className={`flex items-center justify-between ${
            isSmallScreen ? "flex-col gap-2" : ""
          }`}
        >
          <h2
            className={`font-bold flex items-center gap-2 ${
              isSmallScreen ? "text-lg" : "text-xl"
            }`}
          >
            💼 <span>الشغل الإضافي</span>
          </h2>
          <div
            className={`flex items-center gap-3 ${
              isSmallScreen ? "text-xs" : "text-sm"
            }`}
          >
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
              <span>{activeCount} نشط</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-300 rounded-full"></span>
              <span>{completedCount} مكتمل</span>
            </div>
          </div>
        </div>
      </div>

      <div className={isSmallScreen ? "p-4" : isMobile ? "p-5" : "p-6"}>
        {/* Add Task Input */}
        <div className={`flex gap-2 mb-4 ${isMobile ? "flex-col" : ""}`}>
          <div className={`relative ${isMobile ? "w-full" : "flex-1"}`}>
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 ${
                isSmallScreen ? "p-3 pr-10 text-sm" : "p-4 pr-12 text-lg"
              }`}
              placeholder="اكتب التاسك الجديد..."
            />
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${
                isSmallScreen ? "left-3" : "left-4"
              }`}
            >
              ✏️
            </div>
          </div>

          <button
            onClick={handleAddTask}
            disabled={!taskInput.trim()}
            className={`bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg font-medium ${
              isSmallScreen
                ? "px-4 py-3 text-sm"
                : isMobile
                ? "px-5 py-3"
                : "px-6 py-4"
            }`}
          >
            إضافة
          </button>
        </div>

        {/* Filter Buttons */}
        <div className={`flex gap-2 mb-4 ${isSmallScreen ? "flex-wrap" : ""}`}>
          {[
            { key: "all", label: "الكل", count: tasks.length },
            { key: "active", label: "نشط", count: activeCount },
            { key: "completed", label: "مكتمل", count: completedCount },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-lg font-medium transition-all duration-200 ${
                filter === key
                  ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-200"
                  : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
              } ${
                isSmallScreen ? "px-3 py-2 text-xs flex-1" : "px-4 py-2 text-sm"
              }`}
            >
              {label} ({count})
            </button>
          ))}

          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className={`bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-all duration-200 border-2 border-transparent hover:border-red-200 ${
                isSmallScreen
                  ? "px-3 py-2 text-xs w-full mt-2"
                  : "px-4 py-2 text-sm"
              }`}
            >
              مسح المكتمل
            </button>
          )}
        </div>

        {/* Tasks List */}
        <div
          className={`space-y-2 overflow-y-auto ${
            isSmallScreen ? "max-h-64" : isMobile ? "max-h-80" : "max-h-96"
          }`}
        >
          {filteredTasks.length === 0 ? (
            <div
              className={`text-center py-6 text-gray-500 ${
                isSmallScreen ? "py-4" : "py-8"
              }`}
            >
              <div
                className={`mb-2 ${isSmallScreen ? "text-2xl" : "text-4xl"}`}
              >
                📝
              </div>
              <p
                className={`font-medium ${
                  isSmallScreen ? "text-base" : "text-lg"
                }`}
              >
                {filter === "completed"
                  ? "لا توجد مهام مكتملة"
                  : filter === "active"
                  ? "لا توجد مهام نشطة"
                  : "لا توجد مهام بعد"}
              </p>
              {filter === "all" && (
                <p className={isSmallScreen ? "text-xs" : "text-sm"}>
                  ابدأ بإضافة مهمة جديدة
                </p>
              )}
            </div>
          ) : (
            filteredTasks.map((task, index) => {
              const originalIndex = tasks.findIndex((t) => t === task);
              return (
                <div
                  key={originalIndex}
                  className={`flex items-center gap-3 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                    task.done
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  } ${isSmallScreen ? "p-3 gap-2" : "p-4"}`}
                >
                  <button
                    onClick={() => onToggleTask(originalIndex)}
                    className={`flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      task.done
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 hover:border-indigo-400"
                    } ${isSmallScreen ? "w-5 h-5" : "w-6 h-6"}`}
                  >
                    {task.done && (
                      <svg
                        className={`text-white ${
                          isSmallScreen ? "w-3 h-3" : "w-4 h-4"
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
                    )}
                  </button>

                  <span
                    className={`flex-1 font-medium transition-all duration-200 ${
                      task.done
                        ? "line-through text-green-700"
                        : "text-gray-800"
                    } ${isSmallScreen ? "text-sm" : "text-base"}`}
                  >
                    {task.text}
                  </span>

                  <div
                    className={`flex items-center gap-1 ${
                      isSmallScreen ? "flex-col gap-1" : "gap-2"
                    }`}
                  >
                    <button
                      onClick={() => onToggleTask(originalIndex)}
                      className={`rounded-lg font-medium transition-all duration-200 ${
                        task.done
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-yellow-400 text-yellow-800 hover:bg-yellow-500"
                      } ${
                        isSmallScreen
                          ? "px-2 py-1 text-xs"
                          : "px-3 py-1 text-sm"
                      }`}
                    >
                      {task.done ? "مكتمل" : "شغال عليه"}
                    </button>

                    <button
                      onClick={() => onDeleteTask(originalIndex)}
                      className={`text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 ${
                        isSmallScreen ? "p-1" : "p-2"
                      }`}
                      title="حذف المهمة"
                    >
                      <svg
                        className={isSmallScreen ? "w-3 h-3" : "w-4 h-4"}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;

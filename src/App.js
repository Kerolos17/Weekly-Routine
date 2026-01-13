import { useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useResponsive } from "./hooks/useResponsive";
import { DEFAULT_SECTIONS } from "./data/defaultSections";
import { exportToJSON, importFromJSON } from "./utils/exportImport";
import { calculateProgress } from "./utils/progressCalculator";

import Header from "./components/Header";
import HabitSection from "./components/HabitSection";
import TaskManager from "./components/TaskManager";
import WeeklyReview from "./components/WeeklyReview";
import WeeklyRating from "./components/WeeklyRating";

const INITIAL_STATE = {
  checks: {},
  tasks: [],
  focus: "",
  reviews: { good: "", hard: "", change: "" },
  rating: "",
  sectionNotes: {},
};

function App() {
  const [state, setState] = useLocalStorage("weeklyData", INITIAL_STATE);
  const { isMobile, isSmallScreen, isTablet } = useResponsive();

  // Calculate progress
  const progress = useMemo(
    () => calculateProgress(state.checks),
    [state.checks]
  );

  // State update helpers
  const updateState = (updates) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  // Weekly focus handlers
  const setWeeklyFocus = (focus) => {
    updateState({ focus });
  };

  // Habit section handlers
  const toggleCheck = (checkId) => {
    const newChecks = { ...state.checks };
    newChecks[checkId] = !newChecks[checkId];
    updateState({ checks: newChecks });
  };

  const updateSectionNote = (noteId, value) => {
    const newSectionNotes = { ...state.sectionNotes };
    newSectionNotes[noteId] = value;
    updateState({ sectionNotes: newSectionNotes });
  };

  // Task management handlers
  const addTask = (text) => {
    const newTasks = [...state.tasks, { text, done: false }];
    updateState({ tasks: newTasks });
  };

  const toggleTask = (index) => {
    const newTasks = [...state.tasks];
    newTasks[index].done = !newTasks[index].done;
    updateState({ tasks: newTasks });
  };

  const deleteTask = (index) => {
    const newTasks = state.tasks.filter((_, i) => i !== index);
    updateState({ tasks: newTasks });
  };

  const clearCompletedTasks = () => {
    const newTasks = state.tasks.filter((task) => !task.done);
    updateState({ tasks: newTasks });
  };

  // Weekly review handlers
  const updateReview = (field, value) => {
    const newReviews = { ...state.reviews };
    newReviews[field] = value;
    updateState({ reviews: newReviews });
  };

  // Rating handler
  const updateRating = (rating) => {
    updateState({ rating });
  };

  // Export/Import handlers
  const handleExport = () => {
    exportToJSON(state);
  };

  const handleImport = (file) => {
    importFromJSON(file, (importedData) => {
      setState(importedData);
    });
  };

  // Responsive layout configuration
  const getLayoutConfig = () => {
    if (isSmallScreen) {
      return {
        containerClass:
          "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100",
        paddingClass: "p-3",
        maxWidthClass: "max-w-full",
        gridClass: "grid grid-cols-1 gap-4",
        headerClass: "col-span-1",
        mainClass: "col-span-1 space-y-4",
        sidebarClass: "col-span-1 space-y-4",
      };
    } else if (isMobile) {
      return {
        containerClass:
          "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100",
        paddingClass: "p-4",
        maxWidthClass: "max-w-2xl",
        gridClass: "grid grid-cols-1 gap-5",
        headerClass: "col-span-1",
        mainClass: "col-span-1 space-y-5",
        sidebarClass: "col-span-1 space-y-5",
      };
    } else if (isTablet) {
      return {
        containerClass:
          "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100",
        paddingClass: "p-6",
        maxWidthClass: "max-w-5xl",
        gridClass: "grid grid-cols-1 lg:grid-cols-3 gap-6",
        headerClass: "lg:col-span-3",
        mainClass: "lg:col-span-2 space-y-6",
        sidebarClass: "lg:col-span-1 space-y-6",
      };
    } else {
      return {
        containerClass:
          "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100",
        paddingClass: "p-6 lg:p-8",
        maxWidthClass: "max-w-7xl",
        gridClass: "grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8",
        headerClass: "lg:col-span-4",
        mainClass: "lg:col-span-3 space-y-6",
        sidebarClass: "lg:col-span-1 space-y-6",
      };
    }
  };

  const layout = getLayoutConfig();

  return (
    <div className={layout.containerClass}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className={`relative z-10 ${layout.paddingClass}`}>
        <div className={`${layout.maxWidthClass} mx-auto`}>
          {/* Main Grid Layout */}
          <div className={layout.gridClass}>
            {/* Header */}
            <div className={layout.headerClass}>
              <Header
                weeklyFocus={state.focus}
                setWeeklyFocus={setWeeklyFocus}
                progress={progress}
                onExport={handleExport}
                onImport={handleImport}
              />
            </div>

            {/* Main Content - Habit Sections */}
            <div className={layout.mainClass}>
              {DEFAULT_SECTIONS.map((section, index) => (
                <HabitSection
                  key={index}
                  section={section}
                  checks={state.checks}
                  sectionNotes={state.sectionNotes}
                  onToggleCheck={toggleCheck}
                  onUpdateNote={updateSectionNote}
                />
              ))}
            </div>

            {/* Sidebar */}
            <div className={layout.sidebarClass}>
              {/* Task Manager */}
              <TaskManager
                tasks={state.tasks}
                onAddTask={addTask}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onClearCompleted={clearCompletedTasks}
              />

              {/* Weekly Review */}
              <WeeklyReview
                reviews={state.reviews}
                onUpdateReview={updateReview}
              />

              {/* Weekly Rating */}
              <WeeklyRating
                rating={state.rating}
                onUpdateRating={updateRating}
              />
            </div>
          </div>

          {/* Footer */}
          <footer
            className={`text-center text-gray-500 ${
              isSmallScreen
                ? "mt-8 text-xs"
                : isMobile
                ? "mt-10 text-sm"
                : "mt-12 text-sm"
            }`}
          >
            <div
              className={`flex items-center justify-center gap-2 mb-2 ${
                isSmallScreen ? "mb-1" : "mb-2"
              }`}
            >
              <span>✨</span>
              <span>Weekly Routine Checklist</span>
              <span>✨</span>
            </div>
            <p className={isSmallScreen ? "px-4" : ""}>
              مرن وواقعي - بناء عادات صحية بدون ضغط
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;

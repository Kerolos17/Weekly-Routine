// Date utility functions for Arabic locale
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };

  return new Intl.DateTimeFormat("ar-SA", defaultOptions).format(date);
};

export const formatTime = (date, options = {}) => {
  const defaultOptions = {
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  };

  return new Intl.DateTimeFormat("ar-SA", defaultOptions).format(date);
};

export const getWeekStart = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

export const getWeekEnd = (date = new Date()) => {
  const weekStart = getWeekStart(date);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  return weekEnd;
};

export const getCurrentWeekRange = () => {
  const start = getWeekStart();
  const end = getWeekEnd();
  return {
    start: formatDate(start, { month: "short", day: "numeric" }),
    end: formatDate(end, { month: "short", day: "numeric" }),
  };
};

export const isCurrentWeek = (date) => {
  const weekStart = getWeekStart();
  const weekEnd = getWeekEnd();
  const checkDate = new Date(date);

  return checkDate >= weekStart && checkDate <= weekEnd;
};

export const getDaysUntilWeekEnd = () => {
  const today = new Date();
  const weekEnd = getWeekEnd();
  const diffTime = weekEnd - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

export const getWeekProgress = () => {
  const weekStart = getWeekStart();
  const today = new Date();
  const daysPassed = Math.floor((today - weekStart) / (1000 * 60 * 60 * 24));
  return Math.min(Math.max(daysPassed / 7, 0), 1);
};

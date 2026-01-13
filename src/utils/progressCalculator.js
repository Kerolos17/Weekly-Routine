import { DEFAULT_SECTIONS } from "../data/defaultSections";

export const calculateProgress = (checks) => {
  const allItems = [];

  DEFAULT_SECTIONS.forEach((section) => {
    section.items.forEach((item) => {
      allItems.push(`${section.title}||${item}`);
    });
  });

  const completed = allItems.filter((id) => checks[id]).length;
  const total = allItems.length;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  return {
    completed,
    total,
    percentage,
  };
};

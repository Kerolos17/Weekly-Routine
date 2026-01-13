import {
  showSuccessNotification,
  showErrorNotification,
} from "./notifications";

export const exportToJSON = (data) => {
  try {
    const timestamp = new Date().toISOString().split("T")[0];
    const dataWithMetadata = {
      ...data,
      exportDate: new Date().toISOString(),
      version: "1.0",
    };

    const dataStr = JSON.stringify(dataWithMetadata, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `weekly-checklist-${timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    showSuccessNotification("تم تصدير البيانات بنجاح! 📁");
  } catch (error) {
    console.error("Export error:", error);
    showErrorNotification("فشل في تصدير البيانات");
  }
};

export const importFromJSON = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);

      // Validate the imported data structure
      const requiredFields = [
        "checks",
        "tasks",
        "focus",
        "reviews",
        "rating",
        "sectionNotes",
      ];
      const hasValidStructure = requiredFields.every((field) =>
        parsed.hasOwnProperty(field)
      );

      if (!hasValidStructure) {
        throw new Error("Invalid file structure");
      }

      // Clean up the data (remove metadata)
      const { exportDate, version, ...cleanData } = parsed;

      callback(cleanData);
      showSuccessNotification("تم استيراد البيانات بنجاح! 📥");
    } catch (err) {
      console.error("Import error:", err);
      showErrorNotification("فشل في استيراد البيانات - تأكد من صحة الملف");
    }
  };

  reader.onerror = () => {
    showErrorNotification("فشل في قراءة الملف");
  };

  reader.readAsText(file);
};

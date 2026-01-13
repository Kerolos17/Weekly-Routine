// Simple notification system for user feedback
let notificationContainer = null;

const createNotificationContainer = () => {
  if (!notificationContainer) {
    notificationContainer = document.createElement("div");
    notificationContainer.className = "fixed top-4 right-4 z-50 space-y-2";
    notificationContainer.id = "notification-container";
    document.body.appendChild(notificationContainer);
  }
  return notificationContainer;
};

export const showNotification = (message, type = "success") => {
  const container = createNotificationContainer();

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
    type === "success"
      ? "bg-green-500 text-white"
      : type === "error"
      ? "bg-red-500 text-white"
      : type === "info"
      ? "bg-blue-500 text-white"
      : "bg-gray-500 text-white"
  }`;

  notification.innerHTML = `
    <div class="flex items-center gap-2">
      <span>${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
      <span>${message}</span>
    </div>
  `;

  container.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (container.contains(notification)) {
        container.removeChild(notification);
      }
    }, 300);
  }, 3000);
};

export const showSuccessNotification = (message) =>
  showNotification(message, "success");
export const showErrorNotification = (message) =>
  showNotification(message, "error");
export const showInfoNotification = (message) =>
  showNotification(message, "info");

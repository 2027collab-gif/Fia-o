
// =========================================
// FIA'O - GLOBAL JAVASCRIPT
// Dark/Light Mode and Notifications
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // DARK / LIGHT MODE
  // =========================================

  const themeToggleBtn = document.getElementById('theme-toggle');

  if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector('i');

    // Restore saved theme
    const savedTheme = localStorage.getItem('fiao-theme');

    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');

      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    }

    // Toggle theme
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');

      const isDarkMode = document.body.classList.contains('dark-mode');

      localStorage.setItem('fiao-theme', isDarkMode ? 'dark' : 'light');

      if (icon) {
        icon.classList.toggle('fa-moon', !isDarkMode);
        icon.classList.toggle('fa-sun', isDarkMode);
      }
    });
  }


  // =========================================
  // NOTIFICATIONS SYSTEM
  // =========================================

  const notificationsBtn = document.getElementById('notifications-btn');
  const notificationsPanel = document.getElementById('notifications-panel');
  const notificationBadge = document.getElementById('notification-badge');
  const notificationsCount = document.getElementById('notifications-count');
  const markAllReadBtn = document.getElementById('mark-all-read');

  if (
    notificationsBtn &&
    notificationsPanel &&
    notificationBadge &&
    notificationsCount
  ) {

    const notificationItems = notificationsPanel.querySelectorAll('[data-notification]');

    // Update unread notification count
    function updateNotificationCount() {
      const unreadNotifications = notificationsPanel.querySelectorAll(
        '.notification-item.unread'
      ).length;

      notificationBadge.textContent = unreadNotifications;
      notificationBadge.style.display = unreadNotifications > 0 ? 'flex' : 'none';

      if (unreadNotifications === 1) {
        notificationsCount.textContent = 'You have 1 unread notification';
      } else {
        notificationsCount.textContent =
          `You have ${unreadNotifications} unread notifications`;
      }
    }

    // Open or close notifications panel
    notificationsBtn.addEventListener('click', (event) => {
      event.stopPropagation();

      const isOpen = !notificationsPanel.hidden;

      notificationsPanel.hidden = isOpen;
      notificationsBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Mark individual notifications as read
    notificationItems.forEach((item) => {
      item.addEventListener('click', () => {
        item.classList.remove('unread');
        updateNotificationCount();
      });
    });

    // Mark all notifications as read
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener('click', () => {
        notificationItems.forEach((item) => {
          item.classList.remove('unread');
        });

        updateNotificationCount();
      });
    }

    // Close panel when clicking outside
    document.addEventListener('click', (event) => {
      if (!notificationsPanel.contains(event.target) &&
          !notificationsBtn.contains(event.target)) {

        notificationsPanel.hidden = true;
        notificationsBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close panel with Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        notificationsPanel.hidden = true;
        notificationsBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Initialize notification counter
    updateNotificationCount();
  }

});

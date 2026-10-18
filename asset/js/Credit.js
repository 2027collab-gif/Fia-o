document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');

  if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector('i');

    function applyTheme(theme) {
      const isDark = theme === 'dark';
      document.body.classList.toggle('dark-mode', isDark);

      if (icon) {
        icon.classList.toggle('fa-moon', !isDark);
        icon.classList.toggle('fa-sun', isDark);
      }
    }

    const savedTheme = localStorage.getItem('fiao-theme') || 'light';
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      const newTheme = isDark ? 'light' : 'dark';

      localStorage.setItem('fiao-theme', newTheme);
      applyTheme(newTheme);
    });
  }

  const paymentForm = document.getElementById('payment-form');
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = document.getElementById('payment-amount').value;
      alert(`Payment of ${amount} successfully registered!`);
    });
  }

  const markPaidBtn = document.getElementById('mark-paid-btn');
  if (markPaidBtn) {
    markPaidBtn.addEventListener('click', () => {
      alert('Full debt marked as paid!');
    });
  }
});
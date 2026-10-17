document.addEventListener('DOMContentLoaded', () => {
  // 1. Funcionalidad de Cambio de Tema (Modo Claro / Oscuro)
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Comprobar si el usuario ya tenía un tema guardado
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      let theme = 'light';
      if (document.body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
      
      localStorage.setItem('theme', theme);
    });
  }

  // 2. Selector de Idioma Simple (Intercambio ES / EN)
  const btnLanguage = document.getElementById('btn-language');
  const langText = document.getElementById('lang-text');

  if (btnLanguage) {
    btnLanguage.addEventListener('click', () => {
      if (langText.textContent === 'ES') {
        langText.textContent = 'EN';
        // Aquí podrías agregar lógica para traducir textos si lo deseas
      } else {
        langText.textContent = 'ES';
      }
    });
  }

  // 3. Simulación de selección de cliente (Actualiza datos dinámicamente)
  const customerSelect = document.getElementById('customer-select');
  const customerNameElements = document.querySelectorAll('.customer-name');

  if (customerSelect) {
    customerSelect.addEventListener('change', (e) => {
      const selectedOptionText = e.target.options[e.target.selectedIndex].text;
      
      // Actualiza el nombre del cliente mostrado en la tarjeta de información
      customerNameElements.forEach(el => {
        el.textContent = selectedOptionText;
      });
      
      console.log('Cliente seleccionado cambiado a:', selectedOptionText);
    });
  }

  // 4. Botón de registro de pago (Alerta de simulación)
  const btnRegisterPayment = document.querySelector('.btn-yellow-action');
  const paymentAmountInput = document.getElementById('payment-amount');

  if (btnRegisterPayment) {
    btnRegisterPayment.addEventListener('click', () => {
      const amount = paymentAmountInput ? paymentAmountInput.value : 'B/. 0.00';
      alert(`¡Pago registrado con éxito por un monto de ${amount}!`);
    });
  }
});
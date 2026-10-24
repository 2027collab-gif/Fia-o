document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad del botón Back
    const backBtn = document.getElementById('backBtn');
 
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (document.referrer && document.referrer.includes(window.location.hostname)) {
                window.location.href = document.referrer;
            } else {
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = 'Credit.html';
                }
            }
        });
    }
 
    // 2. Funcionalidad de las Pestañas (Tabs) en "My Business"
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
 
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
           
            // Ocultar todos los paneles
            tabPanels.forEach(panel => panel.classList.remove('active'));
 
            // Activar botón seleccionado
            button.classList.add('active');
 
            // Mostrar el panel correspondiente
            const targetTab = button.getAttribute('data-tab');
            const targetPanel = document.getElementById(`${targetTab}-tab`);
           
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});
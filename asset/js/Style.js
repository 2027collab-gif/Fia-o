// =========================
// FIA'O APP JAVASCRIPT - INDEX & VIEWS
// =========================

document.addEventListener("DOMContentLoaded", function () {

    // Elementos principales de las vistas
    const homeView = document.getElementById("home-view");
    const loginView = document.getElementById("login-view");
    const signupView = document.getElementById("signup-view");

    // Botones de acción en el Hero (Home)
    const btnHomeLogin = document.getElementById("btn-home-login");
    const btnHomeSignup = document.getElementById("btn-home-signup");

    // Enlaces internos de cambio de vista en formularios
    const linkToSignup = document.getElementById("link-to-signup");
    const linkToLogin = document.getElementById("link-to-login");

    // Logo y botón Home de navegación
    const navHome = document.getElementById("nav-home");
    const navLogo = document.getElementById("nav-logo");

    // Función para cambiar de vista de forma limpia
    function switchView(viewToShow) {
        // Ocultar todas las vistas si existen
        if (homeView) homeView.style.display = "none";
        if (loginView) loginView.style.display = "none";
        if (signupView) signupView.style.display = "none";

        // Mostrar la vista seleccionada
        if (viewToShow) {
            viewToShow.style.display = "flex";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Eventos para alternar entre Home, Login y Signup en la misma página
    if (btnHomeLogin && loginView) {
        btnHomeLogin.addEventListener("click", function () {
            switchView(loginView);
        });
    }

    if (btnHomeSignup && signupView) {
        btnHomeSignup.addEventListener("click", function () {
            switchView(signupView);
        });
    }

    if (linkToSignup && signupView) {
        linkToSignup.addEventListener("click", function (e) {
            e.preventDefault();
            switchView(signupView);
        });
    }

    if (linkToLogin && loginView) {
        linkToLogin.addEventListener("click", function (e) {
            e.preventDefault();
            switchView(loginView);
        });
    }

    if (navHome && homeView) {
        navHome.addEventListener("click", function (e) {
            e.preventDefault();
            switchView(homeView);
        });
    }

    if (navLogo && homeView) {
        navLogo.addEventListener("click", function (e) {
            e.preventDefault();
            switchView(homeView);
        });
    }

    // =========================
    // IMAGE LOAD CHECK
    // =========================
    const appImages = document.querySelectorAll("img");

    appImages.forEach(function (img) {
        img.addEventListener("error", function () {
            console.warn("Advertencia: No se pudo cargar la imagen -> " + img.src);
        });
    });

});
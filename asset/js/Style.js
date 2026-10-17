// =========================
// FIA'O HOME JAVASCRIPT
// =========================


// Wait until the page is completely loaded
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // NAVIGATION
    // =========================

    const navigationLinks = document.querySelectorAll("nav a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const destination = link.getAttribute("href");

            // Allow normal navigation to other HTML pages
            if (destination && destination !== "#") {
                return;
            }

            event.preventDefault();
        });
    });


    // =========================
    // LOGIN BUTTON
    // =========================

    const loginButton = document.querySelector('a[href="login.html"]');

    if (loginButton) {

        loginButton.addEventListener("click", function () {

            window.location.href = "login.html";

        });
    }


    // =========================
    // SIGN UP BUTTON
    // =========================

    const signupButton = document.querySelector('a[href="signup.html"]');

    if (signupButton) {

        signupButton.addEventListener("click", function () {

            window.location.href = "signup.html";

        });
    }


    // =========================
    // IMAGE LOAD CHECK
    // =========================

    const appImage = document.querySelector("section img");

    if (appImage) {

        appImage.addEventListener("error", function () {

            console.log(
                "The FIA'O app image could not be found. Check the images folder and file name."
            );

        });

    }

});
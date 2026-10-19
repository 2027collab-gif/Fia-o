
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       DARK MODE / LIGHT MODE
    ===================================== */

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    function applyTheme(theme) {
        const isDark = theme === "dark";

        document.body.classList.toggle("dark-mode", isDark);

        if (themeIcon) {
            themeIcon.classList.remove("fa-moon", "fa-sun", "fa-regular", "fa-solid");

            if (isDark) {
                themeIcon.classList.add("fa-regular", "fa-sun");
            } else {
                themeIcon.classList.add("fa-regular", "fa-moon");
            }
        }

        if (themeToggle) {
            themeToggle.title = isDark
                ? "Activate light mode"
                : "Activate night mode";

            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Activate light mode" : "Activate night mode"
            );
        }
    }

    let savedTheme = "light";

    try {
        savedTheme =
            localStorage.getItem("fiao-theme") ||
            localStorage.getItem("theme") ||
            "light";
    } catch (error) {
        savedTheme = "light";
    }

    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const isDark = document.body.classList.contains("dark-mode");
            const newTheme = isDark ? "light" : "dark";

            try {
                localStorage.setItem("fiao-theme", newTheme);
                localStorage.setItem("theme", newTheme);
            } catch (error) {
                // The theme still changes for the current page.
            }

            applyTheme(newTheme);
        });
    }

    /* =====================================
       FAQ ACCORDION
    ===================================== */

    document.querySelectorAll(".faq-question").forEach(function (question) {
        question.addEventListener("click", function () {
            const item = question.closest(".faq-item");
            const icon = question.querySelector(".faq-icon");

            if (!item) return;

            const willOpen = !item.classList.contains("active");

            item.classList.toggle("active", willOpen);
            question.setAttribute("aria-expanded", String(willOpen));

            if (icon) {
                icon.textContent = willOpen ? "−" : "+";
            }
        });
    });

    /* =====================================
       CONTACT FORM
    ===================================== */

    const contactForm = document.getElementById("contact-form");
    const contactFeedback = document.getElementById("contact-feedback");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            if (contactFeedback) {
                contactFeedback.textContent =
                    "Your message has been prepared. This demo form does not send emails yet.";
            }

            contactForm.reset();
        });
    }

    /* =====================================
       CHAT WIDGET
    ===================================== */

    const chatWindow = document.getElementById("chat-window");
    const chatTrigger = document.getElementById("chat-trigger-btn");
    const chatClose = document.getElementById("chat-close-btn");
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");

    if (chatTrigger && chatWindow) {
        chatTrigger.addEventListener("click", function () {
            const isOpen = chatWindow.classList.toggle("open");

            if (isOpen && chatInput) {
                chatInput.focus();
            }
        });
    }

    if (chatClose && chatWindow) {
        chatClose.addEventListener("click", function () {
            chatWindow.classList.remove("open");
        });
    }

    if (chatForm && chatInput && chatBody) {
        chatForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const message = chatInput.value.trim();

            if (!message) return;

            const userMessage = document.createElement("div");
            userMessage.className = "chat-message user-message";
            userMessage.textContent = message;

            chatBody.appendChild(userMessage);
            chatInput.value = "";

            const botMessage = document.createElement("div");
            botMessage.className = "chat-message bot-message";
            botMessage.textContent =
                "Thank you for contacting FIA'O. This is a demo chat and is not connected to a live support agent.";

            chatBody.appendChild(botMessage);
            chatBody.scrollTop = chatBody.scrollHeight;
        });
    }

});

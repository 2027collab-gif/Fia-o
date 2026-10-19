
document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. THEME TOGGLE
    // Moon = light mode
    // Outline sun = dark mode
    // ==========================================

    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    function applyTheme(theme) {
        const isDark = theme === "dark";

        document.body.classList.toggle("dark-mode", isDark);

        if (themeIcon) {
            themeIcon.classList.remove(
                "fa-moon",
                "fa-sun",
                "fa-regular",
                "fa-solid"
            );

            // Usar iconos de contorno en ambos estados.
            themeIcon.classList.add("fa-regular");
            themeIcon.classList.add(isDark ? "fa-sun" : "fa-moon");
        }

        if (themeToggleBtn) {
            themeToggleBtn.setAttribute(
                "title",
                isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
            );

            themeToggleBtn.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
        }
    }

    const savedTheme =
        localStorage.getItem("fiao-theme") ||
        localStorage.getItem("theme") ||
        "light";

    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isDark = document.body.classList.contains("dark-mode");
            const newTheme = isDark ? "light" : "dark";

            localStorage.setItem("fiao-theme", newTheme);
            localStorage.setItem("theme", newTheme);

            applyTheme(newTheme);
        });
    }

    // ==========================================
    // 2. TRANSACTION DATA
    // ==========================================

    const transactionsData = {
        1: [
            {
                name: "Maria Gomez",
                desc: "Grocery items & supplies",
                amount: "$45.00",
                date: "2026-07-28",
                status: "On Time",
                statusClass: "status-ontime"
            },
            {
                name: "Carlos Mendoza",
                desc: "Weekly hardware credit",
                amount: "$120.00",
                date: "2026-07-25",
                status: "Pending",
                statusClass: "status-pending"
            },
            {
                name: "Ana Ruiz",
                desc: "Bakery stock order",
                amount: "$85.50",
                date: "2026-07-18",
                status: "Overdue",
                statusClass: "status-overdue"
            }
        ],

        2: [
            {
                name: "Jose Perez",
                desc: "Cleaning supplies",
                amount: "$32.00",
                date: "2026-07-27",
                status: "On Time",
                statusClass: "status-ontime"
            },
            {
                name: "Lucia Fernandez",
                desc: "Dairy products restocking",
                amount: "$64.00",
                date: "2026-07-10",
                status: "On Time",
                statusClass: "status-ontime"
            },
            {
                name: "Roberto Silva",
                desc: "Tools and fasteners",
                amount: "$150.00",
                date: "2026-07-05",
                status: "Overdue",
                statusClass: "status-overdue"
            }
        ],

        3: [
            {
                name: "Carmen Morales",
                desc: "Fresh produce supply",
                amount: "$92.00",
                date: "2026-07-15",
                status: "On Time",
                statusClass: "status-ontime"
            },
            {
                name: "Jorge Ramirez",
                desc: "Electrical hardware",
                amount: "$210.00",
                date: "2026-07-12",
                status: "Pending",
                statusClass: "status-pending"
            }
        ]
    };

    // ==========================================
    // 3. PAGINATION AND TABLE
    // ==========================================

    const tableBody = document.getElementById("table-body");
    const pageBtns = document.querySelectorAll(".page-btn");

    function renderPage(pageNumber) {
        if (!tableBody) return;

        tableBody.innerHTML = "";

        const rows = transactionsData[pageNumber] || [];

        rows.forEach(item => {
            const tr = document.createElement("tr");

            const nameCell = document.createElement("td");
            const nameStrong = document.createElement("strong");
            nameStrong.textContent = item.name;
            nameCell.appendChild(nameStrong);

            const descCell = document.createElement("td");
            descCell.textContent = item.desc;

            const amountCell = document.createElement("td");
            amountCell.className = "amount-cell";
            amountCell.textContent = item.amount;

            const dateCell = document.createElement("td");
            dateCell.textContent = item.date;

            const statusCell = document.createElement("td");
            const statusPill = document.createElement("span");
            statusPill.className = `status-pill ${item.statusClass}`;
            statusPill.textContent = item.status;
            statusCell.appendChild(statusPill);

            tr.append(
                nameCell,
                descCell,
                amountCell,
                dateCell,
                statusCell
            );

            tableBody.appendChild(tr);
        });

        pageBtns.forEach(btn => {
            const btnPage = Number(btn.getAttribute("data-page"));
            btn.classList.toggle("active", btnPage === pageNumber);
        });
    }

    renderPage(1);

    pageBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const pageNumber = Number(btn.getAttribute("data-page"));
            renderPage(pageNumber);
        });
    });

    // ==========================================
    // 4. APPLY FILTERS TOAST
    // ==========================================

    const applyFiltersBtn = document.getElementById("apply-filters-btn");
    const toast = document.getElementById("toast-notification");

    if (applyFiltersBtn && toast) {
        applyFiltersBtn.addEventListener("click", () => {
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);
        });
    }

    // ==========================================
    // 5. EXPORT PDF / PRINT
    // ==========================================

    const exportPdfBtn = document.getElementById("export-pdf-btn");

    if (exportPdfBtn) {
        exportPdfBtn.addEventListener("click", () => {
            window.print();
        });
    }

    // ==========================================
    // 6. EXPORT EXCEL (CSV)
    // ==========================================

    const exportExcelBtn = document.getElementById("export-excel-btn");

    if (exportExcelBtn) {
        exportExcelBtn.addEventListener("click", () => {
            let csvContent =
                "\uFEFFCustomer Name,Description,Amount,Date,Status\r\n";

            Object.values(transactionsData).flat().forEach(item => {
                const values = [
                    item.name,
                    item.desc,
                    item.amount,
                    item.date,
                    item.status
                ];

                const escapedValues = values.map(value =>
                    `"${String(value).replace(/"/g, '""')}"`
                );

                csvContent += escapedValues.join(",") + "\r\n";
            });

            const blob = new Blob(
                [csvContent],
                { type: "text/csv;charset=utf-8;" }
            );

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "FIAO_Reports_Transactions.csv";
            link.style.display = "none";

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(url);
        });
    }
});

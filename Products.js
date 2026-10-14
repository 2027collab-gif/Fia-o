/* =========================================
   INITIAL PRODUCTS
========================================= */

const initialProducts = [

    {
        id: 1,
        name: "Sugar",
        category: "Pantry",
        price: 0.85,
        stock: 25,
        unit: "lb",
        image: "assets/sugar.svg"
    },

    {
        id: 2,
        name: "Rice",
        category: "Pantry",
        price: 0.95,
        stock: 38,
        unit: "lb",
        image: "assets/rice.svg"
    },

    {
        id: 3,
        name: "White Bread",
        category: "Bakery",
        price: 1.50,
        stock: 12,
        unit: "Unit",
        image: "assets/bread.svg"
    },

    {
        id: 4,
        name: "Coca Cola 2L",
        category: "Beverages",
        price: 2.10,
        stock: 20,
        unit: "Bottle",
        image: "assets/coke.svg"
    },

    {
        id: 5,
        name: "Eggs (Dozen)",
        category: "Dairy",
        price: 3.20,
        stock: 15,
        unit: "Pack",
        image: "assets/eggs.svg"
    }

];


/* =========================================
   TRANSLATIONS
========================================= */

const translations = {

    en: {

        navHome: "Home",
        navCredit: "Credit",
        navProducts: "Products",
        navClients: "Clients",
        navReports: "Reports",
        navContact: "Contact",

        inventory: "Inventory",
        registerSale: "Register Fiado Sale",

        inventoryTitle:
            "Your inventory, always exact",

        inventorySubtitle:
            "Showing core products and add option. Use search bar to look up items.",

        searchPlaceholder:
            "Search products, pantry, drinks...",

        stock:
            "Stock:",

        edit:
            "Edit",

        delete:
            "Delete",

        addNewProduct:
            "Add New Product",

        addSubtitle:
            "Create a new item",

        addProduct:
            "Add New Product",

        productName:
            "Product name",

        category:
            "Category",

        price:
            "Price (B/.)",

        unit:
            "Unit",

        cancel:
            "Cancel",

        save:
            "Save product",

        saleTitle:
            "Register Fiado Sale",

        saleText:
            "Select a client and add the products sold on credit.",

        client:
            "Client",

        saleProduct:
            "Product",

        quantity:
            "Quantity",

        register:
            "Register"

    },


    es: {

        navHome:
            "Inicio",

        navCredit:
            "Fiado",

        navProducts:
            "Productos",

        navClients:
            "Clientes",

        navReports:
            "Reportes",

        navContact:
            "Contacto",

        inventory:
            "Inventario",

        registerSale:
            "Registrar venta fiada",

        inventoryTitle:
            "Tu inventario, siempre exacto",

        inventorySubtitle:
            "Productos principales y opción para agregar. Usa la barra de búsqueda para encontrar artículos.",

        searchPlaceholder:
            "Buscar productos, abarrotes, bebidas...",

        stock:
            "Existencias:",

        edit:
            "Editar",

        delete:
            "Eliminar",

        addNewProduct:
            "Agregar nuevo producto",

        addSubtitle:
            "Crea un nuevo artículo",

        addProduct:
            "Agregar nuevo producto",

        productName:
            "Nombre del producto",

        category:
            "Categoría",

        price:
            "Precio (B/.)",

        unit:
            "Unidad",

        cancel:
            "Cancelar",

        save:
            "Guardar producto",

        saleTitle:
            "Registrar venta fiada",

        saleText:
            "Selecciona un cliente y agrega los productos vendidos a crédito.",

        client:
            "Cliente",

        saleProduct:
            "Producto",

        quantity:
            "Cantidad",

        register:
            "Registrar"

    }

};


/* =========================================
   VARIABLES
========================================= */

let products =
    JSON.parse(
        localStorage.getItem("fiaoProducts")
    ) || initialProducts;


let language =
    localStorage.getItem("fiaoLanguage")
    || "es";


let isDark =
    localStorage.getItem("fiaoDark")
    === "true";


/* =========================================
   ELEMENTS
========================================= */

const grid =
    document.getElementById("productGrid");


const searchInput =
    document.getElementById("searchInput");


const modal =
    document.getElementById("productModal");


const form =
    document.getElementById("productForm");


const editingId =
    document.getElementById("editingId");


/* =========================================
   SAVE DATA
========================================= */

function saveState() {

    localStorage.setItem(
        "fiaoProducts",
        JSON.stringify(products)
    );

}


/* =========================================
   TRANSLATION FUNCTION
========================================= */

function t(key) {

    return translations[language][key]
        || key;

}


/* =========================================
   APPLY LANGUAGE
========================================= */

function applyLanguage() {

    document.documentElement.lang =
        language;


    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            if (
                translations[language][key]
            ) {

                element.textContent =
                    translations[language][key];

            }

        });


    document
        .querySelectorAll(
            "[data-i18n-placeholder]"
        )
        .forEach(element => {

            const key =
                element.dataset.i18nPlaceholder;

            element.placeholder =
                t(key);

        });


    document.getElementById(
        "languageLabel"
    ).textContent =
        language === "es"
            ? "EN"
            : "ES";


    renderProducts();

    populateSaleProducts();

}


/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    const filtered =
        products.filter(product => {

            return `${product.name}
                    ${product.category}
                    ${product.unit}`
                .toLowerCase()
                .includes(query);

        });


    grid.innerHTML = "";


    filtered.forEach(product => {

        const card =
            document.createElement("article");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-head">

                <img
                    class="product-image"
                    src="${product.image || "assets/product.svg"}"
                    alt="${escapeHtml(product.name)}"
                >

                <div class="product-info">

                    <span class="category">

                        ${escapeHtml(
                            product.category
                        )}

                    </span>


                    <h2 class="product-name">

                        ${escapeHtml(
                            product.name
                        )}

                    </h2>


                    <p class="product-price">

                        B/. ${Number(
                            product.price
                        ).toFixed(2)}

                    </p>

                </div>

            </div>


            <div class="stock-box">

                <span>

                    ${t("stock")}

                </span>


                <span class="stock-number">

                    ${Number(product.stock)}

                    ${escapeHtml(
                        product.unit
                    )}

                </span>

            </div>


            <div class="card-actions">

                <button
                    type="button"
                    data-action="edit"
                    data-id="${product.id}">

                    ✎ ${t("edit")}

                </button>


                <button
                    type="button"
                    data-action="delete"
                    data-id="${product.id}">

                    ▣ ${t("delete")}

                </button>

            </div>

        `;


        grid.appendChild(card);

    });


    /* ADD PRODUCT CARD */

    const addCard =
        document.createElement("button");


    addCard.type =
        "button";


    addCard.className =
        "add-card";


    addCard.innerHTML = `

        <div class="add-icon">
            +
        </div>


        <div class="add-title">

            ${t("addNewProduct")}

        </div>


        <div class="add-subtitle">

            ${t("addSubtitle")}

        </div>

    `;


    addCard.addEventListener(
        "click",
        () => openModal()
    );


    grid.appendChild(addCard);

}


/* =========================================
   SECURITY
========================================= */

function escapeHtml(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================
   OPEN MODAL
========================================= */

function openModal(product = null) {

    modal.classList.remove(
        "hidden"
    );


    if (product) {

        editingId.value =
            product.id;


        document.getElementById(
            "modalTitle"
        ).textContent =
            t("edit");


        document.getElementById(
            "productName"
        ).value =
            product.name;


        document.getElementById(
            "productCategory"
        ).value =
            product.category;


        document.getElementById(
            "productPrice"
        ).value =
            product.price;


        document.getElementById(
            "productStock"
        ).value =
            product.stock;


        document.getElementById(
            "productUnit"
        ).value =
            product.unit;

    }

    else {

        editingId.value =
            "";


        document.getElementById(
            "modalTitle"
        ).textContent =
            t("addProduct");


        form.reset();


        document.getElementById(
            "productUnit"
        ).value =
            language === "es"
                ? "Unidad"
                : "Unit";

    }


    document.getElementById(
        "productName"
    ).focus();

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    modal.classList.add(
        "hidden"
    );

    form.reset();

    editingId.value =
        "";

}


/* =========================================
   EDIT / DELETE
========================================= */

grid.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button[data-action]"
            );


        if (!button) return;


        const id =
            Number(
                button.dataset.id
            );


        const product =
            products.find(
                p => p.id === id
            );


        if (!product) return;


        /* EDIT */

        if (
            button.dataset.action
            === "edit"
        ) {

            openModal(product);

        }


        /* DELETE */

        if (
            button.dataset.action
            === "delete"
        ) {

            const message =
                language === "es"

                    ? `¿Eliminar "${product.name}" del inventario?`

                    : `Delete "${product.name}" from inventory?`;


            if (
                confirm(message)
            ) {

                products =
                    products.filter(
                        p => p.id !== id
                    );


                saveState();

                renderProducts();

                populateSaleProducts();

                showToast(
                    language === "es"
                        ? "Producto eliminado."
                        : "Product deleted."
                );

            }

        }

    }
);


/* =========================================
   SAVE PRODUCT
========================================= */

form.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "productName"
            ).value.trim();


        const category =
            document.getElementById(
                "productCategory"
            ).value;


        const price =
            Number(
                document.getElementById(
                    "productPrice"
                ).value
            );


        const stock =
            Number(
                document.getElementById(
                    "productStock"
                ).value
            );


        const unit =
            document.getElementById(
                "productUnit"
            ).value.trim();


        if (
            !name ||
            Number.isNaN(price) ||
            Number.isNaN(stock) ||
            !unit
        ) {

            return;

        }


        const existingId =
            Number(
                editingId.value
            );


        /* EDIT EXISTING */

        if (existingId) {

            const index =
                products.findIndex(
                    p =>
                        p.id
                        === existingId
                );


            if (index !== -1) {

                products[index] = {

                    ...products[index],

                    name,
                    category,
                    price,
                    stock,
                    unit

                };

            }

        }


        /* ADD NEW */

        else {

            products.push({

                id:
                    Date.now(),

                name,
                category,
                price,
                stock,
                unit,

                image:
                    "assets/product.svg"

            });

        }


        saveState();

        renderProducts();

        populateSaleProducts();

        closeModal();


        showToast(

            language === "es"

                ? "Inventario actualizado."

                : "Inventory updated."

        );

    }
);


/* =========================================
   SALE PRODUCTS
========================================= */

function populateSaleProducts() {

    const select =
        document.getElementById(
            "saleProduct"
        );


    select.innerHTML =
        products.map(product => `

            <option value="${product.id}">

                ${escapeHtml(
                    product.name
                )}

                —
                B/. ${Number(
                    product.price
                ).toFixed(2)}

            </option>

        `).join("");

}


/* =========================================
   REGISTER FIADO SALE
========================================= */

document
    .getElementById(
        "registerSaleBtn"
    )
    .addEventListener(
        "click",
        () => {

            const product =
                products.find(
                    p =>
                        p.id
                        === Number(
                            document
                                .getElementById(
                                    "saleProduct"
                                )
                                .value
                        )
                );


            const quantity =
                Number(
                    document
                        .getElementById(
                            "saleQuantity"
                        )
                        .value
                );


            const client =
                document
                    .getElementById(
                        "clientName"
                    )
                    .value
                    .trim();


            if (
                !product ||
                quantity < 1 ||
                !client
            ) {

                document
                    .getElementById(
                        "saleMessage"
                    )
                    .textContent =

                    language === "es"

                        ? "Completa cliente, producto y cantidad."

                        : "Complete client, product and quantity.";

                return;

            }


            if (
                quantity >
                product.stock
            ) {

                document
                    .getElementById(
                        "saleMessage"
                    )
                    .textContent =

                    language === "es"

                        ? "No hay suficiente inventario."

                        : "There is not enough inventory.";

                return;

            }


            /* REDUCE STOCK */

            product.stock -=
                quantity;


            saveState();

            renderProducts();

            populateSaleProducts();


            document
                .getElementById(
                    "saleMessage"
                )
                .textContent =

                language === "es"

                    ? `Venta fiada registrada para ${client}. Se descontaron ${quantity} ${product.unit}.`

                    : `Credit sale registered for ${client}. ${quantity} ${product.unit} deducted.`;


            document
                .getElementById(
                    "saleQuantity"
                )
                .value = 1;

        }
    );


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    renderProducts
);


/* =========================================
   DARK MODE
========================================= */

document
    .getElementById(
        "themeBtn"
    )
    .addEventListener(
        "click",
        () => {

            isDark =
                !isDark;


            document.body.classList.toggle(
                "dark",
                isDark
            );


            localStorage.setItem(
                "fiaoDark",
                isDark
            );


            document.getElementById(
                "themeIcon"
            ).textContent =
                isDark
                    ? "☀"
                    : "☾";

        }
    );


/* =========================================
   LANGUAGE
========================================= */

document
    .getElementById(
        "languageBtn"
    )
    .addEventListener(
        "click",
        () => {

            language =
                language === "es"
                    ? "en"
                    : "es";


            localStorage.setItem(
                "fiaoLanguage",
                language
            );


            applyLanguage();

        }
    );


/* =========================================
   MODAL BUTTONS
========================================= */

document
    .getElementById(
        "closeModal"
    )
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById(
        "cancelModal"
    )
    .addEventListener(
        "click",
        closeModal
    );


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


/* =========================================
   INVENTORY TAB
========================================= */

document
    .getElementById(
        "inventoryTab"
    )
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "inventoryTab"
                )
                .classList
                .add("active");


            document
                .getElementById(
                    "saleTab"
                )
                .classList
                .remove("active");


            document
                .getElementById(
                    "inventoryView"
                )
                .classList
                .remove("hidden");


            document
                .getElementById(
                    "saleView"
                )
                .classList
                .add("hidden");

        }
    );


/* =========================================
   SALE TAB
========================================= */

document
    .getElementById(
        "saleTab"
    )
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "saleTab"
                )
                .classList
                .add("active");


            document
                .getElementById(
                    "inventoryTab"
                )
                .classList
                .remove("active");


            document
                .getElementById(
                    "inventoryView"
                )
                .classList
                .add("hidden");


            document
                .getElementById(
                    "saleView"
                )
                .classList
                .remove("hidden");


            populateSaleProducts();

        }
    );


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            () =>
                toast.classList.remove(
                    "show"
                ),
            2200
        );

}


/* =========================================
   INITIALIZATION
========================================= */

document.body.classList.toggle(
    "dark",
    isDark
);


document.getElementById(
    "themeIcon"
).textContent =
    isDark
        ? "☀"
        : "☾";


applyLanguage();
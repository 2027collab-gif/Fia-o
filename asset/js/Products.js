
// Initial Products Data with exact requested image filenames
let products = [
  {
    id: 1,
    name: "Sugar",
    category: "Pantry",
    unit: "Pound (lb)",
    price: 0.85,
    stock: 25,
    unitAbbr: "lb",
    image: "./asset/img/Azucar.png"
  },
  {
    id: 2,
    name: "Rice",
    category: "Pantry",
    unit: "Pound (lb)",
    price: 0.95,
    stock: 38,
    unitAbbr: "lb",
    image: "./asset/img/Arroz.png"
  },
  {
    id: 3,
    name: "White Bread",
    category: "Bakery",
    unit: "Unit",
    price: 1.50,
    stock: 12,
    unitAbbr: "Unit",
    image: "./asset/img/Pan.png"
  },
  {
    id: 4,
    name: "Coca Cola 2L",
    category: "Beverages",
    unit: "Bottle",
    price: 2.10,
    stock: 20,
    unitAbbr: "Bottle",
    image: "./asset/img/Cocacola.png"
  },
  {
    id: 5,
    name: "Eggs (Dozen)",
    category: "Dairy",
    unit: "Pack",
    price: 3.20,
    stock: 15,
    unitAbbr: "Pack",
    image: "./asset/img/Huevos.png"
  }
];

let editingProductId = null;

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. THEME TOGGLE
  // Synchronize theme with other FIA'O pages
  // ==========================================

  const themeToggleBtn = document.getElementById('theme-toggle');

  if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector('i');

    function applyTheme(theme) {
      const isDark = theme === 'dark';

      document.body.classList.toggle('dark-mode', isDark);

      if (icon) {
        icon.classList.remove(
          'fa-moon',
          'fa-sun',
          'fa-regular',
          'fa-solid'
        );

        icon.classList.add('fa-regular');
        icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
      }

      themeToggleBtn.setAttribute(
        'title',
        isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );

      themeToggleBtn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }

    const savedTheme =
      localStorage.getItem('fiao-theme') ||
      localStorage.getItem('theme') ||
      'light';

    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      const newTheme = isDark ? 'light' : 'dark';

      localStorage.setItem('fiao-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      applyTheme(newTheme);
    });
  }

  // ==========================================
  // 2. INITIAL RENDER
  // ==========================================

  renderProducts();
  populateFiadoProductSelect();

  // Set default date for fiado form
  const fiadoDateInput = document.getElementById('fiado-date');

  if (fiadoDateInput) {
    fiadoDateInput.valueAsDate = new Date();
  }

  // ==========================================
  // 3. TAB SWITCHING
  // ==========================================

  const tabBtns = document.querySelectorAll('.tab-btn');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      tabBtns.forEach(b => b.classList.remove('active'));

      document.querySelectorAll('.tab-content').forEach(c => {
        c.classList.remove('active');
      });

      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');

      document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
  });

  // ==========================================
  // 4. MODAL HANDLERS
  // ==========================================

  const modal = document.getElementById('product-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const uploadBox = document.getElementById('upload-box');
  const fileInput = document.getElementById('product-file-input');

  uploadBox.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {

    if (e.target.files && e.target.files[0]) {
      document.getElementById('upload-label').textContent =
        e.target.files[0].name;
    }

  });

  const closeModal = () => {

    modal.classList.remove('active');

    document.getElementById('product-form').reset();

    document.getElementById('upload-label').textContent =
      "Click to upload photo from files";

    editingProductId = null;
  };

  closeModalBtn.addEventListener('click', closeModal);
  cancelModalBtn.addEventListener('click', closeModal);

  // ==========================================
  // 5. SEARCH FILTER
  // ==========================================

  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', (e) => {

    const term = e.target.value.toLowerCase();

    renderProducts(term);
  });

  // ==========================================
  // 6. PRODUCT FORM SUBMIT (ADD / EDIT)
  // ==========================================

  const productForm = document.getElementById('product-form');

  productForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const unit = document.getElementById('product-unit').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const imageUrl = document.getElementById('product-image-url').value;

    let image = imageUrl || "./asset/img/Pan.png";

    if (editingProductId) {

      // Edit existing product
      const prod = products.find(p => p.id === editingProductId);

      if (prod) {
        prod.name = name;
        prod.category = category;
        prod.unit = unit;
        prod.price = price;
        prod.stock = stock;

        if (imageUrl) {
          prod.image = imageUrl;
        }
      }

    } else {

      // Add new product
      const newProd = {
        id: Date.now(),
        name,
        category,
        unit,
        price,
        stock,
        unitAbbr: unit.split(' ')[0],
        image
      };

      products.push(newProd);
    }

    renderProducts();
    populateFiadoProductSelect();
    closeModal();

  });

  // ==========================================
  // 7. FIADO TOTAL CALCULATION
  // ==========================================

  const fiadoProductSelect = document.getElementById('fiado-product');
  const fiadoQuantityInput = document.getElementById('fiado-quantity');
  const fiadoTotalDisplay = document.getElementById('fiado-total-display');

  function updateFiadoTotal() {

    const selectedProdId = parseInt(fiadoProductSelect.value);
    const qty = parseInt(fiadoQuantityInput.value) || 0;

    const prod = products.find(p => p.id === selectedProdId);

    if (prod) {

      const total = prod.price * qty;

      fiadoTotalDisplay.textContent = `B/. ${total.toFixed(2)}`;
    }
  }

  fiadoProductSelect.addEventListener('change', updateFiadoTotal);

  fiadoQuantityInput.addEventListener('input', updateFiadoTotal);

  // ==========================================
  // 8. REGISTER FIADO SALE
  // ==========================================

  const fiadoForm = document.getElementById('fiado-sale-form');

  fiadoForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const client = document.getElementById('fiado-client').value;

    const selectedProdId = parseInt(fiadoProductSelect.value);
    const qty = parseInt(fiadoQuantityInput.value);

    const prod = products.find(p => p.id === selectedProdId);

    if (prod) {

      const total = prod.price * qty;

      const recentList = document.getElementById('recent-sales-list');

      const newItem = document.createElement('div');

      newItem.className = 'recent-sale-item';

      newItem.innerHTML = `
        <span><strong>${client}</strong> - ${prod.name} (x${qty})</span>

        <div class="sale-actions">
          <span class="sale-price">B/. ${total.toFixed(2)}</span>

          <button class="delete-sale-btn" title="Delete Sale">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;

      newItem.querySelector('.delete-sale-btn').addEventListener('click', () => {
        newItem.remove();
      });

      recentList.prepend(newItem);

      alert(`Fiado sale registered for ${client}!`);
    }

  });

});

// ==========================================
// 9. RENDER PRODUCTS TO GRID
// ==========================================

function renderProducts(searchTerm = '') {

  const grid = document.getElementById('products-grid');

  grid.innerHTML = '';

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm)
  );

  filtered.forEach(p => {

    const card = document.createElement('div');

    card.className = 'product-card';

    card.innerHTML = `
      <div>

        <div class="product-card-top">

          <div class="product-img-box">
            <img src="${p.image}" alt="${p.name}">
          </div>

          <div class="product-info-details">

            <span class="category-badge">${p.category}</span>

            <h3 class="product-title">${p.name}</h3>

            <span class="product-price-tag">
              B/. ${p.price.toFixed(2)}
            </span>

          </div>

        </div>

        <div class="stock-box">
          <span>Stock:</span>
          <span>${p.stock} ${p.unitAbbr || 'Unit'}</span>
        </div>

      </div>

      <div class="card-actions-row">

        <button class="btn-card-action edit-btn"
          onclick="openEditModal(${p.id})">

          <i class="fa-solid fa-pencil"></i> Edit

        </button>

        <button class="btn-card-action delete-btn"
          onclick="deleteProduct(${p.id})">

          <i class="fa-solid fa-trash"></i> Delete

        </button>

      </div>
    `;

    grid.appendChild(card);

  });

  // Always append Add New Product Card
  const addCard = document.createElement('div');

  addCard.className = 'add-product-card';

  addCard.onclick = openAddModal;

  addCard.innerHTML = `
    <i class="fa-solid fa-plus add-icon-plus"></i>

    <h3 class="add-text-title">Add New Product</h3>

    <p class="add-text-sub">Create a new item</p>
  `;

  grid.appendChild(addCard);
}

// ==========================================
// 10. OPEN ADD MODAL
// ==========================================

function openAddModal() {

  editingProductId = null;

  document.getElementById('modal-title-text').textContent =
    "Add New Product";

  document.getElementById('product-form').reset();

  document.getElementById('product-modal').classList.add('active');
}

// ==========================================
// 11. OPEN EDIT MODAL
// ==========================================

function openEditModal(id) {

  const prod = products.find(p => p.id === id);

  if (!prod) return;

  editingProductId = id;

  document.getElementById('modal-title-text').textContent =
    "Edit Product";

  document.getElementById('product-name').value = prod.name;
  document.getElementById('product-category').value = prod.category;
  document.getElementById('product-unit').value = prod.unit;
  document.getElementById('product-price').value = prod.price;
  document.getElementById('product-stock').value = prod.stock;
  document.getElementById('product-image-url').value = prod.image;

  document.getElementById('product-modal').classList.add('active');
}

// ==========================================
// 12. DELETE PRODUCT
// ==========================================

function deleteProduct(id) {

  if (confirm("Are you sure you want to delete this product?")) {

    products = products.filter(p => p.id !== id);

    renderProducts();

    populateFiadoProductSelect();
  }
}

// ==========================================
// 13. POPULATE PRODUCT SELECT IN FIADO TAB
// ==========================================

function populateFiadoProductSelect() {

  const select = document.getElementById('fiado-product');

  if (!select) return;

  select.innerHTML = '';

  products.forEach(p => {

    const opt = document.createElement('option');

    opt.value = p.id;

    opt.textContent = `${p.name} (B/. ${p.price.toFixed(2)})`;

    select.appendChild(opt);
  });

  // Trigger change to update total
  select.dispatchEvent(new Event('change'));
}

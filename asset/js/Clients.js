// Sample Client Dataset
const clientsData = [
  {
    id: 1,
    name: "Ramón Batista",
    initials: "RB",
    phone: "6123-4567",
    purchases: 14,
    debt: 35.00,
    status: "Pending"
  },
  {
    id: 2,
    name: "Yolanda Pérez",
    initials: "YP",
    phone: "6234-8890",
    purchases: 22,
    debt: 0.00,
    status: "On Time"
  },
  {
    id: 3,
    name: "Carlos Ruiz",
    initials: "CR",
    phone: "6301-2245",
    purchases: 9,
    debt: 62.50,
    status: "Overdue"
  },
  {
    id: 4,
    name: "Mireya Santos",
    initials: "MS",
    phone: "6415-7783",
    purchases: 31,
    debt: 12.00,
    status: "Pending"
  }
];

let currentFilter = "all";
let currentSearchTerm = "";

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Functionality
  const themeToggleBtn = document.getElementById('theme-toggle');
  const subThemeToggleBtn = document.getElementById('sub-theme-toggle');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    [themeToggleBtn, subThemeToggleBtn].forEach(btn => {
      if (btn) {
        const icon = btn.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-moon', !isDark);
          icon.classList.toggle('fa-sun', isDark);
        }
      }
    });
  }

  const savedTheme = localStorage.getItem('fiao-theme') || 'light';
  applyTheme(savedTheme);

  const toggleHandler = () => {
    const isDark = document.body.classList.contains('dark-mode');
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('fiao-theme', newTheme);
    applyTheme(newTheme);
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleHandler);
  if (subThemeToggleBtn) subThemeToggleBtn.addEventListener('click', toggleHandler);

  // Initial Render
  renderClients();

  // Search Input Event
  const searchInput = document.getElementById('client-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.toLowerCase();
      renderClients();
    });
  }

  // Filter Pills Events
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      renderClients();
    });
  });

  // WhatsApp Send Button Click
  const sendBtn = document.getElementById('send-whatsapp-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      alert("WhatsApp reminder notification sent successfully!");
    });
  }
});

// Render Table Function
function renderClients() {
  const tbody = document.getElementById('clients-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  const filtered = clientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(currentSearchTerm) || client.phone.includes(currentSearchTerm);
    const matchesFilter = currentFilter === 'all' || client.status === currentFilter;
    return matchesSearch && matchesFilter;
  });

  filtered.forEach(client => {
    const tr = document.createElement('tr');

    const formattedDebt = client.debt > 0 ? `B/. ${client.debt.toFixed(2)}` : '-';
    let statusClass = 'pending';
    let statusLabel = 'Pending';

    if (client.status === 'On Time') {
      statusClass = 'ontime';
      statusLabel = 'On Time';
    } else if (client.status === 'Overdue') {
      statusClass = 'overdue';
      statusLabel = 'Overdue';
    }

    tr.innerHTML = `
      <td>
        <div class="client-profile-cell">
          <div class="avatar-circle">${client.initials}</div>
          <div class="client-name-box">
            <h4>${client.name}</h4>
            <p>${client.phone}</p>
          </div>
        </div>
      </td>
      <td><span class="purchases-text">${client.purchases} purchases</span></td>
      <td><span class="debt-amount">${formattedDebt}</span></td>
      <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
      <td><a href="#" class="action-link" onclick="selectClientForReminder('${client.name}', ${client.debt})">View detail &rarr;</a></td>
    `;

    tbody.appendChild(tr);
  });
}

// Select Client to Update WhatsApp Box
function selectClientForReminder(name, debt) {
  const targetName = document.getElementById('reminder-target-name');
  const msgPreview = document.getElementById('whatsapp-message-preview');

  if (targetName && msgPreview) {
    targetName.textContent = name;
    if (debt > 0) {
      msgPreview.innerHTML = `WhatsApp to <strong>${name}</strong>: "Hello ${name.split(' ')[0]}, you have B/. ${debt.toFixed(2)} pending in Minisúper Doña Chela. See you soon!"`;
    } else {
      msgPreview.innerHTML = `WhatsApp to <strong>${name}</strong>: "Hello ${name.split(' ')[0]}, your account is up to date! Thank you for buying at Minisúper Doña Chela."`;
    }
  }
}
// App State variables
let staticProductList = []; // Filled dynamically from products.json
let filteredProducts = [];
let cart = {};
let currentCategory = "All";
let searchQuery = "";
let currentPage = 1;
const itemsPerPage = 12;

// WhatsApp Number Config
const WHATSAPP_NUMBER = "+917018629671";

// Global Startup Initializer
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("product.json");
    staticProductList = await response.json();
    generateDynamicTabs();
    applyFilters();
    lucide.createIcons();
  } catch (error) {
    console.error("Error loading product:", error);
  }
});

// Auto-build filter buttons from the exact JSON categories
function generateDynamicTabs() {
  const tabContainer = document.getElementById("categoryTabs");
  const uniquelyFoundCategories = [
    "All",
    ...new Set(staticProductList.map((p) => p.category)),
  ];

  tabContainer.innerHTML = uniquelyFoundCategories
    .map((cat) => {
      const isAll = cat === "All";
      const label = isAll
        ? "All Products"
        : cat.charAt(0).toUpperCase() + cat.slice(1);

      const styleClass = isAll
        ? "px-6 py-2.5 text-xs font-bold tracking-wider uppercase rounded-md border border-indigo-600 bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-500 shadow-md active:scale-95"
        : "px-6 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-md border border-gray-200 bg-white text-gray-600 hover:text-indigo-600 hover:border-indigo-600 hover:bg-gray-50 transition-all duration-300 active:scale-95";

      return `<button onclick="filterCategory('${cat}')" id="tab-${cat}" class="${styleClass}">${label}</button>`;
    })
    .join("");
}

// Filtering pipeline
function applyFilters() {
  filteredProducts = staticProductList.filter((p) => {
    const matchesCat =
      currentCategory === "All" || p.category === currentCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });
  currentPage = 1;
  renderGrid();
}

function filterCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll("#categoryTabs button").forEach((btn) => {
    btn.className =
      "px-6 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-md border border-gray-200 bg-white text-gray-600 hover:text-indigo-600 hover:border-indigo-600 hover:bg-gray-50 transition-all duration-300 active:scale-95";
  });
  const activeBtn = document.getElementById(`tab-${cat}`);
  if (activeBtn) {
    activeBtn.className =
      "px-6 py-2.5 text-xs font-bold tracking-wider uppercase rounded-md border border-indigo-600 bg-indigo-600 text-white transition-all duration-300 shadow-md active:scale-95";
  }
  applyFilters();
}

// Interlinked Search Inputs
function handleSearch() {
  searchQuery = document.getElementById("searchInput").value;
  document.getElementById("searchInputMobile").value = searchQuery; // sync values
  applyFilters();
}

function handleMobileSearch() {
  searchQuery = document.getElementById("searchInputMobile").value;
  document.getElementById("searchInput").value = searchQuery; // sync values
  applyFilters();
}

// Grid layout runtime
function renderGrid() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  document.getElementById("totalPagesNum").innerText = totalPages;
  document.getElementById("currentPageNum").innerText = currentPage;

  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredProducts.slice(start, end);

  if (pageItems.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400 text-sm tracking-wide">No items found matching your search.</div>`;
    return;
  }

  pageItems.forEach((item) => {
    const itemQty = cart[item.id] || 0;
    const card = document.createElement("div");

    card.className =
      "product-card bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 rounded-xl overflow-hidden flex flex-col group transition-all duration-300";
    card.innerHTML = `
            <div class="relative overflow-hidden aspect-square bg-gray-50 flex items-center justify-center p-4">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=400'" class="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out">
                <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full px-3 py-0.5 text-[10px] tracking-wider text-gray-500 font-bold uppercase transition-colors duration-300 group-hover:border-indigo-200 group-hover:text-indigo-600">${item.category}</div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <h3 class="text-sm font-medium text-gray-800 tracking-wide line-clamp-2 min-h-[2.5rem] transition-colors duration-300 group-hover:text-indigo-600">${item.name}</h3>
                    <p class="text-gray-900 font-bold mt-2 text-base">₹${item.price.toLocaleString("en-IN")}</p>
                </div>
                <div class="pt-2">
                    ${
                      itemQty === 0
                        ? `
                        <button onclick="updateQty('${item.id}', 1)" class="w-full text-center border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white py-2 rounded-lg text-xs font-bold tracking-wider transition-all duration-300 uppercase active:scale-[0.97] shadow-sm">
                            Add to Cart
                        </button>
                    `
                        : `
                        <div class="flex items-center justify-between border border-indigo-600 bg-indigo-50 rounded-lg overflow-hidden transition-all duration-300">
                            <button onclick="updateQty('${item.id}', -1)" class="px-4 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-200"><i data-lucide="minus" class="w-3.5 h-3.5"></i></button>
                            <span class="text-sm font-bold text-indigo-900 select-none">${itemQty}</span>
                            <button onclick="updateQty('${item.id}', 1)" class="px-4 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-200"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button>
                        </div>
                    `
                    }
                </div>
            </div>
        `;
    grid.appendChild(card);
  });
  lucide.createIcons();
}

function changePage(direction) {
  currentPage += direction;
  renderGrid();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateQty(id, change) {
  const current = cart[id] || 0;
  const next = current + change;
  if (next <= 0) {
    delete cart[id];
  } else {
    cart[id] = next;
  }
  syncCart();
  renderGrid();
}

function syncCart() {
  let totalCount = 0;
  let subtotal = 0;
  const container = document.getElementById("cartItemsContainer");
  container.innerHTML = "";

  Object.keys(cart).forEach((id) => {
    const item = staticProductList.find((p) => p.id == id);
    if (!item) return;
    const qty = cart[id];
    totalCount += qty;
    subtotal += item.price * qty;

    const row = document.createElement("div");
    row.className =
      "flex items-center space-x-4 p-3 bg-gray-50 border border-gray-100 rounded-lg justify-between hover:border-gray-200 transition-colors duration-200";
    row.innerHTML = `
            <div class="flex items-center space-x-3 flex-1 min-w-0">
                <img src="${item.image}" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100'" class="w-12 h-12 object-contain bg-white p-1 border border-gray-100 rounded-md">
                <div class="truncate">
                    <h4 class="text-xs text-gray-800 font-medium truncate">${item.name}</h4>
                    <p class="text-xs text-indigo-600 font-semibold">₹${item.price.toLocaleString("en-IN")} x ${qty}</p>
                </div>
            </div>
            <div class="flex items-center border border-gray-200 bg-white rounded-md overflow-hidden">
                <button onclick="updateQty('${item.id}', -1)" class="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"><i data-lucide="minus" class="w-3 h-3"></i></button>
                <span class="text-xs font-bold text-gray-800 px-1 select-none">${qty}</span>
                <button onclick="updateQty('${item.id}', 1)" class="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"><i data-lucide="plus" class="w-3 h-3"></i></button>
            </div>
        `;
    container.appendChild(row);
  });

  if (totalCount === 0) {
    container.innerHTML = `<div class="text-center py-16 text-gray-400 text-xs uppercase tracking-wider font-medium">Your shopping cart is currently empty.</div>`;
  }

  document.getElementById("cartCountBadge").innerText = totalCount;
  document.getElementById("subtotalVal").innerText = `₹${subtotal.toLocaleString("en-IN")}`;
  document.getElementById("totalVal").innerText = `₹${subtotal.toLocaleString("en-IN")}`;
  lucide.createIcons();
}

function toggleCart(open) {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  const panel = document.getElementById("cartPanel");

  if (open) {
    drawer.classList.remove("hidden");
    setTimeout(() => {
      backdrop.classList.replace("opacity-0", "opacity-100");
      panel.classList.replace("translate-x-full", "translate-x-0");
    }, 10);
  } else {
    backdrop.classList.replace("opacity-100", "opacity-0");
    panel.classList.replace("translate-x-0", "translate-x-full");
    setTimeout(() => drawer.classList.add("hidden"), 300);
  }
}

function processOrder() {
  const items = Object.keys(cart);
  if (items.length === 0) {
    alert("Your cart is empty. Please add items to place an order.");
    return;
  }

  const address = document.getElementById("deliveryAddress").value.trim();
  const payment = document.getElementById("paymentMethod").value;
  if (!address) {
    alert("Please enter a valid delivery address.");
    return;
  }

  let text = `🛒 *NEW GROCERY ORDER - INSTAGROCERY*\n`;
  text += `------------------------------------\n`;
  text += `*PRODUCT BASKET MANIFEST*\n\n`;

  let subtotal = 0;
  items.forEach((id, index) => {
    const item = staticProductList.find((p) => p.id == id);
    const qty = cart[id];
    const rowTotal = item.price * qty;
    subtotal += rowTotal;
    text += `${index + 1}. ${item.name}\n`;
    text += `   _Quantity:_ ${qty} x ₹${item.price.toLocaleString("en-IN")} = *₹${rowTotal.toLocaleString("en-IN")}*\n\n`;
  });

  text += `------------------------------------\n`;
  text += `*Items Subtotal:* ₹${subtotal.toLocaleString("en-IN")}\n`;
  text += `*Delivery Charges:* Free Delivery\n`;
  text += `*Final Payable Amount:* *₹${subtotal.toLocaleString("en-IN")}*\n\n`;
  text += `*Delivery Address:* ${address}\n`;
  text += `*Payment Preference:* ${payment}\n\n`;
  text += `_Please pack the items and dispatch them quickly._`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
}
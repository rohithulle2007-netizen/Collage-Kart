/* ========================================================
   Campus Reuse Hub - JavaScript Logic
   Features:
   - Real product images with fallback support
   - INR (₹) prices for campus essentials
   - LocalStorage persistence for user listings
   - Search by name or category
   - Category filtering
   - Sell an item form with instant update
   - Product details modal with seller contact
   ======================================================== */

// Default high-quality category images
const CATEGORY_DEFAULT_IMAGES = {
  "Books": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
  "Calculators": "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80",
  "Stationery": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80",
  "Electronics": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80",
  "Hostel Items": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&auto=format&fit=crop&q=80"
};

// Offline SVG backup fallback
const OFFLINE_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e8f5e9'/><text x='50' y='55' font-family='sans-serif' font-size='12' fill='%232e7d32' text-anchor='middle'>CAMPUS ITEM</text></svg>";

// Initial Sample Products with Real Product Photos
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Engineering Mathematics - B.S. Grewal (44th Ed)",
    category: "Books",
    price: 450,
    condition: "Good",
    description: "Standard engineering mathematics reference book. Clean pages with minimal pencil notes. Extremely helpful for Semester 1 and 2 exams.",
    contact: "WhatsApp: 9876543210 (Hostel Block A, Room 104)",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Casio FX-991EX ClassWiz Scientific Calculator",
    category: "Calculators",
    price: 750,
    condition: "Like New",
    description: "552 functions, high-resolution natural textbook display. Barely used for 1 semester. Includes original slide-on hard case and solar battery.",
    contact: "Phone: 9812345678 (Mechanical Dept, 3rd Year)",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Engineering Mini Drafter & Drawing Board Set",
    category: "Stationery",
    price: 350,
    condition: "Good",
    description: "Omega steel mini-drafter with tight clamping screw, plastic scale, and wooden drawing board for Engineering Graphics lab work.",
    contact: "WhatsApp: 9845012345 (Hostel Block C, Room 302)",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Pigeon 1.5 Litre Electric Kettle (Stainless Steel)",
    category: "Hostel Items",
    price: 420,
    condition: "Good",
    description: "Quick boiling 1500W stainless steel kettle. Perfect for late-night hostel tea, boiling water, and instant noodles. 100% working condition.",
    contact: "Call: 9765432109 (Girls Hostel 2, Room 215)",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Rechargeable LED Desk Study Lamp",
    category: "Electronics",
    price: 280,
    condition: "Like New",
    description: "Touch control with 3 brightness modes, 360-degree flexible neck, and built-in lithium battery with micro-USB charging cable.",
    contact: "WhatsApp: 9123456780 (Hostel Block B, Room 210)",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "4-Socket Spike Guard & Extension Board (3 Metre)",
    category: "Electronics",
    price: 200,
    condition: "Good",
    description: "Anchor surge protector strip with 4 universal sockets and individual switch/indicator light. Long 3-meter cord for hostel room plugs.",
    contact: "Call: 9988776655 (Hostel Block D, Room 408)",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    name: "Concepts of Physics (Vol 1 & 2) - H.C. Verma",
    category: "Books",
    price: 390,
    condition: "Fair",
    description: "Complete pair of H.C. Verma Physics textbooks. Covers mechanics, waves, thermodynamics, and optics. All pages intact.",
    contact: "Phone: 9871122334 (Day Scholar - Meets at Canteen)",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    name: "Foldable Cloth Drying Rack for Hostel",
    category: "Hostel Items",
    price: 360,
    condition: "Good",
    description: "Rust-resistant steel drying rack that easily holds a full bucket of washed clothes. Folds flat to store behind doors or under bed.",
    contact: "WhatsApp: 9822334455 (Hostel Block B, Room 118)",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&auto=format&fit=crop&q=80"
  }
];

// Current State
let products = [];
let selectedCategory = "All";
let searchQuery = "";
let currentModalProduct = null;

// ========================================================
// Storage & Initialization
// ========================================================
function loadProductsFromStorage() {
  const currentVersion = "v2.1";
  const savedVersion = localStorage.getItem("campus_reuse_version");
  const savedData = localStorage.getItem("campus_reuse_items");

  if (savedData && savedVersion === currentVersion) {
    try {
      products = JSON.parse(savedData);
    } catch (e) {
      console.error("Failed to parse saved items from localStorage", e);
      products = [...INITIAL_PRODUCTS];
      saveProductsToStorage();
    }
  } else {
    // Initialize or upgrade with fresh product photos
    products = [...INITIAL_PRODUCTS];
    localStorage.setItem("campus_reuse_version", currentVersion);
    saveProductsToStorage();
  }
}

function saveProductsToStorage() {
  localStorage.setItem("campus_reuse_items", JSON.stringify(products));
}

// ========================================================
// Section Navigation
// ========================================================
function showSection(sectionName) {
  // Hide all sections
  document.getElementById("home-section").style.display = "none";
  document.getElementById("sell-section").style.display = "none";

  // Update navigation link highlights
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => link.classList.remove("active"));

  if (sectionName === "home") {
    document.getElementById("home-section").style.display = "block";
    if (navLinks[0]) navLinks[0].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (sectionName === "browse") {
    document.getElementById("home-section").style.display = "block";
    if (navLinks[1]) navLinks[1].classList.add("active");
    // Scroll directly to the items grid
    const itemsHeader = document.querySelector(".items-header");
    if (itemsHeader) {
      itemsHeader.scrollIntoView({ behavior: "smooth" });
    }
  } else if (sectionName === "sell") {
    document.getElementById("sell-section").style.display = "block";
    if (navLinks[2]) navLinks[2].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// ========================================================
// Render Product Cards
// ========================================================
function renderProducts() {
  const grid = document.getElementById("productGrid");
  const countDisplay = document.getElementById("itemsCount");

  // Filter products based on selected category and search input
  const filtered = products.filter(item => {
    const matchesCategory = (selectedCategory === "All") || (item.category === selectedCategory);
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !searchLower || 
      item.name.toLowerCase().includes(searchLower) || 
      item.category.toLowerCase().includes(searchLower) ||
      (item.description && item.description.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  // Update count text
  if (selectedCategory === "All" && !searchQuery) {
    countDisplay.textContent = `Showing all ${filtered.length} items`;
  } else {
    countDisplay.textContent = `Showing ${filtered.length} item(s) found`;
  }

  // Clear existing items in grid
  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-items-msg">
        <h3>No matching items found</h3>
        <p>Try searching for a different keyword or category.</p>
        <button class="btn-green" style="margin-top: 14px;" onclick="resetSearch()">View All Items</button>
      </div>
    `;
    return;
  }

  // Render each item
  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Use product image or fallback
    const imgSrc = item.image || CATEGORY_DEFAULT_IMAGES[item.category] || CATEGORY_DEFAULT_IMAGES["Books"];

    card.innerHTML = `
      <div class="card-img-container">
        <img src="${imgSrc}" alt="${escapeHtml(item.name)}" class="card-img" loading="lazy" onerror="this.onerror=null; this.src='${OFFLINE_FALLBACK}';">
      </div>
      <div class="card-body">
        <div class="card-badges-row">
          <span class="badge">${escapeHtml(item.category)}</span>
          <span class="card-condition-pill">${escapeHtml(item.condition)}</span>
        </div>
        <h3 class="card-title" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</h3>
        <div class="card-price">₹${item.price}</div>
      </div>
      <div class="card-footer">
        <button class="btn-green" onclick="openModal(${item.id})">View Details</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Utility to prevent XSS injection in user-entered listings
function escapeHtml(string) {
  if (!string) return "";
  return String(string)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ========================================================
// Search & Filter Handlers
// ========================================================
function handleSearch() {
  const input = document.getElementById("searchInput");
  searchQuery = input.value;
  renderProducts();

  // Make sure home/browse section is visible
  if (document.getElementById("home-section").style.display === "none") {
    showSection("home");
  }
}

// Trigger search when pressing Enter in input box
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  if (input) {
    input.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    });
  }
});

function resetSearch() {
  searchQuery = "";
  selectedCategory = "All";
  
  const input = document.getElementById("searchInput");
  if (input) input.value = "";

  // Reset category buttons visual state
  const catButtons = document.querySelectorAll(".cat-btn");
  catButtons.forEach(btn => {
    if (btn.textContent.includes("All")) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderProducts();
}

function filterByCategory(categoryName) {
  selectedCategory = categoryName;

  // Update active state on category buttons
  const catButtons = document.querySelectorAll(".cat-btn");
  catButtons.forEach(btn => {
    if (btn.textContent.includes(categoryName)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderProducts();

  // Ensure home/browse view is visible
  if (document.getElementById("home-section").style.display === "none") {
    showSection("home");
  }
}

// ========================================================
// Sell an Item Form Handler
// ========================================================
function handleSellSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById("itemName").value.trim();
  const categoryInput = document.getElementById("itemCategory").value;
  const priceInput = parseInt(document.getElementById("itemPrice").value, 10);
  const conditionInput = document.getElementById("itemCondition").value;
  const contactInput = document.getElementById("sellerContact").value.trim();
  const customImgInput = document.getElementById("itemImageUrl") ? document.getElementById("itemImageUrl").value.trim() : "";
  const descInput = document.getElementById("itemDescription").value.trim();

  if (!nameInput || !categoryInput || isNaN(priceInput) || !conditionInput || !contactInput || !descInput) {
    alert("Please fill in all the required fields.");
    return;
  }

  // Determine image: use provided URL, or pick category default
  const productImage = customImgInput || CATEGORY_DEFAULT_IMAGES[categoryInput] || CATEGORY_DEFAULT_IMAGES["Books"];

  // Create new product object
  const newItem = {
    id: Date.now(), // Unique ID based on timestamp
    name: nameInput,
    category: categoryInput,
    price: priceInput,
    condition: conditionInput,
    contact: contactInput,
    description: descInput,
    image: productImage
  };

  // Add to top of products list
  products.unshift(newItem);

  // Save to browser's Local Storage
  saveProductsToStorage();

  // Reset form inputs
  document.getElementById("sellForm").reset();

  // Show success notification message
  const successNotice = document.getElementById("formSuccessNotice");
  successNotice.style.display = "block";

  // Re-render product grid
  renderProducts();

  // After 1.8 seconds, navigate back to browse view so student sees their listing
  setTimeout(() => {
    successNotice.style.display = "none";
    showSection("browse");
  }, 1800);
}

function resetSellForm() {
  document.getElementById("sellForm").reset();
  document.getElementById("formSuccessNotice").style.display = "none";
}

// ========================================================
// Modal (Product Details)
// ========================================================
function openModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentModalProduct = product;

  const imgSrc = product.image || CATEGORY_DEFAULT_IMAGES[product.category] || CATEGORY_DEFAULT_IMAGES["Books"];
  const modalImg = document.getElementById("modalImg");
  modalImg.src = imgSrc;
  modalImg.onerror = function() {
    this.onerror = null;
    this.src = OFFLINE_FALLBACK;
  };

  document.getElementById("modalCategory").textContent = product.category;
  const conditionBadge = document.getElementById("modalConditionBadge");
  if (conditionBadge) {
    conditionBadge.textContent = product.condition;
  }

  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalPrice").textContent = `₹${product.price}`;
  document.getElementById("modalCondition").textContent = product.condition;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalContact").textContent = product.contact;

  document.getElementById("contactCopiedNotice").style.display = "none";
  document.getElementById("detailsModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("detailsModal").style.display = "none";
  currentModalProduct = null;
}

// Close modal when user clicks outside the modal card
window.addEventListener("click", (event) => {
  const modal = document.getElementById("detailsModal");
  if (event.target === modal) {
    closeModal();
  }
});

// Close modal when Esc key is pressed
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

function handleContactClick() {
  if (!currentModalProduct) return;

  const contactText = currentModalProduct.contact;

  // Try copying to clipboard
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(contactText).then(() => {
      const notice = document.getElementById("contactCopiedNotice");
      notice.style.display = "block";
      setTimeout(() => {
        notice.style.display = "none";
      }, 3500);
    }).catch(() => {
      alert(`Seller contact details:\n\n${contactText}`);
    });
  } else {
    alert(`Seller contact details:\n\n${contactText}`);
  }
}

// ========================================================
// Initial Run on Page Load
// ========================================================
window.addEventListener("DOMContentLoaded", () => {
  loadProductsFromStorage();
  renderProducts();

  // Handle URL hash navigation if user refreshes on #sell or #browse
  const hash = window.location.hash.replace("#", "");
  if (hash === "sell" || hash === "browse" || hash === "home") {
    showSection(hash);
  } else {
    showSection("home");
  }
});

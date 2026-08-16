/**
 * ROYALBITE — FINE DINE RESTAURANT
 * Elite Application Logic & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) window.lucide.createIcons();

  // 2. Initialize Core Subsystems
  initScrollNavigation();
  renderMenuItems('featured');  // Default: show only 4 featured dishes
  initMenuFilters();
  initGalleryFilters();
  initReservationForm();
  initContactForm();
  initMobileMenu();
  initHeaderScroll();
  initScrollReveal();
  initZoneSelector();
  initFloatingConcierge();
});

// ==========================================================================
// 1. SCROLLSPY & NAVIGATION
// ==========================================================================
function initScrollNavigation() {
  const navLinks = document.querySelectorAll('.nav-links .nav-item[data-target]');
  const sections = document.querySelectorAll('.page-section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth' });
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const nav = document.getElementById('navLinks');
        if (nav) nav.classList.remove('open');
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('data-target') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(s => observer.observe(s));
}

// ==========================================================================
// 2. HEADER DYNAMICS ON SCROLL
// ==========================================================================
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ==========================================================================
// 3. MENU DATA & DYNAMIC FILTER RENDERING (100% MATCH TO MOCKUP)
// ==========================================================================
const MENU_ITEMS = [
  // FEATURED DISHES
  {
    id: 'truffle-pasta',
    name: 'Truffle Pasta',
    category: 'featured',
    tag: "CHEF'S SPECIAL",
    price: 499,
    isVeg: true,
    rating: 4.8,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=600&q=80',
    desc: 'Creamy pasta with truffle oil, parmesan & wild forest mushrooms.'
  },
  {
    id: 'chicken-tikka',
    name: 'Chicken Tikka',
    category: 'featured',
    price: 299,
    isVeg: false,
    rating: 4.6,
    reviews: 278,
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80',
    desc: 'Succulent charcoal-grilled chicken marinated in spiced yogurt.'
  },
  {
    id: 'biryani',
    name: 'Hyderabadi Biryani',
    category: 'featured',
    popular: true,
    price: 349,
    isVeg: true,
    rating: 4.7,
    reviews: 452,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    desc: 'Fragrant basmati rice dum-cooked with saffron & aromatic royal spices.'
  },
  {
    id: 'lava-cake',
    name: 'Chocolate Lava Cake',
    category: 'featured',
    price: 199,
    isVeg: true,
    rating: 4.9,
    reviews: 386,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    desc: 'Warm Belgian dark chocolate cake with molten cocoa truffle center.'
  },

  // STARTERS
  {
    id: 'paneer-tikka',
    name: 'Angaar Paneer Tikka',
    category: 'starters',
    tag: "CHEF'S SPECIAL",
    price: 289,
    isVeg: true,
    rating: 4.8,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
    desc: 'Charcoal grilled cottage cheese marinated in yellow mustard & Kashmiri chili.'
  },
  {
    id: 'hara-bhara',
    name: 'Hara Bhara Kebab',
    category: 'starters',
    price: 249,
    isVeg: true,
    rating: 4.7,
    reviews: 185,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',
    desc: 'Crispy spinach, green pea & cottage cheese patties with mint chutney.'
  },
  {
    id: 'dahi-kebab',
    name: 'Dahi Ke Kebab',
    category: 'starters',
    popular: true,
    price: 279,
    isVeg: true,
    rating: 4.9,
    reviews: 290,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    desc: 'Velvety hung curd patties infused with green cardamom & coriander crust.'
  },
  {
    id: 'crispy-corn',
    name: 'Crispy Sweet Corn',
    category: 'starters',
    price: 219,
    isVeg: true,
    rating: 4.6,
    reviews: 160,
    image: 'https://images.unsplash.com/photo-1587248720327-8eb72564be1e?auto=format&fit=crop&w=600&q=80',
    desc: 'Golden fried sweet corn kernels tossed with fresh spring onions & key lime.'
  },

  // MAINS
  {
    id: 'dal-makhani',
    name: 'Dal-e-Khaas (24hr Simmered)',
    category: 'mains',
    popular: true,
    price: 299,
    isVeg: true,
    rating: 4.9,
    reviews: 512,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    desc: 'Black lentils slow-cooked overnight over clay tandoor with fresh white butter.'
  },
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    category: 'mains',
    tag: "CHEF'S SPECIAL",
    price: 329,
    isVeg: true,
    rating: 4.8,
    reviews: 410,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    desc: 'Fresh paneer cubes simmered in creamy tomato, cashew & butter gravy.'
  },
  {
    id: 'kadai-paneer',
    name: 'Royal Kadai Paneer',
    category: 'mains',
    price: 319,
    isVeg: true,
    rating: 4.7,
    reviews: 330,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    desc: 'Cottage cheese tossed with bell peppers & crushed whole Kadai spices.'
  },
  {
    id: 'malai-kofta',
    name: 'Shahi Malai Kofta',
    category: 'mains',
    price: 349,
    isVeg: true,
    rating: 4.8,
    reviews: 295,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
    desc: 'Golden fried paneer & cashew dumplings in rich saffron-infused gravy.'
  },

  // BREADS
  {
    id: 'butter-naan',
    name: 'Butter Garlic Naan',
    category: 'breads',
    popular: true,
    price: 79,
    isVeg: true,
    rating: 4.9,
    reviews: 620,
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80',
    desc: 'Soft tandoori leavened flatbread brushed with garlic butter & herbs.'
  },
  {
    id: 'stuffed-kulcha',
    name: 'Amritsari Stuffed Kulcha',
    category: 'breads',
    tag: "CHEF'S SPECIAL",
    price: 99,
    isVeg: true,
    rating: 4.8,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    desc: 'Flaky clay-oven baked bread stuffed with spiced potatoes & cottage cheese.'
  },
  {
    id: 'laccha-paratha',
    name: 'Layered Laccha Paratha',
    category: 'breads',
    price: 69,
    isVeg: true,
    rating: 4.7,
    reviews: 280,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    desc: 'Multi-layered crispy whole wheat bread baked over charcoal with pure ghee.'
  },

  // DESSERTS
  {
    id: 'gulab-jamun',
    name: 'Shahi Gulab Jamun',
    category: 'desserts',
    popular: true,
    price: 149,
    isVeg: true,
    rating: 4.9,
    reviews: 480,
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&q=80',
    desc: 'Warm khoya dumplings soaked in organic rose & cardamom sugar syrup.'
  },
  {
    id: 'rasmalai',
    name: 'Saffron Rasmalai',
    category: 'desserts',
    tag: "CHEF'S SPECIAL",
    price: 169,
    isVeg: true,
    rating: 4.9,
    reviews: 390,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    desc: 'Soft cottage cheese discs floating in chilled saffron rabri with pistachio.'
  },
  {
    id: 'kulfi',
    name: 'Matka Malai Kulfi',
    category: 'desserts',
    price: 129,
    isVeg: true,
    rating: 4.8,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80',
    desc: 'Traditional slow-churned condensed milk ice cream served in earthen pot.'
  },

  // BEVERAGES
  {
    id: 'mango-lassi',
    name: 'Royal Alphonso Lassi',
    category: 'beverages',
    popular: true,
    price: 139,
    isVeg: true,
    rating: 4.9,
    reviews: 540,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80',
    desc: 'Thick churned sweet yogurt blended with Alphonso mango pulp & saffron.'
  },
  {
    id: 'masala-chai',
    name: 'Khadak Kulhad Chai',
    category: 'beverages',
    tag: "CHEF'S SPECIAL",
    price: 79,
    isVeg: true,
    rating: 4.8,
    reviews: 410,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    desc: 'Assam black tea brewed with fresh ginger, green cardamom & spices in clay cup.'
  },
  {
    id: 'badam-milk',
    name: 'Kesariya Badam Milk',
    category: 'beverages',
    price: 149,
    isVeg: true,
    rating: 4.8,
    reviews: 290,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    desc: 'Chilled almond milk infused with Kashmiri saffron & crushed pistachios.'
  }
];

let isFullMenuExpanded = false;

window.toggleFullMenu = function() {
  isFullMenuExpanded = !isFullMenuExpanded;
  const btnText = document.querySelector('.btn-explore-full-menu span');
  const prevBtn = document.getElementById('menuPrevBtn');
  const nextBtn = document.getElementById('menuNextBtn');

  if (isFullMenuExpanded) {
    renderMenuItems('all');
    if (btnText) btnText.textContent = 'Show Less ↑';
    // Hide carousel arrows when full menu is shown on page
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
  } else {
    renderMenuItems('featured');
    if (btnText) btnText.textContent = 'View Full Menu';
    // Show carousel arrows when back to 4-card view
    if (prevBtn) prevBtn.style.display = '';
    if (nextBtn) nextBtn.style.display = '';
  }
};

function renderMenuItems(category = 'featured') {
  const container = document.getElementById('menuDishesGrid');
  if (!container) return;

  let itemsToRender = [];

  if (category === 'all' || isFullMenuExpanded) {
    itemsToRender = MENU_ITEMS; // Render ALL 20+ dishes right on the main page grid!
  } else if (category === 'featured') {
    itemsToRender = MENU_ITEMS.filter(item => item.category === 'featured').slice(0, 4); // Show 4 initial cards!
  } else {
    itemsToRender = MENU_ITEMS.filter(item => item.category === category);
  }

  container.style.opacity = '0';
  container.style.transform = 'translateY(8px)';
  container.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

  setTimeout(() => {
    container.innerHTML = itemsToRender.map(dish => `
      <div class="menu-dish-card ${dish.popular ? 'mdish-popular-card' : ''}" onclick="openDishModal('${dish.id}')">
        <div class="mdish-thumb-wrap">
          <img src="${dish.image}" alt="${dish.name}" class="mdish-img" loading="lazy" />
          ${dish.popular ? `<div class="mdish-popular-tag"><i data-lucide="crown"></i> POPULAR</div>` : ''}
          <div class="diet-badge ${dish.isVeg ? 'veg' : 'nonveg'}" title="${dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}">
            <span class="diet-dot"></span>
          </div>
        </div>
        <div class="mdish-body">
          ${dish.tag ? `<span class="mdish-special-tag">${dish.tag}</span>` : ''}
          <div class="mdish-header-row">
            <h3 class="mdish-name">${dish.name}</h3>
            <span class="mdish-price">₹${dish.price}</span>
          </div>
          <p class="mdish-desc">${dish.desc}</p>
          <div class="mdish-footer-row">
            <div class="mdish-rating">
              <span class="mdish-stars">★★★★★</span>
              <span class="mdish-score">${dish.rating} (${dish.reviews})</span>
            </div>
            <button class="mdish-fav-btn ${dish.popular ? 'active' : ''}" aria-label="Favorite" onclick="event.stopPropagation(); this.classList.toggle('active')">
              <i data-lucide="heart"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
    if (window.lucide) window.lucide.createIcons();
  }, 150);
}

// Full Menu Modal Functions
window.openFullMenuModal = function(category = 'all') {
  const modal = document.getElementById('fullMenuModal');
  if (!modal) return;

  modal.classList.add('open');
  renderFullMenuModalItems(category);

  // Set active tab
  const tabs = document.querySelectorAll('#fmmTabsRow .fmm-tab-btn');
  tabs.forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-fmm-cat') === category);
  });

  // Bind tabs
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderFullMenuModalItems(tab.getAttribute('data-fmm-cat'));
    };
  });

  // Bind Search
  const searchInput = document.getElementById('fmmSearchInput');
  if (searchInput) {
    searchInput.oninput = (e) => {
      const q = e.target.value.toLowerCase().trim();
      renderFullMenuModalItems('all', q);
    };
  }

  if (window.lucide) window.lucide.createIcons();
};

window.closeFullMenuModal = function() {
  const modal = document.getElementById('fullMenuModal');
  if (modal) modal.classList.remove('open');
};

function renderFullMenuModalItems(category = 'all', searchQuery = '') {
  const grid = document.getElementById('fmmDishesGrid');
  if (!grid) return;

  let filtered = category === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === category);

  if (searchQuery) {
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(searchQuery) || 
      item.desc.toLowerCase().includes(searchQuery)
    );
  }

  grid.innerHTML = filtered.map(dish => `
    <div class="menu-dish-card ${dish.popular ? 'mdish-popular-card' : ''}" onclick="openDishModal('${dish.id}')">
      <div class="mdish-thumb-wrap">
        <img src="${dish.image}" alt="${dish.name}" class="mdish-img" loading="lazy" />
        ${dish.popular ? `<div class="mdish-popular-tag"><i data-lucide="crown"></i> POPULAR</div>` : ''}
        <div class="diet-badge ${dish.isVeg ? 'veg' : 'nonveg'}" title="${dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}">
          <span class="diet-dot"></span>
        </div>
      </div>
      <div class="mdish-body">
        ${dish.tag ? `<span class="mdish-special-tag">${dish.tag}</span>` : ''}
        <div class="mdish-header-row">
          <h3 class="mdish-name">${dish.name}</h3>
          <span class="mdish-price">₹${dish.price}</span>
        </div>
        <p class="mdish-desc">${dish.desc}</p>
        <div class="mdish-footer-row">
          <div class="mdish-rating">
            <span class="mdish-stars">★★★★★</span>
            <span class="mdish-score">${dish.rating} (${dish.reviews})</span>
          </div>
          <button class="mdish-fav-btn ${dish.popular ? 'active' : ''}" aria-label="Favorite" onclick="event.stopPropagation(); this.classList.toggle('active')">
            <i data-lucide="heart"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

// Global Dish Quick View Modal
window.openDishModal = function(dishId) {
  const dish = MENU_ITEMS.find(d => d.id === dishId);
  const modal = document.getElementById('dishModal');
  if (!dish || !modal) return;

  modal.innerHTML = `
    <div class="dish-modal-card">
      <button class="dish-modal-close-btn" onclick="closeDishModal()">
        <i data-lucide="x"></i>
      </button>
      <img src="${dish.image}" alt="${dish.name}" class="dish-modal-hero-img" />
      <div class="dish-modal-body">
        <h3 class="dish-modal-title">${dish.name}</h3>
        <span class="dish-modal-price">₹${dish.price}</span>
        <p class="dish-modal-desc">${dish.desc}</p>
        <div class="dish-modal-meta-box">
          <div class="dmm-row">
            <i data-lucide="wine"></i>
            <span><strong>Sommelier Pairing:</strong> 2018 Sula Reserve Cabernet / Artisanal Cardamom Cooler</span>
          </div>
          <div class="dmm-row">
            <i data-lucide="check-circle"></i>
            <span><strong>Dietary:</strong> ${dish.isVeg ? '100% Pure Vegetarian' : 'Non-Vegetarian Gourmet'} · Stone Ground Masalas</span>
          </div>
        </div>
        <button class="btn-island-cta btn-full" onclick="requestDishInReservation('${dish.name}')">
          <span>Reserve Table with This Dish</span>
          <span class="btn-icon-bubble"><i data-lucide="calendar"></i></span>
        </button>
      </div>
    </div>
  `;
  modal.classList.add('open');
  if (window.lucide) window.lucide.createIcons();
};

window.closeDishModal = function() {
  const modal = document.getElementById('dishModal');
  if (modal) modal.classList.remove('open');
};

window.requestDishInReservation = function(dishName) {
  closeDishModal();
  const reqInput = document.getElementById('rbRequests');
  if (reqInput) reqInput.value = `Pre-ordering: ${dishName}`;
  const resSec = document.getElementById('reservation');
  if (resSec) resSec.scrollIntoView({ behavior: 'smooth' });
  showToast('Dish Added to Reservation Draft', `${dishName} pre-order requested. Complete booking below.`);
};

// VIP Zone Pills Selector
function initZoneSelector() {
  const zonePills = document.querySelectorAll('.zone-pill');
  const zoneInput = document.getElementById('selectedZone');
  zonePills.forEach(pill => {
    pill.addEventListener('click', () => {
      zonePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const zone = pill.getAttribute('data-zone');
      if (zoneInput) zoneInput.value = zone;
    });
  });
}

// Floating Concierge Widget
function initFloatingConcierge() {
  const btn = document.getElementById('floatingConciergeBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const resSec = document.getElementById('reservation');
    if (resSec) resSec.scrollIntoView({ behavior: 'smooth' });
    showToast('VIP Concierge Online 💬', 'Our dining manager is ready to assist your party reservation.');
  });
}

function initMenuFilters() {
  const tabs = document.querySelectorAll('.menu-tabs-bar .menu-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-cat');

      // When user clicks a category tab, collapse full menu expansion
      isFullMenuExpanded = false;
      const btnText = document.querySelector('.btn-explore-full-menu span');
      if (btnText) btnText.textContent = 'View Full Menu';
      const prevBtn = document.getElementById('menuPrevBtn');
      const nextBtn = document.getElementById('menuNextBtn');
      if (prevBtn) prevBtn.style.display = '';
      if (nextBtn) nextBtn.style.display = '';

      renderMenuItems(cat);
    });
  });

  // Carousel Arrow Controls
  const prevBtn = document.getElementById('menuPrevBtn');
  const nextBtn = document.getElementById('menuNextBtn');
  const grid = document.getElementById('menuDishesGrid');

  if (prevBtn && grid) {
    prevBtn.addEventListener('click', () => {
      grid.scrollBy({ left: -320, behavior: 'smooth' });
    });
  }

  if (nextBtn && grid) {
    nextBtn.addEventListener('click', () => {
      grid.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }
}

// ==========================================================================
// 4. GALLERY FILTERS
// ==========================================================================
function initGalleryFilters() {
  const pills = document.querySelectorAll('#galleryFilterPills .pill-btn');
  const tiles = document.querySelectorAll('#galleryMosaic .gbt-tile');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-gallery');
      tiles.forEach(tile => {
        const cat = tile.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          tile.style.opacity = '1';
          tile.style.pointerEvents = 'auto';
          tile.style.transform = 'scale(1)';
        } else {
          tile.style.opacity = '0.18';
          tile.style.pointerEvents = 'none';
          tile.style.transform = 'scale(0.97)';
        }
        tile.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      });
    });
  });
}

// ==========================================================================
// 5. RESERVATION & CONTACT FORMS WITH UI/UX PRO MAX SUBMIT FEEDBACK
// ==========================================================================
function initReservationForm() {
  const form = document.getElementById('royalReservationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.75';
      submitBtn.innerHTML = `<span>Confirming Reservation...</span><span class="btn-icon-bubble"><i data-lucide="loader"></i></span>`;
      if (window.lucide) window.lucide.createIcons();
    }

    setTimeout(() => {
      const name   = document.getElementById('rbName')?.value || 'Guest';
      const date   = document.getElementById('rbDate')?.value || '';
      const time   = document.getElementById('rbTime')?.value || '';
      const guests = document.getElementById('rbGuests')?.value || '2';

      showToast('Table Reserved! 🍷', `Thank you ${name}! Table for ${guests} confirmed on ${date} at ${time}.`);
      form.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.innerHTML = originalText;
        if (window.lucide) window.lucide.createIcons();
      }
    }, 550);
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.75';
      submitBtn.innerHTML = `<span>Sending Message...</span><span class="btn-icon-bubble"><i data-lucide="loader"></i></span>`;
      if (window.lucide) window.lucide.createIcons();
    }

    setTimeout(() => {
      showToast('Message Received', 'Thank you! Our concierge team will connect with you shortly.');
      form.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.innerHTML = originalText;
        if (window.lucide) window.lucide.createIcons();
      }
    }, 500);
  });
}

// ==========================================================================
// 6. MOBILE MENU TOGGLE
// ==========================================================================
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('navLinks');
  if (btn && nav) {
    btn.addEventListener('click', () => nav.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !btn.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }
}

// ==========================================================================
// 7. TOAST NOTIFICATIONS
// ==========================================================================
let toastTimer = null;
function showToast(title, message) {
  const toast = document.getElementById('toastPopup');
  const hEl   = document.getElementById('toastHeading');
  const mEl   = document.getElementById('toastMessage');
  if (!toast || !hEl || !mEl) return;

  hEl.textContent = title;
  mEl.textContent = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

// ==========================================================================
// 8. KINETIC SCROLL REVEAL (INTERSECTION OBSERVER)
// ==========================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.section-header-center, .story-grid, .gapless-bento-grid, .menu-cards-grid, .res-grid, .contact-grid, .gallery-mosaic'
  );
  revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));
}

// Contact Form Submission Handler
window.handleContactFormSubmit = function(event) {
  event.preventDefault();
  const form = document.getElementById('contactPageForm');
  if (form) form.reset();
  showToast('Message Sent Successfully ✉️', 'Thank you for contacting RoyalBite. Our concierge team will get back to you shortly.');
};

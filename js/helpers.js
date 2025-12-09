/**
 * file: js/helpers.js
 * purpose: Shared basket functionality across all pages
 * This file is included in both index.html and product.html
 * Manages basket state, localStorage persistence, and UI rendering
 **/

// ===== BASKET STATE MANAGEMENT =====
/**
 * Global basket array
 * Loads existing basket from localStorage or initializes empty array
 * Each item contains: color, colorName, image, quantity
 */
let basketItems = JSON.parse(localStorage.getItem('luminaBasket')) || [];

/**
 * Color names mapping
 * Maps color identifiers to display names
 */
const colorNames = {
  'sage-green': 'SAGE GREEN',
  'dusty-rose': 'DUSTY ROSE',
  'lavender-mist': 'LAVENDER MIST',
  'moonlight-white': 'MOONLIGHT WHITE'
};

/**
 * Save basket to localStorage
 * Persists basket across page navigation and browser sessions
 */
function saveBasket() {
  localStorage.setItem('luminaBasket', JSON.stringify(basketItems));
}

// ===== BASKET RENDERING =====
/**
 * Render all basket items in the overlay
 * Creates HTML for each product with image, name, color, and quantity controls
 * Sets up event listeners for quantity increase/decrease buttons
 * Handles item removal when quantity reaches 0
 */
function renderBasketItems() {
  const basketProductsList = document.getElementById('basketProductsList');
  const basketEmpty = document.getElementById('basketEmpty');
  const basketFilled = document.getElementById('basketFilled');
  
  // Exit if basket container doesn't exist
  if (!basketProductsList) return;
  
  // Clear existing content
  basketProductsList.innerHTML = '';
  
  // Create a product div for each basket item
  basketItems.forEach((item, index) => {
    const productDiv = document.createElement('div');
    productDiv.className = 'basket-product';
    productDiv.dataset.index = index;
    
    // Build product HTML with image, info, and quantity controls
    productDiv.innerHTML = `
      <img src="${item.image}" alt="Product" class="basket-product-image">
      <div class="basket-product-info">
        <p class="basket-product-name">LUMINA ONE</p>
        <p class="basket-product-color">COLOR: ${item.colorName}</p>
      </div>
      <div class="basket-product-quantity">
        <button class="basket-qty-btn basket-decrease" data-index="${index}">-</button>
        <span class="basket-qty-value">${item.quantity}</span>
        <button class="basket-qty-btn basket-increase" data-index="${index}">+</button>
      </div>
    `;
    
    basketProductsList.appendChild(productDiv);
  });
  
  /**
   * Decrease quantity button handler
   * If quantity > 1: decreases quantity by 1
   * If quantity = 1: removes item from basket
   * If basket becomes empty: shows empty basket state
   */
  document.querySelectorAll('.basket-decrease').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      if (basketItems[index].quantity > 1) {
        // Decrease quantity
        basketItems[index].quantity--;
        saveBasket();
        renderBasketItems();
      } else {
        // Remove item from basket
        basketItems.splice(index, 1);
        saveBasket();
        if (basketItems.length === 0) {
          // Show empty basket state
          basketFilled.style.display = 'none';
          basketEmpty.style.display = 'flex';
        } else {
          renderBasketItems();
        }
      }
    });
  });
  
  /**
   * Increase quantity button handler
   * Increases quantity by 1 (no maximum limit)
   */
  document.querySelectorAll('.basket-increase').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      basketItems[index].quantity++;
      saveBasket();
      renderBasketItems();
    });
  });
}

// ===== BASKET INITIALIZATION =====
/**
 * Initialize basket on page load
 * If basket has items: renders them and shows filled state
 * If basket is empty: shows empty state
 * Called when DOM is ready
 */
function initializeBasket() {
  const basketEmpty = document.getElementById('basketEmpty');
  const basketFilled = document.getElementById('basketFilled');
  
  if (basketItems.length > 0 && basketFilled && basketEmpty) {
    renderBasketItems();
    basketEmpty.style.display = 'none';
    basketFilled.style.display = 'flex';
  }
}

// ===== BASKET OVERLAY CONTROLS =====
/**
 * Setup basket overlay open/close functionality
 * Handles:
 * - Opening overlay via BASKET button in navigation
 * - Closing via close button (X)
 * - Closing by clicking outside the basket content
 * - Closing with Escape key
 * Ensures dropdowns close when basket opens
 */
function setupBasketOverlay() {
  const basketButton = document.getElementById('basketButton');
  const basketOverlay = document.getElementById('basketOverlay');
  const basketClose = document.getElementById('basketClose');
  
  if (basketButton && basketOverlay && basketClose) {
    /**
     * Open basket overlay when clicking BASKET button
     * Also closes any open dropdown menus
     */
    basketButton.addEventListener('click', (e) => {
      e.preventDefault();
      basketOverlay.classList.add('active');
      // Close dropdowns if function exists (it does on both pages)
      if (typeof closeAllDropdowns === 'function') {
        closeAllDropdowns();
      }
    });
    
    /**
     * Close basket overlay when clicking X button
     * e.stopPropagation() prevents overlay click event from triggering
     */
    basketClose.addEventListener('click', (e) => {
      e.stopPropagation();
      basketOverlay.classList.remove('active');
    });
    
    /**
     * Close basket when clicking outside the basket content
     * Only triggers if clicking the dark overlay background
     */
    basketOverlay.addEventListener('click', (e) => {
      if (e.target === basketOverlay) {
        basketOverlay.classList.remove('active');
      }
    });
    
    /**
     * Close basket with Escape key
     * Only works when basket is currently open
     */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && basketOverlay.classList.contains('active')) {
        basketOverlay.classList.remove('active');
      }
    });
  }
}

// ===== TERMS & CONDITIONS CHECKBOX =====
/**
 * Setup terms and conditions checkbox toggle
 * Toggles 'checked' class on click to show visual checkmark
 * Required before proceeding to checkout
 */
function setupTermsCheckbox() {
  const termsCheckbox = document.getElementById('termsCheckbox');
  if (termsCheckbox) {
    termsCheckbox.addEventListener('click', function() {
      this.classList.toggle('checked');
    });
  }
}

// ===== CHECKOUT BUTTON =====
/**
 * Setup checkout button with terms validation
 * Checks if user has accepted Terms & Conditions
 * If accepted: shows success message (would redirect to checkout in production)
 * If not accepted: shows alert asking user to accept terms
 */
function setupCheckoutButton() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  const termsCheckbox = document.getElementById('termsCheckbox');
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (termsCheckbox?.classList.contains('checked')) {
        // Terms accepted - proceed to checkout
        alert('Proceeding to payment & delivery... 🎉');
      } else {
        // Terms not accepted - show warning
        alert('Please accept the Terms & Conditions to continue.');
      }
    });
  }
}

// ===== MASTER INITIALIZATION FUNCTION =====
/**
 * Initialize all basket functionality
 * Called from DOMContentLoaded in both index.html and product.html
 * Sets up:
 * - Basket loading from localStorage
 * - Basket overlay open/close controls
 * - Terms checkbox toggle
 * - Checkout button validation
 */
function initializeBasketFunctionality() {
  initializeBasket();
  setupBasketOverlay();
  setupTermsCheckbox();
  setupCheckoutButton();
}

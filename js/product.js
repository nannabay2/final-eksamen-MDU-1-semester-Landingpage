/**
 * PRODUCT PAGE FUNCTIONALITY
 * Handles product image carousel, color selection, quantity controls, dropdowns, and basket integration
 * 
 * Features:
 * - Image carousel with per-color image sets (3 images per color)
 * - Color selection with dynamic image and header color updates
 * - Quantity increment/decrement controls
 * - Dropdown menu toggles for SPEAKERS and MORE navigation
 * - Basket integration using shared helpers.js library
 * - Header text color changes to match selected product color
 * 
 * Dependencies: helpers.js (basket functionality)
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== CAROUSEL FUNCTIONALITY ====================
    // DOM elements for image carousel
    const mainImage = document.querySelector('.main-image');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const colorOptions = document.querySelectorAll('.color-option');

    /**
     * Image sets for each product color
     * Each color has 3 product images for the carousel
     * Format: { 'Color Name': [image1.png, image2.png, image3.png] }
     */
    const imageSets = {
        'Sage Green': ['images/SageGreen1.png', 'images/SageGreen2.png', 'images/SageGreen3.png'],
        'Dusty Rose': ['images/DustyRose1.png', 'images/DustyRose2.png', 'images/DustyRose3.png'],
        'Lavender Mist': ['images/LavenderMist1.png', 'images/LavenderMist2.png', 'images/LavenderMist3.png'],
        'Moonlight White': ['images/MoonlightWhite1.png', 'images/MoonlightWhite2.png', 'images/MoonlightWhite3.png']
    };

    // Current carousel state
    let currentColor = 'Sage Green';
    let currentImageIndex = 0;

    /**
     * Render the current image in the carousel
     * Updates main image source, alt text, and color button active states
     * Wraps around at beginning/end of image array
     */
    function renderImage() {
        const set = imageSets[currentColor];
        if (!set) {
            console.error('Color set not found for:', currentColor);
            return;
        }
        if (currentImageIndex >= set.length) currentImageIndex = 0;
        if (currentImageIndex < 0) currentImageIndex = set.length - 1;
        const src = set[currentImageIndex];
        mainImage.src = src;
        mainImage.dataset.color = currentColor;
        mainImage.alt = `${currentColor} speaker ${currentImageIndex + 1}`;
        colorOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.color === currentColor);
        });
    }

    /**
     * Change carousel slide by delta (next/previous)
     * @param {number} delta - Slide direction: 1 for next, -1 for previous
     * Handles wrap-around at array boundaries
     */
    function changeSlide(delta) {
        currentImageIndex += delta;
        const set = imageSets[currentColor];
        const len = set ? set.length : 0;
        if (len === 0) return;
        if (currentImageIndex >= len) currentImageIndex = 0;
        if (currentImageIndex < 0) currentImageIndex = len - 1;
        renderImage();
    }

    // Initialize carousel with first image
    renderImage();

    // Attach carousel navigation event listeners
    nextBtn.addEventListener('click', () => changeSlide(1));
    prevBtn.addEventListener('click', () => changeSlide(-1));

    // ==================== COLOR SELECTION & HEADER COLOR CHANGE ====================
    /**
     * Maps each product color to its header text color for dynamic styling
     * When user selects a color, header logo and nav links change to this color
     */
    const colorToHeaderColor = {
        'Sage Green': '#8b9c8d',
        'Dusty Rose': '#b18778',
        'Lavender Mist': '#7f6c70',
        'Moonlight White': '#b7ac9a'
    };

    /**
     * Color option button click handler
     * Changes product image, updates carousel, and changes header colors
     */
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedColor = option.dataset.color;
            if (!imageSets[selectedColor]) {
                console.error('No image set for color:', selectedColor);
                return;
            }
            currentColor = selectedColor;
            currentImageIndex = 0;
            renderImage();

            // Change header text color to match the selected product color
            const headerLinks = document.querySelectorAll('.nav-link, .basket-btn');
            const logoH1 = document.querySelector('.logo h1');
            const headerColor = colorToHeaderColor[selectedColor];
            headerLinks.forEach(link => {
                link.style.color = headerColor;
            });
            // Also change logo color to match
            if (logoH1) {
                logoH1.style.color = headerColor;
            }
        });
    });

    // ==================== QUANTITY SELECTOR ====================
    // DOM elements for quantity controls
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityValue = document.querySelector('.quantity-value');

    /**
     * Decrement quantity when minus button is clicked
     * Prevents quantity from going below 1
     */
    plusBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityValue.textContent);
        quantityValue.textContent = quantity + 1;
    });

    minusBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityValue.textContent);
        if (quantity > 1) {
            quantityValue.textContent = quantity - 1;
        }
    });

    // ==================== DROPDOWN MENUS (SPEAKERS & MORE) ====================
    // DOM elements for dropdown functionality
    const speakersButton = document.getElementById('speakersButton');
    const speakersDropdown = document.getElementById('speakersDropdown');
    const moreButton = document.getElementById('moreButton');
    const dropdownMenu = document.getElementById('dropdownMenu');

    /**
     * Close all open dropdown menus
     * Removes 'active' class from all dropdown elements
     */
    function closeAllDropdowns() {
        if (speakersDropdown) speakersDropdown.classList.remove('active');
        if (dropdownMenu) dropdownMenu.classList.remove('active');
    }

    /**
     * SPEAKERS dropdown menu toggle
     * Closes other dropdowns and toggles SPEAKERS dropdown
     * Also closes when a product link is clicked
     */
    if (speakersButton && speakersDropdown) {
        speakersButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const wasActive = speakersDropdown.classList.contains('active');
            closeAllDropdowns();
            // Toggle dropdown if it wasn't already open
            if (!wasActive) {
                speakersDropdown.classList.add('active');
            }
        });

        // Close dropdown when clicking a product link inside it
        const speakersLinks = speakersDropdown.querySelectorAll('.dropdown-link');
        speakersLinks.forEach(link => {
            link.addEventListener('click', () => {
                speakersDropdown.classList.remove('active');
            });
        });
    }

    /**
     * MORE dropdown menu toggle
     * Closes other dropdowns and toggles MORE dropdown
     * Also closes when a link is clicked
     */
    if (moreButton && dropdownMenu) {
        moreButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const wasActive = dropdownMenu.classList.contains('active');
            closeAllDropdowns();
            // Toggle dropdown if it wasn't already open
            if (!wasActive) {
                dropdownMenu.classList.add('active');
            }
        });

        // Close dropdown when clicking a link inside it
        const dropdownLinks = dropdownMenu.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                dropdownMenu.classList.remove('active');
            });
        });
    }

    /**
     * Close all dropdowns when clicking outside any dropdown area
     */
    document.addEventListener('click', (e) => {
        if (e.target !== speakersButton && e.target !== moreButton) {
            closeAllDropdowns();
        }
    });

    /**
     * Handle clicks on unavailable page links
     * Shows alert and prevents navigation
     */
    const unavailableLinks = document.querySelectorAll('[data-unavailable]');
    unavailableLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Denne side er ikke tilgængelig endnu.');
            closeAllDropdowns();
        });
    });

    // ==================== ADD TO BASKET ====================
    /**
     * Handle "Add to Basket" button click
     * Collects product info (name, color, quantity, image)
     * Adds to global basketItems array via helpers.js
     * Updates basket display and shows overlay
     */
    const addToBasketBtn = document.querySelector('.add-to-basket-btn');

    addToBasketBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityValue.textContent);
        const activeColor = document.querySelector('.color-option.active').dataset.color;
        const productImage = mainImage.src;

        /**
         * Map product color names to color identifiers
         * Used to link with colorNames object in helpers.js
         */
        const colorMap = {
            'Sage Green': 'sage-green',
            'Dusty Rose': 'dusty-rose',
            'Lavender Mist': 'lavender-mist',
            'Moonlight White': 'moonlight-white'
        };

        const colorId = colorMap[activeColor] || 'unknown';
        const colorName = colorNames[colorId] || activeColor;

        /**
         * Add product to global basketItems array
         * Checks if item with same color already exists
         * If exists: increment quantity, else: create new basket item
         * basketItems is defined in helpers.js and persisted to localStorage
         */
        const existingItem = basketItems.find(item => item.color === colorId);

        if (existingItem) {
            // Item already in basket - increment quantity
            existingItem.quantity += quantity;
        } else {
            // New item - add to basket
            basketItems.push({
                color: colorId,
                colorName: colorName,
                image: productImage,
                quantity: quantity
            });
        }

        /**
         * Save basket to localStorage and update UI
         * Functions from helpers.js
         */
        saveBasket();
        renderBasketItems();

        /**
         * Show basket overlay to user
         * Overlay slide-in animation defined in CSS (transform: translateX)
         */
        const basketOverlay = document.getElementById('basketOverlay');
        if (basketOverlay) {
            basketOverlay.classList.add('active');
            const basketEmpty = document.getElementById('basketEmpty');
            const basketFilled = document.getElementById('basketFilled');
            if (basketEmpty && basketFilled) {
                basketEmpty.style.display = 'none';
                basketFilled.style.display = 'flex';
            }
        }
    });

    // Initialize basket functionality from helpers.js
    initializeBasketFunctionality();
});

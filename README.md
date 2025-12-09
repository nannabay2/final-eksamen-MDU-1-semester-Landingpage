# LUMINA - Bluetooth Speaker Website

A modern, responsive e-commerce website for LUMINA One, a Scandinavian-designed Bluetooth speaker. This project showcases a complete product landing page with shopping basket functionality, carousel animations, and responsive design.

## Project Overview

LUMINA is a fictional brand created for this web development project. The website features:
- Interactive product carousel with 4 color variants
- Fully functional shopping basket with localStorage persistence
- Responsive design (desktop → mobile: 1400px, 1024px, 768px, 480px)
- Smooth scroll animations and parallax effects
- Newsletter subscription with email validation
- Community gallery with auto-scrolling animation

## Project Structure

```
Computer størrelse/
├── index.html              # Homepage with product showcase and navigation dropdowns
├── product.html            # Product detail page for LUMINA ONE speaker
├── css/
│   ├── css.css            # Main stylesheet for index.html (2,553 lines)
│   └── product.css        # Product page specific styles (668 lines)
├── js/
│   ├── js.js              # Homepage interactions (dropdowns, basket toggle)
│   ├── product.js         # Product page (carousel, colors, quantity, basket)
│   └── helpers.js         # Shared basket functionality (localStorage, rendering)
├── images/
│   ├── SageGreen1.png
│   ├── DustyRose1.png
│   ├── LavenderMist1.png
│   └── MoonlightWhite1.png
├── README.md              # Project documentation
└── DOCUMENTATION.md       # Detailed technical documentation
```

## Features

### Homepage (`index.html`)
- **Fixed Header**: Navigation with SPEAKERS, MORE, BASKET buttons
- **Dropdown Menus**: SPEAKERS (product links) and MORE (info links)
- **Product Showcase**: Featured LUMINA ONE speaker with description
- **Shopping Basket**: Slide-in overlay with product list and checkout
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Product Page (`product.html`)
- **Header with Navigation**: Same fixed header and dropdown menus as homepage
- **Product Carousel**: 3 images per color variant, prev/next controls
- **Color Selection**: 4 variants (Sage Green, Dusty Rose, Lavender Mist, Moonlight White)
- **Quantity Selector**: Plus/minus buttons with minimum value 1
- **Add to Basket**: Dynamic header color change based on selected product color
- **Shopping Basket**: Identical overlay to homepage with shared functionality

### Shopping Basket (Both Pages)
- **Slide-in Overlay**: Opens from right side with smooth animation
- **Empty State**: Displays basket icon when empty
- **Filled State**: Shows products with image, name, color, quantity controls
- **localStorage Persistence**: Basket survives page refresh and navigation
- **Terms Checkbox**: Required before checkout
- **Dynamic Header Colors**: Navigation links change color with selected product variant
- **Scrollable Content**: Product list scrolls when many items added

## Design System

### Color Palette
```css
--primary-blue: #2420A1        /* Header text, logo, links, hover states */
--primary-pink: #b84a5d        /* Button default state */
--button-hover: #9E1E3C        /* Button hover/active state */
--sage-green: #8b9c8d          /* Product color variant 1 */
--dusty-rose: #b18778          /* Product color variant 2 */
--lavender-mist: #7f6c70       /* Product color variant 3 */
--moonlight-white: #b7ac9a     /* Product color variant 4 */
--page-bg: #fff6ef             /* Page background (warm white) */
--basket-bg: #fffaf8           /* Basket overlay background */
--text-dark: #2C2C2C           /* Body text color */
```

### Typography
- **Logo**: 'Zen Tokyo Zoo' - Unique decorative style (64px)
- **Body/Navigation**: 'Jost' - Modern sans-serif (15-32px)
- **Headings/UI**: 'Poppins' - Clean readable font (15-32px)
- **Alternative**: 'Plus Jakarta Sans' - Optional alternate (400-600 weight)

### Responsive Breakpoints
- **1200px+**: Full desktop layout with optimal spacing
- **1024px-1199px**: Tablet layout with adjusted padding
- **768px-1023px**: Single column layout, reduced font sizes
- **<768px**: Mobile layout, full-width elements, minimal spacing
- **Basket Width**: 40% (desktop) → 95% (mobile)
- **Font Scaling**: 64px logo → 32px on tablet, body text scales proportionally

## JavaScript Functionality

### `js/js.js` - Homepage
- **Dropdown Menus**: SPEAKERS and MORE toggle functionality with click-outside-to-close
- **Basket Toggle**: Open/close basket overlay from BASKET button
- **Unavailable Links**: Alert handling for pages not yet implemented
- **Responsive Behavior**: Event delegation for dynamic content

### `js/product.js` - Product Page (310 lines)
- **Image Carousel**: 3-image carousel per color with prev/next controls
  - `renderImage()` - Display current image and update active color button
  - `changeSlide(delta)` - Navigate carousel with wrap-around boundaries
- **Color Selection**: Dynamic product image and header color changes
  - Maps colors to header colors for consistent branding
  - Updates logo and navigation link colors
- **Quantity Controls**: Plus/minus buttons with minimum value 1
  - Prevents quantity from going below 1
- **Dropdown Menus**: Same SPEAKERS/MORE functionality as homepage
  - Close all dropdowns on click-outside or when link clicked
- **Add to Basket**:
  - Collects product info (color, quantity, image)
  - Checks for duplicate items in basket
  - Adds to global basketItems array via helpers.js
  - Shows basket overlay with new item

### `js/helpers.js` - Shared Basket Logic (252 lines)
- **Basket State**: Global `basketItems` array synced with localStorage
- **Color Names Mapping**: `colorNames` object maps color IDs to display names
- **Save/Load**: `saveBasket()` and `loadBasket()` for localStorage persistence
- **Render Items**: `renderBasketItems()` generates HTML for products
  - Shows empty state or filled state based on basket contents
  - Quantity controls (+ / -) update item quantities
  - Items removed when quantity reaches 0
- **Overlay Management**:
  - `setupBasketOverlay()` - Open/close with button, outside click, Escape key
  - Smooth slide-in animation with transform translateX
- **Terms Validation**:
  - `setupTermsCheckbox()` - Toggle checkbox checked state
  - `setupCheckoutButton()` - Validate terms before allowing checkout
- **Item Structure**:
  ```javascript
  {
    color: 'sage-green',
    colorName: 'SAGE GREEN',
    image: 'images/SageGreen1.png',
    quantity: 2
  }
  ```

## Responsive Design Strategy

All elements scale proportionally across breakpoints:
- **Fonts**: Logo 64px → 32px on tablet, section headings scale down
- **Container Padding**: 120px → 60px → 30px at smaller breakpoints
- **Spacing**: Gaps and margins adjust for mobile efficiency
- **Layout**: Multi-column grids collapse to single column on tablet/mobile
- **Basket**: Width adjusts from 40% (desktop) to full width (mobile)
- **Navigation**: Dropdowns styled consistently across breakpoints

## Technical Implementation

### CSS Architecture
- **CSS Variables**: None currently used (direct hex colors)
- **BEM-like Naming**: Descriptive class names (basket-product-name, carousel-control)
- **Flexbox/Grid**: Used for layout (header nav, product grid, basket items)
- **Animations**: CSS transitions for dropdown visibility, basket slide-in, button hover
- **Z-Index Stack**: Header 1001, Dropdowns 999, Basket 2000

### HTML Structure
- **Semantic HTML5**: header, nav, section, button elements
- **Accessibility**: Alt text on images, ARIA-friendly buttons
- **Data Attributes**: data-color for color selection, data-unavailable for disabled links
- **ID Usage**: For JavaScript DOM targeting (speakersButton, basketOverlay, etc.)

### JavaScript Patterns
- **Event Listeners**: Click handlers on buttons, outside-click detection
- **LocalStorage API**: Persistent basket data across sessions
- **Global Variables**: `basketItems` array shared across files
- **ES6 Syntax**: Arrow functions, template literals, const/let
- **DOM Manipulation**: Creating elements dynamically, class toggling

## Code Quality

### Code Organization
- **Separated Concerns**: HTML (structure), CSS (styling), JS (behavior)
- **Shared Code**: helpers.js provides common functionality to avoid duplication
- **Clear File Structure**: Logical separation of homepage and product page code
- **Comprehensive Comments**: Section headers and function documentation in all files

### English Documentation
- **Inline Comments**: All major sections commented in English
- **Function Documentation**: Purpose and behavior explained
- **Section Headers**: Clear markers like `==================== SECTION NAME ====================`
- **Code Examples**: Provided for complex patterns like cart item structure

## Code Documentation

All files include comprehensive English comments:
- **Section Headers**: `==================== SECTION NAME ====================`
- **Function Documentation**: Purpose, parameters, return values explained
- **Inline Comments**: Explanation of complex logic, event handlers, CSS effects
- **HTML Comments**: Semantic section markers for layout clarity

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Flexbox and Grid layouts
- ES6 JavaScript features (arrow functions, const/let, template literals)
- LocalStorage API support required for cart persistence
- CSS Transitions and Transforms for smooth animations

## Getting Started

1. **Open in Browser**: Simply open `index.html` in any modern web browser
2. **No Build Process**: No npm, webpack, or build tools required
3. **localStorage**: Cart data automatically persists in browser storage
4. **Navigation**: Click SPEAKERS dropdown to see product, or use product.html directly

## Features to Explore

- Click color buttons on product page to see header/logo color change
- Add products to basket from product page
- Basket persists even if you refresh the page
- Navigation dropdowns work on both pages
- Hover effects on buttons and navigation links

## Project Information

**Created**: December 2025  
**Purpose**: First-semester web development exam project  
**Technology**: HTML5, CSS3, Vanilla JavaScript  
**No Dependencies**: Runs standalone without frameworks or libraries

---

**Built with HTML5, CSS3, and vanilla JavaScript**  
**No frameworks or external dependencies required** 


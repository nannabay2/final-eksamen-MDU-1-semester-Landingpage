/**
 * file: js/js.js
 * purpose: LUMINA Website Behaviors
 **/
console.log('Success: LUMINA JavaScript running!');

// ===== HERO CAROUSEL FUNCTIONALITY =====
// Track current slide index
let currentSlide = 0;
const totalSlides = 4;

/**
 * Update carousel to show specified slide
 * @param {number} slideIndex - Index of slide to display (0-3)
 * @param {number|null} buttonIndex - Index of button clicked (0-3), null for auto-rotation
 * Updates both the visible slide and the indicator position
 */
function updateCarousel(slideIndex, buttonIndex = null) {
  currentSlide = slideIndex;
  
  // Update slides - set active class on current slide only
  const slides = document.querySelectorAll('.hero-slide');
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
  
  // Update carousel indicator position based on button clicked
  const indicator = document.getElementById('carouselIndicator');
  const positions = [0, 85, 170, 255]; // Y positions in pixels: Start, 01, 02, 03
  if (indicator) {
    // If buttonIndex is provided, use it; otherwise map slideIndex to button position
    if (buttonIndex !== null) {
      indicator.style.top = positions[buttonIndex] + 'px';
    } else {
      // Map slide to button: 0->0, 1->1, 2->2, 3->3
      const mappedPosition = slideIndex === 3 ? 3 : slideIndex;
      indicator.style.top = positions[mappedPosition] + 'px';
    }
  }
  
  // Update active button and Start text
  const buttons = document.querySelectorAll('.carousel-btn');
  const startButton = document.querySelector('.carousel-labels p');
  
  // Remove all active states
  buttons.forEach(btn => btn.classList.remove('active'));
  if (startButton) startButton.classList.remove('active');
  
  // Set active state on clicked button
  if (buttonIndex !== null) {
    if (buttonIndex === 0) {
      // Start or 01 clicked
      if (startButton) startButton.classList.add('active');
      buttons[0].classList.add('active');
    } else {
      buttons[buttonIndex].classList.add('active');
    }
  }
}

/**
 * Initialize carousel on page load
 * Sets up click handlers for carousel buttons and auto-rotation
 */
document.addEventListener('DOMContentLoaded', function() {
  const carouselButtons = document.querySelectorAll('.carousel-btn');
  const startButton = document.querySelector('.carousel-labels p');
  
  // Make "Start" text clickable and show slide 0
  if (startButton) {
    startButton.style.cursor = 'pointer';
    startButton.addEventListener('click', function() {
      updateCarousel(0, 0); // slide 0, indicator position 0 (Start)
    });
  }
  
  // Set up click handlers for numbered buttons (01, 02, 03)
  carouselButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      // Button 0 (01) -> slide 0, position 1
      // Button 1 (02) -> slide 1, position 2
      // Button 2 (03) -> slide 3, position 3
      if (index === 0) {
        updateCarousel(0, 1); // slide 0, indicator at 01
      } else if (index === 1) {
        updateCarousel(1, 2); // slide 1, indicator at 02
      } else if (index === 2) {
        updateCarousel(3, 3); // slide 3 (last), indicator at 03
      }
    });
  });
  
  // Auto-rotate carousel every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel(currentSlide);
  }, 5000);
  
  // Show first slide on page load
  updateCarousel(0, 0);
});

// ===== SMOOTH SCROLLING =====
/**
 * Enable smooth scrolling for anchor links
 * When clicking links with #targets, smoothly scroll to that element
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== SCROLL ANIMATIONS =====
/**
 * Configuration for Intersection Observer
 * Triggers when 10% of element is visible, with 100px bottom margin
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

/**
 * Intersection Observer to animate sections on scroll
 * Fades in and slides up sections when they enter viewport
 */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

/**
 * Initialize scroll animations for main sections
 * Sets initial hidden state and observes for visibility
 */
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.wave-section, .introducing-section, .community-section, .reviews-section, .newsletter-section');
  
  sections.forEach(section => {
    // Set initial hidden state
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    // Start observing for scroll
    observer.observe(section);
  });
});

// ===== FEATURE CARDS HOVER EFFECT =====
/**
 * Add lift animation to feature cards on hover
 * Moves card up 10px when mouse enters, back to normal on leave
 */
document.addEventListener('DOMContentLoaded', function() {
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// ===== COLOR SWATCH SELECTION =====
/**
 * Handle color swatch selection
 * Sets active state on clicked swatch, removes from others
 * Logs selected color to console for debugging
 */
document.addEventListener('DOMContentLoaded', function() {
  const colorSwatches = document.querySelectorAll('.color-swatch');
  
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', function() {
      // Remove active state from all swatches
      colorSwatches.forEach(s => s.classList.remove('active'));
      // Add active state to clicked swatch
      this.classList.add('active');
      console.log('Selected color:', this.style.backgroundColor);
    });
  });
});

// ===== NEWSLETTER VALIDATION =====
/**
 * Validate email input for newsletter signup forms
 * Checks for empty field and valid email format
 * Shows alerts in Danish for user feedback
 */
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForms = document.querySelectorAll('.email-input-wrapper, .footer-newsletter');
  
  newsletterForms.forEach(form => {
    const submitBtn = form.querySelector('button');
    const emailInput = form.querySelector('input[type="email"]');
    
    if (submitBtn && emailInput) {
      submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        // Regex pattern for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Check if email field is empty
        if (email === '') {
          alert('Indtast venligst din emailadresse');
          emailInput.focus();
          return;
        }
        
        // Check if email format is valid
        if (!emailRegex.test(email)) {
          alert('Indtast venligst en gyldig emailadresse');
          emailInput.focus();
          return;
        }
        
        // Success - show confirmation and clear field
        alert('Tak for at tilmelde dig LUMINA nyhedsbrev!');
        emailInput.value = '';
      });
    }
  });
});

// ===== PARALLAX WAVE EFFECT =====
/**
 * Create parallax scrolling effect on wave background elements
 * Each wave moves at a different speed based on its index
 * Creates depth illusion as page scrolls
 */
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const waves = document.querySelectorAll('.wave-bg');
  
  waves.forEach((wave, index) => {
    // Calculate speed: first wave 0.5, second 0.6, third 0.7, etc.
    const speed = 0.5 + (index * 0.1);
    wave.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== HEADER SCROLL EFFECT =====
/**
 * Header behavior on scroll
 * - Shows white background after scrolling 100px
 * - Hides header when scrolling down past 500px
 * - Shows header when scrolling up
 */
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  
  // Add white background when scrolled past 100px
  if (currentScroll > 100) {
    header.style.background = 'rgba(249, 240, 235, 0.98)';
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'transparent';
    header.style.boxShadow = 'none';
  }
  
  // Hide header when scrolling down, show when scrolling up
  if (currentScroll > lastScroll && currentScroll > 500) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  
  // Update last scroll position
  lastScroll = currentScroll;
});

// ===== CTA BUTTON RIPPLE EFFECT =====
/**
 * Add ripple animation to CTA buttons when clicked
 * Creates expanding circle from click point for visual feedback
 * Ripple element is removed after animation completes (600ms)
 */
document.addEventListener('DOMContentLoaded', function() {
  const ctaButtons = document.querySelectorAll('.cta-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple element
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.width = '100px';
      ripple.style.height = '100px';
      ripple.style.marginLeft = '-50px';
      ripple.style.marginTop = '-50px';
      ripple.style.animation = 'ripple 0.6s';
      
      // Calculate click position relative to button
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Position ripple at click location
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      // Add ripple to button
      this.appendChild(ripple);
      
      // Remove ripple after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// ===== COLOR SWATCH THEME CHANGER =====
/**
 * Change website color theme when clicking color swatches
 * Applies selected color to:
 * - All headings (except hero-title and feature-title)
 * - Header logo text
 * - Gallery item borders
 * - Feature icon borders
 * - Navigation links
 * Creates a dynamic color theme experience
 */
document.addEventListener('DOMContentLoaded', () => {
  const colorSwatches = document.querySelectorAll('.color-swatch');
  
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      // Get the background color of the clicked swatch
      const color = window.getComputedStyle(swatch).backgroundColor;
      
      // Apply color to all headings except hero-title and feature-title
      const allHeadings = document.querySelectorAll('h1, h2, h3');
      allHeadings.forEach(heading => {
        if (!heading.classList.contains('hero-title') && !heading.classList.contains('feature-title')) {
          heading.style.color = color;
        }
      });
      
      // Apply color to header logo text
      const headerLogo = document.querySelector('header h1');
      if (headerLogo) {
        headerLogo.style.color = color;
      }
      
      // Apply border color to gallery items (image frames)
      const galleryItems = document.querySelectorAll('.gallery-item');
      galleryItems.forEach(item => {
        item.style.borderColor = color;
      });
      
      // Apply border color to feature icons
      const featureIcons = document.querySelectorAll('.feature-icon');
      featureIcons.forEach(icon => {
        icon.style.borderColor = color;
      });
      
      // Apply color to navigation links (SPEAKERS, MORE, BASKET)
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.style.color = color;
      });
    });
  });
});

// ===== NEWSLETTER SUBMISSION =====
/**
 * Handle newsletter form submission
 * Shows success message in Danish and clears input field
 */
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('.newsletter-input-group');
  const submitButton = document.querySelector('.newsletter-submit-button');
  
  if (submitButton && newsletterForm) {
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Show success message
      alert('Du er nu tilmeldt nyhedsbrevet! 🎉');
      
      // Clear the email input
      const emailInput = document.querySelector('.newsletter-email-input');
      if (emailInput) {
        emailInput.value = '';
      }
    });
  }
});

// ===== DROPDOWN MENU FUNCTIONALITY =====
/**
 * Handle navigation dropdown menus (SPEAKERS and MORE)
 * - Toggles dropdown visibility on button click
 * - Closes other dropdowns when opening one
 * - Closes all dropdowns when clicking outside
 * - Closes dropdown when clicking a link inside it
 */
document.addEventListener('DOMContentLoaded', () => {
  const speakersButton = document.getElementById('speakersButton');
  const speakersDropdown = document.getElementById('speakersDropdown');
  const moreButton = document.getElementById('moreButton');
  const dropdownMenu = document.getElementById('dropdownMenu');
  
  /**
   * Close all dropdown menus
   * Helper function to ensure only one dropdown is open at a time
   */
  function closeAllDropdowns() {
    if (speakersDropdown) speakersDropdown.classList.remove('active');
    if (dropdownMenu) dropdownMenu.classList.remove('active');
  }
  
  // SPEAKERS dropdown toggle
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
    
    // Close dropdown when clicking a link inside it
    const speakersLinks = speakersDropdown.querySelectorAll('.dropdown-link');
    speakersLinks.forEach(link => {
      link.addEventListener('click', () => {
        speakersDropdown.classList.remove('active');
      });
    });
  }
  
  // MORE dropdown toggle
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
  
  // Close all dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target !== speakersButton && e.target !== moreButton) {
      closeAllDropdowns();
    }
  });
  
  /**
   * Handle unavailable pages
   * Shows alert in Danish when clicking links marked with data-unavailable attribute
   */
  const unavailableLinks = document.querySelectorAll('[data-unavailable]');
  unavailableLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Denne side er ikke tilgængelig endnu.');
      closeAllDropdowns();
    });
  });
  
  // Initialize basket functionality from helpers.js
  initializeBasketFunctionality();
});

console.log('LUMINA interactive features initialized!');

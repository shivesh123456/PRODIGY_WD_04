// ======================== */
// JavaScript for Portfolio */
// ======================== */

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to skill bars when they come into view
    observeSkillBars();
});

// Update active navigation link
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');

    // Validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission
    const formButton = document.querySelector('.btn-submit');
    const originalText = formButton.textContent;
    formButton.textContent = 'Sending...';
    formButton.disabled = true;

    setTimeout(() => {
        showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
        document.getElementById('contactForm').reset();
        formButton.textContent = originalText;
        formButton.disabled = false;
    }, 1500);
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Observe skill bars for animation
function observeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (!skillBars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation is handled by CSS, just trigger on view
                entry.target.style.animation = 'none';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 10);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// Add scroll animations to elements
function initScrollAnimations() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .info-card, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach((element, index) => {
        element.style.animation = 'none';
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Counter animation for stats (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Utility: Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth reveal animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Profile image upload handler
function initProfileUpload() {
    const profileContainer = document.getElementById('profileContainer');
    const profileUpload = document.getElementById('profileUpload');
    const profileImage = document.getElementById('profileImage');

    if (!profileContainer || !profileUpload || !profileImage) return;

    // Default SM placeholder SVG
    const smPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%234a90e2'/%3E%3Ctext x='100' y='120' font-size='60' text-anchor='middle' fill='white' font-weight='bold'%3ESM%3C/text%3E%3C/svg%3E";

    profileContainer.addEventListener('click', (e) => {
        // Shift+Click to reset to SM placeholder
        if (e.shiftKey) {
            profileImage.src = smPlaceholder;
            profileUpload.value = '';
            return;
        }
        // Regular click to upload new photo
        profileUpload.click();
    });

    profileUpload.addEventListener('change', () => {
        const file = profileUpload.files && profileUpload.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = () => {
            profileImage.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

// Initialize profile upload after DOM is ready
document.addEventListener('DOMContentLoaded', initProfileUpload);

// Intersection Observer for lazy loading (if images were added)
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        }
    });
});

// Observe all lazy-loadable images
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    }
});

// Console message
console.log('Welcome to Shivesh M Portfolio! 🚀');
console.log('Crafted with passion for web development.');

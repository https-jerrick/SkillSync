/* =========================================================
   GLOBAL JavaScript - SkillSync Website Builder (UPDATED)
   =========================================================
   This file contains:
   - Shared behavior only (NO styling)
   - Mobile menu toggle
   - User dropdown hover/click
   - Modal system
   - Search functionality  
   - Notification system
   - Smooth scroll
   - Active nav detection
   - Utility functions
   ========================================================= */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('SkillSync global.js loaded');
    
    // Initialize all global behaviors
    initializeMobileMenu();
    initializeUserDropdown();
    initializeModals();
    initializeSearch();
    initializeNotifications();
    initializeSmoothScroll();
    setActiveNavLink();
    initScrollAnimations();
});

// ==================== MOBILE MENU ====================
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
    
    // Close on nav link click
    const mobileLinks = navLinks.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// ==================== USER DROPDOWN ====================
function initializeUserDropdown() {
    const userDropdowns = document.querySelectorAll('.user-dropdown');
    
    userDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.user-avatar');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Hover support for desktop
            toggle.addEventListener('mouseenter', () => {
                menu.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', () => {
                menu.classList.remove('active');
            });
            
            // Click support for mobile
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.toggle('active');
            });
        }
    });
    
    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });
    });
}

// ==================== MODAL SYSTEM ====================
function initializeModals() {
    // Open modals
    document.querySelectorAll('[data-modal-open]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.modalOpen;
            const overlay = document.querySelector(`[data-modal-overlay="${targetId}"]`) || 
                           document.querySelector('.overlay');
            if (overlay) {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modals
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const overlay = btn.closest('.overlay');
            if (overlay) closeModal(overlay);
        });
    });
    
    // Close on overlay click
    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.overlay.active').forEach(closeModal);
        }
    });
}

function closeModal(overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ==================== SEARCH FUNCTIONALITY ====================
function initializeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            showNotification('Search functionality coming soon!', 'info');
        });
    }
}

// ==================== NOTIFICATION SYSTEM ====================
function initializeNotifications() {
    // Notification container created dynamically by showNotification()
}

window.showNotification = function(message, type = 'info', duration = 4000) {
    const container = document.querySelector('.notification-container') || createNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, duration);
    
    // Close button
    notification.querySelector('.notification-close')?.addEventListener('click', () => {
        notification.remove();
    });
};

function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}

// ==================== SMOOTH SCROLL ====================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = document.querySelector(href);
            if (target && href !== '#') {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ==================== ACTIVE NAV LINK ====================
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || href === currentPath.replace('.html', '')) {
            link.classList.add('active');
        }
    });
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// ==================== UTILITY FUNCTIONS ====================
window.SkillSyncUtils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            if (!inThrottle) {
                func.apply(this, arguments);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    validatePassword: (password) => password.length >= 8,
    
    showLoading: (element) => {
        if (!element) return;
        const original = element.innerHTML;
        element.dataset.originalContent = original;
        element.innerHTML = '<div class="spinner"></div>';
        element.disabled = true;
    },
    
    hideLoading: (element) => {
        if (!element) return;
        element.innerHTML = element.dataset.originalContent || '';
        element.disabled = false;
        delete element.dataset.originalContent;
    }
};

console.log('SkillSync global utilities loaded');
window.SkillSyncGlobal = {
    closeModal,
    showNotification: window.showNotification,
    initScrollAnimations
};

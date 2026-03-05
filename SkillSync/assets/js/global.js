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

/* =========================================================
   GLOBAL JavaScript - SkillSync Website Builder (COMPLETE WITH NAVBAR)
   ========================================================= */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('SkillSync global.js loaded');
    
    // Initialize all global behaviors
    initializeNavbar();
    initializeMobileMenu();
    initializeUserDropdown();
    initializeModals();
    initializeSearch();
    initializeNotifications();
    initializeSmoothScroll();
    setActiveNavLink();
    initScrollAnimations();
});

// ==================== NAVBAR INITIALIZATION ====================
function initializeNavbar() {
    // Set active nav link based on current page
    setActiveNavLink();
    
    // Handle window resize to ensure proper display
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu if window is resized above desktop
            if (window.innerWidth > 900) {
                const overlay = document.querySelector('.mobile-nav-overlay');
                const mobileBtn = document.querySelector('.mobile-menu-btn');
                if (overlay && overlay.classList.contains('active')) {
                    closeMobileMenu(overlay, mobileBtn);
                }
            }
        }, 250);
    });
}

// ==================== MOBILE MENU ====================
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const closeMobileBtn = document.querySelector('.close-mobile-btn');
    
    if (!mobileMenuBtn || !mobileOverlay) {
        console.log('Mobile menu elements not found - check if they exist in HTML');
        return;
    }
    
    console.log('Mobile menu initialized'); // Debug
    
    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Change icon from bars to times
        const icon = this.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
        
        console.log('Mobile menu opened');
    });
    
    // Close mobile menu function
    function closeMenu() {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Close with close button
    if (closeMobileBtn) {
        closeMobileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
        });
    }
    
    // Close on overlay click
    mobileOverlay.addEventListener('click', function(e) {
        if (e.target === mobileOverlay) {
            closeMenu();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Close on link click
    const mobileLinks = mobileOverlay.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
}

// Helper function to close mobile menu (for resize)
function closeMobileMenu(overlay, btn) {
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (btn) {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// ==================== USER DROPDOWN ====================
function initializeUserDropdown() {
    const userDropdowns = document.querySelectorAll('.user-dropdown');
    
    userDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.user-avatar');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Click support for all devices
            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdown.classList.toggle('open');
            });
            
            // Hover support for desktop
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 900) {
                    dropdown.classList.add('open');
                }
            });
            
            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth > 900) {
                    dropdown.classList.remove('open');
                }
            });
        }
    });
    
    // Close dropdowns on outside click
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-dropdown')) {
            document.querySelectorAll('.user-dropdown').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });
}

// ==================== SEARCH FUNCTIONALITY ====================
function initializeSearch() {
    const searchBtns = document.querySelectorAll('.search-btn');
    
    searchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Search functionality coming soon!', 'info');
        });
    });
    
    // Keyboard shortcut (Ctrl/Cmd + K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showNotification('Search (Ctrl+K pressed)', 'info');
        }
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

// ==================== NOTIFICATION SYSTEM ====================
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.querySelector('.notification-container')) {
        createNotificationContainer();
    }
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}

window.showNotification = function(message, type = 'info', duration = 4000) {
    const container = document.querySelector('.notification-container') || createNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    if (type === 'error') icon = 'times-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Auto remove
    const timeout = setTimeout(() => {
        removeNotification(notification);
    }, duration);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(timeout);
        removeNotification(notification);
    });
};

function removeNotification(notification) {
    notification.classList.add('removing');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
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
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
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

// Make functions globally available
window.SkillSyncGlobal = {
    closeModal,
    showNotification: window.showNotification,
    initScrollAnimations,
    closeMobileMenu
};

console.log('SkillSync global utilities loaded');

/* =========================================================
   GLOBAL JavaScript - SkillSync Website Builder (FIXED)
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

// ==================== MOBILE MENU (FIXED - uses your HTML structure) ====================
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const closeMobileBtn = document.querySelector('.close-mobile-btn');
    
    if (!mobileMenuBtn || !mobileOverlay) {
        console.log('Mobile menu elements not found');
        return;
    }
    
    console.log('Mobile menu initialized');
    
    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Change icon from bars to times
        const icon = this.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
        
        console.log('Mobile menu opened');
    });
    
    // Close mobile menu function
    function closeMenu() {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Close with close button
    if (closeMobileBtn) {
        closeMobileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
        });
    }
    
    // Close on overlay click
    mobileOverlay.addEventListener('click', function(e) {
        if (e.target === mobileOverlay) {
            closeMenu();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Close on link click
    const mobileLinks = mobileOverlay.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
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
            // Click support for all devices
            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdown.classList.toggle('open');
            });
            
            // Hover support for desktop
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 900) {
                    dropdown.classList.add('open');
                }
            });
            
            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth > 900) {
                    dropdown.classList.remove('open');
                }
            });
        }
    });
    
    // Close dropdowns on outside click
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-dropdown')) {
            document.querySelectorAll('.user-dropdown').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
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
    const searchBtns = document.querySelectorAll('.search-btn');
    
    searchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Search functionality coming soon!', 'info');
        });
    });
    
    // Keyboard shortcut (Ctrl/Cmd + K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showNotification('Search (Ctrl+K pressed)', 'info');
        }
    });
}

// ==================== NOTIFICATION SYSTEM ====================
function initializeNotifications() {
    if (!document.querySelector('.notification-container')) {
        createNotificationContainer();
    }
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}

window.showNotification = function(message, type = 'info', duration = 4000) {
    const container = document.querySelector('.notification-container') || createNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    if (type === 'error') icon = 'times-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Auto remove
    const timeout = setTimeout(() => {
        removeNotification(notification);
    }, duration);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(timeout);
        removeNotification(notification);
    });
};

function removeNotification(notification) {
    notification.classList.add('removing');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
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
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
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

// Make functions globally available
window.SkillSyncGlobal = {
    closeModal,
    showNotification: window.showNotification,
    initScrollAnimations
};

console.log('SkillSync global utilities loaded');
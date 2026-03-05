/* =========================================================
   DASHBOARD JavaScript - SkillSync (ENHANCED)
   ========================================================= */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('SkillSync Dashboard loaded');
    
    // Initialize all dashboard functionality
    initializeHeader();
    initializeDashboard();
    
    // Add animation observers
    initializeScrollAnimations();
});

// ==================== HEADER FUNCTIONALITY ====================
function initializeHeader() {
    // User dropdown toggle
    const userDropdown = document.getElementById('userDropdown');
    const avatar = document.getElementById('avatarTrigger');

    if (avatar && userDropdown) {
        avatar.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('open');
        });

        document.addEventListener('click', function(e) {
            if (!userDropdown.contains(e.target)) {
                userDropdown.classList.remove('open');
            }
        });
    }

    // Mobile menu functionality
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const overlay = document.getElementById('mobileOverlay');
    const closeBtn = document.getElementById('closeMobileBtn');

    if (mobileBtn && overlay) {
        // Open mobile menu
        mobileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Change icon with animation
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                icon.style.transform = 'rotate(90deg)';
            }
        });

        // Close mobile menu function
        function closeMobileMenu() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                icon.style.transform = 'rotate(0deg)';
            }
        }

        // Close with close button
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMobileMenu);
        }

        // Close on overlay click
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeMobileMenu();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close on link click
        const mobileLinks = overlay.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 900 && overlay.classList.contains('active')) {
                    closeMobileMenu();
                }
            }, 250);
        });
    }

    // Search button functionality
    const searchBtns = document.querySelectorAll('.search-btn');
    searchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Search functionality coming soon!', 'info');
            
            // Add ripple effect
            addRippleEffect(this);
        });
    });
}

// ==================== DASHBOARD FUNCTIONALITY ====================
function initializeDashboard() {
    // Course card interactions
    initializeCourseCards();
    
    // Certification interactions
    initializeCertifications();
    
    // Practice lab interactions
    initializePracticeLabs();
    
    // Progress circle animation
    initializeProgressCircle();
    
    // Chart animations
    initializeChartAnimations();
    
    // Set active nav link
    setActiveNavLink();
    
    // Update welcome message based on time
    updateWelcomeMessage();
    
    // Add hover effects
    addHoverEffects();
    
    // Add loading animations
    addLoadingAnimations();
}

// ==================== COURSE CARDS ====================
function initializeCourseCards() {
    // Continue Learning buttons
    const continueBtns = document.querySelectorAll('.btn-continue');
    continueBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseId = this.getAttribute('data-course');
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-title').textContent;
            
            showNotification(`Continuing: ${courseTitle}`, 'info');
            
            // Add ripple effect
            addRippleEffect(this);
            
            // Simulate loading
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.disabled = false;
                // In real app: window.location.href = `course-player.html?id=${courseId}`;
            }, 1000);
        });
    });
    
    // View Details buttons
    const detailsBtns = document.querySelectorAll('.btn-details');
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseId = this.getAttribute('data-course');
            showNotification(`Viewing course details for course ${courseId}`, 'info');
            
            // Add ripple effect
            addRippleEffect(this);
        });
    });
    
    // Course card hover effects
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// ==================== CERTIFICATIONS ====================
function initializeCertifications() {
    // Download certificate buttons
    const downloadBtns = document.querySelectorAll('.btn-download-cert');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const certCard = this.closest('.certification-card');
            const certTitle = certCard.querySelector('.certification-title').textContent;
            
            showNotification(`Downloading ${certTitle}...`, 'success');
            
            // Add ripple effect
            addRippleEffect(this);
            
            // Simulate download
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.disabled = false;
                showNotification(`${certTitle} downloaded successfully!`, 'success');
            }, 1500);
        });
    });
    
    // View certificate buttons
    const viewBtns = document.querySelectorAll('.btn-view-cert');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const certCard = this.closest('.certification-card');
            const certTitle = certCard.querySelector('.certification-title').textContent;
            showNotification(`Viewing details for ${certTitle}`, 'info');
            
            // Add ripple effect
            addRippleEffect(this);
        });
    });
}

// ==================== PRACTICE LABS ====================
function initializePracticeLabs() {
    const startButtons = document.querySelectorAll('.btn-start-assignment');
    
    startButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const assignmentCard = this.closest('.assignment-card');
            const assignmentTitle = assignmentCard.querySelector('.assignment-title').textContent;
            
            // Add ripple effect
            addRippleEffect(this);
            
            if (this.classList.contains('primary')) {
                showNotification(`Starting lab: ${assignmentTitle}`, 'info');
                
                // Simulate loading
                const originalContent = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.disabled = false;
                    showNotification(`Lab started!`, 'success');
                }, 1000);
            } else {
                showNotification(`Viewing details for: ${assignmentTitle}`, 'info');
            }
        });
    });
}

// ==================== PROGRESS CIRCLE ====================
function initializeProgressCircle() {
    const circles = document.querySelectorAll('.progress-circle-fill');
    
    circles.forEach(circle => {
        // Get the style attribute value
        const style = circle.getAttribute('style') || '';
        const match = style.match(/stroke-dashoffset:\s*([^;]+)/);
        
        if (!match) {
            // If no offset set, calculate from text
            const parent = circle.closest('.progress-circle-wrapper');
            const text = parent ? parent.querySelector('.progress-circle-text') : null;
            if (text) {
                const percentage = parseInt(text.textContent) || 78;
                const radius = 26;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (percentage / 100) * circumference;
                
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = offset;
            }
        }
    });
}

// ==================== CHART ANIMATIONS ====================
function initializeChartAnimations() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach((bar, index) => {
        // Add hover tooltips
        bar.addEventListener('mouseenter', function() {
            const height = this.style.height;
            const valueElement = this.querySelector('.chart-bar-height');
            const value = valueElement ? valueElement.textContent : '';
            
            const tooltip = document.createElement('div');
            tooltip.className = 'chart-tooltip';
            tooltip.textContent = value;
            tooltip.style.cssText = `
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #2563eb, #3b82f6);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.875rem;
                white-space: nowrap;
                z-index: 10;
                animation: fadeInUp 0.3s ease;
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        bar.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.chart-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // Animate bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'barRise 1s ease-out';
            }
        });
    }, { threshold: 0.5 });
    
    chartBars.forEach(bar => observer.observe(bar));
}

// ==================== ACTIVE NAV LINK ====================
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            
            // Add active indicator animation
            link.style.animation = 'pulse 2s infinite';
        } else {
            link.classList.remove('active');
            link.style.animation = '';
        }
    });
}

// ==================== WELCOME MESSAGE ====================
function updateWelcomeMessage() {
    const welcomeElement = document.querySelector('.welcome-header h1');
    const userName = document.querySelector('.user-name');
    
    if (welcomeElement && userName) {
        const hour = new Date().getHours();
        let greeting = '';
        
        if (hour < 12) {
            greeting = 'Good morning';
        } else if (hour < 18) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }
        
        // Animate the change
        welcomeElement.style.animation = 'fadeInDown 0.6s ease-out';
        welcomeElement.innerHTML = `${greeting}, <span class="user-name">${userName.textContent}</span>`;
        
        setTimeout(() => {
            welcomeElement.style.animation = '';
        }, 600);
    }
}

// ==================== ADDITIONAL ANIMATIONS ====================

// Add ripple effect to buttons
function addRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.position = 'absolute';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    ripple.style.borderRadius = '50%';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add hover effects
function addHoverEffects() {
    // Add smooth transitions to all cards
    const cards = document.querySelectorAll('.stat-card, .course-card, .certification-card, .assignment-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Add loading animations
function addLoadingAnimations() {
    // Animate progress bars on page load
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        
        setTimeout(() => {
            fill.style.width = width;
        }, 100);
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat-card, .course-card, .certification-card, .assignment-card, .analytics-widget, .practice-labs-widget');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ==================== NOTIFICATION SYSTEM (ENHANCED) ====================
function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    let container = document.querySelector('.notification-container');
    
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 350px;
        `;
        document.body.appendChild(container);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set colors based on type
    const colors = {
        info: '#2563eb',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
    };
    
    // Set icons based on type
    const icons = {
        info: 'fa-info-circle',
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        error: 'fa-times-circle'
    };
    
    notification.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-left: 4px solid ${colors[type] || colors.info};
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        animation: slideInRight 0.3s ease;
        transform-origin: right;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${icons[type]}" style="color: ${colors[type] || colors.info}; font-size: 1.2rem;"></i>
            <span style="color: #1f2937; flex: 1;">${message}</span>
        </div>
        <button class="notification-close" style="background: none; border: none; color: #6b7280; cursor: pointer; font-size: 1.25rem; transition: all 0.3s ease;">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Add animation styles if not present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes ripple {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(4);
                    opacity: 0;
                }
            }
            
            .notification.removing {
                animation: slideOutRight 0.3s ease forwards;
            }
            
            .notification-close:hover {
                color: #ef4444;
                transform: scale(1.1);
            }
            
            .progress-fill {
                transition: width 1s ease-in-out;
            }
            
            [data-animate] {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease-out;
            }
            
            [data-animate].animated {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto remove after 4 seconds
    const timeout = setTimeout(() => {
        notification.classList.add('removing');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(timeout);
        notification.classList.add('removing');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
    
    // Hover effect to pause auto-remove
    notification.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
    });
    
    notification.addEventListener('mouseleave', () => {
        setTimeout(() => {
            notification.classList.add('removing');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 2000);
    });
}

// Make showNotification available globally
window.showNotification = showNotification;

// Export functions for use in other files
window.DashboardUtils = {
    showNotification,
    addRippleEffect,
    initializeProgressCircle,
    updateWelcomeMessage
};
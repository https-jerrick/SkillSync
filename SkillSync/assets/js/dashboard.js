/* =========================================================
   HEADER JavaScript - Mobile Menu & Interactions
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
});

function initializeHeader() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle mobile menu
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Update aria label
            const isExpanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            this.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Open menu');
            
            // Toggle body scroll
            body.style.overflow = isExpanded ? 'hidden' : '';
            
            // Update hamburger icon
            const icon = this.querySelector('i');
            if (icon) {
                if (isExpanded) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = navLinks.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close mobile menu with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // Create or show search modal
            showSearchModal();
        });
    }
    
    // User dropdown for touch devices
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown) {
        const dropdownMenu = userDropdown.querySelector('.dropdown-menu');
        const userAvatar = userDropdown.querySelector('.user-avatar');
        
        // Toggle dropdown on click for touch devices
        userAvatar.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const isVisible = dropdownMenu.style.display === 'block';
                dropdownMenu.style.display = isVisible ? 'none' : 'block';
                dropdownMenu.style.opacity = isVisible ? '0' : '1';
                dropdownMenu.style.visibility = isVisible ? 'hidden' : 'visible';
                dropdownMenu.style.transform = isVisible ? 'translateY(-10px)' : 'translateY(0)';
            }
        });
        
        // Close dropdown when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !userDropdown.contains(e.target) && 
                dropdownMenu.style.display === 'block') {
                closeUserDropdown();
            }
        });
    }
    
    // Set active nav link based on current page
    setActiveNavLink();
}

function closeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        body.style.overflow = '';
        
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Open menu');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
}

function closeUserDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownMenu) {
        dropdownMenu.style.display = 'none';
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.visibility = 'hidden';
        dropdownMenu.style.transform = 'translateY(-10px)';
    }
}

function showSearchModal() {
    // Check if search modal exists
    let searchModal = document.getElementById('search-modal');
    
    if (!searchModal) {
        // Create search modal
        searchModal = document.createElement('div');
        searchModal.id = 'search-modal';
        searchModal.className = 'search-modal';
        searchModal.innerHTML = `
            <div class="search-modal-content">
                <div class="search-modal-header">
                    <h3>Search SkillSync</h3>
                    <button class="close-search" aria-label="Close search">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="search-modal-body">
                    <div class="search-input-wrapper">
                        <i class="fas fa-search"></i>
                        <input type="text" 
                               class="search-input" 
                               placeholder="Search courses, tutorials, resources..."
                               autocomplete="off"
                               aria-label="Search input">
                    </div>
                    <div class="search-suggestions">
                        <h4>Popular Searches:</h4>
                        <div class="suggestion-tags">
                            <button class="suggestion-tag">JavaScript</button>
                            <button class="suggestion-tag">Python</button>
                            <button class="suggestion-tag">Web Development</button>
                            <button class="suggestion-tag">Data Science</button>
                            <button class="suggestion-tag">UI/UX Design</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(searchModal);
        
        // Add search modal styles
        const searchModalStyles = document.createElement('style');
        searchModalStyles.textContent = `
            .search-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(8px);
                z-index: 2000;
                display: none;
                align-items: flex-start;
                justify-content: center;
                padding-top: 20vh;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .search-modal.active {
                display: flex;
                opacity: 1;
            }
            
            .search-modal-content {
                background: white;
                border-radius: 1.5rem;
                padding: 2rem;
                width: 90%;
                max-width: 600px;
                transform: translateY(-20px);
                transition: transform 0.3s ease;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            
            .search-modal.active .search-modal-content {
                transform: translateY(0);
            }
            
            .search-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            
            .search-modal-header h3 {
                margin: 0;
                font-size: 1.5rem;
                font-weight: 600;
                color: #1f2937;
            }
            
            .close-search {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
                padding: 0.5rem;
                border-radius: 0.5rem;
                transition: all 0.3s ease;
            }
            
            .close-search:hover {
                background: #f3f4f6;
                color: #ef4444;
            }
            
            .search-input-wrapper {
                position: relative;
                margin-bottom: 2rem;
            }
            
            .search-input-wrapper i {
                position: absolute;
                left: 1rem;
                top: 50%;
                transform: translateY(-50%);
                color: #6b7280;
                font-size: 1.25rem;
            }
            
            .search-input {
                width: 100%;
                padding: 1rem 1rem 1rem 3rem;
                font-size: 1rem;
                border: 2px solid #e5e7eb;
                border-radius: 0.875rem;
                transition: all 0.3s ease;
                background: #f8fafc;
            }
            
            .search-input:focus {
                outline: none;
                border-color: #2563eb;
                box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
                background: white;
            }
            
            .search-suggestions h4 {
                font-size: 0.875rem;
                font-weight: 600;
                color: #6b7280;
                margin-bottom: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            
            .suggestion-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .suggestion-tag {
                padding: 0.5rem 1rem;
                background: #f3f4f6;
                color: #4b5563;
                border: none;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .suggestion-tag:hover {
                background: #2563eb;
                color: white;
                transform: translateY(-2px);
            }
            
            @media (prefers-color-scheme: dark) {
                .search-modal-content {
                    background: #1f2937;
                }
                
                .search-modal-header h3 {
                    color: #f9fafb;
                }
                
                .search-input {
                    background: #374151;
                    border-color: #4b5563;
                    color: #f9fafb;
                }
                
                .search-input:focus {
                    border-color: #60a5fa;
                    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
                    background: #374151;
                }
                
                .suggestion-tag {
                    background: #374151;
                    color: #d1d5db;
                }
                
                .suggestion-tag:hover {
                    background: #60a5fa;
                    color: #1f2937;
                }
            }
        `;
        document.head.appendChild(searchModalStyles);
        
        // Add event listeners for the new modal
        const closeSearchBtn = searchModal.querySelector('.close-search');
        const suggestionTags = searchModal.querySelectorAll('.suggestion-tag');
        const searchInput = searchModal.querySelector('.search-input');
        
        closeSearchBtn.addEventListener('click', closeSearchModal);
        
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', function() {
                searchInput.value = this.textContent;
                performSearch(searchInput.value);
            });
        });
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
        
        // Close modal when clicking outside
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchModal.classList.contains('active')) {
                closeSearchModal();
            }
        });
    }
    
    // Show the modal
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus the input
    setTimeout(() => {
        const searchInput = searchModal.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }, 100);
}

function closeSearchModal() {
    const searchModal = document.getElementById('search-modal');
    if (searchModal) {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function performSearch(query) {
    if (query.trim()) {
        console.log('Searching for:', query);
        // In a real application, this would make an API call
        // For now, just close the modal and show a notification
        closeSearchModal();
        
        // Use global notification if available
        if (window.SkillSync && window.SkillSync.utils && window.SkillSync.utils.showNotification) {
            window.SkillSync.utils.showNotification(`Searching for "${query}"...`, 'info');
        } else {
            // Simple fallback
            alert(`Searching for: ${query}`);
        }
    }
}

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPath.includes(href) || 
            (href === 'dashboard.html' && currentPath.includes('/dashboard')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Export functions for global use
window.SkillSync = window.SkillSync || {};
window.SkillSync.header = {
    closeMobileMenu,
    showSearchModal,
    closeSearchModal,
    performSearch
};


/* =========================================================
   DASHBOARD JavaScript - Essential Functions Only
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('SkillSync Dashboard loaded');
    
    // Initialize all dashboard functionality
    initializeDashboard();
});

function initializeDashboard() {
    // Initialize course card interactions
    initializeCourseCards();
    
    // Initialize button actions
    initializeButtonActions();
    
    // Initialize progress animations
    initializeProgressAnimations();
}

function initializeCourseCards() {
    // Course card hover effects are handled by CSS
    
    // Continue Learning button click
    const continueBtns = document.querySelectorAll('.btn-continue');
    continueBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseId = this.getAttribute('data-course');
            window.location.href = `course-player.html?course=${courseId}&continue=true`;
        });
    });
    
    // View Details button click
    const detailsBtns = document.querySelectorAll('.btn-details');
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseId = this.getAttribute('data-course');
            window.location.href = `course-details.html?id=${courseId}`;
        });
    });
}

function initializeButtonActions() {
    // Start Practice buttons
    const practiceBtns = document.querySelectorAll('.btn-start-practice');
    practiceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const assignmentTitle = this.closest('.assignment-item').querySelector('.assignment-title').textContent;
            showNotification(`Starting "${assignmentTitle}"...`, 'info');
            // In a real app, this would navigate to the practice lab
        });
    });
    
    // Certification action buttons
    const certBtns = document.querySelectorAll('.btn-cert-action');
    certBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const certTitle = this.closest('.certification-item').querySelector('.certification-title').textContent;
            
            if (btn.classList.contains('btn-download')) {
                showNotification(`Downloading "${certTitle}" certificate...`, 'success');
            } else if (btn.classList.contains('btn-view')) {
                showNotification(`Viewing requirements for "${certTitle}"...`, 'info');
            }
        });
    });
    
    // View Analytics button
    const analyticsBtn = document.querySelector('.btn-view-analytics');
    if (analyticsBtn) {
        analyticsBtn.addEventListener('click', function() {
            window.location.href = 'analytics.html';
        });
    }
}

function initializeProgressAnimations() {
    // Animate progress bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    // The width is already set inline, CSS handles the animation
                    progressFill.style.opacity = '1';
                }
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => observer.observe(card));
}

function showNotification(message, type = 'info') {
    // Use the global notification function if available
    if (window.SkillSync && window.SkillSync.utils && window.SkillSync.utils.showNotification) {
        window.SkillSync.utils.showNotification(message, type);
        return;
    }
    
    // Fallback notification
    console.log(`${type.toUpperCase()}: ${message}`);
    
    // Create simple notification
    const notification = document.createElement('div');
    notification.className = `simple-notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        border-left: 4px solid var(--${type}-color, #2563eb);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .progress-fill {
        opacity: 0;
        transition: opacity 0.5s ease 0.3s, width 0.5s ease;
    }
    
    .course-card:hover .progress-fill {
        opacity: 1;
    }
`;
document.head.appendChild(style);

/* =========================================================
   DASHBOARD JavaScript - Updated Layout
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('SkillSync Dashboard with updated layout loaded');
    
    // Initialize all dashboard functionality
    initializeDashboard();
});

function initializeDashboard() {
    // Initialize course card interactions
    initializeCourseCards();
    
    // Initialize certification interactions
    initializeCertifications();
    
    // Initialize practice lab interactions
    initializePracticeLabs();
    
    // Initialize button actions
    initializeButtonActions();
    
    // Initialize progress animations
    initializeProgressAnimations();
}

function initializeCourseCards() {
    // Course card hover effects are handled by CSS
    
    // Continue Learning button click
    const continueBtns = document.querySelectorAll('.btn-continue');
    continueBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseId = this.getAttribute('data-course');
            showNotification(`Continuing course ${courseId}...`, 'info');
            // window.location.href = `course-player.html?course=${courseId}&continue=true`;
        });
    });
    
    // View Details button click
    const detailsBtns = document.querySelectorAll('.btn-details');
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseId = this.getAttribute('data-course');
            showNotification(`Viewing course ${courseId} details...`, 'info');
            // window.location.href = `course-details.html?id=${courseId}`;
        });
    });
}

function initializeCertifications() {
    // Certification card click
    const certCards = document.querySelectorAll('.certification-card');
    certCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn-cert-action')) {
                const certTitle = this.querySelector('.certification-title').textContent;
                const status = this.getAttribute('data-status');
                showNotification(`Viewing ${status} certification: ${certTitle}`, 'info');
            }
        });
    });
    
    // Certification action buttons
    const certBtns = document.querySelectorAll('.btn-cert-action');
    certBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const certCard = this.closest('.certification-card');
            const certTitle = certCard.querySelector('.certification-title').textContent;
            
            if (btn.classList.contains('btn-download-cert')) {
                showNotification(`Downloading "${certTitle}" certificate...`, 'success');
            } else if (btn.classList.contains('btn-view-cert')) {
                const actionText = this.textContent.trim();
                showNotification(`${actionText} for "${certTitle}"...`, 'info');
            }
        });
    });
}

function initializePracticeLabs() {
    // Practice lab assignment cards
    const assignmentCards = document.querySelectorAll('.assignment-card');
    assignmentCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn-start-assignment')) {
                const assignmentTitle = this.querySelector('.assignment-title').textContent;
                showNotification(`Viewing assignment: ${assignmentTitle}`, 'info');
            }
        });
    });
    
    // Start assignment buttons
    const assignmentBtns = document.querySelectorAll('.btn-start-assignment');
    assignmentBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const assignmentCard = this.closest('.assignment-card');
            const assignmentTitle = assignmentCard.querySelector('.assignment-title').textContent;
            
            if (btn.classList.contains('primary')) {
                const actionText = this.textContent.trim();
                showNotification(`${actionText}: ${assignmentTitle}`, 'success');
            } else if (btn.classList.contains('secondary')) {
                showNotification(`Viewing details: ${assignmentTitle}`, 'info');
            }
        });
    });
}

function initializeButtonActions() {
    // View Analytics button
    const analyticsBtn = document.querySelector('.btn-view-analytics');
    if (analyticsBtn) {
        analyticsBtn.addEventListener('click', function() {
            showNotification('Loading detailed analytics...', 'info');
            // window.location.href = 'analytics.html';
        });
    }
    
    // View All buttons
    const viewAllLinks = document.querySelectorAll('.view-all-link');
    viewAllLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const section = this.closest('section');
            const sectionTitle = section.querySelector('h2, h3').textContent;
            showNotification(`Viewing all ${sectionTitle}...`, 'info');
        });
    });
}

function initializeProgressAnimations() {
    // Animate progress bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    // The width is already set inline, CSS handles the animation
                    progressFill.style.opacity = '1';
                }
            }
        });
    }, { threshold: 0.3 });
    
    // Observe all course and certification cards
    const cards = document.querySelectorAll('.course-card, .certification-card');
    cards.forEach(card => observer.observe(card));
    
    // Animate chart bars
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.opacity = '1';
            bar.style.transform = 'scaleY(1)';
        }, index * 100);
    });
}

function showNotification(message, type = 'info') {
    // Use the global notification function if available
    if (window.SkillSync && window.SkillSync.utils && window.SkillSync.utils.showNotification) {
        window.SkillSync.utils.showNotification(message, type);
        return;
    }
    
    // Fallback notification
    console.log(`${type.toUpperCase()}: ${message}`);
    
    // Create simple notification
    const notification = document.createElement('div');
    notification.className = `simple-notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        border-left: 4px solid var(--${type}-color, #2563eb);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .progress-fill {
        opacity: 0;
        transition: opacity 0.5s ease 0.3s, width 0.5s ease;
    }
    
    .chart-bar {
        opacity: 0;
        transform: scaleY(0);
        transform-origin: bottom;
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .course-card:hover .progress-fill,
    .certification-card:hover .progress-fill {
        opacity: 1;
    }
`;
document.head.appendChild(style);
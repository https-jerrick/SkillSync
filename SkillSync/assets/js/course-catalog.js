/* =========================================================
   COURSE CATALOG JavaScript - SkillSync (FIXED - No Duplicate Notifications)
   =========================================================
   Uses global notification system - No alerts, no duplicates
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Course Catalog page loaded');
    
    // ==================== BASIC FUNCTIONALITY ====================
    initializeSearch();
    initializeFilters();
    initializePagination();
    initializeCourseActions();
    
    // ==================== UPDATE COURSE COUNT ====================
    updateCourseCount();
    
    // ==================== PREVENT DUPLICATE INITIALIZATION ====================
    // Mark that this page has been initialized
    document.body.setAttribute('data-catalog-initialized', 'true');
});

// ==================== SEARCH FUNCTIONALITY (FIXED - No Duplicates) ====================
function initializeSearch() {
    const searchInput = document.getElementById('courseSearch');
    const searchButton = document.querySelector('.search-button');
    const tagButtons = document.querySelectorAll('.tag-btn');
    
    // Remove any existing listeners first to prevent duplicates
    if (searchButton) {
        // Clone and replace to remove all listeners
        const newSearchButton = searchButton.cloneNode(true);
        searchButton.parentNode.replaceChild(newSearchButton, searchButton);
        
        // Add single listener
        newSearchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const query = searchInput ? searchInput.value.trim() : '';
            performSearch(query);
        });
    }
    
    if (searchInput) {
        // Clone and replace to remove all listeners
        const newSearchInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearchInput, searchInput);
        
        // Add single listener
        newSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value.trim());
            }
        });
    }
    
    // Tag buttons - refresh the list after potential DOM changes
    const freshTagButtons = document.querySelectorAll('.tag-btn');
    freshTagButtons.forEach(button => {
        // Clone and replace to remove all listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add single listener
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            const tag = this.getAttribute('data-search');
            const searchField = document.getElementById('courseSearch');
            if (searchField) {
                searchField.value = tag;
                performSearch(tag);
            }
        });
    });
}

// Search state to prevent multiple simultaneous searches
let isSearching = false;
let searchTimeout = null;

function performSearch(query) {
    // Prevent multiple searches at the same time
    if (isSearching) return;
    
    if (!query) {
        showNotification('Please enter a search term.', 'warning');
        return;
    }
    
    // Clear any pending search timeout
    if (searchTimeout) {
        clearTimeout(searchTimeout);
        searchTimeout = null;
    }
    
    isSearching = true;
    
    // Show only ONE searching notification
    showNotification(`Searching for: "${query}"`, 'info');
    
    // Simulate search with timeout
    searchTimeout = setTimeout(() => {
        // Show only ONE result notification
        showNotification(`Found 8 courses matching "${query}"`, 'success');
        
        // Reset search state
        isSearching = false;
        searchTimeout = null;
    }, 1000);
}

// ==================== NOTIFICATION HELPER (FIXED) ====================
function showNotification(message, type = 'info') {
    // Use global notification if available
    if (window.SkillSyncGlobal && typeof window.SkillSyncGlobal.showNotification === 'function') {
        window.SkillSyncGlobal.showNotification(message, type);
    } else if (window.showNotification && typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        // Fallback to a single notification system
        createSingleNotification(message, type);
    }
}

// ==================== SINGLE NOTIFICATION SYSTEM (FIXED) ====================
let notificationContainer = null;
let activeNotification = null;
let notificationTimer = null;

function createSingleNotification(message, type = 'info') {
    // Remove any existing notification
    if (activeNotification && activeNotification.parentNode) {
        activeNotification.remove();
        activeNotification = null;
    }
    
    // Clear any pending timer
    if (notificationTimer) {
        clearTimeout(notificationTimer);
        notificationTimer = null;
    }
    
    // Create container if it doesn't exist
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'single-notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
        `;
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification
    const notification = document.createElement('div');
    activeNotification = notification;
    
    const colors = {
        info: '#2563eb',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
    };
    
    const icons = {
        info: 'info-circle',
        success: 'check-circle',
        warning: 'exclamation-triangle',
        error: 'times-circle'
    };
    
    notification.style.cssText = `
        background: white;
        border-left: 4px solid ${colors[type] || colors.info};
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${icons[type]}" style="color: ${colors[type] || colors.info}; font-size: 1.25rem;"></i>
        <span style="flex: 1; font-size: 0.95rem; color: #1f2937;">${message}</span>
        <button class="notification-close" style="background: none; border: none; color: #9ca3af; cursor: pointer; font-size: 1.25rem; padding: 0 5px;">&times;</button>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        if (notificationTimer) {
            clearTimeout(notificationTimer);
            notificationTimer = null;
        }
        notification.remove();
        activeNotification = null;
    });
    
    // Auto remove after 3 seconds
    notificationTimer = setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                    if (activeNotification === notification) {
                        activeNotification = null;
                    }
                }
            }, 300);
        }
        notificationTimer = null;
    }, 3000);
    
    // Add animation styles if not present
    if (!document.getElementById('single-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'single-notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== REST OF THE FUNCTIONS (unchanged but improved) ====================
function initializeFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const filterRadios = document.querySelectorAll('.filter-radio');
    const ratingButtons = document.querySelectorAll('.rating-option');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const sortSelect = document.getElementById('sortSelect');
    
    // Remove existing listeners and add new ones
    if (clearFiltersBtn) {
        const newClearBtn = clearFiltersBtn.cloneNode(true);
        clearFiltersBtn.parentNode.replaceChild(newClearBtn, clearFiltersBtn);
        
        newClearBtn.addEventListener('click', function() {
            filterCheckboxes.forEach(cb => cb.checked = false);
            filterRadios.forEach(rb => {
                if (rb.value === 'all') rb.checked = true;
            });
            ratingButtons.forEach(btn => {
                if (btn.dataset.rating === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            showNotification('All filters cleared', 'success');
            updateCourseCount(12);
        });
    }
    
    // Add listeners to checkboxes
    filterCheckboxes.forEach(checkbox => {
        const newCheckbox = checkbox.cloneNode(true);
        checkbox.parentNode.replaceChild(newCheckbox, checkbox);
        
        newCheckbox.addEventListener('change', function() {
            showNotification('Filter applied', 'info');
        });
    });
    
    // Sort select
    if (sortSelect) {
        const newSortSelect = sortSelect.cloneNode(true);
        sortSelect.parentNode.replaceChild(newSortSelect, sortSelect);
        
        newSortSelect.addEventListener('change', function() {
            const sortText = this.options[this.selectedIndex].text;
            showNotification(`Sorting by: ${sortText}`, 'info');
        });
    }
}

function initializePagination() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageBtns = document.querySelectorAll('.page-btn');
    
    if (prevBtn) {
        const newPrevBtn = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
        
        newPrevBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-btn.active');
            if (activePage) {
                const currentPage = parseInt(activePage.textContent);
                if (currentPage > 1) {
                    showNotification(`Loading page ${currentPage - 1}...`, 'info');
                }
            }
        });
    }
    
    if (nextBtn) {
        const newNextBtn = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
        
        newNextBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-btn.active');
            if (activePage) {
                const currentPage = parseInt(activePage.textContent);
                showNotification(`Loading page ${currentPage + 1}...`, 'info');
            }
        });
    }
}

function initializeCourseActions() {
    const courseActions = document.querySelectorAll('.course-action');
    
    courseActions.forEach(action => {
        const newAction = action.cloneNode(true);
        action.parentNode.replaceChild(newAction, action);
        
        newAction.addEventListener('click', function(e) {
            e.preventDefault();
            
            const courseCard = this.closest('.course-card');
            if (!courseCard) return;
            
            const courseTitle = courseCard.querySelector('.course-title')?.textContent || 'Course';
            showNotification(`Enrolling in: ${courseTitle}`, 'info');
        });
    });
}

function updateCourseCount(count) {
    const courseCountEl = document.getElementById('courseCount');
    if (!courseCountEl) return;
    
    if (count !== undefined) {
        courseCountEl.textContent = count;
    } else {
        const visibleCourses = document.querySelectorAll('.course-card').length;
        courseCountEl.textContent = visibleCourses;
    }
}
/* =========================================================
   COURSE CATALOG JavaScript - SkillSync
   =========================================================
   Minimal functionality only - No design/styling in JS
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Course Catalog page loaded');
    
    // ==================== BASIC FUNCTIONALITY ====================
    initializeSearch();
    initializeFilters();
    initializePagination();
    initializeCourseActions();
});

// ==================== SEARCH FUNCTIONALITY ====================
function initializeSearch() {
    const searchInput = document.getElementById('courseSearch');
    const searchButton = document.querySelector('.search-button');
    const tagButtons = document.querySelectorAll('.tag-btn');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                alert(`Searching for: "${query}"\n\nIn a real application, this would search through courses.`);
            } else {
                alert('Please enter a search term.');
            }
        });
    }
    
    // Search on Enter key
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    // Tag buttons
    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tag = this.getAttribute('data-search');
            searchInput.value = tag;
            searchButton.click();
        });
    });
}

// ==================== FILTER FUNCTIONALITY ====================
function initializeFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const filterRadios = document.querySelectorAll('.filter-radio');
    const ratingButtons = document.querySelectorAll('.rating-option');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const sortSelect = document.getElementById('sortSelect');
    
    // Filter checkboxes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateActiveFilters();
        });
    });
    
    // Filter radios
    filterRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateActiveFilters();
        });
    });
    
    // Rating buttons
    ratingButtons.forEach(button => {
        button.addEventListener('click', function() {
            ratingButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateActiveFilters();
        });
    });
    
    // Clear filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
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
            updateActiveFilters();
            alert('All filters cleared.');
        });
    }
    
    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            alert(`Sorting by: ${this.options[this.selectedIndex].text}\n\nIn a real application, courses would be sorted.`);
        });
    }
}

function updateActiveFilters() {
    const activeCategories = Array.from(
        document.querySelectorAll('.filter-checkbox:checked')
    ).map(cb => cb.value);
    
    const activeLevel = document.querySelector('.filter-radio[name="level"]:checked').value;
    const activePrice = document.querySelector('.filter-radio[name="price"]:checked').value;
    const activeRating = document.querySelector('.rating-option.active').dataset.rating;
    
    // In a real app, this would filter courses
    // For demo, just show what filters are active
    let filterText = '';
    if (activeCategories.length > 0) {
        filterText += `Categories: ${activeCategories.join(', ')}\n`;
    }
    if (activeLevel !== 'all') {
        filterText += `Level: ${activeLevel}\n`;
    }
    if (activePrice !== 'all') {
        filterText += `Price: ${activePrice}\n`;
    }
    if (activeRating !== 'all') {
        filterText += `Rating: ${activeRating}+`;
    }
    
    if (filterText) {
        console.log('Active filters:', filterText);
    }
    
    // Update course count (demo)
    const courseCount = document.getElementById('courseCount');
    if (courseCount) {
        // Simulate different counts based on filters
        let count = 12; // Default count
        if (activeCategories.length > 0) count = Math.floor(count / 2);
        if (activeLevel !== 'all') count = Math.floor(count / 1.5);
        if (activePrice !== 'all') count = Math.floor(count / 1.2);
        courseCount.textContent = count;
    }
}

// ==================== PAGINATION ====================
function initializePagination() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageBtns = document.querySelectorAll('.page-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-btn.active');
            const currentPage = parseInt(activePage.textContent);
            
            if (currentPage > 1) {
                // Update active page
                pageBtns.forEach(btn => btn.classList.remove('active'));
                pageBtns[currentPage - 2].classList.add('active');
                
                // Enable/disable buttons
                prevBtn.disabled = currentPage === 2;
                nextBtn.disabled = false;
                
                alert(`Loading page ${currentPage - 1}...`);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-btn.active');
            const currentPage = parseInt(activePage.textContent);
            const totalPages = 5; // Hardcoded for demo
            
            if (currentPage < totalPages) {
                // Update active page
                pageBtns.forEach(btn => btn.classList.remove('active'));
                const nextPageBtn = document.querySelector(`.page-btn:nth-child(${currentPage + 1})`);
                if (nextPageBtn) nextPageBtn.classList.add('active');
                
                // Enable/disable buttons
                prevBtn.disabled = false;
                nextBtn.disabled = currentPage === totalPages - 1;
                
                alert(`Loading page ${currentPage + 1}...`);
            }
        });
    }
    
    // Page number buttons
    pageBtns.forEach(btn => {
        if (!btn.classList.contains('active')) {
            btn.addEventListener('click', function() {
                if (!this.classList.contains('page-dots')) {
                    const pageNum = parseInt(this.textContent);
                    
                    // Update active page
                    pageBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Update button states
                    prevBtn.disabled = pageNum === 1;
                    nextBtn.disabled = pageNum === 5; // Last page
                    
                    alert(`Loading page ${pageNum}...`);
                }
            });
        }
    });
}

// ==================== COURSE ACTIONS ====================
function initializeCourseActions() {
    const courseActions = document.querySelectorAll('.course-action');
    
    courseActions.forEach(action => {
        action.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-title').textContent;
            const coursePrice = courseCard.querySelector('.price').textContent;
            const isFree = coursePrice === 'Free';
            
            if (isFree) {
                alert(`Enrolling in: ${courseTitle}\n\nThis course is free! Starting now...`);
            } else {
                const confirmEnroll = confirm(`Enroll in: ${courseTitle}\n\nPrice: ${coursePrice}\n\nThis is a demo - no payment will be processed.\n\nWould you like to continue?`);
                if (confirmEnroll) {
                    alert(`Successfully enrolled in "${courseTitle}"!\n\nCourse added to your dashboard.`);
                }
            }
        });
    });
}
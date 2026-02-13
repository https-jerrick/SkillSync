// Learning Path Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Learning Path page loaded');
    
    // Initialize all functions
    initLearningPath();
});

function initLearningPath() {
    // Initialize search
    initSearch();
    
    // Initialize category filters
    initCategoryFilters();
    
    // Initialize path filters
    initPathFilters();
    
    // Initialize view buttons
    initViewButtons();
    
    // Initialize continue buttons
    initContinueButtons();
    
    // Initialize path builder
    initPathBuilder();
    
    // Initialize modal
    initModal();
}

function initSearch() {
    const searchInput = document.getElementById('pathSearch');
    const searchBtn = document.querySelector('.search-btn-submit');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchPaths(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchPaths(this.value);
            }
        });
    }
}

function searchPaths(query) {
    if (query.trim()) {
        showMessage(`Searching for: ${query}`);
        
        // Filter paths based on search
        const pathCards = document.querySelectorAll('.featured-path-card');
        const searchTerm = query.toLowerCase();
        
        pathCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            
            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

function initCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all
            categoryCards.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
}

function filterByCategory(category) {
    const pathCards = document.querySelectorAll('.featured-path-card');
    
    pathCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    showMessage(`Showing ${category} paths`);
}

function initPathFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterByType(filter);
        });
    });
}

function filterByType(type) {
    const pathCards = document.querySelectorAll('.featured-path-card');
    
    pathCards.forEach(card => {
        const filters = card.getAttribute('data-filter');
        
        if (filters.includes(type)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    showMessage(`Filtered by: ${type}`);
}

function initViewButtons() {
    const viewBtns = document.querySelectorAll('.view-btn');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const pathId = this.getAttribute('data-path');
            openPathModal(pathId);
        });
    });
}

function initContinueButtons() {
    const continueBtns = document.querySelectorAll('.continue-btn');
    
    continueBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const pathId = this.getAttribute('data-path');
            continuePath(pathId);
        });
    });
}

function initPathBuilder() {
    const buildBtn = document.getElementById('buildBtn');
    
    if (buildBtn) {
        buildBtn.addEventListener('click', function() {
            showMessage('Opening Path Builder...');
            // In real app, redirect to builder page
        });
    }
}

function initModal() {
    const modal = document.getElementById('pathModal');
    const closeBtn = document.querySelector('.close-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const enrollBtn = document.querySelector('.enroll-btn');
    
    // Close modal
    [closeBtn, closeModalBtn].forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close with ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Enroll button
    if (enrollBtn) {
        enrollBtn.addEventListener('click', function() {
            const pathTitle = document.querySelector('.modal-header h2').textContent;
            showMessage(`Enrolled in: ${pathTitle}`);
            closeModal();
        });
    }
}

function openPathModal(pathId) {
    const modal = document.getElementById('pathModal');
    const pathData = getPathData(pathId);
    
    if (!pathData) return;
    
    // Set modal content
    document.querySelector('.modal-header h2').textContent = pathData.title;
    document.querySelector('.modal-image img').src = pathData.image;
    document.querySelector('.modal-image img').alt = pathData.title;
    
    // Set course list
    const coursesList = document.querySelector('.courses-list');
    coursesList.innerHTML = '';
    
    pathData.courses.forEach((course, index) => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        courseItem.innerHTML = `
            <div class="course-header">
                <div class="course-title">${course.title}</div>
                <div class="course-number">${course.number}</div>
            </div>
            <div class="course-details">
                <div><i class="fas fa-clock"></i> ${course.duration}</div>
                <div class="course-features">
                    ${course.lab ? '<div class="course-feature"><i class="fas fa-flask"></i> Lab</div>' : ''}
                    ${course.assessment ? '<div class="course-feature"><i class="fas fa-check-circle"></i> Assessment</div>' : ''}
                </div>
            </div>
        `;
        coursesList.appendChild(courseItem);
    });
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('pathModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function continuePath(pathId) {
    const pathNames = {
        'cloud': 'Cloud Architect Path',
        'data-science': 'Data Science Path',
        'web': 'Web Developer Path'
    };
    
    const pathName = pathNames[pathId] || pathId;
    showMessage(`Continuing: ${pathName}`);
}

function getPathData(pathId) {
    const pathData = {
        'frontend': {
            title: 'Front-End Developer Path',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            courses: [
                { number: '01', title: 'HTML5 & CSS3 Fundamentals', duration: '20 hours', lab: true, assessment: true },
                { number: '02', title: 'JavaScript for Web Development', duration: '30 hours', lab: true, assessment: true },
                { number: '03', title: 'Advanced CSS & Responsive Design', duration: '25 hours', lab: true, assessment: true },
                { number: '04', title: 'React Fundamentals', duration: '35 hours', lab: true, assessment: true },
                { number: '05', title: 'State Management with Redux', duration: '25 hours', lab: true, assessment: true },
                { number: '06', title: 'Modern Web Tooling', duration: '20 hours', lab: true, assessment: false },
                { number: '07', title: 'Web Performance Optimization', duration: '15 hours', lab: true, assessment: true },
                { number: '08', title: 'Capstone Project', duration: '30 hours', lab: true, assessment: true }
            ]
        },
        'analyst': {
            title: 'Data Analyst Path',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            courses: [
                { number: '01', title: 'Python for Data Analysis', duration: '25 hours', lab: true, assessment: true },
                { number: '02', title: 'SQL Fundamentals', duration: '30 hours', lab: true, assessment: true },
                { number: '03', title: 'Data Visualization', duration: '20 hours', lab: true, assessment: true },
                { number: '04', title: 'Excel for Data Analysis', duration: '15 hours', lab: true, assessment: true },
                { number: '05', title: 'Tableau Dashboard', duration: '25 hours', lab: true, assessment: true },
                { number: '06', title: 'Statistical Analysis', duration: '20 hours', lab: true, assessment: true },
                { number: '07', title: 'Capstone Project', duration: '35 hours', lab: true, assessment: true }
            ]
        },
        'uiux': {
            title: 'UI/UX Designer Path',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            courses: [
                { number: '01', title: 'UI/UX Design Principles', duration: '25 hours', lab: true, assessment: true },
                { number: '02', title: 'Figma Masterclass', duration: '30 hours', lab: true, assessment: true },
                { number: '03', title: 'User Research', duration: '20 hours', lab: true, assessment: true },
                { number: '04', title: 'Wireframing & Prototyping', duration: '25 hours', lab: true, assessment: true },
                { number: '05', title: 'Visual Design', duration: '20 hours', lab: true, assessment: true },
                { number: '06', title: 'Design Systems', duration: '25 hours', lab: true, assessment: true },
                { number: '07', title: 'Mobile App Design', duration: '20 hours', lab: true, assessment: true },
                { number: '08', title: 'Accessibility', duration: '15 hours', lab: true, assessment: true },
                { number: '09', title: 'Capstone Project', duration: '40 hours', lab: true, assessment: true }
            ]
        }
    };
    
    return pathData[pathId];
}

function showMessage(message) {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: #2563eb;
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animation styles
const style = document.createElement('style');
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
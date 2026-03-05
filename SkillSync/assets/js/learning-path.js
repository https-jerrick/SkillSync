// Learning Path Page JavaScript (ENHANCED)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Learning Path page loaded');
    
    // Initialize all functions
    initLearningPath();
    
    // Add scroll animations
    initScrollAnimations();
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
    
    // Add hover effects
    addHoverEffects();
    
    // Animate progress bars
    animateProgressBars();
}

function initSearch() {
    const searchInput = document.getElementById('pathSearch');
    const searchBtn = document.querySelector('.search-btn-submit');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            addRippleEffect(this);
            searchPaths(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addRippleEffect(searchBtn);
                searchPaths(this.value);
            }
        });
        
        // Add input animation
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }
}

function searchPaths(query) {
    if (query.trim()) {
        showNotification(`Searching for: ${query}`, 'info');
        
        // Filter paths based on search
        const pathCards = document.querySelectorAll('.featured-path-card');
        const searchTerm = query.toLowerCase();
        let resultsFound = 0;
        
        pathCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.getAttribute('data-category') || '';
            const skills = Array.from(card.querySelectorAll('.skills span')).map(s => s.textContent.toLowerCase()).join(' ');
            
            if (title.includes(searchTerm) || category.includes(searchTerm) || skills.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease-out';
                resultsFound++;
            } else {
                card.style.animation = 'fadeOut 0.3s ease-out forwards';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        if (resultsFound === 0) {
            showNotification('No paths found. Try different keywords.', 'warning');
        } else {
            showNotification(`Found ${resultsFound} path(s)`, 'success');
        }
    } else {
        // Reset search
        const pathCards = document.querySelectorAll('.featured-path-card');
        pathCards.forEach(card => {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease-out';
        });
        showNotification('Showing all paths', 'info');
    }
}

function initCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add ripple effect
            addRippleEffect(this);
            
            // Remove active class from all
            categoryCards.forEach(c => {
                c.classList.remove('active');
                c.style.animation = 'none';
            });
            
            // Add active to clicked
            this.classList.add('active');
            this.style.animation = 'pulse 2s infinite';
            
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
}

function filterByCategory(category) {
    const pathCards = document.querySelectorAll('.featured-path-card');
    let resultsFound = 0;
    
    pathCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease-out';
            resultsFound++;
        } else {
            card.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    if (resultsFound === 0) {
        showNotification('No paths in this category', 'info');
    } else {
        showNotification(`Showing ${category} paths (${resultsFound})`, 'success');
    }
}

function initPathFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add ripple effect
            addRippleEffect(this);
            
            // Remove active class
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.style.animation = 'none';
            });
            
            // Add active to clicked
            this.classList.add('active');
            this.style.animation = 'pulse 2s infinite';
            
            const filter = this.getAttribute('data-filter');
            filterByType(filter);
        });
    });
}

function filterByType(type) {
    const pathCards = document.querySelectorAll('.featured-path-card');
    let resultsFound = 0;
    
    pathCards.forEach(card => {
        const filters = card.getAttribute('data-filter') || '';
        
        if (filters.includes(type)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease-out';
            resultsFound++;
        } else {
            card.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    if (resultsFound === 0) {
        showNotification(`No ${type} paths available`, 'info');
    } else {
        showNotification(`Filtered by: ${type} (${resultsFound})`, 'success');
    }
}

function initViewButtons() {
    const viewBtns = document.querySelectorAll('.view-btn');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            addRippleEffect(this);
            
            const pathId = this.getAttribute('data-path');
            openPathModal(pathId);
        });
    });
}

function initContinueButtons() {
    const continueBtns = document.querySelectorAll('.continue-btn');
    
    continueBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            addRippleEffect(this);
            
            const pathId = this.getAttribute('data-path');
            continuePath(pathId);
            
            // Simulate loading
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        });
    });
}

function initPathBuilder() {
    const buildBtn = document.getElementById('buildBtn');
    
    if (buildBtn) {
        buildBtn.addEventListener('click', function() {
            addRippleEffect(this);
            showNotification('Opening Path Builder...', 'info');
            
            // Simulate loading
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                showNotification('Path Builder is ready!', 'success');
            }, 1500);
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
        if (btn) {
            btn.addEventListener('click', function() {
                addRippleEffect(this);
                closeModal();
            });
        }
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
            addRippleEffect(this);
            const pathTitle = document.querySelector('.modal-header h2').textContent;
            showNotification(`Successfully enrolled in: ${pathTitle}`, 'success');
            
            // Simulate loading
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enrolling...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                closeModal();
            }, 1500);
        });
    }
}

function openPathModal(pathId) {
    const modal = document.getElementById('pathModal');
    const pathData = getPathData(pathId);
    
    if (!pathData) {
        showNotification('Path details not available', 'error');
        return;
    }
    
    // Set modal content with animation
    const modalHeader = document.querySelector('.modal-header h2');
    const modalImage = document.querySelector('.modal-image img');
    const coursesList = document.querySelector('.courses-list');
    
    // Fade out content
    modalHeader.style.opacity = '0';
    modalImage.style.opacity = '0';
    coursesList.style.opacity = '0';
    
    setTimeout(() => {
        // Update content
        modalHeader.textContent = pathData.title;
        modalImage.src = pathData.image;
        modalImage.alt = pathData.title;
        
        // Set course list
        coursesList.innerHTML = '';
        
        pathData.courses.forEach((course, index) => {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            courseItem.style.animation = `fadeInUp 0.3s ease-out ${index * 0.1}s both`;
            courseItem.innerHTML = `
                <div class="course-header">
                    <div class="course-title">${course.title}</div>
                    <div class="course-number">${course.number}</div>
                </div>
                <div class="course-details">
                    <div><i class="fas fa-clock"></i> ${course.duration}</div>
                    <div class="course-features">
                        ${course.lab ? '<span class="course-feature"><i class="fas fa-flask"></i> Lab</span>' : ''}
                        ${course.assessment ? '<span class="course-feature"><i class="fas fa-check-circle"></i> Assessment</span>' : ''}
                    </div>
                </div>
            `;
            coursesList.appendChild(courseItem);
        });
        
        // Fade in content
        modalHeader.style.opacity = '1';
        modalImage.style.opacity = '1';
        coursesList.style.opacity = '1';
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.style.animation = 'fadeIn 0.3s ease-out';
    }, 300);
}

function closeModal() {
    const modal = document.getElementById('pathModal');
    
    // Add closing animation
    modal.style.animation = 'fadeOut 0.3s ease-out forwards';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.style.animation = '';
    }, 300);
}

function continuePath(pathId) {
    const pathNames = {
        'cloud': 'Cloud Architect Path',
        'data-science': 'Data Science Path',
        'web': 'Web Developer Path'
    };
    
    const pathName = pathNames[pathId] || pathId;
    showNotification(`Continuing: ${pathName}`, 'info');
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
        },
        'devops': {
            title: 'DevOps Engineer Path',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            courses: [
                { number: '01', title: 'Linux Fundamentals', duration: '20 hours', lab: true, assessment: true },
                { number: '02', title: 'Docker & Containerization', duration: '25 hours', lab: true, assessment: true },
                { number: '03', title: 'Kubernetes Orchestration', duration: '30 hours', lab: true, assessment: true },
                { number: '04', title: 'AWS Cloud Services', duration: '35 hours', lab: true, assessment: true },
                { number: '05', title: 'CI/CD Pipelines', duration: '20 hours', lab: true, assessment: true },
                { number: '06', title: 'Infrastructure as Code', duration: '25 hours', lab: true, assessment: true },
                { number: '07', title: 'Monitoring & Logging', duration: '15 hours', lab: true, assessment: true },
                { number: '08', title: 'Security in DevOps', duration: '20 hours', lab: true, assessment: true },
                { number: '09', title: 'Site Reliability Engineering', duration: '25 hours', lab: true, assessment: true },
                { number: '10', title: 'Capstone Project', duration: '40 hours', lab: true, assessment: true }
            ]
        },
        'marketing': {
            title: 'Digital Marketing Specialist Path',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            courses: [
                { number: '01', title: 'Digital Marketing Fundamentals', duration: '15 hours', lab: true, assessment: true },
                { number: '02', title: 'SEO & Search Marketing', duration: '20 hours', lab: true, assessment: true },
                { number: '03', title: 'Social Media Marketing', duration: '18 hours', lab: true, assessment: true },
                { number: '04', title: 'Content Marketing', duration: '15 hours', lab: true, assessment: true },
                { number: '05', title: 'Email Marketing', duration: '12 hours', lab: true, assessment: true },
                { number: '06', title: 'Google Ads & PPC', duration: '20 hours', lab: true, assessment: true },
                { number: '07', title: 'Analytics & Reporting', duration: '15 hours', lab: true, assessment: true },
                { number: '08', title: 'Marketing Automation', duration: '15 hours', lab: true, assessment: true },
                { number: '09', title: 'Capstone Project', duration: '25 hours', lab: true, assessment: true }
            ]
        },
        'security': {
            title: 'Cybersecurity Analyst Path',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            courses: [
                { number: '01', title: 'Network Security Basics', duration: '25 hours', lab: true, assessment: true },
                { number: '02', title: 'Ethical Hacking', duration: '30 hours', lab: true, assessment: true },
                { number: '03', title: 'Cryptography Fundamentals', duration: '20 hours', lab: true, assessment: true },
                { number: '04', title: 'Security Operations', duration: '25 hours', lab: true, assessment: true },
                { number: '05', title: 'Incident Response', duration: '20 hours', lab: true, assessment: true },
                { number: '06', title: 'Risk Assessment', duration: '18 hours', lab: true, assessment: true },
                { number: '07', title: 'Compliance & Standards', duration: '15 hours', lab: true, assessment: true },
                { number: '08', title: 'Cloud Security', duration: '22 hours', lab: true, assessment: true },
                { number: '09', title: 'Penetration Testing', duration: '25 hours', lab: true, assessment: true },
                { number: '10', title: 'Digital Forensics', duration: '20 hours', lab: true, assessment: true },
                { number: '11', title: 'Capstone Project', duration: '40 hours', lab: true, assessment: true }
            ]
        }
    };
    
    return pathData[pathId];
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    
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
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: white;
        color: #1f2937;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid ${colors[type]};
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 250px;
        max-width: 350px;
    `;
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}" style="color: ${colors[type]}; font-size: 1.2rem;"></i>
        <span style="flex: 1;">${message}</span>
        <button class="notification-close" style="background: none; border: none; color: #6b7280; cursor: pointer; font-size: 1.2rem;">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
    
    // Pause on hover
    notification.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
    });
    
    notification.addEventListener('mouseleave', () => {
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 2000);
    });
}

// Ripple effect function
function addRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Animate progress bars
function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        
        setTimeout(() => {
            fill.style.width = width;
        }, 500);
    });
}

// Hover effects
function addHoverEffects() {
    const cards = document.querySelectorAll('.featured-path-card, .path-card, .category-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 25;
            const angleY = (centerX - x) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .path-card, .featured-path-card, .builder-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Add animation styles
const style = document.createElement('style');
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
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
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
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    }
`;
document.head.appendChild(style);
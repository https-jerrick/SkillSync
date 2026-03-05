// ==================== ANALYTICS.JS ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Analytics.js loaded');
    
    // ==================== MOBILE MENU FUNCTIONALITY (FIXED) ====================
    initMobileMenu();
    
    // ==================== USER DROPDOWN ====================
    initUserDropdown();
    
    // ==================== CHART INTERACTIVITY ====================
    initChartInteractivity();
    
    // ==================== SKILL RADAR INTERACTIVITY ====================
    initSkillRadar();
    
    // ==================== COURSE FILTERING ====================
    initCourseFiltering();
    
    // ==================== ASSESSMENT ANALYSIS ====================
    initAssessmentAnalysis();
    
    // ==================== PROGRESS TRACKING ====================
    initProgressTracking();
    
    // ==================== SCROLL ANIMATIONS ====================
    initScrollAnimations();
    
    // ==================== SCROLL TO TOP BUTTON ====================
    initScrollToTop();
    
    // ==================== ACTIVE NAVIGATION ====================
    setActiveNavLink();
    
    // ==================== SEARCH FUNCTIONALITY ====================
    initSearch();
});

// ==================== MOBILE MENU FUNCTIONALITY (FIXED) ====================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const closeMobileBtn = document.querySelector('.close-mobile-btn');
    
    if (!mobileMenuBtn || !mobileOverlay) {
        console.log('Mobile menu elements not found in analytics.js - they might be handled by global.js');
        return;
    }
    
    console.log('Mobile menu initialized from analytics.js');
    
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
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && mobileOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ==================== USER DROPDOWN ====================
function initUserDropdown() {
    const userDropdowns = document.querySelectorAll('.user-dropdown');
    
    userDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.user-avatar');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Click support
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

// ==================== CHART INTERACTIVITY ====================
function initChartInteractivity() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', function(e) {
            const value = this.getAttribute('data-value');
            
            // Create or show tooltip
            let tooltip = document.querySelector('.chart-tooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.className = 'chart-tooltip';
                document.body.appendChild(tooltip);
            }
            
            const rect = this.getBoundingClientRect();
            tooltip.style.display = 'block';
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top - 30 + 'px';
            tooltip.textContent = value + ' hours';
            
            this.style.opacity = '0.8';
        });
        
        bar.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.chart-tooltip');
            if (tooltip) {
                tooltip.style.display = 'none';
            }
            this.style.opacity = '1';
        });
    });
    
    // Chart controls functionality
    const chartControls = document.querySelectorAll('.chart-controls select');
    chartControls.forEach(select => {
        select.addEventListener('change', updateChartData);
    });
}

function updateChartData() {
    const bars = document.querySelectorAll('.chart-bar');
    const viewSelect = document.querySelector('.chart-controls select:first-child');
    const typeSelect = document.querySelector('.chart-controls select:last-child');
    
    if (!bars.length) return;
    
    const view = viewSelect ? viewSelect.value : 'monthly';
    const type = typeSelect ? typeSelect.value : 'time';
    
    let newHeights;
    if (view === 'weekly') {
        newHeights = [30, 45, 60, 40, 55, 70, 65];
    } else if (view === 'monthly') {
        newHeights = [40, 63, 50, 83, 73, 100, 93];
    } else {
        newHeights = [50, 75, 65, 90, 85, 110, 100];
    }
    
    if (type === 'modules') {
        newHeights = newHeights.map(h => Math.floor(h * 0.7));
    } else if (type === 'assessments') {
        newHeights = newHeights.map(h => Math.floor(h * 0.5));
    }
    
    bars.forEach((bar, index) => {
        const maxHeight = 100;
        const percentage = Math.min((newHeights[index] / 110) * 100, 100);
        bar.style.height = percentage + '%';
        bar.setAttribute('data-value', newHeights[index]);
        
        bar.classList.add('updating');
        setTimeout(() => bar.classList.remove('updating'), 500);
    });
    
    showNotification('Chart view updated', 'info');
}

// ==================== SKILL RADAR INTERACTIVITY ====================
function initSkillRadar() {
    const skillPoints = document.querySelectorAll('.skill-point');
    const skillBars = document.querySelectorAll('.skill-fill');
    
    skillPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            const skill = this.getAttribute('data-skill');
            const value = this.getAttribute('data-value');
            
            skillBars.forEach(bar => {
                const barItem = bar.closest('.skill-item');
                if (barItem && barItem.querySelector('.skill-name').textContent.includes(skill)) {
                    bar.style.backgroundColor = '#2563eb';
                    bar.style.height = '12px';
                }
            });
            
            showTooltip(this, `${skill}: ${value}%`);
        });
        
        point.addEventListener('mouseleave', function() {
            skillBars.forEach(bar => {
                bar.style.backgroundColor = '';
                bar.style.height = '';
            });
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    let tooltip = document.querySelector('.skill-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        document.body.appendChild(tooltip);
    }
    
    const rect = element.getBoundingClientRect();
    tooltip.style.display = 'block';
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top - 30 + 'px';
    tooltip.textContent = text;
}

function hideTooltip() {
    const tooltip = document.querySelector('.skill-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// ==================== COURSE FILTERING ====================
function initCourseFiltering() {
    const courseCards = document.querySelectorAll('.course-card');
    
    if (courseCards.length) {
        const section = document.querySelector('.courses-container')?.parentElement;
        const sectionHeader = section?.querySelector('.section-header');
        
        if (sectionHeader && !document.querySelector('.course-filters')) {
            const filterContainer = document.createElement('div');
            filterContainer.className = 'course-filters';
            filterContainer.innerHTML = `
                <button class="filter-btn active" data-filter="all">All Courses</button>
                <button class="filter-btn" data-filter="in-progress">In Progress</button>
                <button class="filter-btn" data-filter="needs-attention">Needs Attention</button>
                <button class="filter-btn" data-filter="almost-complete">Almost Complete</button>
            `;
            
            sectionHeader.appendChild(filterContainer);
            
            const filterBtns = document.querySelectorAll('.filter-btn');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    courseCards.forEach(card => {
                        if (filter === 'all') {
                            card.classList.remove('hidden');
                        } else {
                            const badge = card.querySelector('.course-badge');
                            if (badge) {
                                const badgeText = badge.textContent.toLowerCase().replace(' ', '-');
                                if (badgeText.includes(filter)) {
                                    card.classList.remove('hidden');
                                } else {
                                    card.classList.add('hidden');
                                }
                            }
                        }
                    });
                });
            });
        }
    }
}

// ==================== ASSESSMENT ANALYSIS ====================
function analyzeAssessment(assessmentName) {
    showAssessmentModal(assessmentName);
}

function showAssessmentModal(assessmentName) {
    let modal = document.getElementById('assessmentModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'assessmentModal';
        modal.className = 'overlay';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>Assessment Analysis: <span id="modalAssessmentName"></span></h3>
                    <button class="btn btn-sm" onclick="closeAssessmentModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="analysis-section">
                        <h4>Performance Overview</h4>
                        <div class="performance-stats">
                            <div class="stat">
                                <span class="stat-label">Score</span>
                                <span class="stat-value" id="analysisScore">85%</span>
                            </div>
                            <div class="stat">
                                <span class="stat-label">Time Spent</span>
                                <span class="stat-value" id="analysisTime">45 min</span>
                            </div>
                            <div class="stat">
                                <span class="stat-label">Questions</span>
                                <span class="stat-value" id="analysisQuestions">20/25</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-section">
                        <h4>Weak Areas Identified</h4>
                        <ul class="weak-areas">
                            <li>Closures and Scope</li>
                            <li>Event Loop</li>
                            <li>Prototypal Inheritance</li>
                        </ul>
                    </div>
                    
                    <div class="analysis-section">
                        <h4>Recommended Resources</h4>
                        <div class="resource-list">
                            <div class="resource-item">
                                <i class="fas fa-play-circle"></i>
                                <span>JavaScript: The Hard Parts - Closures</span>
                            </div>
                            <div class="resource-item">
                                <i class="fas fa-flask"></i>
                                <span>Practice Lab: Scope & Closure Exercises</span>
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary w-full" onclick="closeAssessmentModal()">
                        Got it
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    document.getElementById('modalAssessmentName').textContent = assessmentName;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeAssessmentModal() {
    const modal = document.getElementById('assessmentModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// ==================== PROGRESS TRACKING ====================
function initProgressTracking() {
    const continueButtons = document.querySelectorAll('.course-actions .btn-outline1');
    
    continueButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const courseCard = this.closest('.course-card');
            if (courseCard) {
                const courseTitle = courseCard.querySelector('.course-title h3').textContent;
                const progressBar = courseCard.querySelector('.progress-fill');
                const currentProgress = progressBar ? progressBar.style.width : '0%';
                
                showNotification(`Continuing ${courseTitle} from ${currentProgress}`, 'info');
            }
        });
    });
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.metric-card, .course-card, .assessment-card, .recommendation-card');
    
    // Add base styles
    const style = document.createElement('style');
    style.textContent = `
        .metric-card, .course-card, .assessment-card, .recommendation-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .metric-card.animated, .course-card.animated, .assessment-card.animated, .recommendation-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #2563eb;
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
            z-index: 99;
            transition: all 0.3s ease;
        }
        
        .scroll-to-top:hover {
            background-color: #1d4ed8;
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(37, 99, 235, 0.4);
        }
        
        .scroll-to-top.visible {
            display: flex;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: white;
            border-left: 4px solid #2563eb;
            border-radius: 8px;
            padding: 16px 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 1001;
            animation: slideIn 0.3s ease;
        }
        
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
        
        .chart-bar.updating {
            animation: pulse 0.5s ease;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
        }
        
        .chart-tooltip, .skill-tooltip {
            position: absolute;
            background-color: #1f2937;
            color: white;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 0.875rem;
            pointer-events: none;
            z-index: 1000;
            display: none;
            transform: translateX(-50%);
        }
        
        .course-filters {
            display: flex;
            gap: 10px;
            margin: 20px 0;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .filter-btn {
            padding: 8px 16px;
            border: 1px solid #e5e7eb;
            background-color: white;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .filter-btn:hover {
            background-color: #f3f4f6;
        }
        
        .filter-btn.active {
            background-color: #2563eb;
            color: white;
            border-color: #2563eb;
        }
        
        .course-card.hidden {
            display: none;
        }
        
        .analysis-section {
            margin-bottom: 24px;
        }
        
        .performance-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-top: 12px;
        }
        
        .stat {
            text-align: center;
            padding: 12px;
            background-color: #f8fafc;
            border-radius: 8px;
        }
        
        .stat-label {
            display: block;
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 4px;
        }
        
        .stat-value {
            display: block;
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
        }
        
        .weak-areas {
            list-style: none;
            padding: 0;
            margin: 12px 0 0;
        }
        
        .weak-areas li {
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
            color: #dc2626;
        }
        
        .weak-areas li:before {
            content: "•";
            margin-right: 8px;
        }
        
        .resource-list {
            margin-top: 12px;
        }
        
        .resource-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
            background-color: #f8fafc;
            border-radius: 8px;
            margin-bottom: 8px;
        }
        
        .resource-item i {
            color: #2563eb;
        }
        
        .search-input-container {
            position: relative;
            margin-bottom: 20px;
        }
        
        .search-input-container i {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
        }
        
        .search-input-container input {
            padding-left: 40px;
        }
    `;
    document.head.appendChild(style);
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    setTimeout(checkScroll, 100);
}

// ==================== SCROLL TO TOP BUTTON ====================
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== ACTIVE NAVIGATION ====================
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'analytics.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ==================== SEARCH FUNCTIONALITY ====================
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            showSearchModal();
        });
    }
}

function showSearchModal() {
    let modal = document.getElementById('searchModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'searchModal';
        modal.className = 'overlay';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="modal" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>Search Courses & Content</h3>
                    <button class="btn btn-sm" onclick="closeSearchModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="search-input-container">
                        <i class="fas fa-search"></i>
                        <input type="text" class="form-control" placeholder="Search for courses, modules, topics..." id="searchInput">
                    </div>
                    <div class="search-results" style="display: none;">
                        <h4>Results</h4>
                        <div class="results-list"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const searchInput = modal.querySelector('#searchInput');
        const resultsDiv = modal.querySelector('.search-results');
        const resultsList = modal.querySelector('.results-list');
        
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 2) {
                resultsDiv.style.display = 'none';
                return;
            }
            
            const mockResults = [
                { title: 'JavaScript Fundamentals', type: 'Course' },
                { title: 'Advanced JavaScript Patterns', type: 'Module' },
                { title: 'React Hooks Deep Dive', type: 'Course' },
                { title: 'Database Optimization Techniques', type: 'Module' },
                { title: 'Cloud Security Best Practices', type: 'Course' }
            ].filter(item => item.title.toLowerCase().includes(query));
            
            if (mockResults.length) {
                resultsList.innerHTML = mockResults.map(result => `
                    <div class="result-item" onclick="navigateToSearchResult('${result.title}')">
                        <div class="result-title">${result.title}</div>
                        <div class="result-type">${result.type}</div>
                    </div>
                `).join('');
                resultsDiv.style.display = 'block';
            } else {
                resultsList.innerHTML = '<p style="padding: 20px; text-align: center; color: #6b7280;">No results found</p>';
                resultsDiv.style.display = 'block';
            }
        });
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.querySelector('#searchInput').focus(), 100);
}

function closeSearchModal() {
    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function navigateToSearchResult(result) {
    closeSearchModal();
    showNotification(`Opening: ${result}`, 'success');
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const colors = {
        info: '#2563eb',
        success: '#059669',
        warning: '#d97706',
        error: '#dc2626'
    };
    
    notification.style.borderLeftColor = colors[type] || colors.info;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" 
               style="color: ${colors[type] || colors.info}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== GLOBAL FUNCTIONS (called from HTML) ====================
function showGoalModal() {
    const modal = document.getElementById('goalModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeGoalModal() {
    const modal = document.getElementById('goalModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function saveGoal() {
    closeGoalModal();
    showNotification('Learning goal saved successfully!', 'success');
}

function updateChartView() {
    updateChartData();
}

function viewCourseDetails(courseId) {
    showNotification(`Loading detailed report for course...`, 'info');
}

function startLab(labName) {
    showNotification(`Starting lab: ${labName}`, 'success');
}

function revisitModule(moduleName) {
    showNotification(`Revisiting module: ${moduleName}`, 'info');
}

function viewCourse(courseName) {
    showNotification(`Opening course: ${courseName}`, 'info');
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    const modals = document.querySelectorAll('.overlay');
    modals.forEach(modal => {
        if (e.target === modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
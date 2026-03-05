/* =========================================================
   CERTIFICATIONS PAGE JavaScript - Fixed (Works with global.js)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Certifications page loaded');
    
    // Initialize filter tags (NOT filter buttons - these are different elements)
    initializeFilterTags();
    
    // Add search functionality
    initializeSearch();
    
    // Add hover effects (enhancements only)
    initializeHoverEffects();
    
    // Add scroll animations
    initializeScrollAnimations();
    
    // Initialize modal triggers (using global modal system)
    initializeModalTriggers();
});

// ==================== FILTER TAGS FUNCTIONALITY ====================
function initializeFilterTags() {
    // This targets the filter-tag elements (spans in the catalog filters)
    const filterTags = document.querySelectorAll('.filter-tag');
    const catalogCards = document.querySelectorAll('.catalog-card');
    
    if (!filterTags.length || !catalogCards.length) return;
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase().trim();
            
            // Filter cards based on their category tags
            catalogCards.forEach(card => {
                const cardTags = Array.from(card.querySelectorAll('.catalog-tag')).map(t => t.textContent.toLowerCase());
                
                if (filter === 'all' || cardTags.some(t => t.includes(filter))) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show notification
            showNotification(`Showing ${filter === 'all' ? 'all' : filter} certifications`);
        });
    });
    
    // Initialize filter selects
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // Simple filter logic based on selected value
            const value = this.value.toLowerCase();
            catalogCards.forEach(card => {
                const cardTags = Array.from(card.querySelectorAll('.catalog-tag')).map(t => t.textContent.toLowerCase());
                
                if (value === 'all' || cardTags.some(t => t.includes(value))) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            showNotification(`Filter updated`);
        });
    });
}

// ==================== SEARCH FUNCTIONALITY ====================
function initializeSearch() {
    const searchInput = document.getElementById('certSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.catalog-card');
        let results = 0;
        
        cards.forEach(card => {
            const title = card.querySelector('.catalog-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.catalog-description')?.textContent.toLowerCase() || '';
            
            if (searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex';
                results++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update results count (optional)
        const resultsElement = document.querySelector('.search-results-count');
        if (resultsElement) {
            resultsElement.textContent = `${results} results found`;
        }
    });
}

// ==================== HOVER EFFECTS ====================
function initializeHoverEffects() {
    const cards = document.querySelectorAll('.cert-card, .catalog-card, .progress-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// ==================== SCROLL ANIMATIONS ====================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    // Observe cards for animation
    document.querySelectorAll('.cert-card, .catalog-card, .progress-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// ==================== MODAL TRIGGERS ====================
function initializeModalTriggers() {
    // The global.js already handles data-modal-open and data-modal-close
    // We just need to ensure our custom modals also work with the global system
    
    // For any custom buttons that should open modals
    const viewDetailButtons = document.querySelectorAll('[data-modal-open]');
    viewDetailButtons.forEach(btn => {
        // The global.js will handle these automatically
        // We just need to make sure the modal content is populated
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-open');
            const modal = document.querySelector(`[data-modal-overlay="${modalId}"]`);
            
            if (modal) {
                // Optional: Update modal content based on clicked item
                updateModalContent(this, modal);
            }
        });
    });
}

// ==================== UPDATE MODAL CONTENT ====================
function updateModalContent(trigger, modal) {
    // This function can be extended to dynamically update modal content
    // based on which button was clicked
    
    // For now, we'll just use the static content from the HTML
    // You can add logic here to populate modal with dynamic data
}

// ==================== CERTIFICATION ACTIONS ====================
function downloadCert(certId) {
    showNotification('Downloading certificate PDF...', 'info');
    // Simulate download
    setTimeout(() => {
        showNotification('Certificate downloaded successfully!', 'success');
    }, 1500);
}

function shareCert(certId) {
    showNotification('Opening LinkedIn sharing...', 'info');
}

function continueLearning(pathId) {
    showNotification('Redirecting to learning path...', 'info');
}

function viewRequirements(certId) {
    showNotification('Loading certification requirements...', 'info');
}

// ==================== VIEW DETAILS FUNCTION ====================
function viewDetails(certType) {
    // This function is called from onclick in HTML
    const certDetails = {
        'frontend': {
            title: 'Frontend Developer Certification',
            requirements: '4 required courses • 60 hours study time',
            topics: 'HTML5, CSS3, JavaScript, React',
            exam: '75 questions, 3 hours'
        },
        'devops': {
            title: 'DevOps Engineer Certification',
            requirements: '5 required courses • 80 hours study time',
            topics: 'Linux, Docker, Kubernetes, CI/CD',
            exam: 'Practical lab, 4 hours'
        },
        'ai-ml': {
            title: 'AI & ML Specialist Certification',
            requirements: '6 required courses • 100 hours study time',
            topics: 'Machine Learning, Neural Networks, Python',
            exam: 'Theory + Practical'
        },
        'security': {
            title: 'Security Professional Certification',
            requirements: '3 required courses • 40 hours study time',
            topics: 'Security Fundamentals, Threat Analysis',
            exam: 'Multiple choice'
        },
        'mobile': {
            title: 'Mobile Developer Certification',
            requirements: '4 required courses • 70 hours study time',
            topics: 'React Native, Flutter, Mobile UI',
            exam: 'Code review + Theory'
        },
        'cloud-arch': {
            title: 'Cloud Architect Certification',
            requirements: '7 required courses • 120 hours study time',
            topics: 'AWS, Azure, GCP, Infrastructure Design',
            exam: 'Case study + Practical'
        }
    };
    
    const details = certDetails[certType];
    if (!details) return;
    
    // Use global notification system instead of creating custom modal
    showNotification(`${details.title}: ${details.requirements}`, 'info');
    
    // Or if you want to show more details, use the existing modal system
    const modal = document.querySelector('[data-modal-overlay="cert-details"]');
    if (modal) {
        // Update modal content if needed
        const modalTitle = modal.querySelector('.modal-header h3');
        const modalBody = modal.querySelector('.modal-body');
        
        if (modalTitle && modalBody) {
            modalTitle.innerHTML = `<i class="fas fa-certificate"></i> ${details.title}`;
            modalBody.innerHTML = `
                <div class="cert-details">
                    <p><strong>Requirements:</strong> ${details.requirements}</p>
                    <p><strong>Topics Covered:</strong> ${details.topics}</p>
                    <p><strong>Exam Format:</strong> ${details.exam}</p>
                    <div class="cert-actions mt-lg">
                        <button class="btn btn-primary" onclick="registerForExam('${certType}')">
                            <i class="fas fa-calendar-alt"></i> Register for Exam
                        </button>
                        <button class="btn btn-outline1" onclick="viewStudyPlan('${certType}')">
                            <i class="fas fa-book"></i> View Study Plan
                        </button>
                    </div>
                </div>
            `;
        }
        
        // Open modal using global system
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// ==================== REGISTER FOR EXAM ====================
function registerForExam(certType) {
    // Close any open modals
    document.querySelectorAll('.overlay.active').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
    
    showNotification(`Registration started for ${certType} certification!`, 'success');
}

// ==================== VIEW STUDY PLAN ====================
function viewStudyPlan(certType) {
    // Close any open modals
    document.querySelectorAll('.overlay.active').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
    
    showNotification(`Loading study plan for ${certType}...`, 'info');
}

// ==================== NOTIFICATION HELPER ====================
function showNotification(message, type = 'info') {
    // Use global notification if available
    if (window.SkillSyncGlobal && window.SkillSyncGlobal.showNotification) {
        window.SkillSyncGlobal.showNotification(message, type);
    } else if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        // Fallback notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: #1f2937;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" 
                   style="color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'}"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Add animation styles if not present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
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
}
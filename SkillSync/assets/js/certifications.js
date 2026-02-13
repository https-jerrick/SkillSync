/* =========================================================
   CERTIFICATIONS PAGE JavaScript - Enhanced UX
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Certifications page loaded');
    
    // Initialize filter buttons
    initializeFilters();
    
    // Add hover animations
    initializeHoverEffects();
    
    // Add scroll animations
    initializeScrollAnimations();
});

// ==================== FILTER FUNCTIONALITY ====================
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const catalogCards = document.querySelectorAll('.catalog-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter cards
            catalogCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
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
}

// ==================== SEARCH FUNCTIONALITY ====================
function searchCertifications(event) {
    if (event.key === 'Enter') {
        const searchTerm = event.target.value.toLowerCase();
        const cards = document.querySelectorAll('.catalog-card');
        let results = 0;
        
        cards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('.catalog-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                results++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        showNotification(`Found ${results} certification${results !== 1 ? 's' : ''}`);
    }
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

function viewDetails(certType) {
    const certDetails = {
        'frontend': 'Frontend Developer Certification\n\n• 4 required courses\n• 60 hours study time\n• Covers: HTML5, CSS3, JavaScript, React\n• Exam: 75 questions, 3 hours',
        'devops': 'DevOps Engineer Certification\n\n• 5 required courses\n• 80 hours study time\n• Covers: Linux, Docker, Kubernetes, CI/CD\n• Exam: Practical lab, 4 hours',
        'ai-ml': 'AI & ML Specialist Certification\n\n• 6 required courses\n• 100 hours study time\n• Covers: Machine Learning, Neural Networks, Python\n• Exam: Theory + Practical',
        'security': 'Security Professional Certification\n\n• 3 required courses\n• 40 hours study time\n• Covers: Security Fundamentals, Threat Analysis\n• Exam: Multiple choice',
        'mobile': 'Mobile Developer Certification\n\n• 4 required courses\n• 70 hours study time\n• Covers: React Native, Flutter, Mobile UI\n• Exam: Code review + Theory',
        'cloud-arch': 'Cloud Architect Certification\n\n• 7 required courses\n• 120 hours study time\n• Covers: AWS, Azure, GCP, Infrastructure Design\n• Exam: Case study + Practical'
    };
    
    if (certDetails[certType]) {
        const modalContent = `
            <div class="modal-details">
                <h4>${certType.replace('-', ' ').toUpperCase()} Certification</h4>
                <div class="modal-text">
                    ${certDetails[certType].replace(/\n/g, '<br>').replace(/•/g, '•')}
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="registerForExam('${certType}')">
                        <i class="fas fa-calendar-alt"></i> Register for Exam
                    </button>
                    <button class="btn btn-outline" onclick="viewStudyPlan('${certType}')">
                        <i class="fas fa-book"></i> View Study Plan
                    </button>
                </div>
            </div>
        `;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeModal()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3>Certification Details</h3>
                        <button class="modal-close" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${modalContent}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }
}

// ==================== MODAL FUNCTIONS ====================
function closeModal() {
    const modal = document.querySelector('.custom-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function registerForExam(certType) {
    closeModal();
    showNotification(`Registering for ${certType} exam...`, 'success');
}

function viewStudyPlan(certType) {
    closeModal();
    showNotification(`Loading study plan for ${certType}...`, 'info');
}

// ==================== NOTIFICATION HELPER ====================
function showNotification(message, type = 'info') {
    // Use global notification if available
    if (window.SkillSyncGlobal && window.SkillSyncGlobal.showNotification) {
        window.SkillSyncGlobal.showNotification(message, type);
    } else {
        // Fallback notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Add animation styles
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
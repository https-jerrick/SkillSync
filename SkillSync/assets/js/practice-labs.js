/* =========================================================
   PRACTICE LABS PAGE - Enhanced with Animations
   =========================================================
   Basic interactivity with smooth animations
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Practice Labs page loaded');
    
    // Initialize all functions
    initPracticeLabs();
    
    // Add scroll animations
    initScrollAnimations();
});

function initPracticeLabs() {
    // Simple click handlers for demo purposes
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add ripple effect
            addRippleEffect(this);
            
            // Simulate video play with animation
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            this.style.backgroundColor = 'var(--warning-color)';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-pause"></i>';
                this.style.backgroundColor = 'var(--danger-color)';
                showNotification('Playing demo video... (Demo mode)', 'info');
            }, 1000);
        });
    }
    
    // Launch lab buttons
    const launchButtons = document.querySelectorAll('.lab-card .btn-primary, .session-actions .btn-primary');
    launchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add ripple effect
            addRippleEffect(this);
            
            // Find lab name
            let labName = '';
            const card = this.closest('.lab-card') || this.closest('.session-card');
            if (card) {
                const title = card.querySelector('h3');
                if (title) {
                    labName = title.textContent;
                }
            }
            
            // Simulate lab launch with animation
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Add loading animation to card
            if (card) {
                card.style.transform = 'scale(0.98)';
                card.style.opacity = '0.8';
            }
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                if (card) {
                    card.style.transform = '';
                    card.style.opacity = '';
                }
                
                showNotification(`Launching "${labName}"... Lab environment ready!`, 'success');
            }, 1500);
        });
    });
    
    // Filter button
    const filterBtn = document.querySelector('.filter-options .btn-secondary');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            // Add ripple effect
            addRippleEffect(this);
            
            const skill = document.querySelector('.filter-select:nth-child(1)').value;
            const level = document.querySelector('.filter-select:nth-child(2)').value;
            const duration = document.querySelector('.filter-select:nth-child(3)').value;
            
            // Add loading animation
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Filtering...';
            this.disabled = true;
            
            // Simulate filter animation
            const labCards = document.querySelectorAll('.lab-card');
            labCards.forEach((card, index) => {
                card.style.animation = 'fadeOut 0.3s ease-out forwards';
            });
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Simulate filter results
                labCards.forEach((card, index) => {
                    card.style.animation = 'fadeInScale 0.6s ease-out';
                    card.style.animationDelay = `${index * 0.1}s`;
                });
                
                showNotification(`Applied filters: ${skill}, ${level}, ${duration}`, 'success');
            }, 800);
        });
    }
    
    // Search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm.length > 2) {
                const labCards = document.querySelectorAll('.lab-card');
                let resultsFound = 0;
                
                labCards.forEach((card, index) => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const description = card.querySelector('.lab-description').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.animation = 'fadeInScale 0.6s ease-out';
                        card.style.animationDelay = `${index * 0.1}s`;
                        resultsFound++;
                    } else {
                        card.style.animation = 'fadeOut 0.3s ease-out forwards';
                    }
                });
                
                if (resultsFound > 0) {
                    showNotification(`Found ${resultsFound} lab(s)`, 'info');
                } else {
                    showNotification('No labs found', 'warning');
                }
            } else if (searchTerm.length === 0) {
                // Reset all cards
                const labCards = document.querySelectorAll('.lab-card');
                labCards.forEach((card, index) => {
                    card.style.animation = 'fadeInScale 0.6s ease-out';
                    card.style.animationDelay = `${index * 0.1}s`;
                });
            }
        });
        
        // Add focus animation
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }
    
    // Load more button
    const loadMoreBtn = document.querySelector('.load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Add ripple effect
            addRippleEffect(this);
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading more labs...';
            this.disabled = true;
            
            // Simulate loading more labs
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                showNotification('Loading 6 more practice labs...', 'success');
                
                // Simulate adding new labs
                const labsGrid = document.querySelector('.labs-grid');
                if (labsGrid) {
                    const existingCards = document.querySelectorAll('.lab-card');
                    const newCard = existingCards[0].cloneNode(true);
                    
                    // Modify new card content
                    const title = newCard.querySelector('h3');
                    if (title) {
                        title.textContent = 'New Lab - ' + title.textContent;
                    }
                    
                    // Add with animation
                    newCard.style.animation = 'fadeInScale 0.6s ease-out';
                    labsGrid.appendChild(newCard);
                }
            }, 1500);
        });
    }
    
    // End session buttons
    const endButtons = document.querySelectorAll('.session-actions .btn-outline');
    endButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Add ripple effect
            addRippleEffect(this);
            
            const card = this.closest('.session-card');
            if (card) {
                const labName = card.querySelector('h3').textContent;
                
                // Animate removal
                card.style.animation = 'slideOutRight 0.3s ease-out forwards';
                
                setTimeout(() => {
                    card.remove();
                    showNotification(`Ended session: ${labName}`, 'info');
                    
                    const sessions = document.querySelectorAll('.session-card');
                    if (sessions.length === 0) {
                        const sessionsGrid = document.querySelector('.sessions-grid');
                        sessionsGrid.innerHTML = `
                            <div class="no-sessions" style="animation: fadeInUp 0.6s ease-out;">
                                <i class="fas fa-check-circle"></i>
                                <h3>No Active Sessions</h3>
                                <p>All your practice sessions are complete. Start a new lab to continue learning!</p>
                                <button class="btn btn-primary" onclick="window.scrollTo({top: document.querySelector('.labs-section').offsetTop, behavior: 'smooth'})">
                                    Browse Labs
                                </button>
                            </div>
                        `;
                    }
                }, 300);
            }
        });
    });
    
    // Add CSS for no-sessions state
    addStyles();
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
    const timeout = setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
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

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .session-card, .lab-card, .feature-card');
    
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
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .no-sessions {
            text-align: center;
            padding: var(--space-xl);
            grid-column: 1 / -1;
        }
        
        .no-sessions i {
            font-size: 3rem;
            color: var(--success-color);
            margin-bottom: var(--space-md);
            animation: bounce 2s infinite;
        }
        
        .no-sessions h3 {
            color: var(--text-color);
            margin-bottom: var(--space-sm);
        }
        
        .no-sessions p {
            color: var(--text-light);
            margin-bottom: var(--space-lg);
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        }
        
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
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 3000;
        }
    `;
    document.head.appendChild(style);
}

// Add smooth hover effects
document.querySelectorAll('.lab-card, .feature-card, .session-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 25;
        const angleY = (centerX - x) / 25;
        
        this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});
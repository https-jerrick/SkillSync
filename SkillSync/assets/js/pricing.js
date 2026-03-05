/* =========================================================
   PRICING PLANS JAVASCRIPT - SkillSync (FULLY FUNCTIONAL)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Pricing page loaded');
    
    // Set active nav link
    setActiveNavLink();
    
    // Initialize components
    initializeBillingToggle();
    initializePlanCards();
    initializeFAQ();
    initializeBusinessForm();
    initializeAnimations();
});

// ==================== SET ACTIVE NAV LINK ====================
function setActiveNavLink() {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to pricing link
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes('pricing') || href === 'pages/pricing.html')) {
            link.classList.add('active');
        }
    });
}

// ==================== BILLING TOGGLE ====================
function initializeBillingToggle() {
    const toggle = document.getElementById('billingToggle');
    const priceAmounts = document.querySelectorAll('.price-amount');
    const pricePeriods = document.querySelectorAll('.price-period');
    
    if (!toggle) return;
    
    toggle.addEventListener('change', function() {
        const isAnnual = this.checked;
        
        // Update all price amounts
        priceAmounts.forEach(amount => {
            const monthlyPrice = amount.dataset.monthly;
            const annualPrice = amount.dataset.annually;
            
            if (monthlyPrice && annualPrice) {
                if (isAnnual) {
                    amount.textContent = `$${annualPrice}`;
                } else {
                    amount.textContent = `$${monthlyPrice}`;
                }
            }
        });
        
        // Update price periods and show savings
        pricePeriods.forEach(period => {
            if (isAnnual) {
                period.textContent = '/month';
                // Add savings note if not exists
                if (!period.parentElement.querySelector('.savings-note')) {
                    const savingsNote = document.createElement('span');
                    savingsNote.className = 'savings-note';
                    savingsNote.textContent = ' (billed annually)';
                    period.parentElement.appendChild(savingsNote);
                }
            } else {
                period.textContent = '/month';
                const savingsNote = period.parentElement.querySelector('.savings-note');
                if (savingsNote) {
                    savingsNote.remove();
                }
            }
        });
        
        // Update toggle labels opacity
        const monthlyLabel = document.querySelector('.billing-label:first-child');
        const annualLabel = document.querySelector('.billing-label:last-child');
        
        if (monthlyLabel && annualLabel) {
            if (isAnnual) {
                monthlyLabel.style.opacity = '0.6';
                monthlyLabel.style.fontWeight = '400';
                annualLabel.style.opacity = '1';
                annualLabel.style.fontWeight = '600';
            } else {
                monthlyLabel.style.opacity = '1';
                monthlyLabel.style.fontWeight = '600';
                annualLabel.style.opacity = '0.6';
                annualLabel.style.fontWeight = '400';
            }
        }
        
        // Show notification
        showNotification(`Switched to ${isAnnual ? 'annual' : 'monthly'} billing`, 'info');
    });
}

// ==================== PLAN CARDS ====================
function initializePlanCards() {
    const planButtons = document.querySelectorAll('.plan-card .btn');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const planCard = this.closest('.plan-card');
            const planName = planCard.querySelector('.plan-name').textContent;
            const priceAmount = planCard.querySelector('.price-amount').textContent;
            const isPopular = planCard.classList.contains('popular');
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show confirmation modal
                showPlanConfirmation(planName, priceAmount, isPopular);
            }, 800);
        });
    });
}

function showPlanConfirmation(planName, price, isPopular) {
    // Remove any existing modal
    const existingModal = document.querySelector('.plan-confirmation-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'plan-confirmation-modal';
    modal.innerHTML = `
        <div class="modal-overlay active">
            <div class="modal">
                <div class="modal-header">
                    <h3>Confirm Your Plan</h3>
                    <button class="modal-close" onclick="closeConfirmationModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="confirmation-content">
                        <div class="confirmation-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h4>Ready to start with ${planName}?</h4>
                        <p>You're about to subscribe to the <strong>${planName}</strong> plan for <strong>${price}</strong>.</p>
                        
                        <div class="confirmation-details">
                            <div class="detail-item">
                                <i class="fas fa-sync-alt"></i>
                                <span>14-day free trial included</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-shield-alt"></i>
                                <span>Money-back guarantee</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-credit-card"></i>
                                <span>Cancel anytime</span>
                            </div>
                            ${isPopular ? '<div class="detail-item popular-badge"><i class="fas fa-star"></i><span>Most popular choice</span></div>' : ''}
                        </div>
                        
                        <div class="confirmation-actions">
                            <button class="btn btn-outline" onclick="closeConfirmationModal()">
                                Cancel
                            </button>
                            <button class="btn btn-primary" onclick="processPlanSubscription('${planName}')">
                                <i class="fas fa-lock"></i> Continue to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Make functions globally available
window.closeConfirmationModal = function() {
    const modal = document.querySelector('.plan-confirmation-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
};

window.processPlanSubscription = function(planName) {
    closeConfirmationModal();
    
    // Show loading notification
    showNotification(`Processing your ${planName} subscription...`, 'info');
    
    // Simulate payment processing
    setTimeout(() => {
        showNotification(`Successfully subscribed to ${planName}! Redirecting to dashboard...`, 'success');
        
        // Simulate redirect after success
        setTimeout(() => {
            alert(`✨ Congratulations!\n\nYou've successfully subscribed to the ${planName} plan.\n\nYou now have full access to all features included in this plan. Check your email for confirmation and next steps.`);
        }, 1000);
    }, 1500);
};

// ==================== FAQ ACCORDION ====================
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                
                // Smooth scroll to item if needed
                const rect = item.getBoundingClientRect();
                if (rect.top < 0 || rect.bottom > window.innerHeight) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
}

// ==================== BUSINESS FORM ====================
function initializeBusinessForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const companyName = this.querySelector('input[placeholder="Company Name"]')?.value || '';
            const name = this.querySelector('input[placeholder="Your Name"]')?.value || '';
            const email = this.querySelector('input[placeholder="Work Email"]')?.value || '';
            const phone = this.querySelector('input[placeholder="Phone Number"]')?.value || '';
            const teamSize = this.querySelector('select')?.value || 'Not specified';
            const message = this.querySelector('textarea')?.value || '';
            
            // Validate required fields
            if (!companyName || !name || !email) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification(`Thank you, ${name}! Our team will contact you within 24 hours.`, 'success');
                
                // Reset form
                this.reset();
                
                // Show detailed confirmation
                alert(`✅ Request Received!\n\nCompany: ${companyName}\nContact: ${name}\nEmail: ${email}\nTeam Size: ${teamSize}\n\nOur enterprise sales team will contact you shortly to discuss custom pricing and a personalized demo.`);
            }, 2000);
        });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ==================== ANIMATIONS ====================
function initializeAnimations() {
    // Add animation classes to elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe business features
    document.querySelectorAll('.business-feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Observe FAQ items
    document.querySelectorAll('.faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add animation styles
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .business-feature.animate-in,
        .faq-item.animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .plan-confirmation-modal .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        .plan-confirmation-modal .modal {
            background: white;
            border-radius: var(--border-radius-lg);
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideUp 0.4s ease;
        }
        
        .plan-confirmation-modal .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .plan-confirmation-modal .modal-header h3 {
            margin: 0;
            font-size: 1.25rem;
        }
        
        .plan-confirmation-modal .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-light);
            padding: 0.5rem;
            line-height: 1;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .plan-confirmation-modal .modal-close:hover {
            background: var(--bg-light);
            color: var(--danger-color);
        }
        
        .plan-confirmation-modal .modal-body {
            padding: 1.5rem;
        }
        
        .detail-item.popular-badge i {
            color: #f59e0b;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// ==================== NOTIFICATION HELPER ====================
function showNotification(message, type) {
    if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        console.log(`[${type}] ${message}`);
        // Fallback alert for important messages
        if (type === 'success' || type === 'error') {
            alert(message);
        }
    }
}
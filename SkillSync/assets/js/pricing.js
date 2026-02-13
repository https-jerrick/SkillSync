/* ==================== PRICING PLANS JAVASCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Pricing page loaded');
    
    // Set active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === 'pricing.html') {
            link.classList.add('active');
        }
    });
    
    // Initialize components
    initializeBillingToggle();
    initializePlanCards();
    initializeFAQ();
    initializeBusinessForm();
});

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
            
            if (isAnnual) {
                amount.textContent = `$${annualPrice}`;
            } else {
                amount.textContent = `$${monthlyPrice}`;
            }
        });
        
        // Update price periods
        pricePeriods.forEach(period => {
            if (isAnnual) {
                period.textContent = '/month';
                // Show savings message
                if (!period.parentElement.querySelector('.savings-note')) {
                    const savingsNote = document.createElement('span');
                    savingsNote.className = 'savings-note';
                    savingsNote.textContent = ' (billed annually)';
                    savingsNote.style.fontSize = '0.875rem';
                    savingsNote.style.color = 'var(--success-color)';
                    savingsNote.style.marginLeft = '0.5rem';
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
        
        // Update toggle labels
        const monthlyLabel = document.querySelector('.billing-label:first-child');
        const annualLabel = document.querySelector('.billing-label:last-child');
        
        if (isAnnual) {
            monthlyLabel.style.opacity = '0.6';
            annualLabel.style.opacity = '1';
            annualLabel.style.fontWeight = '600';
        } else {
            monthlyLabel.style.opacity = '1';
            monthlyLabel.style.fontWeight = '600';
            annualLabel.style.opacity = '0.6';
        }
        
        // Show notification
        showNotification(`Switched to ${isAnnual ? 'annual billing' : 'monthly billing'}`, 'info');
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
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show confirmation modal
                showPlanConfirmation(planName, priceAmount);
            }, 1500);
        });
    });
}

function showPlanConfirmation(planName, price) {
    // Create modal
    const modalHTML = `
        <div class="overlay active">
            <div class="modal">
                <div class="modal-header">
                    <h3>Confirm Plan Selection</h3>
                    <button class="modal-close" onclick="closeConfirmationModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="confirmation-content">
                        <div class="confirmation-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h4>Ready to upgrade to ${planName}?</h4>
                        <p>You're about to subscribe to the <strong>${planName}</strong> plan for <strong>${price}/month</strong>.</p>
                        
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
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .confirmation-content {
            text-align: center;
            padding: 1rem;
        }
        
        .confirmation-icon {
            width: 80px;
            height: 80px;
            background: var(--success-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: white;
            font-size: 2.5rem;
        }
        
        .confirmation-content h4 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--text-color);
        }
        
        .confirmation-content p {
            color: var(--text-light);
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .confirmation-details {
            background: var(--bg-light);
            border-radius: var(--border-radius);
            padding: 1.5rem;
            margin-bottom: 2rem;
            text-align: left;
        }
        
        .detail-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
            font-size: 0.95rem;
        }
        
        .detail-item:last-child {
            margin-bottom: 0;
        }
        
        .detail-item i {
            color: var(--primary-color);
            width: 20px;
        }
        
        .confirmation-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        .confirmation-actions .btn {
            min-width: 150px;
        }
    `;
    
    document.head.appendChild(style);
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function closeConfirmationModal() {
    const overlay = document.querySelector('.overlay.active');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = '';
    }
}

function processPlanSubscription(planName) {
    closeConfirmationModal();
    
    // Show success message
    showNotification(`Successfully subscribed to ${planName} plan! Redirecting to dashboard...`, 'success');
    
    // Simulate redirect
    setTimeout(() => {
        // In real implementation, this would redirect to dashboard
        alert(`Congratulations! You've successfully subscribed to the ${planName} plan.\n\nYou now have access to all features included in this plan.`);
    }, 1000);
}

// ==================== FAQ ACCORDION ====================
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
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
            const companyName = form.querySelector('input[placeholder="Company Name"]').value;
            const name = form.querySelector('input[placeholder="Your Name"]').value;
            const email = form.querySelector('input[placeholder="Work Email"]').value;
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Request...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification(`Thank you, ${name}! Our sales team will contact you at ${email} within 24 hours.`, 'success');
                
                // Reset form
                form.reset();
                
                // Show confirmation
                alert(`Thank you for your interest in SkillSync Business Solutions!\n\nCompany: ${companyName}\nContact: ${name}\nEmail: ${email}\n\nOur enterprise sales team will contact you shortly to discuss custom pricing and setup.`);
            }, 2000);
        });
    }
}

// ==================== HELPER FUNCTIONS ====================
function showNotification(message, type) {
    // Use global.js notification function if available
    if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        // Fallback
        console.log(`Notification [${type}]: ${message}`);
    }
}

// Make functions available globally
window.closeConfirmationModal = closeConfirmationModal;
window.processPlanSubscription = processPlanSubscription;
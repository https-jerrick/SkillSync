/* =========================================================
   CONTACT PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('SkillSync contact.js loaded');
    
    // Initialize contact page
    initializeFormValidation();
    initializeCharacterCounter();
    initializeSearchWidget();
    initializeAnimations();
    initializeNotificationClose();
});

// ==================== FORM VALIDATION & SUBMISSION ====================
function initializeFormValidation() {
    const contactForm = document.getElementById('contact-form');
    const notificationBanner = document.getElementById('form-notification');
    const notificationMessage = document.getElementById('notification-message');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const captcha = document.getElementById('captcha').checked;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showFormNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!SkillSyncUtils.validateEmail(email)) {
            showFormNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        if (!captcha) {
            showFormNotification('Please confirm you are not a robot.', 'error');
            return;
        }
        
        if (message.length < 10) {
            showFormNotification('Please provide more details in your message.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        SkillSyncUtils.showLoading(submitBtn);
        
        setTimeout(() => {
            SkillSyncUtils.hideLoading(submitBtn);
            
            // Show success message
            showFormNotification('Thank you! Your message has been sent. We\'ll respond within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            document.getElementById('char-count').textContent = '0/1000 characters';
            
            // Log form data (in real app, this would be an API call)
            const formData = {
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date().toISOString()
            };
            console.log('Form submitted:', formData);
            
        }, 1500);
    });
}

function showFormNotification(message, type) {
    const notificationBanner = document.getElementById('form-notification');
    const notificationMessage = document.getElementById('notification-message');
    
    if (!notificationBanner || !notificationMessage) return;
    
    // Update banner content and style
    notificationBanner.className = `notification-banner ${type}`;
    notificationMessage.textContent = message;
    notificationBanner.classList.remove('hidden');
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            notificationBanner.classList.add('hidden');
        }, 5000);
    }
}

// ==================== CHARACTER COUNTER ====================
function initializeCharacterCounter() {
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    
    if (!messageTextarea || !charCount) return;
    
    messageTextarea.addEventListener('input', function() {
        const count = this.value.length;
        const maxLength = 1000;
        
        charCount.textContent = `${count}/${maxLength} characters`;
        
        // Add warning when approaching limit
        if (count > maxLength * 0.9) {
            charCount.style.color = 'var(--warning-color)';
        } else if (count > maxLength) {
            charCount.style.color = 'var(--danger-color)';
        } else {
            charCount.style.color = 'var(--text-light)';
        }
        
        // Prevent exceeding max length
        if (count > maxLength) {
            this.value = this.value.substring(0, maxLength);
            charCount.textContent = `${maxLength}/${maxLength} characters`;
        }
    });
}

// ==================== SEARCH WIDGET ====================
function initializeSearchWidget() {
    const searchBtn = document.querySelector('.search-widget-btn');
    const searchInput = document.querySelector('.search-widget .input-search');
    
    if (!searchBtn || !searchInput) return;
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        
        if (!searchTerm) {
            showNotification('Please enter a search term', 'info');
            return;
        }
        
        // Simulate search
        showNotification(`Searching help articles for: "${searchTerm}"`, 'info');
        
        // In real app, this would redirect to search results
        // window.location.href = `faq.html?search=${encodeURIComponent(searchTerm)}`;
    });
    
    // Allow Enter key to trigger search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// ==================== ANIMATIONS ====================
function initializeAnimations() {
    // Add animation delays to FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 100}ms`;
        item.classList.add('animate-fade-in');
    });
    
    // Animate contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        method.style.animationDelay = `${index * 150}ms`;
        method.classList.add('animate-fade-in');
    });
}

// ==================== NOTIFICATION CLOSE ====================
function initializeNotificationClose() {
    const closeBtn = document.querySelector('.notification-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const notification = this.closest('.notification-banner');
            if (notification) {
                notification.classList.add('hidden');
            }
        });
    }
}

// ==================== SOCIAL MEDIA LINKS ====================
// Add click handlers for social media icons
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-icon');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                const platform = this.querySelector('span').textContent;
                showNotification(`${platform} integration coming soon!`, 'info');
            }
        });
    });
});
/* =========================================================
   HOME PAGE JavaScript - SkillSync
   =========================================================
   Basic functionality only - No animations or complex features
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('SkillSync Home page loaded');
    
    // ==================== BASIC FUNCTIONALITY ====================
    initializeNewsletterForm();
    initializeCourseFilter();
});

// ==================== NEWSLETTER FORM ====================
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success state
            submitBtn.textContent = 'Subscribed!';
            submitBtn.style.background = 'var(--success-color)';
            emailInput.value = '';
            
            // Reset after 2 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1000);
    });
}

// ==================== COURSE FILTER ====================
function initializeCourseFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (filterButtons.length === 0 || courseCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected category
            const selectedCategory = this.textContent.trim();
            
            // Filter courses
            courseCards.forEach(card => {
                const cardCategory = card.querySelector('.course-category')?.textContent.trim();
                
                if (selectedCategory === 'All Categories' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
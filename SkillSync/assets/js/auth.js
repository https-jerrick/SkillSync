/* =========================================================
   AUTHENTICATION PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('SkillSync auth.js loaded');
    
    // Initialize authentication page
    initializeAuthTabs();
    initializePasswordToggles();
    initializePasswordStrength();
    initializePasswordMatch();
    initializeFormValidation();
    initializeSocialButtons();
});

// ==================== TAB SWITCHING ====================
function initializeAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${targetTab}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });
}

// ==================== PASSWORD TOGGLE ====================
function initializePasswordToggles() {
    const toggles = document.querySelectorAll('.password-toggle');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// ==================== PASSWORD STRENGTH ====================
function initializePasswordStrength() {
    const passwordInput = document.getElementById('register-password');
    const strengthBar = document.getElementById('password-strength');
    const strengthText = document.getElementById('password-strength-text');
    
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        // Update strength bar
        strengthBar.className = 'strength-fill';
        if (password.length > 0) {
            strengthBar.classList.add(strength.class);
        }
        
        // Update strength text
        strengthText.textContent = strength.text;
        strengthText.style.color = strength.color;
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score === 0) return { class: '', text: 'Password strength', color: 'var(--text-light)' };
    if (score <= 2) return { class: 'weak', text: 'Weak password', color: 'var(--danger-color)' };
    if (score <= 3) return { class: 'medium', text: 'Medium strength', color: 'var(--warning-color)' };
    return { class: 'strong', text: 'Strong password', color: 'var(--success-color)' };
}

// ==================== PASSWORD MATCH ====================
function initializePasswordMatch() {
    const passwordInput = document.getElementById('register-password');
    const confirmInput = document.getElementById('confirm-password');
    const matchIndicator = document.getElementById('password-match');
    
    if (!passwordInput || !confirmInput) return;
    
    function checkPasswordMatch() {
        const password = passwordInput.value;
        const confirm = confirmInput.value;
        
        if (confirm.length === 0) {
            matchIndicator.textContent = '';
            matchIndicator.style.color = '';
            return;
        }
        
        if (password === confirm) {
            matchIndicator.textContent = '✓ Passwords match';
            matchIndicator.style.color = 'var(--success-color)';
        } else {
            matchIndicator.textContent = '✗ Passwords do not match';
            matchIndicator.style.color = 'var(--danger-color)';
        }
    }
    
    passwordInput.addEventListener('input', checkPasswordMatch);
    confirmInput.addEventListener('input', checkPasswordMatch);
}

// ==================== FORM VALIDATION ====================
function initializeFormValidation() {
    // Sign In Form
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;
            
            if (!email || !password) {
                showNotification('Please fill in all fields', 'warning');
                return;
            }
            
            if (!SkillSyncUtils.validateEmail(email)) {
                showNotification('Please enter a valid email address', 'warning');
                return;
            }
            
            // Simulate API call
            const submitBtn = this.querySelector('button[type="submit"]');
            SkillSyncUtils.showLoading(submitBtn);
            
            setTimeout(() => {
                SkillSyncUtils.hideLoading(submitBtn);
                showNotification('Sign in successful! Redirecting...', 'success');
                // In real app: window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
    
    // Register Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirm = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            // Basic validation
            if (!name || !email || !password || !confirm) {
                showNotification('Please fill in all fields', 'warning');
                return;
            }
            
            if (!SkillSyncUtils.validateEmail(email)) {
                showNotification('Please enter a valid email address', 'warning');
                return;
            }
            
            if (!SkillSyncUtils.validatePassword(password)) {
                showNotification('Password must be at least 8 characters', 'warning');
                return;
            }
            
            if (password !== confirm) {
                showNotification('Passwords do not match', 'warning');
                return;
            }
            
            if (!terms) {
                showNotification('Please accept the Terms of Service', 'warning');
                return;
            }
            
            // Simulate API call
            const submitBtn = this.querySelector('button[type="submit"]');
            SkillSyncUtils.showLoading(submitBtn);
            
            setTimeout(() => {
                SkillSyncUtils.hideLoading(submitBtn);
                showNotification('Account created successfully! Welcome to SkillSync.', 'success');
                // In real app: switch to signin form or redirect
                document.querySelector('.auth-tab[data-tab="signin"]').click();
            }, 1500);
        });
    }
}

// ==================== SOCIAL BUTTONS ====================
function initializeSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList[1].replace('-btn', '');
            
            showNotification(`Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)} coming soon!`, 'info');
        });
    });
}

// ==================== FORGOT PASSWORD ====================
document.getElementById('forgot-password')?.addEventListener('click', function(e) {
    e.preventDefault();
    showNotification('Password reset feature coming soon!', 'info');
});
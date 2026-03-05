/* =========================================================
   ENHANCED PROFILE PAGE JavaScript - SkillSync
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Profile page loaded');
    
    // Initialize enhanced profile page
    initializeEnhancedProfile();
    initializeProfileNavigation();
    initializeFormSubmissions();
    initializeAvatarUpload();
    initializePasswordChange();
    initializeToggleSwitches();
    initializeBillingActions();
    initializeSecurityActions();
    initializeNotificationPreferences();
    initializeDataManagement();
    initializeLogout();
    initializeToastNotifications();
});

// ==================== ENHANCED PROFILE INITIALIZATION ====================
function initializeEnhancedProfile() {
    // Update hero stats with real-time data
    updateHeroStats();
    
    // Initialize real-time bio counter
    const bioTextarea = document.getElementById('bio');
    if (bioTextarea) {
        bioTextarea.addEventListener('input', function() {
            const bioCounter = document.getElementById('bio-chars');
            if (bioCounter) {
                bioCounter.textContent = this.value.length;
            }
        });
        // Set initial value
        if (bioTextarea.value) {
            const bioCounter = document.getElementById('bio-chars');
            if (bioCounter) {
                bioCounter.textContent = bioTextarea.value.length;
            }
        }
    }
    
    // Initialize password strength indicator
    const newPasswordInput = document.getElementById('new-password');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', updatePasswordStrength);
    }
    
    // Add smooth transitions between sections
    const sections = document.querySelectorAll('.profile-section');
    sections.forEach(section => {
        section.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
}

function updateHeroStats() {
    // In a real app, this would fetch data from an API
    const stats = {
        profileComplete: 85,
        learningHours: 128,
        certificates: 12
    };
    
    // Update progress bar
    const progressFill = document.querySelector('.stat-progress .progress-fill');
    if (progressFill) {
        progressFill.style.width = `${stats.profileComplete}%`;
    }
}

// ==================== ENHANCED PROFILE NAVIGATION ====================
function initializeProfileNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link:not(.sidebar-link-logout)');
    const profileSections = document.querySelectorAll('.profile-section');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const sectionId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            profileSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section with animation
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.classList.add('active');
                    targetSection.style.animation = 'fadeIn 0.4s ease';
                    
                    // Scroll to section on mobile
                    if (window.innerWidth < 1024) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const sectionTop = targetSection.offsetTop - headerHeight - 20;
                        window.scrollTo({
                            top: sectionTop,
                            behavior: 'smooth'
                        });
                    }
                }, 50);
            }
        });
    });
    
    // Handle hash changes for direct linking
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetLink = document.querySelector(`.sidebar-link[href="#${hash}"]`);
            if (targetLink) {
                targetLink.click();
            }
        }
    });
    
    // Handle initial hash
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetLink = document.querySelector(`.sidebar-link[href="#${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
}

// ==================== ENHANCED FORM SUBMISSIONS ====================
function initializeFormSubmissions() {
    // Account Settings Form with Auto-save
    const accountForm = document.getElementById('account-form');
    if (accountForm) {
        let autoSaveTimeout;
        
        // Auto-save on input change
        const inputs = accountForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                clearTimeout(autoSaveTimeout);
                autoSaveTimeout = setTimeout(() => {
                    saveFormData('account-form', getFormData(accountForm));
                }, 1000);
            });
        });
        
        // Manual save
        accountForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await submitForm(this, 'account');
        });
        
        // Reset button
        const resetBtn = document.getElementById('reset-account');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                if (confirm('Reset all changes in this section?')) {
                    accountForm.reset();
                    localStorage.removeItem('account-form-draft');
                    showToast('Changes reset successfully', 'success');
                }
            });
        }
        
        // Load saved draft
        const savedData = localStorage.getItem('account-form-draft');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const input = accountForm.querySelector(`[name="${key}"]`);
                    if (input) input.value = data[key];
                });
            } catch (e) {
                console.error('Error loading saved data:', e);
            }
        }
    }
    
    // Public Profile Form
    const publicForm = document.getElementById('public-form');
    if (publicForm) {
        publicForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await submitForm(this, 'public-profile');
        });
    }
    
    // Billing Form
    const billingForm = document.getElementById('billing-form');
    if (billingForm) {
        billingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await submitForm(this, 'billing');
        });
    }
    
    // Password Form
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await submitPasswordForm(passwordForm);
        });
    }
}

async function submitForm(form, formType) {
    const submitBtn = form.querySelector('button[type="submit"], .btn-save');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Get form data
    const formData = getFormData(form);
    
    try {
        // Simulate API call
        await simulateApiCall(formData, formType);
        
        // Show success message
        showToast(`${formType.replace('-', ' ')} updated successfully!`, 'success');
        
        // Clear draft if saved
        if (formType === 'account') {
            localStorage.removeItem('account-form-draft');
        }
        
    } catch (error) {
        showToast('Error saving changes. Please try again.', 'danger');
        console.error('Form submission error:', error);
    } finally {
        // Restore button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

function getFormData(form) {
    const formData = {};
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.name) {
            if (input.type === 'checkbox') {
                formData[input.name] = input.checked;
            } else {
                formData[input.name] = input.value;
            }
        }
    });
    
    return formData;
}

function saveFormData(formId, data) {
    localStorage.setItem(`${formId}-draft`, JSON.stringify(data));
    // Show autosave indicator
    const form = document.getElementById(formId);
    const hint = form.querySelector('.action-hint');
    if (hint) {
        const originalText = hint.textContent;
        hint.textContent = 'Changes saved locally';
        hint.style.color = 'var(--success-color)';
        
        setTimeout(() => {
            hint.textContent = originalText;
            hint.style.color = '';
        }, 2000);
    }
}

async function simulateApiCall(data, endpoint) {
    // Simulate network delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% success rate for simulation
                resolve({ success: true, data });
            } else {
                reject(new Error('Simulated API error'));
            }
        }, 1500);
    });
}

// ==================== ENHANCED AVATAR UPLOAD ====================
function initializeAvatarUpload() {
    const avatarEditBtn = document.getElementById('hero-avatar-edit');
    const avatarFileInput = document.getElementById('avatar-file-input');
    const removeAvatarBtn = document.getElementById('remove-avatar-btn');
    const saveAvatarBtn = document.getElementById('save-avatar');
    
    if (avatarEditBtn) {
        avatarEditBtn.addEventListener('click', function() {
            const modal = document.getElementById('avatar-modal');
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    if (avatarFileInput) {
        avatarFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (!file.type.startsWith('image/')) {
                    showToast('Please select an image file', 'warning');
                    return;
                }
                
                if (file.size > 5 * 1024 * 1024) {
                    showToast('Image size must be less than 5MB', 'warning');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    const previewImages = document.querySelectorAll('#avatar-preview-large img, #hero-avatar img, #user-avatar');
                    previewImages.forEach(img => {
                        img.src = event.target.result;
                    });
                    
                    // Also update the hero avatar
                    const heroAvatar = document.getElementById('hero-avatar').querySelector('img');
                    if (heroAvatar) {
                        heroAvatar.src = event.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (removeAvatarBtn) {
        removeAvatarBtn.addEventListener('click', function() {
            const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563eb'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
            
            const previewImages = document.querySelectorAll('#avatar-preview-large img, #hero-avatar img, #user-avatar');
            previewImages.forEach(img => {
                img.src = defaultAvatar;
            });
            
            showToast('Profile picture removed', 'info');
        });
    }
    
    if (saveAvatarBtn) {
        saveAvatarBtn.addEventListener('click', function() {
            const modal = document.getElementById('avatar-modal');
            if (modal) modal.classList.remove('active');
            document.body.style.overflow = '';
            
            showToast('Profile picture updated!', 'success');
        });
    }
}

// ==================== ENHANCED PASSWORD CHANGE ====================
function initializePasswordChange() {
    const changePasswordBtn = document.getElementById('change-password');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            const modal = document.getElementById('password-modal');
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
}

async function submitPasswordForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
    submitBtn.disabled = true;
    
    const currentPass = document.getElementById('current-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-password').value;
    
    // Validation
    if (!currentPass || !newPass || !confirmPass) {
        showToast('Please fill in all password fields', 'warning');
        resetPasswordButton(submitBtn, originalText);
        return;
    }
    
    if (newPass !== confirmPass) {
        showToast('New passwords do not match', 'danger');
        resetPasswordButton(submitBtn, originalText);
        return;
    }
    
    if (!SkillSyncUtils.validatePassword(newPass)) {
        showToast('Password must be at least 8 characters long', 'warning');
        resetPasswordButton(submitBtn, originalText);
        return;
    }
    
    try {
        await simulateApiCall({ currentPass, newPass }, 'password-change');
        
        showToast('Password changed successfully!', 'success');
        
        // Close modal and reset form
        const modal = document.getElementById('password-modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
        form.reset();
        
    } catch (error) {
        showToast('Error changing password. Please try again.', 'danger');
    } finally {
        resetPasswordButton(submitBtn, originalText);
    }
}

function resetPasswordButton(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
}

function updatePasswordStrength() {
    const password = this.value;
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text span');
    
    let strength = 0;
    let color = '#ef4444'; // Red
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    if (strength <= 25) {
        strengthText.textContent = 'Weak';
        color = '#ef4444';
    } else if (strength <= 50) {
        strengthText.textContent = 'Fair';
        color = '#f59e0b';
    } else if (strength <= 75) {
        strengthText.textContent = 'Good';
        color = '#3b82f6';
    } else {
        strengthText.textContent = 'Strong';
        color = '#10b981';
    }
    
    if (strengthBar) {
        strengthBar.style.background = `linear-gradient(to right, ${color} ${strength}%, var(--border-color) ${strength}%)`;
    }
}

// ==================== ENHANCED TOGGLE SWITCHES ====================
function initializeToggleSwitches() {
    const toggles = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const toggleItem = this.closest('.toggle-item, .setting-item');
            if (toggleItem) {
                toggleItem.classList.toggle('active', this.checked);
            }
            
            // Show immediate feedback
            const label = this.parentElement.nextElementSibling?.querySelector('span') || 
                         this.closest('.toggle-item')?.querySelector('.toggle-label span') ||
                         this.closest('.setting-item')?.querySelector('h4');
            
            if (label) {
                showToast(`${label.textContent}: ${this.checked ? 'Enabled' : 'Disabled'}`, 'info');
            }
        });
    });
}

// ==================== ENHANCED BILLING ACTIONS ====================
function initializeBillingActions() {
    // Change Plan button
    const changePlanBtn = document.getElementById('change-plan');
    if (changePlanBtn) {
        changePlanBtn.addEventListener('click', function() {
            showToast('Opening pricing plans...', 'info');
            // In a real app, this would open a modal or redirect
        });
    }
    
    // Update Payment Method
    const updatePaymentBtn = document.getElementById('update-payment');
    if (updatePaymentBtn) {
        updatePaymentBtn.addEventListener('click', function() {
            showToast('Edit payment method', 'info');
        });
    }
    
    // Add New Payment Method
    const addCardBtn = document.querySelector('.add-card-btn');
    if (addCardBtn) {
        addCardBtn.addEventListener('click', function() {
            showToast('Add new payment method', 'info');
        });
    }
    
    // Download Invoice buttons
    document.querySelectorAll('[data-invoice]').forEach(btn => {
        btn.addEventListener('click', function() {
            const invoiceId = this.getAttribute('data-invoice');
            showToast(`Downloading invoice #${invoiceId}...`, 'info');
            // Simulate download
            setTimeout(() => {
                showToast('Invoice downloaded successfully', 'success');
            }, 1000);
        });
    });
    
    // Cancel Subscription
    const cancelSubscriptionBtn = document.getElementById('cancel-subscription');
    if (cancelSubscriptionBtn) {
        cancelSubscriptionBtn.addEventListener('click', function() {
            const modal = document.getElementById('cancel-subscription-modal');
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Confirm Cancel Subscription
    const confirmCancelBtn = document.getElementById('confirm-cancel');
    if (confirmCancelBtn) {
        confirmCancelBtn.addEventListener('click', function() {
            const modal = document.getElementById('cancel-subscription-modal');
            if (modal) modal.classList.remove('active');
            document.body.style.overflow = '';
            
            showToast('Subscription cancelled. Access until March 15, 2024.', 'warning');
            
            // Update UI
            const planBadge = document.querySelector('.plan-badge');
            const subscriptionCard = document.querySelector('.subscription-card');
            const cancelBtn = document.getElementById('cancel-subscription');
            
            if (planBadge) {
                planBadge.textContent = 'Cancelled';
                planBadge.className = 'badge badge-warning';
            }
            
            if (subscriptionCard) {
                subscriptionCard.classList.remove('premium');
                subscriptionCard.style.borderColor = 'var(--warning-color)';
                subscriptionCard.querySelector('.price').style.color = 'var(--warning-color)';
            }
            
            if (cancelBtn) {
                cancelBtn.innerHTML = '<i class="fas fa-redo"></i> Reactivate Subscription';
                cancelBtn.classList.remove('btn-danger');
                cancelBtn.classList.add('btn-success');
                
                cancelBtn.addEventListener('click', function() {
                    showToast('Subscription reactivated!', 'success');
                    
                    if (planBadge) {
                        planBadge.textContent = 'Premium';
                        planBadge.className = 'badge badge-primary';
                    }
                    
                    if (subscriptionCard) {
                        subscriptionCard.classList.add('premium');
                        subscriptionCard.style.borderColor = '';
                        subscriptionCard.querySelector('.price').style.color = '';
                    }
                    
                    this.innerHTML = '<i class="fas fa-ban"></i> Cancel Subscription';
                    this.classList.remove('btn-success');
                    this.classList.add('btn-danger');
                    initializeBillingActions(); // Reinitialize
                }, { once: true });
            }
        });
    }
}

// ==================== ENHANCED SECURITY ACTIONS ====================
function initializeSecurityActions() {
    // Enable 2FA
    const enable2faBtn = document.getElementById('enable-2fa');
    if (enable2faBtn) {
        enable2faBtn.addEventListener('click', function() {
            showToast('Setting up Two-Factor Authentication...', 'info');
            
            // Simulate setup process
            setTimeout(() => {
                const statusBadge = document.querySelector('.security-status .status-badge');
                if (statusBadge) {
                    statusBadge.textContent = 'Enabled';
                    statusBadge.className = 'status-badge success';
                }
                
                this.innerHTML = '<i class="fas fa-cog"></i> Manage 2FA';
                this.classList.remove('btn-tertiary');
                this.classList.add('btn-secondary');
                
                showToast('Two-Factor Authentication enabled successfully!', 'success');
            }, 2000);
        });
    }
    
    // Revoke Session
    document.querySelectorAll('.session-item .btn-link').forEach(btn => {
        btn.addEventListener('click', function() {
            const sessionItem = this.closest('.session-item');
            const deviceName = sessionItem.querySelector('.session-info span').textContent;
            
            if (confirm(`Revoke access for ${deviceName}?`)) {
                sessionItem.style.opacity = '0.5';
                this.disabled = true;
                this.textContent = 'Revoking...';
                
                setTimeout(() => {
                    sessionItem.remove();
                    showToast(`Session revoked for ${deviceName}`, 'success');
                }, 1000);
            }
        });
    });
    
    // Deactivate Account
    const deactivateBtn = document.getElementById('deactivate-account');
    if (deactivateBtn) {
        deactivateBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to deactivate your account? Your data will be preserved for 30 days.')) {
                showToast('Account deactivation initiated. You can reactivate within 30 days.', 'warning');
            }
        });
    }
    
    // Delete Account
    const deleteAccountBtn = document.getElementById('delete-account');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            const modal = document.getElementById('delete-confirm-modal');
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Confirm Delete Account
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            const modal = document.getElementById('delete-confirm-modal');
            if (modal) modal.classList.remove('active');
            document.body.style.overflow = '';
            
            showToast('Account deletion initiated. You will receive a confirmation email.', 'info');
            
            // Simulate account deletion process
            setTimeout(() => {
                showToast('Account successfully deleted. Redirecting...', 'success');
                // window.location.href = 'index.html'; // Uncomment for real implementation
            }, 3000);
        });
    }
}

// ==================== ENHANCED NOTIFICATION PREFERENCES ====================
function initializeNotificationPreferences() {
    // Reset to defaults
    const resetBtn = document.getElementById('reset-notifications');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (confirm('Reset all notification settings to defaults?')) {
                const toggles = document.querySelectorAll('#notifications-form input[type="checkbox"]');
                toggles.forEach(toggle => {
                    toggle.checked = toggle.defaultChecked;
                });
                
                const radios = document.querySelectorAll('#notifications-form input[type="radio"]');
                radios.forEach(radio => {
                    radio.checked = radio.defaultChecked;
                });
                
                showToast('Notification preferences reset to defaults', 'success');
            }
        });
    }
    
    // Frequency options
    const frequencyOptions = document.querySelectorAll('.frequency-option input');
    frequencyOptions.forEach(option => {
        option.addEventListener('change', function() {
            const label = this.nextElementSibling;
            const options = document.querySelectorAll('.frequency-option');
            options.forEach(opt => opt.classList.remove('active'));
            label.parentElement.classList.add('active');
            
            showToast(`Notification frequency set to ${label.querySelector('span').textContent}`, 'info');
        });
    });
    
    // Form submission
    const notificationsForm = document.querySelector('#notifications-form');
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await submitForm(this, 'notification-preferences');
        });
    }
}

// ==================== DATA MANAGEMENT ====================
function initializeDataManagement() {
    const dataButtons = document.querySelectorAll('.data-action-btn');
    
    dataButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const actionText = this.querySelector('h4').textContent;
            
            switch (actionText) {
                case 'Export Data':
                    showToast('Preparing your data export...', 'info');
                    setTimeout(() => {
                        showToast('Data export ready for download', 'success');
                    }, 2000);
                    break;
                    
                case 'Clear History':
                    if (confirm('Clear your learning history? This action cannot be undone.')) {
                        showToast('Clearing learning history...', 'info');
                        setTimeout(() => {
                            showToast('Learning history cleared', 'success');
                        }, 1500);
                    }
                    break;
                    
                case 'Privacy Settings':
                    showToast('Opening privacy settings...', 'info');
                    break;
            }
        });
    });
}

// ==================== ENHANCED LOGOUT ====================
function initializeLogout() {
    const logoutBtns = document.querySelectorAll('#logout-btn, #sidebar-logout');
    
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure you want to sign out?')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing out...';
                this.disabled = true;
                
                setTimeout(() => {
                    showToast('Successfully signed out!', 'success');
                    this.innerHTML = originalText;
                    this.disabled = false;
                    // window.location.href = 'login.html'; // Uncomment for real implementation
                }, 1500);
            }
        });
    });
}

// ==================== TOAST NOTIFICATIONS ====================
function initializeToastNotifications() {
    // Toast container is already in the HTML
}

function showToast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${getToastIcon(type)}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${getToastTitle(type)}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Auto remove
    const autoRemove = setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, duration);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    });
    
    // Add slideOutRight animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
    return container;
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        warning: 'exclamation-triangle',
        danger: 'times-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getToastTitle(type) {
    const titles = {
        success: 'Success',
        warning: 'Warning',
        danger: 'Error',
        info: 'Info'
    };
    return titles[type] || 'Notification';
}

// ==================== EXPORT FOR TESTING ====================
window.EnhancedProfile = {
    initializeEnhancedProfile,
    showToast,
    submitForm,
    updatePasswordStrength
};

console.log('Enhanced Profile utilities loaded');
/* =========================================================
   ANALYTICS PAGE JavaScript - Minimal Functionality
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Analytics page loaded - Minimal JS version');
    
    // Add hover effects for chart bars
    initializeChartHover();
    
    // Add hover effects for skill points
    initializeSkillHover();
});

// ==================== CHART HOVER EFFECTS ====================
function initializeChartHover() {
    const chartBars = document.querySelectorAll('.chart-bar');
    const tooltip = document.querySelector('.chart-tooltip');
    
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', function(e) {
            const value = this.getAttribute('data-value');
            const month = this.parentElement.children.length - Array.from(this.parentElement.children).indexOf(this);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
            
            tooltip.innerHTML = `<strong>${months[month-1]}</strong><br>${value} hours studied`;
            tooltip.style.opacity = '1';
            tooltip.style.top = (e.pageY - 60) + 'px';
            tooltip.style.left = (e.pageX - tooltip.offsetWidth/2) + 'px';
        });
        
        bar.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });
    });
}

// ==================== SKILL HOVER EFFECTS ====================
function initializeSkillHover() {
    const skillPoints = document.querySelectorAll('.skill-point');
    
    skillPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            const skill = this.getAttribute('data-skill');
            const value = this.getAttribute('data-value');
            
            // Create a tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.innerHTML = `<strong>${skill}</strong><br>${value}% proficiency`;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'var(--text-color)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '8px 12px';
            tooltip.style.borderRadius = '6px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '1000';
            tooltip.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            tooltip.style.whiteSpace = 'nowrap';
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - 40) + 'px';
            tooltip.style.left = (rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
            
            this._tooltip = tooltip;
        });
        
        point.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                delete this._tooltip;
            }
        });
    });
}

// ==================== MODAL FUNCTIONS ====================
function showGoalModal() {
    const modal = document.getElementById('goalModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeGoalModal() {
    const modal = document.getElementById('goalModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function saveGoal() {
    closeGoalModal();
    // Show notification using global.js function
    if (window.SkillSyncGlobal && window.SkillSyncGlobal.showNotification) {
        window.SkillSyncGlobal.showNotification('New goal saved successfully!', 'success');
    } else {
        alert('Goal saved successfully!');
    }
}

// ==================== UTILITY FUNCTIONS ====================
function updateChartView() {
    // This would update the chart visualization
    // For this minimal version, we'll just show a notification
    if (window.SkillSyncGlobal && window.SkillSyncGlobal.showNotification) {
        window.SkillSyncGlobal.showNotification('Chart view updated', 'info');
    }
}

function viewCourseDetails(course) {
    // This would open a detailed view
    if (window.SkillSyncGlobal && window.SkillSyncGlobal.showNotification) {
        window.SkillSyncGlobal.showNotification(`Loading ${course} details...`, 'info');
    }
}

function analyzeAssessment(assessment) {
    if (window.SkillSyncGlobal && window.SkillSyncGlobal.showNotification) {
        window.SkillSyncGlobal.showNotification(`Analyzing misconceptions for: ${assessment}`, 'info');
    }
}

function startLab(lab) {
    if (window.SkillSyncGlobal && window.SkillSyncGlobal.showNotification) {
        window.SkillSyncGlobal.showNotification(`Starting lab: ${lab}`, 'success');
    }
}

function revisitModule(module) {
    if (window.SkillSyncGlobal && window.SkillSyncGlobal.showNotification) {
        window.SkillSyncGlobal.showNotification(`Revisiting module: ${module}`, 'info');
    }
}

function viewCourse(course) {
    if (window.SkillSyncGlobal && window.SkillSyncGlobal.showNotification) {
        window.SkillSyncGlobal.showNotification(`Viewing course: ${course}`, 'info');
    }
}
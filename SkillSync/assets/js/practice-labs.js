/* =========================================================
   PRACTICE LABS PAGE - Minimal JavaScript
   =========================================================
   Basic interactivity without complex functionality
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Practice Labs page loaded');
    
    // Simple click handlers for demo purposes
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Simulate video play
            this.innerHTML = '<i class="fas fa-pause"></i>';
            this.style.backgroundColor = 'var(--danger-color)';
            alert('Playing demo video... (This is a demo)');
        });
    }
    
    // Launch lab buttons
    const launchButtons = document.querySelectorAll('.lab-card .btn-primary, .session-actions .btn-primary');
    launchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find lab name
            let labName = '';
            const card = this.closest('.lab-card') || this.closest('.session-card');
            if (card) {
                const title = card.querySelector('h3');
                if (title) {
                    labName = title.textContent;
                }
            }
            
            // Simulate lab launch
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert(`Launching "${labName}"...\n\nIn a real implementation, this would:\n1. Open the lab environment\n2. Start the timer\n3. Load the interactive workspace\n4. Show step-by-step instructions`);
            }, 1000);
        });
    });
    
    // Filter button
    const filterBtn = document.querySelector('.filter-options .btn-secondary');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const skill = document.querySelector('.filter-select:nth-child(1)').value;
            const level = document.querySelector('.filter-select:nth-child(2)').value;
            const duration = document.querySelector('.filter-select:nth-child(3)').value;
            
            // Simple filter simulation
            const message = `Applying filters:\n• Skill: ${skill}\n• Level: ${level}\n• Duration: ${duration}\n\n(This would filter labs in a real implementation)`;
            alert(message);
        });
    }
    
    // Load more button
    const loadMoreBtn = document.querySelector('.load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading more labs...';
            this.disabled = true;
            
            // Simulate loading more labs
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert('Loading 6 more practice labs...\n\nIn a real implementation, this would fetch and display additional labs from the server.');
            }, 1500);
        });
    }
    
    // End session buttons
    const endButtons = document.querySelectorAll('.session-actions .btn-outline');
    endButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.session-card');
            if (card) {
                card.style.opacity = '0.5';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    card.remove();
                    const sessions = document.querySelectorAll('.session-card');
                    if (sessions.length === 0) {
                        document.querySelector('.sessions-grid').innerHTML = `
                            <div class="no-sessions">
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
    `;
    document.head.appendChild(style);
});
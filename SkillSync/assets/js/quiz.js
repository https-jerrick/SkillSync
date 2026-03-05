/* =========================================================
   QUIZ & ASSESSMENT CENTER JavaScript - SkillSync
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz & Assessment Center loaded');
    
    // Initialize all functionality
    initializeAssessmentNavigation();
    initializeAssessmentStart();
    initializeCatalogFilters();
    initializeResultsTable();
    initializeAssessmentInterface();
    initializeReviewResults();
    initializeToastNotifications();
});

// ==================== ASSESSMENT NAVIGATION ====================
function initializeAssessmentNavigation() {
    // Update active navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'quiz-assessment.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ==================== ASSESSMENT START FUNCTIONALITY ====================
function initializeAssessmentStart() {
    const startButtons = document.querySelectorAll('[data-action="start"]');
    const authModal = document.getElementById('auth-modal');
    const confirmStartBtn = document.getElementById('confirm-start');
    
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const assessmentId = this.getAttribute('data-assessment');
            const assessmentCard = this.closest('.assessment-card');
            
            if (assessmentCard) {
                // Get assessment details
                const assessmentName = assessmentCard.querySelector('h3').textContent;
                const courseInfo = assessmentCard.querySelector('.course-info').textContent;
                const metaItems = assessmentCard.querySelectorAll('.meta-item');
                
                // Extract duration and attempts from course info
                const durationMatch = courseInfo.match(/(\d+)\s*Minutes/);
                const questionsMatch = courseInfo.match(/(\d+)\s*Questions/);
                const attemptsMatch = courseInfo.match(/Attempts:\s*(\d+)\/(\d+)/);
                
                // Update modal content
                document.getElementById('modal-assessment-name').textContent = assessmentName;
                document.getElementById('modal-duration').textContent = durationMatch ? `${durationMatch[1]} minutes` : '60 minutes';
                document.getElementById('modal-questions').textContent = questionsMatch ? `${questionsMatch[1]} questions` : '25 questions';
                document.getElementById('modal-attempts').textContent = attemptsMatch ? `${attemptsMatch[2] - attemptsMatch[1]} attempts remaining` : '1 attempt remaining';
                
                // Store assessment ID for later use
                authModal.setAttribute('data-assessment-id', assessmentId);
                
                // Show authorization modal
                if (authModal) {
                    authModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });
    
    // Confirm start assessment
    if (confirmStartBtn) {
        confirmStartBtn.addEventListener('click', function() {
            const authModal = document.getElementById('auth-modal');
            const assessmentId = authModal.getAttribute('data-assessment-id');
            
            // Close authorization modal
            if (authModal) {
                authModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Show loading toast
            showToast('Starting assessment...', 'info');
            
            // Simulate loading time
            setTimeout(() => {
                // Start the assessment
                startAssessment(assessmentId);
            }, 1500);
        });
    }
}

function startAssessment(assessmentId) {
    // Get assessment interface modal
    const assessmentInterface = document.getElementById('assessment-interface');
    
    if (assessmentInterface) {
        // Load assessment questions (in real app, this would be from an API)
        loadAssessmentQuestions(assessmentId);
        
        // Show assessment interface
        assessmentInterface.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Start timer
        startAssessmentTimer(60 * 60); // 60 minutes in seconds
        
        showToast('Assessment started! Good luck!', 'success');
    }
}

// ==================== CATALOG FILTERS ====================
function initializeCatalogFilters() {
    const searchInput = document.getElementById('assessment-search');
    const skillFilter = document.getElementById('skill-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const typeFilter = document.getElementById('type-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const loadMoreBtn = document.getElementById('load-more');
    const catalogGrid = document.getElementById('assessment-grid');
    
    // Filter function
    function filterAssessments() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSkill = skillFilter.value;
        const selectedDifficulty = difficultyFilter.value;
        const selectedType = typeFilter.value;
        
        const cards = catalogGrid.querySelectorAll('.catalog-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const cardSkill = card.getAttribute('data-skill');
            const cardDifficulty = card.getAttribute('data-difficulty');
            const cardType = card.getAttribute('data-type');
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('.card-description').textContent.toLowerCase();
            
            const matchesSearch = searchTerm === '' || 
                cardTitle.includes(searchTerm) || 
                cardDesc.includes(searchTerm);
            
            const matchesSkill = selectedSkill === 'all' || cardSkill === selectedSkill;
            const matchesDifficulty = selectedDifficulty === 'all' || cardDifficulty === selectedDifficulty;
            const matchesType = selectedType === 'all' || cardType === selectedType;
            
            if (matchesSearch && matchesSkill && matchesDifficulty && matchesType) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show empty state if no results
        let emptyState = catalogGrid.querySelector('.empty-state');
        if (visibleCount === 0) {
            if (!emptyState) {
                emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>No assessments found</h3>
                    <p>Try adjusting your filters or search terms</p>
                `;
                catalogGrid.appendChild(emptyState);
            }
        } else if (emptyState) {
            emptyState.remove();
        }
    }
    
    // Add event listeners
    if (searchInput) searchInput.addEventListener('input', filterAssessments);
    if (skillFilter) skillFilter.addEventListener('change', filterAssessments);
    if (difficultyFilter) difficultyFilter.addEventListener('change', filterAssessments);
    if (typeFilter) typeFilter.addEventListener('change', filterAssessments);
    
    // Reset filters
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            searchInput.value = '';
            skillFilter.value = 'all';
            difficultyFilter.value = 'all';
            typeFilter.value = 'all';
            filterAssessments();
            showToast('Filters reset', 'info');
        });
    }
    
    // Load more assessments
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const btn = this;
            const originalText = btn.innerHTML;
            
            // Show loading state
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            btn.disabled = true;
            
            // Simulate loading more assessments
            setTimeout(() => {
                // In a real app, this would load more data from an API
                showToast('Loaded more assessments', 'success');
                
                // Restore button
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
    
    // Initialize catalog cards
    const catalogCards = document.querySelectorAll('.catalog-card [data-action="practice"], .catalog-card [data-action="details"]');
    catalogCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const cardElement = this.closest('.catalog-card');
            const assessmentName = cardElement.querySelector('h3').textContent;
            
            if (action === 'practice') {
                showToast(`Starting practice: ${assessmentName}`, 'info');
                // In a real app, this would start the assessment
            } else if (action === 'details') {
                showToast(`Viewing details: ${assessmentName}`, 'info');
                // In a real app, this would show assessment details
            }
        });
    });
}

// ==================== RESULTS TABLE FUNCTIONALITY ====================
function initializeResultsTable() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const sortSelect = document.getElementById('sort-results');
    const sortHeaders = document.querySelectorAll('.sortable-header');
    const reviewButtons = document.querySelectorAll('[data-action="review"]');
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter results
            filterResults(filter);
        });
    });
    
    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortResults(sortBy);
        });
    }
    
    // Sort headers
    sortHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const sortBy = this.getAttribute('data-sort');
            sortResults(sortBy);
            
            // Update sort indicators
            sortHeaders.forEach(h => {
                const icon = h.querySelector('i');
                if (h === this) {
                    icon.className = 'fas fa-sort-up';
                } else {
                    icon.className = 'fas fa-sort';
                }
            });
        });
    });
    
    // Review results buttons
    reviewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const assessmentName = row.querySelector('.result-name strong').textContent;
            showResultsReview(assessmentName);
        });
    });
}

function filterResults(filter) {
    const rows = document.querySelectorAll('.results-table tbody .result-item');
    
    rows.forEach(row => {
        switch (filter) {
            case 'all':
                row.style.display = '';
                break;
            case 'passed':
                row.style.display = row.classList.contains('passed') ? '' : 'none';
                break;
            case 'failed':
                row.style.display = row.classList.contains('failed') ? '' : 'none';
                break;
            case 'recent':
                // Show only last 10 results (simplified)
                const index = Array.from(rows).indexOf(row);
                row.style.display = index < 10 ? '' : 'none';
                break;
        }
    });
}

function sortResults(sortBy) {
    const tbody = document.querySelector('.results-table tbody');
    const rows = Array.from(tbody.querySelectorAll('.result-item'));
    
    rows.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                const nameA = a.querySelector('.result-name strong').textContent.toLowerCase();
                const nameB = b.querySelector('.result-name strong').textContent.toLowerCase();
                return nameA.localeCompare(nameB);
                
            case 'date':
                const dateA = new Date(a.querySelector('.result-date span').textContent);
                const dateB = new Date(b.querySelector('.result-date span').textContent);
                return dateB - dateA; // Most recent first
                
            case 'score-high':
                const scoreA = parseInt(a.querySelector('.score-value').textContent);
                const scoreB = parseInt(b.querySelector('.score-value').textContent);
                return scoreB - scoreA;
                
            case 'score-low':
                const scoreA2 = parseInt(a.querySelector('.score-value').textContent);
                const scoreB2 = parseInt(b.querySelector('.score-value').textContent);
                return scoreA2 - scoreB2;
                
            default:
                return 0;
        }
    });
    
    // Reorder rows
    rows.forEach(row => tbody.appendChild(row));
}

// ==================== ASSESSMENT INTERFACE ====================
function initializeAssessmentInterface() {
    const exitBtn = document.querySelector('#assessment-interface .btn-link');
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const flagBtn = document.getElementById('flag-question');
    const clearBtn = document.getElementById('clear-answer');
    const reviewAllBtn = document.getElementById('review-all');
    const submitBtn = document.getElementById('submit-assessment');
    
    // Exit assessment
    if (exitBtn) {
        exitBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to exit the assessment? Your progress will be saved.')) {
                const assessmentInterface = document.getElementById('assessment-interface');
                if (assessmentInterface) {
                    assessmentInterface.classList.remove('active');
                    document.body.style.overflow = '';
                    showToast('Assessment exited. Progress saved.', 'info');
                }
            }
        });
    }
    
    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', navigateToPreviousQuestion);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', navigateToNextQuestion);
    }
    
    // Flag question
    if (flagBtn) {
        flagBtn.addEventListener('click', function() {
            const currentQuestion = getCurrentQuestion();
            const questionNumber = document.querySelector('.question-number.current');
            
            if (questionNumber) {
                questionNumber.classList.toggle('flagged');
                const isFlagged = questionNumber.classList.contains('flagged');
                
                this.innerHTML = isFlagged ? 
                    '<i class="fas fa-flag"></i> Remove Flag' : 
                    '<i class="far fa-flag"></i> Flag for Review';
                
                showToast(`Question ${currentQuestion} ${isFlagged ? 'flagged' : 'unflagged'}`, 'info');
            }
        });
    }
    
    // Clear answer
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            const options = document.querySelectorAll('.answer-option.selected');
            options.forEach(option => option.classList.remove('selected'));
            
            const currentQuestion = getCurrentQuestion();
            const questionNumber = document.querySelector('.question-number.current');
            if (questionNumber) {
                questionNumber.classList.remove('answered');
                questionNumber.classList.add('unanswered');
            }
            
            showToast(`Answer cleared for question ${currentQuestion}`, 'info');
        });
    }
    
    // Review all questions
    if (reviewAllBtn) {
        reviewAllBtn.addEventListener('click', function() {
            showToast('Opening question review...', 'info');
        });
    }
    
    // Submit assessment
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            if (confirm('Are you ready to submit your assessment? This action cannot be undone.')) {
                submitAssessment();
            }
        });
    }
    
    // Initialize answer selection
    initializeAnswerSelection();
}

function loadAssessmentQuestions(assessmentId) {
    // In a real app, this would fetch questions from an API
    // For demo, we'll create sample questions
    
    const questionGrid = document.getElementById('question-grid');
    const answerOptions = document.getElementById('answer-options');
    
    // Clear existing content
    questionGrid.innerHTML = '';
    answerOptions.innerHTML = '';
    
    // Create 25 sample questions
    for (let i = 1; i <= 25; i++) {
        // Question number in navigation
        const questionNumber = document.createElement('div');
        questionNumber.className = 'question-number unanswered';
        if (i === 1) questionNumber.classList.add('current');
        questionNumber.textContent = i;
        questionNumber.setAttribute('data-question', i);
        questionNumber.addEventListener('click', () => navigateToQuestion(i));
        questionGrid.appendChild(questionNumber);
        
        // For first question, create answer options
        if (i === 1) {
            const answers = ['object, undefined, false', 'object, undefined, true', 'null, undefined, false', 'null, undefined, true'];
            
            answers.forEach((answer, index) => {
                const option = document.createElement('div');
                option.className = 'answer-option';
                option.innerHTML = `
                    <div class="option-label">${String.fromCharCode(65 + index)}</div>
                    <div class="option-text">${answer}</div>
                `;
                option.addEventListener('click', () => selectAnswer(i, index));
                answerOptions.appendChild(option);
            });
        }
    }
    
    // Update question count
    document.getElementById('total-questions').textContent = '25';
    document.getElementById('current-question').textContent = '1';
}

function navigateToQuestion(questionNumber) {
    // Update navigation
    const allNumbers = document.querySelectorAll('.question-number');
    allNumbers.forEach(num => num.classList.remove('current'));
    
    const currentNumber = document.querySelector(`.question-number[data-question="${questionNumber}"]`);
    if (currentNumber) {
        currentNumber.classList.add('current');
    }
    
    // Update question display
    document.getElementById('current-question').textContent = questionNumber;
    document.getElementById('question-title').textContent = `Question ${questionNumber}`;
    
    // Update question text based on question number (simplified)
    const questionText = document.getElementById('question-text');
    const codeSnippet = document.querySelector('.code-snippet');
    
    switch (questionNumber % 3) {
        case 0:
            questionText.textContent = 'Which React hook is used for side effects in function components?';
            if (codeSnippet) codeSnippet.style.display = 'none';
            break;
        case 1:
            questionText.textContent = 'What is the time complexity of binary search?';
            if (codeSnippet) codeSnippet.style.display = 'none';
            break;
        case 2:
            questionText.textContent = 'What is the output of the following JavaScript code?';
            if (codeSnippet) {
                codeSnippet.style.display = 'block';
                codeSnippet.querySelector('code').textContent = `const arr = [1, 2, 3];
arr.map(x => x * 2).filter(x => x > 3);
console.log(arr);`;
            }
            break;
    }
    
    // Update answer options
    const answerOptions = document.getElementById('answer-options');
    answerOptions.innerHTML = '';
    
    const answers = getAnswersForQuestion(questionNumber);
    answers.forEach((answer, index) => {
        const option = document.createElement('div');
        option.className = 'answer-option';
        option.innerHTML = `
            <div class="option-label">${String.fromCharCode(65 + index)}</div>
            <div class="option-text">${answer}</div>
        `;
        option.addEventListener('click', () => selectAnswer(questionNumber, index));
        answerOptions.appendChild(option);
    });
}

function getAnswersForQuestion(questionNumber) {
    // Return different answers based on question number
    const answerSets = [
        ['O(log n)', 'O(n)', 'O(n log n)', 'O(n²)'],
        ['useEffect', 'useState', 'useContext', 'useReducer'],
        ['[1, 2, 3]', '[2, 4, 6]', '[4, 6]', '[3]']
    ];
    
    return answerSets[questionNumber % 3];
}

function navigateToPreviousQuestion() {
    const current = getCurrentQuestion();
    if (current > 1) {
        navigateToQuestion(current - 1);
    }
}

function navigateToNextQuestion() {
    const current = getCurrentQuestion();
    if (current < 25) {
        navigateToQuestion(current + 1);
    }
}

function getCurrentQuestion() {
    const currentText = document.getElementById('current-question').textContent;
    return parseInt(currentText);
}

function initializeAnswerSelection() {
    // Answer selection is handled in loadAssessmentQuestions and navigateToQuestion
}

function selectAnswer(questionNumber, answerIndex) {
    // Deselect all options
    const options = document.querySelectorAll('.answer-option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Select clicked option
    options[answerIndex].classList.add('selected');
    
    // Update question status
    const questionElement = document.querySelector(`.question-number[data-question="${questionNumber}"]`);
    if (questionElement) {
        questionElement.classList.remove('unanswered');
        questionElement.classList.add('answered');
    }
    
    // Update answered count
    updateAnsweredCount();
}

function updateAnsweredCount() {
    const answered = document.querySelectorAll('.question-number.answered').length;
    const unanswered = document.querySelectorAll('.question-number.unanswered').length;
    
    const statsElement = document.querySelector('.navigation-stats');
    if (statsElement) {
        statsElement.innerHTML = `<span class="answered">${answered}</span> answered • <span class="unanswered">${unanswered}</span> remaining`;
    }
}

function startAssessmentTimer(totalSeconds) {
    const timerElement = document.getElementById('timer');
    const timerContainer = document.querySelector('.assessment-timer');
    
    let remainingSeconds = totalSeconds;
    
    const timerInterval = setInterval(() => {
        remainingSeconds--;
        
        if (remainingSeconds <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = '00:00';
            autoSubmitAssessment();
            return;
        }
        
        // Update timer display
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update timer color based on remaining time
        if (remainingSeconds <= 300) { // 5 minutes
            timerContainer.classList.add('critical');
            timerContainer.classList.remove('warning');
        } else if (remainingSeconds <= 600) { // 10 minutes
            timerContainer.classList.add('warning');
            timerContainer.classList.remove('critical');
        } else {
            timerContainer.classList.remove('warning', 'critical');
        }
        
        // Save timer state (in real app, this would be sent to server)
        if (remainingSeconds % 30 === 0) {
            // Auto-save progress every 30 seconds
            console.log('Auto-saving assessment progress...');
        }
    }, 1000);
}

function submitAssessment() {
    const submitBtn = document.getElementById('submit-assessment');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Simulate submission process
    setTimeout(() => {
        // Close assessment interface
        const assessmentInterface = document.getElementById('assessment-interface');
        if (assessmentInterface) {
            assessmentInterface.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Show results
        showAssessmentResults();
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        showToast('Assessment submitted successfully!', 'success');
    }, 2000);
}

function autoSubmitAssessment() {
    showToast('Time is up! Automatically submitting assessment...', 'warning');
    submitAssessment();
}

// ==================== RESULTS REVIEW ====================
function initializeReviewResults() {
    const reviewTabs = document.querySelectorAll('.review-tab');
    
    reviewTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const reviewType = this.getAttribute('data-review');
            
            // Update active tab
            reviewTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter review questions
            filterReviewQuestions(reviewType);
        });
    });
}

function showResultsReview(assessmentName) {
    const resultsModal = document.getElementById('results-modal');
    
    if (resultsModal) {
        // Update modal title with assessment name
        const modalHeader = resultsModal.querySelector('.modal-header h3');
        if (modalHeader) {
            modalHeader.textContent = `Results: ${assessmentName}`;
        }
        
        // Show modal
        resultsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function showAssessmentResults() {
    // In a real app, this would show the actual results
    // For demo, we'll show a generic results review
    showResultsReview('JavaScript Advanced Concepts - Final Exam');
}

function filterReviewQuestions(reviewType) {
    // In a real app, this would filter questions based on review type
    console.log(`Filtering review questions by: ${reviewType}`);
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
window.AssessmentCenter = {
    startAssessment,
    showToast,
    filterAssessments: function() {
        // Re-export filter function
        const searchInput = document.getElementById('assessment-search');
        const skillFilter = document.getElementById('skill-filter');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const typeFilter = document.getElementById('type-filter');
        
        if (searchInput && skillFilter && difficultyFilter && typeFilter) {
            // Trigger filter
            const event = new Event('input');
            searchInput.dispatchEvent(event);
        }
    }
};

console.log('Quiz & Assessment Center utilities loaded');
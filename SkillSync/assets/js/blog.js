/* ==================== BLOG & RESOURCES JAVASCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog & Resources page loaded');
    
    // Set active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === 'blog.html') {
            link.classList.add('active');
        }
    });
    
    // Initialize components
    initializeCarousel();
    initializeFilters();
    initializeResourceCards();
    initializeDownloadables();
    initializeNewsletter();
    
    // Add animation classes to elements
    addAnimations();
});

// ==================== CAROUSEL ====================
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    // Function to show specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Auto-rotate carousel
    let slideInterval = setInterval(() => {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }, 5000); // Change slide every 5 seconds
    
    // Dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval); // Stop auto-rotation on manual interaction
            showSlide(index);
            // Restart auto-rotation after 10 seconds
            setTimeout(() => {
                slideInterval = setInterval(() => {
                    let nextIndex = (currentSlide + 1) % slides.length;
                    showSlide(nextIndex);
                }, 5000);
            }, 10000);
        });
    });
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
            setTimeout(() => {
                slideInterval = setInterval(() => {
                    let nextIndex = (currentSlide + 1) % slides.length;
                    showSlide(nextIndex);
                }, 5000);
            }, 10000);
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
            setTimeout(() => {
                slideInterval = setInterval(() => {
                    let nextIndex = (currentSlide + 1) % slides.length;
                    showSlide(nextIndex);
                }, 5000);
            }, 10000);
        });
    }
    
    // Pause auto-rotation on hover
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                let nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            }, 5000);
        });
    }
    
    // Featured article read buttons
    document.querySelectorAll('.carousel .read-more').forEach(btn => {
        btn.addEventListener('click', function() {
            const articleTitle = this.closest('.slide-info').querySelector('h3').textContent;
            showNotification(`Opening "${articleTitle}"...`, 'info');
            
            // Simulate loading
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                // In real implementation, this would navigate to the article page
                alert(`Article: ${articleTitle}\n\nThis would open the full article in a real implementation.`);
            }, 1000);
        });
    });
}

// ==================== FILTERS ====================
function initializeFilters() {
    const applyFiltersBtn = document.querySelector('.sidebar-section .btn-secondary');
    const resetFiltersBtn = document.querySelector('.sidebar-section .btn-outline');
    const checkboxes = document.querySelectorAll('.checkbox-label input');
    const radios = document.querySelectorAll('.radio-label input');
    const selects = document.querySelectorAll('.filter-select');
    const searchInput = document.querySelector('.hero-search .search-input');
    const searchBtn = document.querySelector('.hero-search .btn');
    
    // Apply filters button
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const selectedCategories = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.parentElement.querySelector('span').textContent);
            
            const selectedType = Array.from(radios)
                .find(rb => rb.checked)
                ?.parentElement.querySelector('span').textContent;
            
            const timeToRead = selects[0].value;
            const dateRange = selects[1].value;
            const searchTerm = searchInput?.value || '';
            
            // Show filter summary
            let message = 'Applying filters:\n';
            if (selectedCategories.length > 0) {
                message += `• Categories: ${selectedCategories.join(', ')}\n`;
            }
            if (selectedType && selectedType !== 'All Types') {
                message += `• Content Type: ${selectedType}\n`;
            }
            if (timeToRead !== 'Any Duration') {
                message += `• Time to Read: ${timeToRead}\n`;
            }
            if (dateRange !== 'All Time') {
                message += `• Date Range: ${dateRange}\n`;
            }
            if (searchTerm) {
                message += `• Search: "${searchTerm}"\n`;
            }
            
            showNotification('Filters applied! Showing matching articles...', 'info');
            
            // Simulate filtering
            const resourceCards = document.querySelectorAll('.resource-card');
            let visibleCount = 0;
            
            resourceCards.forEach(card => {
                card.style.display = 'flex';
                visibleCount++;
            });
            
            // Update count
            setTimeout(() => {
                if (searchTerm || selectedCategories.length > 0) {
                    showNotification(`Found ${visibleCount} matching articles`, 'success');
                }
            }, 500);
        });
    }
    
    // Reset filters button
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            // Reset checkboxes (keep first checked)
            checkboxes.forEach((cb, index) => {
                cb.checked = index < 2; // Keep first two checked
            });
            
            // Reset radios
            radios.forEach((rb, index) => {
                rb.checked = index === 0; // Keep first checked
            });
            
            // Reset selects
            selects.forEach(select => {
                select.selectedIndex = 0;
            });
            
            // Reset search
            if (searchInput) {
                searchInput.value = '';
            }
            
            showNotification('Filters reset to default', 'info');
            
            // Show all cards
            document.querySelectorAll('.resource-card').forEach(card => {
                card.style.display = 'flex';
            });
        });
    }
    
    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            showNotification('Please enter a search term', 'warning');
            return;
        }
        
        showNotification(`Searching for "${searchTerm}"...`, 'info');
        
        // Simulate search
        setTimeout(() => {
            const results = Math.floor(Math.random() * 5) + 8; // Random 8-12 results
            showNotification(`Found ${results} articles matching "${searchTerm}"`, 'success');
        }, 1500);
    }
    
    // Tag cloud interaction
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent;
            
            // Simulate filtering by tag
            showNotification(`Showing articles tagged "${tagText}"`, 'info');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
}

// ==================== RESOURCE CARDS ====================
function initializeResourceCards() {
    // Read article buttons
    document.querySelectorAll('.resource-card .btn-outline').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.resource-card');
            const articleTitle = card.querySelector('h3').textContent;
            const articleType = card.querySelector('.content-type').textContent;
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading article
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show article modal
                showArticleModal(articleTitle, articleType);
            }, 1500);
        });
    });
    
    // Load more button
    const loadMoreBtn = document.querySelector('.load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading more articles...';
            this.disabled = true;
            
            // Simulate loading more articles
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                showNotification('Loaded 6 more articles!', 'success');
                // In real implementation, this would append new articles to the grid
            }, 2000);
        });
    }
    
    // Sort functionality
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            showNotification(`Sorting articles by: ${sortBy}`, 'info');
            
            // Simulate sorting animation
            const grid = document.querySelector('.resource-grid');
            grid.style.opacity = '0.5';
            
            setTimeout(() => {
                grid.style.opacity = '1';
            }, 500);
        });
    }
}

function showArticleModal(title, type) {
    // Create modal
    const modalHTML = `
        <div class="overlay active">
            <div class="modal modal-lg">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="closeArticleModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="article-preview">
                        <div class="preview-header">
                            <div class="preview-meta">
                                <span class="preview-type">${type}</span>
                                <span><i class="far fa-clock"></i> Estimated read: 8 min</span>
                            </div>
                            <div class="preview-image">
                                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                     alt="Article Preview">
                            </div>
                        </div>
                        <div class="preview-content">
                            <h4>Article Preview</h4>
                            <p>This is a preview of the full article "${title}". In a real implementation, this would show the complete article content.</p>
                            <p>The article would include detailed insights, analysis, and practical tips related to the topic. You would be able to read the full content here or save it for later.</p>
                            <div class="preview-actions">
                                <button class="btn btn-outline" onclick="closeArticleModal()">
                                    Close Preview
                                </button>
                                <button class="btn btn-primary" onclick="openFullArticle('${title}')">
                                    <i class="fas fa-book-open"></i> Read Full Article
                                </button>
                                <button class="btn btn-secondary">
                                    <i class="fas fa-bookmark"></i> Save for Later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-lg {
            max-width: 800px;
        }
        
        .article-preview {
            padding: 1rem;
        }
        
        .preview-header {
            margin-bottom: 2rem;
        }
        
        .preview-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            color: var(--text-light);
            font-size: 0.95rem;
        }
        
        .preview-type {
            background: var(--primary-color);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .preview-image {
            height: 300px;
            border-radius: var(--border-radius);
            overflow: hidden;
        }
        
        .preview-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .preview-content h4 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--text-color);
        }
        
        .preview-content p {
            line-height: 1.6;
            margin-bottom: 1rem;
            color: var(--text-light);
        }
        
        .preview-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border-color);
        }
    `;
    
    document.head.appendChild(style);
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function closeArticleModal() {
    const overlay = document.querySelector('.overlay.active');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = '';
    }
}

function openFullArticle(title) {
    closeArticleModal();
    showNotification(`Opening full article: ${title}`, 'success');
    
    setTimeout(() => {
        alert(`Article: ${title}\n\nYou would now be reading the complete article. In a real implementation, this would navigate to the article page with full content, comments, and sharing options.`);
    }, 500);
}

// Make functions available globally
window.closeArticleModal = closeArticleModal;
window.openFullArticle = openFullArticle;

// ==================== DOWNLOADABLES ====================
function initializeDownloadables() {
    document.querySelectorAll('.downloadable-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.downloadable-card');
            const resourceTitle = card.querySelector('h3').textContent;
            
            // Show download modal
            showDownloadModal(resourceTitle);
        });
    });
}

function showDownloadModal(resourceTitle) {
    // Create download modal
    const modalHTML = `
        <div class="overlay active">
            <div class="modal">
                <div class="modal-header">
                    <h3>Download ${resourceTitle}</h3>
                    <button class="modal-close" onclick="closeDownloadModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="download-form">
                        <div class="download-icon">
                            <i class="fas fa-download"></i>
                        </div>
                        <p>Enter your details to download this free resource.</p>
                        
                        <form id="downloadForm">
                            <div class="form-group">
                                <input type="text" placeholder="Your Name" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <input type="email" placeholder="Email Address" class="form-control" required>
                            </div>
                            <div class="form-group checkbox-label">
                                <input type="checkbox" id="newsletterOptin" checked>
                                <label for="newsletterOptin">Send me weekly learning tips and resources</label>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-outline" onclick="closeDownloadModal()">
                                    Cancel
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-download"></i> Download Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .download-form {
            text-align: center;
            padding: 1rem;
        }
        
        .download-icon {
            width: 80px;
            height: 80px;
            background: var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: white;
            font-size: 2rem;
        }
        
        .download-form p {
            color: var(--text-light);
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .download-form .form-group {
            margin-bottom: 1rem;
            text-align: left;
        }
        
        .form-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .form-actions .btn {
            flex: 1;
        }
    `;
    
    document.head.appendChild(style);
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    
    // Handle form submission
    const form = document.getElementById('downloadForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            processDownload(resourceTitle);
        });
    }
}

function closeDownloadModal() {
    const overlay = document.querySelector('.overlay.active');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = '';
    }
}

function processDownload(resourceTitle) {
    const form = document.getElementById('downloadForm');
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    
    // Simulate download processing
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeDownloadModal();
        showNotification(`Download started for "${resourceTitle}"! Check your email at ${email}`, 'success');
        
        // In real implementation, this would trigger the actual download
        setTimeout(() => {
            alert(`Thank you ${name}!\n\nYour download of "${resourceTitle}" has started.\nA copy has also been sent to ${email}.`);
        }, 1000);
    }, 2000);
}

window.closeDownloadModal = closeDownloadModal;

// ==================== NEWSLETTER ====================
function initializeNewsletter() {
    // Hero newsletter
    const sidebarForm = document.querySelector('.newsletter-sidebar form');
    if (sidebarForm) {
        sidebarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeToNewsletter(email, 'sidebar');
        });
    }
    
    // Main newsletter
    const mainNewsletter = document.querySelector('.newsletter-section form');
    if (mainNewsletter) {
        mainNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeToNewsletter(email, 'main');
        });
    }
}

function subscribeToNewsletter(email, source) {
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address', 'warning');
        return;
    }
    
    // Show loading state
    let submitBtn;
    if (source === 'sidebar') {
        submitBtn = document.querySelector('.newsletter-sidebar .btn');
    } else {
        submitBtn = document.querySelector('.newsletter-section .btn');
    }
    
    if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate subscription
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            showNotification(`Success! You've subscribed to our newsletter. Welcome email sent to ${email}`, 'success');
            
            // Reset form
            if (source === 'sidebar') {
                document.querySelector('.newsletter-sidebar input').value = '';
            } else {
                document.querySelector('.newsletter-section input').value = '';
            }
        }, 1500);
    }
}

// ==================== ANIMATIONS ====================
function addAnimations() {
    // Add animation class to elements as they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all resource cards and downloadables
    document.querySelectorAll('.resource-card, .downloadable-card').forEach(card => {
        observer.observe(card);
    });
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
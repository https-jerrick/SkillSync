// =========================================================
// HOME PAGE JavaScript - SkillSync (FIXED - Removed duplicate mobile menu)
// =========================================================

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Home page JS loaded');
        
        initializeScrollAnimations();
        initializeCourseFilters();
        initializeTestimonialsCarousel();
        initializeScrollToTop();
        initializePricingFormat();
        initializeContactForm();
    });

    // ==================== SCROLL ANIMATIONS ====================
    function initializeScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('[data-animate], .feature-card, .course-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }

    // ==================== COURSE FILTERS ====================
    function initializeCourseFilters() {
        const coursesSection = document.querySelector('.courses-section .section-header');
        if (!coursesSection) return;

        // Check if filters already exist
        if (document.querySelector('.category-filters')) return;

        const filterContainer = document.createElement('div');
        filterContainer.className = 'category-filters';
        filterContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">All Courses</button>
            <button class="filter-btn" data-filter="Programming">Programming</button>
            <button class="filter-btn" data-filter="Data Science">Data Science</button>
            <button class="filter-btn" data-filter="Design">Design</button>
            <button class="filter-btn" data-filter="Cloud & DevOps">Cloud & DevOps</button>
            <button class="filter-btn" data-filter="Business">Business</button>
        `;

        const sectionTitle = coursesSection.querySelector('div');
        if (sectionTitle) {
            sectionTitle.appendChild(filterContainer);
        }

        // Filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        const courseCards = document.querySelectorAll('.course-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.dataset.filter;

                courseCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        const category = card.querySelector('.course-category')?.textContent;
                        if (category === filterValue) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }

    // ==================== TESTIMONIALS CAROUSEL (Mobile only) ====================
    function initializeTestimonialsCarousel() {
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        if (!testimonialsGrid || window.innerWidth >= 768) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        testimonialsGrid.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialsGrid.style.cursor = 'grabbing';
            startX = e.pageX - testimonialsGrid.offsetLeft;
            scrollLeft = testimonialsGrid.scrollLeft;
        });

        testimonialsGrid.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialsGrid.style.cursor = 'grab';
        });

        testimonialsGrid.addEventListener('mouseup', () => {
            isDown = false;
            testimonialsGrid.style.cursor = 'grab';
        });

        testimonialsGrid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsGrid.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsGrid.scrollLeft = scrollLeft - walk;
        });

        // Touch events
        testimonialsGrid.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - testimonialsGrid.offsetLeft;
            scrollLeft = testimonialsGrid.scrollLeft;
        });

        testimonialsGrid.addEventListener('touchend', () => {
            isDown = false;
        });

        testimonialsGrid.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - testimonialsGrid.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsGrid.scrollLeft = scrollLeft - walk;
        });
    }

    // ==================== SCROLL TO TOP BUTTON ====================
    function initializeScrollToTop() {
        // Check if button already exists
        let scrollBtn = document.querySelector('.scroll-to-top');
        
        if (!scrollBtn) {
            scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-to-top';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.setAttribute('aria-label', 'Scroll to top');
            document.body.appendChild(scrollBtn);
        }

        // Add styles if not present
        if (!document.querySelector('#scroll-to-top-style')) {
            const style = document.createElement('style');
            style.id = 'scroll-to-top-style';
            style.textContent = `
                .scroll-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #2563eb, #7c3aed);
                    color: white;
                    border: none;
                    cursor: pointer;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
                    z-index: 99;
                    transition: all 0.3s ease;
                }
                
                .scroll-to-top:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
                }
                
                .scroll-to-top.visible {
                    display: flex;
                    animation: fadeIn 0.3s ease;
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        let timeout;
        window.addEventListener('scroll', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (window.pageYOffset > 300) {
                    scrollBtn.classList.add('visible');
                } else {
                    scrollBtn.classList.remove('visible');
                }
            }, 50);
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== PRICE FORMATTING ====================
    function initializePricingFormat() {
        document.querySelectorAll('.price').forEach(price => {
            const value = price.textContent.trim();
            if (value && !value.startsWith('$') && !isNaN(parseFloat(value))) {
                price.textContent = '$' + parseFloat(value).toFixed(2);
            }
        });
    }

    // ==================== CONTACT FORM VALIDATION ====================
    function initializeContactForm() {
        const contactForm = document.querySelector('form[action*="contact"], .contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            const fields = [
                { selector: '[name="name"]', message: 'Name is required' },
                { selector: '[name="email"]', message: 'Please enter a valid email', validate: validateEmail },
                { selector: '[name="message"]', message: 'Message is required' }
            ];

            clearErrors();

            fields.forEach(field => {
                const input = this.querySelector(field.selector);
                if (input) {
                    if (!input.value.trim()) {
                        showError(input, field.message);
                        isValid = false;
                    } else if (field.validate && !field.validate(input.value)) {
                        showError(input, field.message);
                        isValid = false;
                    }
                }
            });

            if (isValid) {
                if (window.showNotification) {
                    window.showNotification('Thank you! We\'ll contact you soon.', 'success');
                } else {
                    alert('Thank you! We\'ll contact you soon.');
                }
                this.reset();
            }
        });

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function showError(input, message) {
            const formGroup = input.closest('.form-group') || input.parentElement;
            
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) existingError.remove();

            input.style.borderColor = '#dc2626';

            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = message;
            error.style.cssText = `
                color: #dc2626;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: block;
            `;

            formGroup.appendChild(error);

            input.addEventListener('input', function onInput() {
                this.style.borderColor = '';
                const errorMsg = formGroup.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
                this.removeEventListener('input', onInput);
            }, { once: true });
        }

        function clearErrors() {
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-control').forEach(el => {
                el.style.borderColor = '';
            });
        }
    }

})();

// Add filter button styles if not present
(function addFilterStyles() {
    if (document.querySelector('#filter-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'filter-styles';
    style.textContent = `
        .category-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin: 1.5rem 0;
            justify-content: center;
        }

        .filter-btn {
            padding: 0.5rem 1.25rem;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 9999px;
            font-weight: 500;
            color: #6b7280;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.875rem;
        }

        .filter-btn:hover {
            border-color: #2563eb;
            color: #2563eb;
            transform: translateY(-2px);
        }

        .filter-btn.active {
            background: linear-gradient(90deg, #2563eb, #7c3aed);
            color: white;
            border-color: transparent;
            box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }

        .course-card.hidden {
            display: none;
        }

        @media (max-width: 768px) {
            .testimonials-grid {
                display: flex;
                overflow-x: auto;
                scroll-snap-type: x mandatory;
                gap: 1.25rem;
                padding: 0.25rem 0 1.5rem;
                cursor: grab;
                scrollbar-width: thin;
            }

            .testimonials-grid .testimonial-card {
                flex: 0 0 85%;
                scroll-snap-align: start;
            }

            .testimonials-grid::-webkit-scrollbar {
                height: 6px;
            }

            .testimonials-grid::-webkit-scrollbar-thumb {
                background: linear-gradient(90deg, #2563eb, #7c3aed);
                border-radius: 3px;
            }
        }
    `;
    document.head.appendChild(style);
})();
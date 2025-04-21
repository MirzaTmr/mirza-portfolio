/**
 * Mirza Taimur Ali Baig - Electrical Engineering Portfolio
 * Complete JavaScript Implementation
 */

 document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Theme Toggle Functionality
    // =============================================
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-adjust"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    document.body.appendChild(themeToggle);

    // Check for saved theme preference or use preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let savedTheme = localStorage.getItem('theme');
    
    if (!savedTheme) {
        savedTheme = prefersDark ? 'dark' : 'light';
    }
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, true);
    });

    function updateThemeIcon(theme, animate = false) {
        if (animate) {
            themeToggle.classList.add('animate');
            setTimeout(() => themeToggle.classList.remove('animate'), 400);
        }
        
        themeToggle.innerHTML = theme === 'light' 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
    }

    // =============================================
    // Navigation Smooth Scrolling
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, this.getAttribute('href'));
                } else {
                    location.hash = this.getAttribute('href');
                }
            }
        });
    });

    // =============================================
    // Scroll Animations
    // =============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.fade-scroll').forEach(element => {
        observer.observe(element);
    });

    // =============================================
    // Typewriter Effect
    // =============================================
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        const text = "Term-4 Electrical Engineering Co-op Undergrad @ Memorial University of Newfoundland";
        let i = 0;
        typewriter.textContent = '';
        
        function typeWriter() {
            if (i < text.length) {
                typewriter.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, Math.random() * 50 + 30); // Random speed for natural effect
            } else {
                typewriter.style.borderRight = 'none';
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // =============================================
    // Terminal Typing Effect
    // =============================================
    const commands = document.querySelectorAll('.command-line');
    commands.forEach((cmd, index) => {
        cmd.style.animationDelay = `${index * 0.3}s`;
        
        const command = cmd.querySelector('.command');
        if (command) {
            const text = command.textContent;
            command.textContent = '';
            let i = 0;
            function typeCommand() {
                if (i < text.length) {
                    command.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeCommand, Math.random() * 40 + 30);
                }
            }
            setTimeout(typeCommand, index * 500);
        }
    });

    // =============================================
    // Experience Section - Dual Mobile/Desktop
    // =============================================
    function initExperienceSection() {
        // Mobile view (accordions)
        if (window.innerWidth <= 768) {
            const accordions = document.querySelectorAll('.exp-accordion');
            
            accordions.forEach(accordion => {
                const header = accordion.querySelector('.exp-header');
                const content = accordion.querySelector('.exp-content');
                
                // Initialize as closed
                content.style.maxHeight = '0';
                content.style.overflow = 'hidden';
                content.style.transition = 'max-height 0.3s ease';
                
                header.addEventListener('click', function() {
                    // Toggle current accordion
                    const isOpening = !accordion.classList.contains('active');
                    accordion.classList.toggle('active');
                    
                    if (isOpening) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    } else {
                        content.style.maxHeight = '0';
                    }
                    
                    // Close other open accordions
                    accordions.forEach(otherAcc => {
                        if (otherAcc !== accordion && otherAcc.classList.contains('active')) {
                            otherAcc.classList.remove('active');
                            otherAcc.querySelector('.exp-content').style.maxHeight = '0';
                        }
                    });
                });
            });
        } 
        // Desktop view (modals)
        else {
            const expCards = document.querySelectorAll('.exp-card');
            const modals = document.querySelectorAll('.experience-modal');
            const backLinks = document.querySelectorAll('.back-link');
            const closeButtons = document.querySelectorAll('.close-modal');

            // Open modal when clicking a card
            expCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    // Prevent accidental clicks on child elements
                    if (e.target.closest('a')) return;
                    
                    const targetId = this.getAttribute('data-target');
                    const modal = document.getElementById(targetId);
                    
                    if (modal) {
                        // Close any open modals first
                        closeAllModals();
                        
                        // Open new modal
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px'; // Prevent scrollbar jump
                        
                        // Focus trap for accessibility
                        trapFocus(modal);
                    }
                });
            });

            // Close modal with back link
            backLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    closeAllModals();
                });
            });

            // Close modal with close button
            closeButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    closeAllModals();
                }, true); // Use capturing phase
            });

            // Close modal when clicking outside content
            modals.forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeAllModals();
                    }
                });
            });

            // Close with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeAllModals();
                }
            });

            // Close all modals and re-enable scrolling
            function closeAllModals() {
                modals.forEach(modal => {
                    modal.classList.remove('active');
                });
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            }

            // Focus trap for accessibility
            function trapFocus(modal) {
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                modal.addEventListener('keydown', function(e) {
                    if (e.key === 'Tab') {
                        if (e.shiftKey) {
                            if (document.activeElement === firstElement) {
                                e.preventDefault();
                                lastElement.focus();
                            }
                        } else {
                            if (document.activeElement === lastElement) {
                                e.preventDefault();
                                firstElement.focus();
                            }
                        }
                    }
                });
                
                firstElement.focus();
            }
        }
    }

    // Initialize experience section
    initExperienceSection();

    // Handle window resize between mobile/desktop
    window.addEventListener('resize', function() {
        // Only reload if crossing the mobile/desktop threshold
        const wasMobile = window.innerWidth <= 768;
        const isMobile = window.innerWidth <= 768;
        
        if (wasMobile !== isMobile) {
            location.reload();
        }
    });

    // =============================================
    // Project Flip Cards
    // =============================================
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        // Click to flip on mobile
        card.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                this.querySelector('.flip-card-inner').classList.toggle('flipped');
            }
        });
        
        // For accessibility - allow keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.querySelector('.flip-card-inner').classList.toggle('flipped');
            }
        });
    });

    // =============================================
    // Contact Form Handling (if you add one later)
    // =============================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form handling logic would go here
            alert('Form submission would be handled here in a real implementation');
        });
    }

    // =============================================
    // Service Worker Registration (for PWA)
    // =============================================
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful');
            }).catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});

// =============================================
// Helper Functions
// =============================================

/**
 * Debounce function to limit how often a function can fire
 */
function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

/**
 * Throttle function to limit how often a function can fire
 */
function throttle(func, limit = 100) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

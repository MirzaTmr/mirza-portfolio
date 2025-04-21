document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-adjust"></i>';
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
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon with animation
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

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animations
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

    // Observe all scrollable elements
    document.querySelectorAll('.fade-scroll, .experience-item').forEach(element => {
        observer.observe(element);
    });

    // Typewriter effect for header
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        const text = "Term-4 Electrical Engineering Co-op Undergrad @ Memorial University of Newfoundland";
        let i = 0;
        typewriter.textContent = '';
        
        function typeWriter() {
            if (i < text.length) {
                typewriter.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                typewriter.style.borderRight = 'none';
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Terminal typing effect
    initTerminal();
});

// Terminal typing effect
function initTerminal() {
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
                    setTimeout(typeCommand, 50);
                }
            }
            setTimeout(typeCommand, index * 500);
        }
    });
}
// Add this to your existing script.js
function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        // Click to flip on mobile (hover doesn't work well on touch devices)
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
}

// Call this in your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    
    initFlipCards();
});
// Experience Modal Functionality
function initExperienceModals() {
    const expCards = document.querySelectorAll('.exp-card');
    const modals = document.querySelectorAll('.experience-modal');
    const backLinks = document.querySelectorAll('.back-link');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open modal when clicking a card
    expCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const modal = document.getElementById(targetId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
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
        button.addEventListener('click', function() {
            closeAllModals();
        });
    });

    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAllModals();
            }
        });
    });

    // Close all modals and re-enable scrolling
    function closeAllModals() {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Call this in your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    
    initExperienceModals();
    initFlipCards(); // Keep your flip cards initialization
});
// Enhanced Experience Modals with Touch Support
function initExperienceModals() {
    const expCards = document.querySelectorAll('.exp-card');
    const modals = document.querySelectorAll('.experience-modal');
    const backLinks = document.querySelectorAll('.back-link');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Track touch start position
    let touchStartY = 0;

    // Open modal when clicking/tapping a card
    expCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent accidental clicks while scrolling on mobile
            if (window.innerWidth <= 768) {
                const touchEndY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
                if (Math.abs(touchStartY - touchEndY) > 10) return;
            }

            const targetId = this.getAttribute('data-target');
            const modal = document.getElementById(targetId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Focus for accessibility
                modal.setAttribute('tabindex', '-1');
                modal.focus();
            }
        });

        // For touch devices
        card.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
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
        button.addEventListener('click', function() {
            closeAllModals();
        });
    });

    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAllModals();
            }
        });
        
        // Prevent background scrolling when modal is open
        modal.addEventListener('touchmove', function(e) {
            if (this.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
    });

    // Close all modals and re-enable scrolling
    function closeAllModals() {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Handle iOS viewport height changes
    function handleViewportHeight() {
        if (window.innerWidth <= 768) {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
    }

    // Initialize and listen for resize
    handleViewportHeight();
    window.addEventListener('resize', handleViewportHeight);
}

// Call this in your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    
    initExperienceModals();
    initFlipCards();
});

// Replace your initExperienceModals function with this version
function initExperienceModals() {
    const expCards = document.querySelectorAll('.exp-card');
    const modals = document.querySelectorAll('.experience-modal');
    const backLinks = document.querySelectorAll('.back-link');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open modal when clicking a card
    expCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const modal = document.getElementById(targetId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Force redraw for mobile browsers
                modal.style.display = 'none';
                modal.offsetHeight;
                modal.style.display = 'flex';
                
                // Focus for accessibility
                modal.focus();
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

    // Close modal with close button - fixed version
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from reaching modal
            closeAllModals();
        }, true); // Use capturing phase to ensure event fires
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
    }

    // iOS viewport height fix
    function setModalHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        modals.forEach(modal => {
            if (modal.classList.contains('active')) {
                const modalContent = modal.querySelector('.modal-container');
                if (modalContent) {
                    modalContent.style.maxHeight = `${window.innerHeight * 0.85}px`;
                }
            }
        });
    }

    // Initialize and listen for resize
    setModalHeight();
    window.addEventListener('resize', setModalHeight);
    window.addEventListener('orientationchange', setModalHeight);
}

// Replace your experience modal initialization with this
function initExperienceModals() {
    // Desktop functionality remains the same
    if (window.innerWidth > 768) {
        const expCards = document.querySelectorAll('.exp-card');
        const modals = document.querySelectorAll('.experience-modal');
        const backLinks = document.querySelectorAll('.back-link');
        const closeButtons = document.querySelectorAll('.close-modal');

        // Desktop modal logic (same as before)
        expCards.forEach(card => {
            card.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const modal = document.getElementById(targetId);
                
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    modal.focus();
                }
            });
        });

        // Close handlers (same as before)
        backLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                closeAllModals();
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                closeAllModals();
            }, true);
        });

        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeAllModals();
                }
            });
        });

        function closeAllModals() {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    } 
    // Mobile functionality - accordion style
    else {
        const expCards = document.querySelectorAll('.exp-card');
        
        expCards.forEach(card => {
            // Create mobile details container
            const targetId = card.getAttribute('data-target');
            const modal = document.getElementById(targetId);
            if (modal) {
                const detailsContent = modal.querySelector('.modal-exp-details').cloneNode(true);
                detailsContent.classList.add('exp-details-mobile');
                card.appendChild(detailsContent);
            }

            // Toggle accordion
            card.addEventListener('click', function() {
                this.classList.toggle('active');
                
                // Close other open cards
                expCards.forEach(otherCard => {
                    if (otherCard !== this && otherCard.classList.contains('active')) {
                        otherCard.classList.remove('active');
                    }
                });
            });
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            // Ensure modals are hidden on mobile
            document.querySelectorAll('.experience-modal').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
}

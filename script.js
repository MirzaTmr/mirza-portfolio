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

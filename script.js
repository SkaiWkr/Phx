// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const hasDropdowns = document.querySelectorAll('.has-dropdown');

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navContainer.classList.toggle('active');
    });

    // Mobile dropdown handling
    hasDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown');

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Close other dropdowns
            hasDropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });

        // Handle clicks on dropdown items
        dropdownMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navContainer.classList.remove('active');
                dropdown.classList.remove('active');
            });
        });
    });

    // Close mobile menu when clicking regular links
    document.querySelectorAll('.nav-links:not(.has-dropdown) a').forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-dropdown')) {
            hasDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Scroll animation for team members
    const teamMembers = document.querySelectorAll('.team-member');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    teamMembers.forEach(member => {
        observer.observe(member);
    });

    // Single Intersection Observer with mobile-optimized thresholds
    const observerOptionsMobile = {
        threshold: window.innerWidth < 768 ? 0.1 : 0.2,
        rootMargin: window.innerWidth < 768 ? '30px' : '50px'
    };

    const observerMobile = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, observerOptionsMobile);

    // Observe elements with mobile-optimized initial states
    document.querySelectorAll('.team-member, .course-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.95)';
        el.style.transition = window.innerWidth < 768 ? 
            'opacity 0.3s ease, transform 0.3s ease' : 
            'opacity 0.5s ease, transform 0.5s ease';
        observerMobile.observe(el);
    });

    // Enhanced navbar scroll behavior with touch detection
    let lastScroll = 0;
    let scrollTimer;
    let touchStart = 0;
    const navbar = document.querySelector('.navbar');

    // Touch events for better mobile scrolling
    document.addEventListener('touchstart', e => {
        touchStart = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        
        const currentScroll = window.pageYOffset;
        
        // Optimized navbar transitions for scrolling
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(20, 20, 20, 0.95)';  // More opaque when scrolling
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(20, 20, 20, 0.9)';  // More transparent at top
            navbar.style.backdropFilter = 'blur(5px)';
        }

        // Improved hide/show navbar logic
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        scrollTimer = setTimeout(() => {
            lastScroll = currentScroll;
        }, window.innerWidth < 768 ? 30 : 50);
    }, { passive: true });

    // Update document click handler
    document.addEventListener('click', function(e) {
        if (navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
            navContainer.classList.remove('active');
        }
    });

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Optimized welcome overlay for mobile
    const welcomeOverlay = document.querySelector('.welcome-overlay');
    if (welcomeOverlay) {
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            welcomeOverlay.style.opacity = '0';
            welcomeOverlay.style.backdropFilter = 'blur(0)';
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 500);
        }, 4000);
    }

    // Touch-optimized hover effects for course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        const handleHover = (e) => {
            const isTouch = e.type.startsWith('touch');
            card.style.transform = 'scale(1.03)';
        };

        const handleLeave = () => {
            card.style.transform = 'scale(1)';
        };

        // Add both mouse and touch events
        card.addEventListener('mouseenter', handleHover);
        card.addEventListener('touchstart', handleHover, { passive: true });
        card.addEventListener('mouseleave', handleLeave);
        card.addEventListener('touchend', handleLeave);
    });

    // Team member cards hover effect
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
        });

        member.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Read More button hover effect
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.borderColor = '#ff0000';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.borderColor = '#ffd700';
        });
    });

    // Update the team link click handler
    document.querySelector('a[href="#team"]').addEventListener('click', function(e) {
        e.preventDefault();
        const teamSection = document.querySelector('.team');
        const headerOffset = 70;
        const elementPosition = teamSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        navContainer.classList.remove('active');
    });

    // Use event delegation for better performance
    document.addEventListener('click', function(event) {
        if (event.target.matches('.learn-more-btn')) {
            // Handle button click
            handleLearnMore(event.target);
        }
    });

    // Function to handle "Learn More" button click
    function handleLearnMore(button) {
        // ... existing logic ...
    }

    // Optimize loops by caching length
    const items = document.querySelectorAll('.item');
    const itemsLength = items.length;
    for (let i = 0; i < itemsLength; i++) {
        // ... existing logic ...
    }
});

/**
 * Scroll Animation Handler
 * Professional and subtle animations for portfolio website
 */

(function($) {
    'use strict';

    // Configuration
    const ANIMATION_CONFIG = {
        threshold: 0.15,        // Percentage of element visible before animation
        rootMargin: '0px 0px -50px 0px',
        animationDelay: 100     // Delay between staggered animations (ms)
    };

    /**
     * Initialize Intersection Observer for scroll animations
     */
    function initScrollAnimations() {
        // Check for Intersection Observer support
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers - show all elements
            $('.animate-on-scroll, .fade-in-left, .fade-in-right, .scale-in').addClass('animated');
            return;
        }

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: ANIMATION_CONFIG.threshold,
            rootMargin: ANIMATION_CONFIG.rootMargin
        });

        // Observe all animation elements
        const animationElements = document.querySelectorAll(
            '.animate-on-scroll, .fade-in-left, .fade-in-right, .scale-in, section h2'
        );

        animationElements.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Handle intersection observer callback
     */
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with slight delay for smoother effect
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, 50);
                
                // Stop observing this element after animation
                observer.unobserve(entry.target);
            }
        });
    }

    /**
     * Add parallax effect to header
     */
    function initParallaxEffect() {
        const $header = $('header');
        const $window = $(window);
        
        $window.on('scroll', function() {
            const scrollPos = $window.scrollTop();
            const headerHeight = $header.outerHeight();
            
            // Only apply parallax when header is visible
            if (scrollPos < headerHeight) {
                const opacity = 1 - (scrollPos / headerHeight) * 0.5;
                const translateY = scrollPos * 0.4;
                
                $header.find('.container').css({
                    'transform': 'translateY(' + translateY + 'px)',
                    'opacity': opacity
                });
            }
        });
    }

    /**
     * Smooth counter animation for numbers (if needed in future)
     */
    function animateCounters() {
        $('.counter').each(function() {
            const $this = $(this);
            const countTo = $this.attr('data-count');
            
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    /**
     * Add subtle hover effects to project rows
     */
    function initProjectHoverEffects() {
        const projectRows = document.querySelectorAll('#projects .row, #publications .row');
        
        projectRows.forEach(row => {
            // Skip rows that don't have project/publication content
            if (!row.querySelector('.project-thumb, .publication-thumb')) {
                return;
            }
            
            row.addEventListener('mouseenter', function() {
                const img = this.querySelector('.project-thumb, .publication-thumb');
                if (img) {
                    img.style.transform = 'scale(1.08) rotate(1deg)';
                }
            });
            
            row.addEventListener('mouseleave', function() {
                const img = this.querySelector('.project-thumb, .publication-thumb');
                if (img) {
                    img.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    /**
     * Navbar color change on scroll
     */
    function initNavbarScroll() {
        const $navbar = $('.navbar-fixed-top');
        const $window = $(window);
        
        $window.on('scroll', function() {
            if ($window.scrollTop() > 100) {
                $navbar.addClass('navbar-shrink');
            } else {
                $navbar.removeClass('navbar-shrink');
            }
        });
    }

    /**
     * Smooth scroll to section with offset
     */
    function initSmoothScroll() {
        $('a[href*="#"]:not([href="#"])').on('click', function(e) {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
                location.hostname === this.hostname) {
                
                let target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                
                if (target.length) {
                    e.preventDefault();
                    const offset = 70; // Navbar height offset
                    
                    $('html, body').animate({
                        scrollTop: target.offset().top - offset
                    }, 1000, 'easeInOutExpo');
                }
            }
        });
    }

    /**
     * Add stagger animation to list items
     */
    function initStaggeredLists() {
        $('.about_me ul li').each(function(index) {
            $(this).css('animation-delay', (index * 0.1) + 's');
        });
    }

    /**
     * Progress bar or scroll indicator (optional)
     */
    function initScrollProgress() {
        // Create progress bar element
        const progressBar = $('<div class="scroll-progress"></div>');
        progressBar.css({
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'height': '3px',
            'background': 'linear-gradient(90deg, #18bc9c, #2c3e50)',
            'width': '0%',
            'z-index': '9999',
            'transition': 'width 0.2s ease'
        });
        
        $('body').prepend(progressBar);
        
        $(window).on('scroll', function() {
            const windowHeight = $(document).height() - $(window).height();
            const scrollPercentage = ($(window).scrollTop() / windowHeight) * 100;
            progressBar.css('width', scrollPercentage + '%');
        });
    }

    /**
     * Initialize all animations and effects
     */
    function init() {
        // Wait for DOM to be ready
        $(document).ready(function() {
            initScrollAnimations();
            initParallaxEffect();
            initProjectHoverEffects();
            initNavbarScroll();
            initSmoothScroll();
            initStaggeredLists();
            initScrollProgress();
            
            // Small delay to ensure smooth initial page load
            setTimeout(function() {
                $('body').addClass('animations-ready');
            }, 100);
        });
    }

    // Start initialization
    init();

})(jQuery);


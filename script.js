/* ============================================
   FUTURETRENDS — Premium Drone Ecommerce
   Interactive JS — Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // Preloader
    // ============================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            initScrollReveals();
            initCounters();
        }, 2000);
    });

    // Fallback: hide preloader after 3s even if load didn't fire
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            initScrollReveals();
            initCounters();
        }
    }, 3500);

    // ============================================
    // Header Scroll Effect
    // ============================================
    const header = document.getElementById('main-header');

    let lastScroll = 0;

    function handleHeaderScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            header.classList.add('scrolled');
            header.style.top = '0';
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // Back to top click
    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // Mobile Menu
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // ============================================
    // Smooth Scroll for Navigation
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Active Nav Link on Scroll
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ============================================
    // Scroll Reveal Animation
    // ============================================
    function initScrollReveals() {
        const revealElements = document.querySelectorAll('[data-reveal]');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-reveal-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, parseInt(delay));
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });

        // Also handle children with data-reveal-delay
        document.querySelectorAll('[data-reveal-delay]').forEach(el => {
            if (!el.hasAttribute('data-reveal')) {
                // Find parent with data-reveal
                const parent = el.closest('[data-reveal]');
                if (parent) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const delay = el.getAttribute('data-reveal-delay') || 0;
                                setTimeout(() => {
                                    el.style.opacity = '1';
                                    el.style.transform = 'translateY(0)';
                                }, parseInt(delay));
                                observer.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

                    // Set initial styles
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

                    observer.observe(parent);
                }
            }
        });
    }

    // ============================================
    // Parallax Effect
    // ============================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        function updateParallax() {
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 0.3;
                const rect = el.parentElement.getBoundingClientRect();
                const scrolled = rect.top;
                const yPos = -(scrolled * speed);

                el.style.transform = `translateY(${yPos}px)`;
            });
        }

        window.addEventListener('scroll', updateParallax, { passive: true });
        updateParallax();
    }

    initParallax();

    // ============================================
    // Hero Drone Parallax on Mouse Move
    // ============================================
    const heroDroneFloat = document.getElementById('hero-drone-float');
    const heroSection = document.getElementById('hero');

    if (heroDroneFloat && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const moveX = x * 20;
            const moveY = y * 15;
            const rotateY = x * 8;
            const rotateX = -y * 5;

            heroDroneFloat.style.transform = `translate(${moveX}px, ${moveY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroDroneFloat.style.transform = 'translate(0, 0) rotateY(0deg) rotateX(0deg)';
            heroDroneFloat.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => {
                heroDroneFloat.style.transition = '';
            }, 600);
        });
    }

    // ============================================
    // Hero Particles
    // ============================================
    function createParticles() {
        const container = document.getElementById('hero-particles');
        if (!container) return;

        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'hero-particle';

            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particle.style.opacity = Math.random() * 0.4 + 0.1;

            container.appendChild(particle);
        }
    }

    createParticles();

    // ============================================
    // Counter Animation
    // ============================================
    function initCounters() {
        const counters = document.querySelectorAll('[data-count]');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();
        const isFloat = target % 1 !== 0;

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const current = target * easeOut;

            if (target >= 1000) {
                el.textContent = Math.floor(current).toLocaleString();
            } else if (isFloat) {
                el.textContent = current.toFixed(1);
            } else {
                el.textContent = Math.floor(current);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }



    // ============================================
    // Newsletter Form
    // ============================================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email');
            const btn = newsletterForm.querySelector('.newsletter-btn');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = '<span>Subscribed!</span> <i class="fas fa-check"></i>';
            btn.style.background = '#10b981';
            email.value = '';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 3000);
        });
    }



    // ============================================
    // Scroll Indicator Hide on Scroll
    // ============================================
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }, { passive: true });
    }

    // ============================================
    // Image Lazy Loading Fallback
    // ============================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // Cart Button Interaction
    // ============================================
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cartItems++;
            cartCount.textContent = cartItems;

            // Animate cart icon
            const cartBtn = document.getElementById('cart-btn');
            cartBtn.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
                cartBtn.style.transition = 'transform 0.3s ease';
            }, 200);

            // Button feedback
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Added!';
            btn.style.background = '#10b981';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 1500);
        });
    });

    // ============================================
    // Product Action Buttons (Wishlist, etc.)
    // ============================================
    document.querySelectorAll('.product-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-heart')) {
                icon.classList.toggle('fas');
                icon.classList.toggle('far');
                if (icon.classList.contains('fas')) {
                    icon.style.color = '#ef4444';
                    this.style.background = '#fef2f2';
                } else {
                    icon.style.color = '';
                    this.style.background = '';
                }
            }
        });
    });

    // ============================================
    // Smooth Section Transitions via CSS
    // (Handled by data-reveal attributes)
    // ============================================

    // Initial scroll check in case page loaded partway
    handleHeaderScroll();
    updateActiveNav();
});

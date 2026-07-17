/**
 * ==========================================================================
 * 1. PLATFORM CONFIGURATION & MATRIX STATE INITIALIZATION
 * ==========================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
    // Global Element Matrix Cache
    const dom = {
        header: document.getElementById("header"),
        progressBar: document.getElementById("progressBar"),
        cursor: document.getElementById("cursor"),
        canvas: document.getElementById("bg-canvas"),
        navLinks: document.querySelectorAll(".nav-lnk"),
        revealElements: document.querySelectorAll(".reveal"),
        tiltCards: document.querySelectorAll("[data-tilt]"),
        glowButtons: document.querySelectorAll(".glow-btn-target"),
        // Added Menu Bar Controls
        menuToggle: document.getElementById("menuToggle"),
        mobileOverlay: document.getElementById("mobileOverlay"),
        mobileLinks: document.querySelectorAll(".mobile-nav-lnk")
    };

    // System Capabilities Matrix
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

    /**
     * ==========================================================================
     * 2. INTERACTIVE MENU BAR & MOBILE NAVIGATION ROUTINES
     * ==========================================================================
     */
    if (dom.menuToggle && dom.mobileOverlay) {
        const toggleMobileMenu = () => {
            const isOpen = dom.mobileOverlay.classList.contains("is-open");
            
            if (!isOpen) {
                // Open Subsystem
                dom.mobileOverlay.classList.add("is-open");
                dom.menuToggle.classList.add("is-active");
                dom.menuToggle.setAttribute("aria-expanded", "true");
                dom.mobileOverlay.setAttribute("aria-hidden", "false");
                document.body.classList.add("mobile-nav-lock");
            } else {
                // Collapse Subsystem
                dom.mobileOverlay.classList.remove("is-open");
                dom.menuToggle.classList.remove("is-active");
                dom.menuToggle.setAttribute("aria-expanded", "false");
                dom.mobileOverlay.setAttribute("aria-hidden", "true");
                document.body.classList.remove("mobile-nav-lock");
            }
        };

        dom.menuToggle.addEventListener("click", toggleMobileMenu);

        // Auto Close on Mobile Link Selection Intercept
        dom.mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (dom.mobileOverlay.classList.contains("is-open")) {
                    toggleMobileMenu();
                }
            });
        });
    }

    /**
     * ==========================================================================
     * 3. ASYNC CORE RENDERING ENGINE (CYBER-EMERALD PARTICLES)
     * ==========================================================================
     */
    if (dom.canvas) {
        const ctx = dom.canvas.getContext("2d");
        let particles = [];
        let animationFrameId;

        const resizeCanvas = () => {
            dom.canvas.width = window.innerWidth;
            dom.canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * dom.canvas.width;
                this.y = Math.random() * dom.canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.life = Math.random() * 100 + 50;
                this.alpha = Math.random() * 0.3 + 0.05;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > dom.canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > dom.canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = `rgba(0, 255, 204, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            const count = Math.min(Math.floor(window.innerWidth / 15), 90);
            particles = Array.from({ length: count }, () => new Particle());
        };
        initParticles();

        const renderLoop = () => {
            ctx.clearRect(0, 0, dom.canvas.width, dom.canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(renderLoop);
        };
        renderLoop();

        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                initParticles();
            }, 250);
        });
    }

    /**
     * ==========================================================================
     * 4. HARDWARE-ACCELERATED CURSOR ENGINE
     * ==========================================================================
     */
    if (dom.cursor && !isTouchDevice) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        const interpolationFactor = 0.16;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const updateCursor = () => {
            cursorX += (mouseX - cursorX) * interpolationFactor;
            cursorY += (mouseY - cursorY) * interpolationFactor;
            dom.cursor.style.left = `${cursorX}px`;
            dom.cursor.style.top = `${cursorY}px`;
            requestAnimationFrame(updateCursor);
        };
        updateCursor();

        const hoverTargets = document.querySelectorAll("a, button, .interactive-intent, [role='menuitem']");
        hoverTargets.forEach(target => {
            target.addEventListener("mouseenter", () => dom.cursor.classList.add("hovered"));
            target.addEventListener("mouseleave", () => dom.cursor.classList.remove("hovered"));
        });
    } else if (dom.cursor) {
        dom.cursor.style.display = "none";
    }

    /**
     * ==========================================================================
     * 5. SCROLL METRICS CONTROLLER & ACTIVE NAV SYNCING
     * ==========================================================================
     */
    const handleScrollMetrics = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (dom.progressBar && docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            dom.progressBar.style.width = `${scrollPercent}%`;
        }

        if (dom.header) {
            if (scrollTop > 40) {
                dom.header.classList.add("scrolled");
            } else {
                dom.header.classList.remove("scrolled");
            }
        }

        const sections = document.querySelectorAll("section[id]");
        let currentActiveSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentActiveSectionId = section.getAttribute("id");
            }
        });

        // Dynamic sync routine covering both Desktop and Mobile Menu links concurrently
        if (currentActiveSectionId) {
            dom.navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentActiveSectionId}`) link.classList.add("active");
            });
            dom.mobileLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentActiveSectionId}`) link.classList.add("active");
            });
        }
    };

    window.addEventListener("scroll", handleScrollMetrics, { passive: true });
    handleScrollMetrics();

    /**
     * ==========================================================================
     * 6. MOUSE TRACKING MASK EFFECTS & 3D ISOMETRIC TILT
     * ==========================================================================
     */
    const applyMouseCoordinatesToElement = (e, element) => {
        const bounds = element.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        element.style.setProperty("--mouse-x", `${x}px`);
        element.style.setProperty("--mouse-y", `${y}px`);
        return { x, y, bounds };
    };

    const radialContainers = document.querySelectorAll(".identity-card, .mini-card, .skill-card, .contact-links a");
    radialContainers.forEach(container => {
        container.addEventListener("mousemove", (e) => applyMouseCoordinatesToElement(e, container));
    });

    dom.glowButtons.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const coordinateData = applyMouseCoordinatesToElement(e, btn);
            btn.style.setProperty("--x", `${coordinateData.x}px`);
            btn.style.setProperty("--y", `${coordinateData.y}px`);
        });
    });

    if (!isTouchDevice && dom.tiltCards.length > 0) {
        dom.tiltCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const bounds = card.getBoundingClientRect();
                const mouseX = e.clientX - bounds.left;
                const mouseY = e.clientY - bounds.top;
                
                const rotateX = ((mouseY / bounds.height) - 0.5) * -20;
                const rotateY = ((mouseX / bounds.width) - 0.5) * 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    /**
     * ==========================================================================
     * 7. HIGH PERFORMANCE VIEWPORT REVEAL PIPELINE
     * ==========================================================================
     */
    if (dom.revealElements.length > 0) {
        const revealOptions = {
            root: null,
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        };

        const revealIntersectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        dom.revealElements.forEach(el => revealIntersectionObserver.observe(el));
    }
});

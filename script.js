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
        glowButtons: document.querySelectorAll(".glow-btn-target")
    };

    // System Capabilities Matrix
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    /**
     * ==========================================================================
     * 2. ASYNC CORE RENDERING ENGINE (CYBER-EMERALD PARTICLES)
     * ==========================================================================
     */
    if (dom.canvas) {
        const ctx = dom.canvas.getContext("2d");
        let particles = [];
        let animationFrameId;

        // Custom Layout Boundary Resizer
        const resizeCanvas = () => {
            dom.canvas.width = window.innerWidth;
            dom.canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // Vector Array Coordinate Model
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

                // Edge Collision Reflection Matrix
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

        // Initialize Node Matrix
        const initParticles = () => {
            const count = Math.min(Math.floor(window.innerWidth / 15), 90);
            particles = Array.from({ length: count }, () => new Particle());
        };
        initParticles();

        // High-Performance Engine Processing Loop
        const renderLoop = () => {
            ctx.clearRect(0, 0, dom.canvas.width, dom.canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(renderLoop);
        };
        renderLoop();

        // Handle Re-Initialization on Viewport Rescale
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
     * 3. HARDWARE-ACCELERATED INTELLIGENT INERTIAL CURSOR TRACKER
     * ==========================================================================
     */
    if (dom.cursor && !isTouchDevice) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        const interpolationFactor = 0.16; // Lerp dampening variable

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Frame Interpolation Routine
        const updateCursor = () => {
            cursorX += (mouseX - cursorX) * interpolationFactor;
            cursorY += (mouseY - cursorY) * interpolationFactor;
            dom.cursor.style.left = `${cursorX}px`;
            dom.cursor.style.top = `${cursorY}px`;
            requestAnimationFrame(updateCursor);
        };
        updateCursor();

        // Global Hover Target Interactive Hooks
        const hoverTargets = document.querySelectorAll("a, button, .interactive-intent, [role='menuitem']");
        hoverTargets.forEach(target => {
            target.addEventListener("mouseenter", () => dom.cursor.classList.add("hovered"));
            target.addEventListener("mouseleave", () => dom.cursor.classList.remove("hovered"));
        });
    } else if (dom.cursor) {
        dom.cursor.style.display = "none"; // Hard-drop pipeline to free mobile GPU overhead
    }

    /**
     * ==========================================================================
     * 4. SMOOTH RUNTIME PERFORMANCE SCROLL CONTROLLER
     * ==========================================================================
     */
    const handleScrollMetrics = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Calculate Execution Percentage Profile
        if (dom.progressBar && docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            dom.progressBar.style.width = `${scrollPercent}%`;
        }

        // Structural Header Background Transition
        if (dom.header) {
            if (scrollTop > 40) {
                dom.header.classList.add("scrolled");
            } else {
                dom.header.classList.remove("scrolled");
            }
        }

        // Active Viewport Section Matrix Intersection Link Sync
        const sections = document.querySelectorAll("section[id]");
        let currentActiveSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentActiveSectionId = section.getAttribute("id");
            }
        });

        if (currentActiveSectionId && dom.navLinks.length > 0) {
            dom.navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentActiveSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    };

    window.addEventListener("scroll", handleScrollMetrics, { passive: true });
    handleScrollMetrics(); // Boot initial run to calculate coordinate state

    /**
     * ==========================================================================
     * 5. ADAPTIVE MOUSE MASK MAPPING & 3D BENTO BOX perspective MATRIX TILT
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

    // Process Bento Grid Dynamic Border Radial Masking Arrays
    const radialContainers = document.querySelectorAll(".identity-card, .mini-card, .skill-card, .contact-links a");
    radialContainers.forEach(container => {
        container.addEventListener("mousemove", (e) => applyMouseCoordinatesToElement(e, container));
    });

    // Process Kinetic Micro Glow Buttons
    dom.glowButtons.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const coordinateData = applyMouseCoordinatesToElement(e, btn);
            btn.style.setProperty("--x", `${coordinateData.x}px`);
            btn.style.setProperty("--y", `${coordinateData.y}px`);
        });
    });

    // 3D Isometric Tilt Structural Math Engine
    if (!isTouchDevice && dom.tiltCards.length > 0) {
        dom.tiltCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const bounds = card.getBoundingClientRect();
                const mouseX = e.clientX - bounds.left;
                const mouseY = e.clientY - bounds.top;
                
                // Convert mouse coordinates into angular degrees (-10deg to 10deg scaling metrics)
                const rotateX = ((mouseY / bounds.height) - 0.5) * -20;
                const rotateY = ((mouseX / bounds.width) - 0.5) * 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener("mouseleave", () => {
                // Return safely to structural index coordinates
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    /**
     * ==========================================================================
     * 6. HIGH PERFORMANCE ASYNC VIEWPORT INTERSECT REVEAL PIPELINE
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
                    // Disengage observing pathway once target frame fires to preserve calculation runtime
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        dom.revealElements.forEach(el => revealIntersectionObserver.observe(el));
    }
});
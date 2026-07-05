/**
 * BLOODCARE LABS - ULTRA LUXURY DIGITAL PLATFORM ENGINE
 * Architecture: Vanilla ECMAScript (Modern Standard)
 * Optimization: Cubic-Bezier Smooth Transitions & Performance-Safe Observers
 */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // ==========================================
    // 1. GLOBAL LUXURY TOAST NOTIFICATION AGENT
    // ==========================================
    function spawnLuxuryToast(message, type = "success") {
        // Ensure container exists dynamically
        let container = document.getElementById("toast-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "toast-container";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        
        // Elite iconography architecture
        const icon = type === "success" 
            ? '<i class="fa-solid fa-circle-check" style="color: var(--accent-gold); margin-right: 12px;"></i>' 
            : '<i class="fa-solid fa-circle-exclamation" style="color: #EF4444; margin-right: 12px;"></i>';

        toast.innerHTML = `${icon} <span>${message}</span>`;
        container.appendChild(toast);

        // Smooth structural dismissal sequence
        setTimeout(() => {
            toast.style.animation = "slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards";
            toast.addEventListener("animationend", () => toast.remove());
        }, 4000);
    }

    // ==========================================
    // 2. CONCIERGE NAVIGATION & MOBILE MATRIX
    // ==========================================
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const header = document.querySelector(".header");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            const isActive = navLinks.classList.toggle("active");
            hamburger.classList.toggle("open");
            
            // Dynamic accessibility context shifting
            hamburger.setAttribute("aria-expanded", isActive);
        });
    }

    // Dismiss overlay upon menu link navigation
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks?.classList.remove("active");
            hamburger?.classList.remove("open");
        });
    });

    // Elegant scroll-driven header depth scaling
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.padding = "12px 0";
            header.style.boxShadow = "var(--shadow-luxury)";
            header.style.background = "rgba(255, 255, 255, 0.95)";
        } else {
            header.style.padding = "20px 0";
            header.style.boxShadow = "none";
            header.style.background = "rgba(255, 255, 255, 0.85)";
        }
    });

    // ==========================================
    // 3. REAL-TIME REALM TEST SEARCH ENGINE
    // ==========================================
    const searchInput = document.querySelector(".search-box input");
    const searchButton = document.querySelector(".search-box button");
    const testCards = document.querySelectorAll(".test-card");

    function executeTestSearch() {
        if (!searchInput) return;
        const query = searchInput.value.toLowerCase().trim();

        testCards.forEach(card => {
            const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
            const description = card.querySelector("p")?.textContent.toLowerCase() || "";

            if (title.includes(query) || description.includes(query)) {
                card.style.display = "";
                // Smooth restabilization of element opacity
                setTimeout(() => card.classList.add("show"), 50);
            } else {
                card.style.display = "none";
                card.classList.remove("show");
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", executeTestSearch);
    }
    if (searchButton) {
        searchButton.addEventListener("click", (e) => {
            e.preventDefault();
            executeTestSearch();
        });
    }

    // ==========================================
    // 4. THE EDITORIAL FAQS ACCORDION SYSTEM
    // ==========================================
    document.querySelectorAll(".faq-question").forEach(questionBlock => {
        questionBlock.addEventListener("click", () => {
            const currentItem = questionBlock.parentElement;
            const isCurrentlyActive = currentItem.classList.contains("active");

            // Isolate active layers and collapse alternatives (Single-tier expansion rule)
            document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("active"));

            if (!isCurrentlyActive) {
                currentItem.classList.add("active");
            }
        });
    });

    // ==========================================
    // 5. HIGH-PREFERENCE CONCIERGE BOOKING AGENT
    // ==========================================
    const bookingForm = document.querySelector(".booking-form form");

    if (bookingForm) {
        bookingForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const fullName = bookingForm.querySelector('input[type="text"]')?.value.trim();
            const phoneNumber = bookingForm.querySelector('input[type="tel"]')?.value.trim();
            const emailAddress = bookingForm.querySelector('input[type="email"]')?.value.trim();
            const selectedSuite = bookingForm.querySelector("select")?.value;

            // Strict Clinical Validation Matrix
            if (!fullName || fullName.length < 3) {
                spawnLuxuryToast("Please present a valid full name (minimum 3 characters).", "error");
                return;
            }

            if (!/^[0-9]{10}$/.test(phoneNumber)) {
                spawnLuxuryToast("Please specify a pristine 10-digit primary contact number.", "error");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailAddress || !emailRegex.test(emailAddress)) {
                spawnLuxuryToast("Please authenticate with a valid digital email destination.", "error");
                return;
            }

            if (!selectedSuite || selectedSuite === "Select Test" || selectedSuite.includes("Choose")) {
                spawnLuxuryToast("Please allocate a test selection package to proceed.", "error");
                return;
            }

            // Success Confirmation Matrix Dispatch
            spawnLuxuryToast(`Appointment Secured ✅. Luxury Concierge dispatched for ${fullName}.`);
            bookingForm.reset();
        });
    }

    // ==========================================
    // 6. HIGH-PERFORMANCE COUNTER METRICS ENGINE
    // ==========================================
    const statsSection = document.querySelector(".stats");
    const metricCounters = document.querySelectorAll(".stat h3");

    function igniteCounters() {
        metricCounters.forEach(counter => {
            const cleanOriginalText = counter.textContent.trim();
            const mathematicalTarget = parseInt(cleanOriginalText.replace(/\D/g, ""), 10);
            
            let initialStartValue = 0;
            const animationSteps = 60; // Locked frame intervals
            const numericalIncrement = mathematicalTarget / animationSteps;

            function refreshCounterFrame() {
                initialStartValue += numericalIncrement;

                if (initialStartValue < mathematicalTarget) {
                    if (cleanOriginalText.includes("L")) {
                        counter.textContent = `${Math.floor(initialStartValue)}L+`;
                    } else if (cleanOriginalText.includes("hr")) {
                        counter.textContent = `${Math.floor(initialStartValue)}hr`;
                    } else {
                        counter.textContent = `${Math.floor(initialStartValue)}+`;
                    }
                    requestAnimationFrame(refreshCounterFrame);
                } else {
                    counter.textContent = cleanOriginalText; // Snaps exactly back to pristine markup state
                }
            }
            refreshCounterFrame();
        });
    }

    if (statsSection && "IntersectionObserver" in window) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    igniteCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    // ==========================================
    // 7. CUBIC SCROLL REVEAL (VISUAL INTERFACE)
    // ==========================================
    const premiumElements = document.querySelectorAll(
        ".test-card, .package-card, .feature, .testimonial-box, .booking-form, .faq-item"
    );

    if (premiumElements.length && "IntersectionObserver" in window) {
        const interfaceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px" // Dispatches calculations cleanly inside screen frame
        });

        premiumElements.forEach(element => interfaceObserver.observe(element));
    }

    // ==========================================
    // 8. ACTIVE NAVIGATION DESEGREGATION MATRIX
    // ==========================================
    const spatialSections = document.querySelectorAll("section, footer");
    const menuNavigationItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let ongoingSectionId = "";
        const scrollPosition = window.scrollY + 160;

        spatialSections.forEach(section => {
            const sectionTopOffset = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTopOffset && scrollPosition < sectionTopOffset + sectionHeight) {
                ongoingSectionId = section.getAttribute("id") || "";
            }
        });

        menuNavigationItems.forEach(navigationItem => {
            navigationItem.classList.remove("active-link");
            const structuralHref = navigationItem.getAttribute("href");
            
            if (structuralHref === `#${ongoingSectionId}`) {
                navigationItem.classList.add("active-link");
            }
        });
    });

    // ==========================================
    // 9. AUTOMATED APPOINTMENT SCROLL LINKAGE
    // ==========================================
    document.querySelectorAll(".test-card button, .package-card button, .primary-btn, .secondary-btn").forEach(ctaButton => {
        ctaButton.addEventListener("click", (e) => {
            // Bypass internal processes if the button is a submit tool inside a form
            if (ctaButton.getAttribute("type") === "submit") return;
            
            // Route standard view selectors down towards the booking zone
            if (ctaButton.classList.contains("secondary-btn")) {
                const packagesSuite = document.querySelector("#packages");
                packagesSuite?.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }

            const bookingMatrixAnchor = document.querySelector("#booking");
            if (bookingMatrixAnchor) {
                e.preventDefault();
                bookingMatrixAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
                
                // Pre-populate select field context intelligently if mapped from test/package options
                const cardHeaderTitle = ctaButton.parentElement?.querySelector("h3")?.textContent.trim();
                const formSelectionSuite = bookingMatrixAnchor.querySelector("select");
                
                if (formSelectionSuite && cardHeaderTitle) {
                    for (let option of formSelectionSuite.options) {
                        if (option.text.toLowerCase().includes(cardHeaderTitle.toLowerCase())) {
                            formSelectionSuite.value = option.value;
                            break;
                        }
                    }
                }
            }
        });
    });

    // ==========================================
    // 10. FIXED TOP FLIGHT RETURN ENGINE
    // ==========================================
    const topReturnButton = document.querySelector(".top-btn");
    if (topReturnButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 600) {
                topReturnButton.style.opacity = "1";
                topReturnButton.style.pointerEvents = "auto";
                topReturnButton.style.transform = "translateY(0)";
            } else {
                topReturnButton.style.opacity = "0";
                topReturnButton.style.pointerEvents = "none";
                topReturnButton.style.transform = "translateY(15px)";
            }
        });

        topReturnButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
/**
 * THREADS LUXURY PLATFORM PLATFORM FRONTEND INTERACTION UTILITIES ENGINE
 * Core system code logic handling presentation states and structural interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
    initializePageLoader();
    initializeAdaptiveNavigation();
    initializeFaqAccordion();
    initializeSystemCounters();
    initializeBackToTopModule();
    initializeQuickViewPortal();
});

/**
 * 1. Global Page Execution Transition Controller
 */
function initializePageLoader() {
    const loader = document.getElementById("page-loader");
    if (loader) {
        window.addEventListener("load", () => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 600);
        });
    }
}

/**
 * 2. Adaptive Navigation Off-Canvas Menu Controller
 */
function initializeAdaptiveNavigation() {
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll("#navbar ul li a");

    if (hamburger && navbar) {
        const toggleMenu = () => {
            const isOpened = hamburger.classList.toggle("active");
            navbar.classList.toggle("active");
            hamburger.setAttribute("aria-expanded", isOpened);
        };

        hamburger.addEventListener("click", toggleMenu);

        // Close presentation state triggers gracefully upon menu execution updates
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navbar.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }
}

/**
 * 3. Architectural FAQ Interface Animation Array Execution Controller
 */
function initializeFaqAccordion() {
    const faqNodes = document.querySelectorAll(".faq-node");

    faqNodes.forEach(node => {
        const trigger = node.querySelector(".faq-trigger");
        if (trigger) {
            trigger.addEventListener("click", () => {
                const isActive = node.classList.contains("active");
                
                // Collapse concurrent open nodes
                document.querySelectorAll(".faq-node").forEach(item => {
                    item.classList.remove("active");
                });

                if (!isActive) {
                    node.classList.add("active");
                }
            });
        }
    });
}

/**
 * 4. Numeric Precision Fact Curation Counters Processing Module
 */
function initializeSystemCounters() {
    const counterFacts = document.querySelectorAll(".count-fact");
    
    if (counterFacts.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetElement = entry.target;
                    const targetLimit = parseInt(targetElement.getAttribute("data-target"), 10);
                    animateCounter(targetElement, targetLimit);
                    observer.unobserve(targetElement);
                }
            });
        }, { threshold: 0.5 });

        counterFacts.forEach(counter => counterObserver.observe(counter));
    }
}

function animateCounter(element, limit) {
    let internalValue = 0;
    const trackingIncrement = limit / 40; // Proportional parsing sequence steps
    const timingInterval = setInterval(() => {
        internalValue += trackingIncrement;
        if (internalValue >= limit) {
            element.textContent = limit;
            clearInterval(timingInterval);
        } else {
            element.textContent = Math.ceil(internalValue);
        }
    }, 25);
}

/**
 * 5. Back To Top Component Functional Logic Configuration
 */
function initializeBackToTopModule() {
    const topButton = document.getElementById("topBtn");
    
    if (topButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                topButton.classList.add("visible");
            } else {
                topButton.classList.remove("visible");
            }
        });

        topButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

/**
 * 6. Quick View Micro Portal Overlay Integration Controller
 */
function initializeQuickViewPortal() {
    const modal = document.getElementById("quickview-modal");
    const closeTrigger = document.querySelector(".modal-close-trigger");
    const quickViewButtons = document.querySelectorAll(".quick-view-btn");

    if (modal && closeTrigger) {
        quickViewButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const currentCard = e.target.closest(".product-card");
                if (currentCard) {
                    const imgSrc = currentCard.querySelector(".product-image img")?.getAttribute("src");
                    const titleText = currentCard.querySelector(".product-info h3")?.textContent;
                    const catText = currentCard.querySelector(".prod-cat")?.textContent;
                    const priceText = currentCard.querySelector(".product-price")?.textContent;

                    document.getElementById("modal-target-img").setAttribute("src", imgSrc || "");
                    document.getElementById("modal-target-title").textContent = titleText || "";
                    document.getElementById("modal-target-cat").textContent = catText || "";
                    document.getElementById("modal-target-price").textContent = priceText || "";

                    modal.classList.add("active");
                }
            });
        });

        const closeModal = () => modal.classList.remove("active");
        closeTrigger.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }
}
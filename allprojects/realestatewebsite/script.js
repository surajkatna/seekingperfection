/*==================================================
EstatePro Engine Orchestration Bundle
===================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /*================ DOM NODE INVENTORY =================*/
    const loader = document.getElementById("loader");
    const header = document.getElementById("header");
    const hamburger = document.getElementById("hamburger");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTop = document.getElementById("backToTop");
    const buttons = document.querySelectorAll(".btn");
    const sections = document.querySelectorAll("section");
    
    // Forms & Simulation Selectors
    const contactForm = document.getElementById("contactForm");
    const newsletterForm = document.getElementById("newsletterForm");
    const searchForm = document.getElementById("searchForm");
    const propertyCards = document.querySelectorAll(".property-card");
    const propertyImages = document.querySelectorAll(".property-image img");
    const hero = document.querySelector(".hero");
    const yearElement = document.getElementById("year");

    // Interactive Slider & Accordion Nodes
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    const prevReviewBtn = document.getElementById("prevReview");
    const nextReviewBtn = document.getElementById("nextReview");
    const faqItems = document.querySelectorAll(".faq-item");
    const counters = document.querySelectorAll(".counter");
    const wishlistButtons = document.querySelectorAll(".wishlist-btn");

    /*================ LOADER DISPLAY CYCLE =================*/
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.classList.add("hide");
            }, 700);
        });
        // Fallback safety filter if load event already evaluated
        if (document.readyState === "complete") {
            setTimeout(() => loader.classList.add("hide"), 700);
        }
    }

    /*================ STICKY GLOBAL HEADER & SHADOW =================*/
    window.addEventListener("scroll", () => {
        if (!header) return;
        
        if (window.scrollY > 80) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }

        header.style.boxShadow = window.scrollY > 50 
            ? "0 10px 30px rgba(0,0,0,.08)" 
            : "none";
    });

    /*================ RESPONSIVE NAVIGATION MENU =================*/
    if (hamburger && navbar) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navbar.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });
    }

    /*================ CLOSE RESPONSIVE CANVAS INTERFACES =================*/
    const closeCanvasMenu = () => {
        if (navbar) navbar.classList.remove("active");
        if (hamburger) hamburger.classList.remove("active");
        document.body.classList.remove("menu-open");
    };

    navLinks.forEach(link => {
        link.addEventListener("click", closeCanvasMenu);
    });

    /*================ SMOOTH COMPONENT ELEMENT SCROLLING =================*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const hash = this.getAttribute("href");
            if (hash === "#") {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(hash);
            if (targetElement) {
                e.preventDefault();
                closeCanvasMenu();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    /*================ SCROLL SPY ACTIVE NAV TRACKER =================*/
    window.addEventListener("scroll", () => {
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 130;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active-link");
            if (link.getAttribute("href") === "#" + currentSectionId) {
                link.classList.add("active-link");
            }
        });
    });

    /*================ BACK TO TOP UTILITY ACTION =================*/
    window.addEventListener("scroll", () => {
        if (!backToTop) return;
        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /*================ MATERIAL DESIGN BUTTON RIPPLE & SCALE =================*/
    buttons.forEach(button => {
        button.addEventListener("click", function (e) {
            const rippleSpan = document.createElement("span");
            const componentRect = this.getBoundingClientRect();
            const boundingDimension = Math.max(componentRect.width, componentRect.height);

            rippleSpan.style.width = rippleSpan.style.height = boundingDimension + "px";
            rippleSpan.style.left = e.clientX - componentRect.left - boundingDimension / 2 + "px";
            rippleSpan.style.top = e.clientY - componentRect.top - boundingDimension / 2 + "px";
            rippleSpan.classList.add("ripple");

            this.appendChild(rippleSpan);

            setTimeout(() => {
                rippleSpan.remove();
            }, 600);
        });

        button.addEventListener("mousedown", () => {
            button.style.transform = "scale(.96)";
        });

        button.addEventListener("mouseup", () => {
            button.style.transform = "scale(1)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    });

    /*================ WISHLIST TOGGLE CORES =================*/
    wishlistButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("fa-regular");
            btn.classList.toggle("fa-solid");
        });
    });

    /*================ CONTACT ENQUIRY VALIDATION FORM =================*/
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const nameValue = document.getElementById("name").value.trim();
            const phoneValue = document.getElementById("phone").value.trim();
            const emailValue = document.getElementById("email").value.trim();
            const emailValidationExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (nameValue === "") {
                alert("Please enter your name");
                return;
            }
            if (phoneValue.length < 10) {
                alert("Enter valid phone number");
                return;
            }
            if (!emailValidationExpression.test(emailValue)) {
                alert("Enter valid email address");
                return;
            }

            alert("Thank you! Our Property Consultant will contact you shortly.");
            contactForm.reset();
        });
    }

    /*================ NEWSLETTER ENGAGEMENT SUBMISSION =================*/
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const newsletterEmailInput = document.getElementById("newsletterEmail");
            if (!newsletterEmailInput) return;

            const emailValue = newsletterEmailInput.value.trim();
            const emailValidationExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailValue === "") {
                alert("Please enter your email");
                return;
            }
            if (!emailValidationExpression.test(emailValue)) {
                alert("Please enter a valid email");
                return;
            }

            alert("Subscribed Successfully!");
            newsletterForm.reset();
        });
    }

    /*================ PROPERTY SEARCH FILTER SYSTEM =================*/
    if (searchForm) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let recordCount = 0;

            propertyCards.forEach(card => {
                card.style.display = "block";
                card.classList.add("reveal"); // Ensure animated objects become visible
                recordCount++;
            });

            if (recordCount === 0) {
                alert("No Property Found matching current layout options.");
            }

            const propertiesSectionTarget = document.getElementById("properties");
            if (propertiesSectionTarget) {
                window.scrollTo({
                    top: propertiesSectionTarget.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    }

    /*================ PARALLAX EFFECT FOR HERO SECTIONS =================*/
    if (hero) {
        window.addEventListener("mousemove", (e) => {
            const calculateXOffset = (window.innerWidth / 2 - e.pageX) / 40;
            const calculateYOffset = (window.innerHeight / 2 - e.pageY) / 40;
            hero.style.backgroundPosition = `calc(50% + ${calculateXOffset}px) calc(50% + ${calculateYOffset}px)`;
        });
    }

    /*================ DOCUMENT PROGRESS BAR SCHEME =================*/
    const progressTrackingNode = document.createElement("div");
    progressTrackingNode.id = "scrollProgress";
    document.body.appendChild(progressTrackingNode);

    window.addEventListener("scroll", () => {
        const structuralScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (structuralScrollHeight > 0) {
            const structuralPercentage = (window.scrollY / structuralScrollHeight) * 100;
            progressTrackingNode.style.width = structuralPercentage + "%";
        }
    });

    /*================ TESTIMONIAL CAROUSEL SLIDER ENGINE =================*/
    let activeSlideIndex = 0;

    const displayTargetSlide = (targetIndex) => {
        testimonialCards.forEach(card => card.classList.remove("active"));
        
        if (targetIndex >= testimonialCards.length) activeSlideIndex = 0;
        else if (targetIndex < 0) activeSlideIndex = testimonialCards.length - 1;
        else activeSlideIndex = targetIndex;

        testimonialCards[activeSlideIndex].classList.add("active");
    };

    if (nextReviewBtn && prevReviewBtn && testimonialCards.length > 0) {
        nextReviewBtn.addEventListener("click", () => displayTargetSlide(activeSlideIndex + 1));
        prevReviewBtn.addEventListener("click", () => displayTargetSlide(activeSlideIndex - 1));
    }

    /*================ FAQ COMPONENT TOGGLE SYSTEM =================*/
    faqItems.forEach(item => {
        const titleHitArea = item.querySelector(".faq-question");
        if (titleHitArea) {
            titleHitArea.addEventListener("click", () => {
                const stateBeforeToggle = item.classList.contains("active");
                
                // Collapse sibling accordion records
                faqItems.forEach(sibling => sibling.classList.remove("active"));
                
                if (!stateBeforeToggle) {
                    item.classList.add("active");
                }
            });
        }
    });

    /*================ SCROLL ANIMATION ELEMENT DISCOVERY REVEAL =================*/
    const architecturalRevealElements = document.querySelectorAll(
        ".property-card, .type-card, .why-card, .agent-card, .contact-card, .testimonial-card"
    );

    const evaluateRevealOnScroll = () => {
        architecturalRevealElements.forEach(element => {
            const revealPointHeight = 140;
            const elementTopCoordinate = element.getBoundingClientRect().top;
            const structuralWindowHeight = window.innerHeight;

            if (elementTopCoordinate < structuralWindowHeight - revealPointHeight) {
                element.classList.add("reveal");
            }
        });
    };

    window.addEventListener("scroll", evaluateRevealOnScroll);
    evaluateRevealOnScroll(); // Trigger instantly on layout initial mount

    /*================ DYNAMIC COUNTER NUMERIC ANIMATION ENGINE =================*/
    const launchCounterCalculation = (counterNode) => {
        const designTarget = parseInt(counterNode.getAttribute("data-target"), 10);
        let clearStartingInteger = 0;
        const speedRatio = Math.ceil(designTarget / 50); // Set structural frame animation timing map

        const updateNumericalText = () => {
            clearStartingInteger += speedRatio;
            if (clearStartingInteger >= designTarget) {
                counterNode.textContent = designTarget.toLocaleString() + (designTarget === 95 || designTarget === 15 ? "+" : "");
            } else {
                counterNode.textContent = clearStartingInteger.toLocaleString();
                requestAnimationFrame(updateNumericalText);
            }
        };
        requestAnimationFrame(updateNumericalText);
    };

    // Intersection observer watching when metrics scroll view container becomes visible
    const statsSectionContainer = document.getElementById("statsSection");
    if (statsSectionContainer && counters.length > 0) {
        const targetObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => launchCounterCalculation(counter));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        targetObserver.observe(statsSectionContainer);
    }

    /*================ HARDWARE KEYBOARD MANAGEMENT =================*/
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeCanvasMenu();
    });

    /*================ PROPERTY IMAGES HOVER ENHANCEMENT =================*/
    propertyImages.forEach(image => {
        image.style.transition = "transform 0.5s ease";
    });

    /*================ FOOTER COPYRIGHT DYNAMIC UPDATE =================*/
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /*================ CONSOLE INJECTION SUCCESS CONFIRMATION =================*/
    console.log("%cEstatePro Matrix Architecture Optimized & Synchronized Successfully","color:#c89b3c;font-size:14px;font-weight:bold;");
});
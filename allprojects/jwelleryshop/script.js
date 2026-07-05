document.addEventListener("DOMContentLoaded", () => {
    
    // --- ACCESSIBLE MOBILE OVERLAY MENU SYSTEM ---
    const menuBtn = document.getElementById("menuBtn");
    const mobileClose = document.getElementById("mobileClose");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-item");

    const toggleMenuPanel = () => {
        navLinks.classList.toggle("active");
        // Freeze window axis tracing while drawer screen module is expanded
        document.body.style.overflowY = navLinks.classList.contains("active") ? "hidden" : "auto";
    };

    menuBtn.addEventListener("click", toggleMenuPanel);
    mobileClose.addEventListener("click", toggleMenuPanel);

    // Dismiss panel layer when path nodes register click captures
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) toggleMenuPanel();
        });
    });


    // --- HIGH-EDITION ATELIER HERO TRANSITIONS (7 CAMPAIGN IMAGES) ---
    const heroImg = document.getElementById("heroImg");
    const currentSliderNum = document.getElementById("currentSliderNum");
    
    const luxuryCampaignImages = [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80", // Image 1 (Necklace Close)
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=80", // Image 2 (Diamond Rings Setup)
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca6?auto=format&fit=crop&w=1200&q=80", // Image 3 (Gold Bracelet Stack)
        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80", // Image 4 (Luxury Pearls Showcase)
        "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=80", // Image 5 (Fine Rings Macro)
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=80", // Image 6 (Exquisite Gem Drops)
        "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=1200&q=80"  // Image 7 (Elegance Stones Grid)
    ];

    let activeSliderIdx = 0;

    setInterval(() => {
        if (!heroImg) return;
        
        // Execute structural fade out downscale
        heroImg.style.opacity = "0";
        heroImg.style.transform = "scale(0.97) translateY(8px)";

        setTimeout(() => {
            activeSliderIdx = (activeSliderIdx + 1) % luxuryCampaignImages.length;
            heroImg.src = luxuryCampaignImages[activeSliderIdx];
            
            // Adjust current index readout label
            if (currentSliderNum) {
                currentSliderNum.textContent = String(activeSliderIdx + 1).padStart(2, '0');
            }
            
            // Re-trigger reveal scaling entry
            heroImg.style.opacity = "1";
            heroImg.style.transform = "scale(1) translateY(0)";
        }, 800); // Perfectly synced to transition mechanics of the style layout sheet

    }, 5000);


    // --- ADVANCED WINDOW SCROLL EVENT STRUCTURING ---
    const header = document.getElementById("header");
    const sections = document.querySelectorAll("section");
    const revealElements = document.querySelectorAll(".reveal");

    const scrollTrackingEvaluation = () => {
        const structuralScrollY = window.scrollY;

        // Header Dimensions Compression Toggle
        if (structuralScrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Element Transition Trigger Points
        revealElements.forEach(item => {
            const viewportTriggerMargin = window.innerHeight - 70;
            const itemRelativeTop = item.getBoundingClientRect().top;

            if (itemRelativeTop < viewportTriggerMargin) {
                item.classList.add("active");
            }
        });

        // Live Tracker Navigation Element Highlighting
        let targetIdStr = "";
        sections.forEach(section => {
            const sectionOffsetTop = section.offsetTop - 150;
            const sectionBoundingHeight = section.clientHeight;

            if (structuralScrollY >= sectionOffsetTop && structuralScrollY < sectionOffsetTop + sectionBoundingHeight) {
                targetIdStr = section.getAttribute("id");
            }
        });

        navItems.forEach(anchorNode => {
            anchorNode.classList.remove("active-link");
            if (anchorNode.getAttribute("href") === `#${targetIdStr}`) {
                anchorNode.classList.add("active-link");
            }
        });
    };

    window.addEventListener("scroll", scrollTrackingEvaluation);
    scrollTrackingEvaluation(); // Initial trace valuation parse


    // --- NEWSLETTER INVITATION CONCIERGE HANDLER ---
    const newsletterForm = document.getElementById("newsletterForm");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const valueInput = newsletterForm.querySelector("input[type='email']");
            
            alert(`✨ Registry Authenticated.\n\nA private atelier credential brief has been sent to:\n${valueInput.value}`);
            newsletterForm.reset();
        });
    }
});
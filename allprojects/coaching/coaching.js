document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MOBILE MENU BAR CONTROLLER
    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("open");
            navMenu.classList.toggle("show");
        });

        // Close menu if a link is clicked
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                menuBtn.classList.remove("open");
                navMenu.classList.remove("show");
            });
        });
    }

    // 2. ACTIVE NAVIGATION ITEM STATE TRACKER
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // 3. SCROLL REVEAL ENGINE (CSS class driver)
    const revealElements = document.querySelectorAll(".reveal-element");
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight - 80;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add("show");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // First execution check

    // 4. HI-PERFORMANCE COUNTER ANIME ENGINE (Using IntersectionObserver)
    const statsSection = document.querySelector(".stats");
    const statNumbers = document.querySelectorAll(".stat-item h2");
    let counterStarted = false;

    const runCounters = () => {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"), 10);
            let current = 0;
            const duration = 1500; // Total runtime inside ms
            const stepTime = Math.max(Math.floor(duration / target), 15);
            
            const timer = setInterval(() => {
                // Determine progression skip rate
                let increment = Math.ceil(target / (duration / stepTime));
                current += increment;

                if (current >= target) {
                    counter.innerText = target.toLocaleString() + (target === 95 ? "%" : "+");
                    clearInterval(timer);
                } else {
                    counter.innerText = current.toLocaleString() + "+";
                }
            }, stepTime);
        });
    };

    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counterStarted) {
                runCounters();
                counterStarted = true;
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.2 });

        statsObserver.observe(statsSection);
    } else {
        // Fallback safety feature
        window.addEventListener("scroll", () => {
            if (!statsSection) return;
            const pos = statsSection.getBoundingClientRect().top;
            if (pos < window.innerHeight && !counterStarted) {
                runCounters();
                counterStarted = true;
            }
        });
    }
});
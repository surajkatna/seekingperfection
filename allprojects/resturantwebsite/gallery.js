document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. HAMBURGER MENU
    // ==========================================
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("open");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("open");
                navLinks.classList.remove("active");
            });
        });
    }

    // ==========================================
    // 2. NAVBAR SCROLL EFFECT (RequestAnimationFrame)
    // ==========================================
    const navbar = document.querySelector("nav");
    let lastScrollY = window.scrollY;
    let ticking = false;

    if (navbar) {
        window.addEventListener("scroll", () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (lastScrollY > 50) {
                        navbar.style.background = "rgba(10,10,10,.95)";
                        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.3)";
                    } else {
                        navbar.style.background = "rgba(255,255,255,.08)";
                        navbar.style.boxShadow = "none";
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ==========================================
    // 3. LAZY REVEAL OBSERVER
    // ==========================================
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px"
    });

    // ==========================================
    // 4. FILTER AND PAGINATION ARCHITECTURE
    // ==========================================
    const galleryCards = document.querySelectorAll(".gallery-card");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    
    let currentFilter = "all";
    let visibleCount = 12;

    function renderGalleryLayout(animateCascade = false) {
        // Find all cards matching the category query selection
        const filteredCards = Array.from(galleryCards).filter(card => {
            const category = card.getAttribute("data-category");
            return currentFilter === "all" || category === currentFilter;
        });

        // Loop over original dataset to safely map visibility structures
        galleryCards.forEach(card => {
            card.classList.remove("item-active", "revealed");
            revealObserver.unobserve(card);
        });

        // Paginate over filtered subsets
        filteredCards.forEach((card, index) => {
            if (index < visibleCount) {
                card.classList.add("item-active");
                
                if (animateCascade) {
                    setTimeout(() => {
                        revealObserver.observe(card);
                    }, (index % 12) * 40);
                } else {
                    revealObserver.observe(card);
                }
            }
        });

        // Hide or show the pagination controller button
        if (loadMoreBtn) {
            if (visibleCount >= filteredCards.length) {
                loadMoreBtn.style.display = "none";
            } else {
                loadMoreBtn.style.display = "inline-block";
                loadMoreBtn.innerHTML = "Load More Images";
                loadMoreBtn.disabled = false;
                loadMoreBtn.style.opacity = "1";
                loadMoreBtn.style.cursor = "pointer";
            }
        }
    }

    // Connect filter buttons click handler listeners
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentFilter = btn.getAttribute("data-filter");
            visibleCount = 12; // Reset pagination window back down
            renderGalleryLayout(true);
        });
    });

    // Connect pagination button click handlers
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            visibleCount += 12;
            renderGalleryLayout(true);
        });
    }

    // Initialize layout default values on launch
    renderGalleryLayout(false);

    // ==========================================
    // 5. LIGHTBOX OVERLAY POPUP
    // ==========================================
    const popup = document.createElement("div");
    popup.classList.add("image-popup");
    popup.innerHTML = `
        <span class="close-popup" style="position:absolute; top:20px; right:30px; font-size:40px; color:#fff; cursor:pointer;">&times;</span>
        <img src="" alt="Enlarged view presentation">
    `;
    document.body.appendChild(popup);

    const popupImg = popup.querySelector("img");

    galleryCards.forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img");
            if (img) {
                popupImg.src = img.src;
                popup.classList.add("show");
            }
        });
    });

    popup.addEventListener("click", (e) => {
        if (e.target.classList.contains("image-popup") || e.target.classList.contains("close-popup")) {
            popup.classList.remove("show");
        }
    });

    // ==========================================
    // 6. GENERAL BOOKING ACTION triggers
    // ==========================================
    const bookButtons = document.querySelectorAll(".nav-btn, .cta-box button");
    bookButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Table Reservation Page Coming Soon!");
        });
    });
});
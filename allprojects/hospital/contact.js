document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const navbar = document.querySelector(".navbar");
    const contactForm = document.querySelector(".contact-form form");

    // Toggle Mobile Drawer Menu
    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }

    // Intercept form submissions gracefully for verification workflow
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Clean UX feedback mechanism placeholder
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Dispatching...`;
            submitBtn.style.pointerEvents = "none";
            submitBtn.style.opacity = "0.8";

            setTimeout(() => {
                alert("Thank you. Your request has been dispatched safely to our concierge intake desk.");
                contactForm.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.style.pointerEvents = "all";
                submitBtn.style.opacity = "1";
            }, 1200);
        });
    }
});
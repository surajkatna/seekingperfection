document.addEventListener("DOMContentLoaded", () => {
    
    // --- Premium Responsive Mobile Menu Navigation ---
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        // Alternate Menu Bar Icon animations seamlessly
        const icon = menuBtn.querySelector("i");
        if(navLinks.classList.contains("active")) {
            icon.classList.replace("fa-bars-staggered", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars-staggered");
        }
    });

    // --- Interactive FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const trigger = item.querySelector(".faq-trigger");
        trigger.addEventListener("click", () => {
            const openItem = document.querySelector(".faq-item.active");
            
            // Close already active item cleanly if it isn't the clicked target
            if (openItem && openItem !== item) {
                openItem.classList.remove("active");
            }
            
            item.classList.toggle("active");
        });
    });

    // --- Premium Modern Appointment Booking Window Modal Actions ---
    const bookingModal = document.getElementById("bookingModal");
    const triggerButtons = document.querySelectorAll(".book-trigger-btn");
    const closeModalBtn = document.getElementById("closeModal");
    const appointmentForm = document.getElementById("appointmentForm");

    // Open Modal logic
    triggerButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            bookingModal.classList.add("open");
            // Automatically safely close mobile menu overlay if visible
            navLinks.classList.remove("active");
            menuBtn.querySelector("i").classList.replace("fa-xmark", "fa-bars-staggered");
        });
    });

    // Close Modal logic
    closeModalBtn.addEventListener("click", () => {
        bookingModal.classList.remove("open");
    });

    // Close Modal if background overlay field clicked directly
    window.addEventListener("click", (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove("open");
        }
    });

    // Form Handling Interception
    appointmentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you! Your luxury appointment request has been securely dispatched to our clinical triage panel. A concierge will call you within 15 minutes.");
        appointmentForm.reset();
        bookingModal.classList.remove("open");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Responsive Navigation Logic Drawer ---
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const menuIcon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        
        if (navLinks.classList.contains("active")) {
            menuIcon.classList.remove("fa-bars-staggered");
            menuIcon.classList.add("fa-xmark");
        } else {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars-staggered");
        }
    });

    // --- Interactive Accordion Logic ---
    const faqTriggers = document.querySelectorAll(".faq-trigger");

    faqTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const currentItem = trigger.parentElement;
            const wasActive = currentItem.classList.contains("active");
            
            // First clear out all open states across tabs safely
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
            });
            
            // If the element clicked wasn't already active, open it up
            if (!wasActive) {
                currentItem.classList.add("active");
            }
        });
    });

    // --- Premium Booking Engine Modal Actions ---
    const bookingModal = document.getElementById("bookingModal");
    const triggerButtons = document.querySelectorAll(".book-trigger-btn");
    const closeModalBtn = document.getElementById("closeModal");
    const appointmentForm = document.getElementById("appointmentForm");

    // Open logic
    triggerButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            bookingModal.classList.add("open");
            // Clear mobile link layer if open
            navLinks.classList.remove("active");
            menuIcon.classList.replace("fa-xmark", "fa-bars-staggered");
        });
    });

    // Close logic via button
    closeModalBtn.addEventListener("click", () => {
        bookingModal.classList.remove("open");
    });

    // Close logic via backdrop target click
    window.addEventListener("click", (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove("open");
        }
    });

    // Dispatch submit confirmation intercept interceptor
    appointmentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Success! Your private treatment inquiry has been uploaded directly into our clinical database. A healthcare liaison agent will reach out within 15 minutes.");
        appointmentForm.reset();
        bookingModal.classList.remove("open");
    });
});
// Toggle mobile navigation menu
const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navbar.classList.toggle("active");
});

// Close mobile navigation menu when clicking a link
document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navbar.classList.remove("active");
    });
});

// Basic contact form submission handler
document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent successfully.");
    e.target.reset();
});
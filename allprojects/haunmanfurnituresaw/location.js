// Grab DOM elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const toggleIcon = menuToggle.querySelector('i');

// Add navigation click event listener
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Smoothly alternative icon classes between active and non-active state
    if (navLinks.classList.contains('active')) {
        toggleIcon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        toggleIcon.classList.replace('fa-xmark', 'fa-bars');
    }
});
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("navbar-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      // Toggle CSS classes for transition animation and entry visibility
      menuBtn.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    // Optional: Close menu when a navigation item is clicked
    const links = navLinks.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }
});
/**
 * Aree Appliances Core Client Operations Strategy
 * Architectural Execution Bundle
 */

// Global Debouncer for expensive viewport runtime monitoring
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  // Structural Initialization Pipeline
  initMobileMenu();
  initSmoothScroll();
  initActiveNavigation();
  initBulkEnquiryMappings();
  initSmartAssistant();
  initFaqAccordion();
  initCounterAnimations();
});

// ======================================
// RESPONSIVE HAMBURGER NAVIGATION
// ======================================
function initMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isExpanded = navLinks.classList.toggle("show-menu");
    menuBtn.setAttribute("aria-expanded", isExpanded);
  });

  // Close on overlay action
  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("show-menu") &&
      !navLinks.contains(e.target) &&
      e.target !== menuBtn
    ) {
      navLinks.classList.remove("show-menu");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// ======================================
// INTERPOLATED SMOOTH SCROLL ROUTINE
// ======================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const hrefAttr = this.getAttribute("href");
      if (hrefAttr === "#") return;

      e.preventDefault();
      const target = document.querySelector(hrefAttr);

      if (target) {
        // Collapse mobile navigation frame before sliding
        const navLinks = document.getElementById("nav-links");
        const menuBtn = document.getElementById("menu-btn");
        if (navLinks && navLinks.classList.contains("show-menu")) {
          navLinks.classList.remove("show-menu");
          if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
        }

        const offsetTop = target.offsetTop - 90; // Balanced Header Cushion Metric
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ======================================
// ACTIVE IN-VIEW PORT NAVIGATION HIGHLIGHT
// ======================================
function initActiveNavigation() {
  const sections = document.querySelectorAll("section, footer");
  const navLinks = document.querySelectorAll("#nav-links a");

  if (sections.length === 0 || navLinks.length === 0) return;

  const parseScrollPosition = () => {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 140; // Offset alignment matching sticky boundary

    sections.forEach((section) => {
      const topBoundary = section.offsetTop;
      const bottomBoundary = topBoundary + section.offsetHeight;

      if (scrollPosition >= topBoundary && scrollPosition < bottomBoundary) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", debounce(parseScrollPosition, 15));
}

// ======================================
// SYSTEM SCROLL ORCHESTRATION LINKS
// ======================================
function initBulkEnquiryMappings() {
  const targetSection = document.getElementById("quote-form-section");
  if (!targetSection) return;

  const actionElements = [
    document.getElementById("bulk-enquiry-btn"),
    document.getElementById("bulk-order-btn"),
    document.getElementById("floating-bulk-btn"),
    document.getElementById("explore-products-btn"),
  ];

  actionElements.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        window.scrollTo({
          top: targetSection.offsetTop - 90,
          behavior: "smooth",
        });
      });
    }
  });

  document.querySelectorAll(".view-product-btn").forEach((cardBtn) => {
    cardBtn.addEventListener("click", () => {
      window.scrollTo({
        top: targetSection.offsetTop - 90,
        behavior: "smooth",
      });
    });
  });
}

// ======================================
// SMART FIELD ENQUIRY AUTOMATION
// ======================================
function initSmartAssistant() {
  const gridButtons = document.querySelectorAll(".question-btn");
  const outMessageBox = document.getElementById("message");
  const compInput = document.getElementById("company-name");
  const userProduct = document.getElementById("required-product");
  const userQuantity = document.getElementById("quantity");
  const userBusiness = document.getElementById("business-type");

  if (!outMessageBox) return;

  let topicsSelected = [];

  gridButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const label = this.innerText.trim();
      this.classList.toggle("active");

      if (topicsSelected.includes(label)) {
        topicsSelected = topicsSelected.filter((item) => item !== label);
      } else {
        topicsSelected.push(label);
      }
      compileDynamicTemplate();
    });
  });

  function compileDynamicTemplate() {
    const companyName =
      compInput && compInput.value ? compInput.value.trim() : "[Company]";
    const productVal =
      userProduct && userProduct.value
        ? userProduct.value.trim()
        : "Mixer Grinders / Appliances";
    const quantityVal =
      userQuantity && userQuantity.value
        ? userQuantity.value.trim()
        : "Not Specified";
    const typeBusiness =
      userBusiness && userBusiness.value ? userBusiness.value : "Partner";

    let dynamicString = `Hello Team,\n\nI am contacting you from ${companyName}.\nWe are interested in your commercial catalog.\n\nBusiness Profile: ${typeBusiness}\nTarget Product: ${productVal}\nEstimated Volume: ${quantityVal}\n`;

    if (topicsSelected.length > 0) {
      dynamicString += `\nPlease provide clarifications regarding the following fields:\n`;
      topicsSelected.forEach((topic) => {
        dynamicString += `• Info regarding ${topic}\n`;
      });
    }

    dynamicString += `\nPlease share your corporate quotation pricing sheet.\n\nThank you.`;
    outMessageBox.value = dynamicString;
  }

  // Input listeners targeted to regenerate message structure automatically
  [compInput, userProduct, userQuantity, userBusiness].forEach((inputNode) => {
    if (inputNode) {
      inputNode.addEventListener("input", compileDynamicTemplate);
      if (inputNode.tagName === "SELECT") {
        inputNode.addEventListener("change", compileDynamicTemplate);
      }
    }
  });

  // Run core execution layout once on loading
  compileDynamicTemplate();

  // Intercept form data safely
  const orderForm = document.getElementById("bulk-order-form");
  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const company = document.getElementById("company-name").value.trim();
      const contact = document.getElementById("contact-person").value.trim();
      const mail = document.getElementById("email").value.trim();
      const mobile = document.getElementById("phone").value.trim();
      const targetCity = document.getElementById("city").value.trim();
      const messagePayload = outMessageBox.value;

      if (!company || !contact || !mobile) {
        alert("Please fill in all mandatory identity parameters.");
        return;
      }

      const parsedText = `🏢 Company: ${company}\n👤 Contact: ${contact}\n📧 Email: ${mail}\n📱 Phone: ${mobile}\n📍 City: ${targetCity}\n\n📝 Message:\n${messagePayload}`;
      const targetEndpointNumber = "91000000000000";

      window.open(
        `https://wa.me/${targetEndpointNumber}?text=${encodeURIComponent(parsedText)}`,
        "_blank",
      );
    });
  }
}

// ======================================
// FAQ INTERACTIVE ACCORDION
// ======================================
function initFaqAccordion() {
  const faqCards = document.querySelectorAll(".faq-item");

  faqCards.forEach((card) => {
    const actionableBtn = card.querySelector(".faq-question");
    if (!actionableBtn) return;

    actionableBtn.addEventListener("click", () => {
      const containsActive = card.classList.contains("active");

      // Close active panels for clean visibility control
      faqCards.forEach((element) => {
        element.classList.remove("active");
        const btn = element.querySelector(".faq-question");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });

      if (!containsActive) {
        card.classList.add("active");
        actionableBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// ======================================
// ACCELERATED METRIC COUNTER ANIMATIONS
// ======================================
function initCounterAnimations() {
  const counterElements = document.querySelectorAll(".stat-card h2");
  const diagnosticSection = document.getElementById("stats-section");

  if (counterElements.length === 0 || !diagnosticSection) return;

  let triggerFired = false;

  const evaluateCounterTrigger = () => {
    if (triggerFired) return;

    const viewportLimit = window.innerHeight - 100;
    const sectionBounds = diagnosticSection.getBoundingClientRect();

    if (sectionBounds.top <= viewportLimit) {
      triggerFired = true;

      counterElements.forEach((counter) => {
        const ceilingValue = parseInt(counter.getAttribute("data-target"), 10);
        if (isNaN(ceilingValue)) return;

        let startingPoint = 0;
        const durationFrames = 80; // Total computational animation frames
        const incrementalRatio = Math.ceil(ceilingValue / durationFrames);

        const countExecutionCycle = () => {
          startingPoint += incrementalRatio;
          if (startingPoint < ceilingValue) {
            counter.innerText = startingPoint.toLocaleString() + "+";
            requestAnimationFrame(countExecutionCycle);
          } else {
            counter.innerText = ceilingValue.toLocaleString() + "+";
          }
        };
        requestAnimationFrame(countExecutionCycle);
      });
    }
  };

  window.addEventListener("scroll", debounce(evaluateCounterTrigger, 15));
  // Check status post immediate loading sequence
  evaluateCounterTrigger();
}

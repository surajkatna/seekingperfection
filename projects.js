// Global navigation and animation elements
const progress = document.querySelector(".scroll-progress");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const tiltCards = [...document.querySelectorAll(".tilt-card")];

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progress) progress.style.width = `${amount}%`;
}

function setActiveNav() {
  if (!sections.length) return;

  const current = sections
    .filter((section) => window.scrollY >= section.offsetTop - 160)
    .pop();

  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.hash === `#${current.id}`);
  });
}

window.addEventListener("scroll", () => {
  updateProgress();
  setActiveNav();
});

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal animation on scroll observer
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
  revealObserver.observe(item);
});

// Tilt interaction
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Portfolio items dataset with configurable mock visual dimensions
const portfolioProjects = [
  {
   name: "Jewellery Shop",
    folder: "jwelleryshop",
    category: "Retail Website",
    description: "Jewellery storefront concept with polished product presentation and customer contact flow.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/jwelleryport.png"
  },
  {
   name: "dentist-clinic",
    folder: "dentist",
    category: "clinic",
    description: "For best densitsts in the city.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/dentist.jpg"
  },
  {
   name: "General Store",
    folder: "generalstore",
    category: "Local Business",
    description: "Neighborhood store website built to present products, offers and direct contact options.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/generalstoreport.png"
  },
  {
    name: "Restaurant Website",
    folder: "resturantwebsite",
    category: "Hospitality Website",
    description: "Restaurant website for menu discovery, ambience, location and booking/contact intent.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/restuarantport.png"
  },
  {
    name: "Electronics",
    folder: "electonics",
    category: "Product Website",
    description: "Electronics business website with product-focused presentation and conversion sections.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/electronicport.png"
  },
  {
    

 name: "Coaching Institute",
    folder: "coaching",
    category: "Education Website",
    description: "Course-led coaching website with clear sections for programs, outcomes and contact actions.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/coachingport.png"
  },
  {
    name: "Haunman Furniture Saw",
    folder: "haunmanfurnituresaw",
    category: "Manufacturing Website",
    description: "Furniture and saw business website for services, craftsmanship and enquiry generation.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/hanumanport.png"
  },
  {
    name: "Job Placement",
    folder: "jobplacment",
    category: "Recruitment Website",
    description: "Placement service website structured around opportunities, process and applicant enquiries.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/jobplacementport.png"
  },
  {
     name: "Blood Test Lab",
    folder: "bloodtestlab",
    category: "Healthcare Website",
    description: "Diagnostic lab website focused on services, trust signals and quick patient enquiries.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/bloostest.port.png"
  },
  {
    name: "Mixer Company",
    folder: "mixercompany",
    category: "Industrial Website",
    description: "Company website for mixer products with service details, product highlights and leads.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/mixercompanyport.png"
  },
  {
    name: "Real Estate Website",
    folder: "realestatewebsite",
    category: "Property Website",
    description: "Real estate experience for showcasing listings, locations and buyer enquiry actions.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/realestateport.png"
  },
  {
    name: "E-Commerce Clothes",
    folder: "ecommerceclothes",
    category: "Online Store",
    description: "Fashion storefront experience for browsing clothing products and building purchase intent.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/ecommerceport.png"
  },
  {
    name: "School Website",
    folder: "schoolwebsite",
    category: "Institution Website",
    description: "School website highlighting academics, activities, admissions and parent communication.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/schoolport.png"
  },
  {
    name: "Hospital",
    folder: "hospital",
    category: "Hospital Website",
    description: "Hospital website for departments, care information and fast patient contact.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "images/hospitalport.png"
  }
];

function initProjectShowcase() {
  const grid = document.getElementById("projectCardGrid");
  if (!grid) return;

  function getProjectUrl(project) {
    return `allprojects/${project.folder}/index.html`;
  }

  portfolioProjects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "portfolio-card reveal";
    card.style.cursor = "pointer";

    // Visual image container using real online URLs
    const visual = document.createElement("div");
    visual.className = "work-visual";
    
    const image = document.createElement("img");
    image.src = project.image;
    image.alt = `${project.name} mockup screenshot`;
    image.loading = "lazy";
    image.style.width = "100%";
    image.style.height = "100%";
    image.style.objectFit = "cover";
    visual.appendChild(image);

    const category = document.createElement("p");
    category.className = "project-category";
    category.textContent = project.category;

    const title = document.createElement("h3");
    title.textContent = project.name;

    const description = document.createElement("span");
    description.textContent = project.description;

    const techList = document.createElement("ul");
    techList.className = "project-tech";
    techList.setAttribute("aria-label", "Technologies used");
    project.tech.forEach((item) => {
      const techItem = document.createElement("li");
      techItem.textContent = item;
      techList.appendChild(techItem);
    });

    const actions = document.createElement("div");
    actions.className = "project-actions";

    const fullScreenLink = document.createElement("a");
    fullScreenLink.className = "button button-primary"; // Changed to button-primary as it's now the main CTA
    fullScreenLink.href = getProjectUrl(project);
    fullScreenLink.target = "_blank";
    fullScreenLink.rel = "noopener";
    fullScreenLink.textContent = "Open Full Screen";
    fullScreenLink.setAttribute("aria-label", `Open ${project.name} full screen`);

    // Entire card target wrapper click logic
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      window.open(getProjectUrl(project), "_blank", "noopener");
    });

    actions.append(fullScreenLink);
    card.append(visual, category, title, description, techList, actions);
    grid.appendChild(card);

    if (typeof revealObserver !== "undefined") {
      card.style.transitionDelay = `${Math.min(index * 35, 210)}ms`;
      revealObserver.observe(card);
    }
  });
}

// Initializers
initProjectShowcase();
updateProgress();
setActiveNav();
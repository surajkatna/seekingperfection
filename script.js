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
  progress.style.width = `${amount}%`;
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

const chatLog = document.getElementById("chatLog");
const quickReplies = document.getElementById("quickReplies");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const whatsappNumber = "917018629671";

const brief = {
  idea: "",
  type: "",
  goals: "",
  budget: "",
  timeline: "",
  contact: ""
};

let step = 0;

const steps = [
  {
    key: "idea",
    question: "Hi, tell us about the website you want us to make for you. What is in your mind?",
    replies: ["Business website", "Online store", "Portfolio website", "Booking website"]
  },
  {
    key: "type",
    question: "What kind of website do you need?",
    replies: ["Landing page", "Multi-page website", "E-commerce store", "Custom web app", "Not sure yet"]
  },
  {
    key: "goals",
    question: "What should people do on your website?",
    replies: ["Call or WhatsApp me", "Book appointment", "Buy products", "Fill enquiry form", "See my services"]
  },
  {
    key: "budget",
    question: "What is your budget for your website?",
    replies: ["INR 6k-15k", "INR 15k-25k", "INR 25-50k", "INR 50k+"]
  },
  {
    key: "timeline",
    question: "In how many days do you want the website ready?",
    replies: ["7 days", "14 days", "21 days", "1 month+"]
  },
  {
    key: "contact",
    question: "Last step: share your name and phone number so we can reply on WhatsApp.",
    replies: []
  }
];

function addMessage(text, sender = "bot") {
  if (!chatLog) return;

  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.innerHTML = text;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function showReplies(replies) {
  if (!quickReplies) return;

  quickReplies.innerHTML = "";
  replies.forEach((reply) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = reply;
    button.addEventListener("click", () => submitAnswer(reply));
    quickReplies.appendChild(button);
  });
}

function thinkAbout(answer) {
  const lower = answer.toLowerCase();

  if (lower.includes("sell") || lower.includes("e-commerce") || lower.includes("product")) {
    return "Got it. For this, product photos, trust proof, delivery details and checkout confidence should be clear.";
  }

  if (lower.includes("premium") || lower.includes("luxury") || lower.includes("modern")) {
    return "Nice. We can make the design feel polished with strong sections, clean spacing and clear contact actions.";
  }

  if (lower.includes("client") || lower.includes("lead") || lower.includes("call") || lower.includes("whatsapp")) {
    return "Good. We will make the website guide visitors toward contacting you quickly.";
  }

  if (lower.includes("ai") || lower.includes("automate")) {
    return "Nice. We can add automation or an assistant if your website needs it.";
  }

  return "Got it. I am noting this for your website brief.";
}

function nextQuestion() {
  if (!chatInput) return;

  const current = steps[step];
  if (!current) {
    finishBrief();
    return;
  }

  setTimeout(() => {
    addMessage(current.question, "bot");
    showReplies(current.replies);
    chatInput.placeholder = current.key === "contact" ? "Email or WhatsApp..." : "Type your answer...";
  }, 360);
}

function submitAnswer(answer) {
  const cleanAnswer = answer.trim();
  if (!cleanAnswer) return;

  const current = steps[step];
  brief[current.key] = cleanAnswer;
  addMessage(cleanAnswer, "user");
  showReplies([]);
  chatInput.value = "";

  setTimeout(() => {
    addMessage(thinkAbout(cleanAnswer), "bot");
    step += 1;
    nextQuestion();
  }, 520);
}

function estimatePackage() {
  const combined = `${brief.type} ${brief.goals} ${brief.budget}`.toLowerCase();

  if (combined.includes("custom") || combined.includes("web app") || combined.includes("1l")) {
    return "Custom package";
  }

  if (combined.includes("e-commerce") || combined.includes("60k") || combined.includes("30k")) {
    return "Professional package";
  }

  return "Starter package";
}

function buildWhatsAppMessage(source = "AI Chatbot") {
  return `New website inquiry from ${source}

Website idea: ${brief.idea || "Not provided"}
Website type: ${brief.type || "Not provided"}
Main goal: ${brief.goals || "Not provided"}
Budget: ${brief.budget || "Not provided"}
Timeline: ${brief.timeline || "Not provided"}
Client contact: ${brief.contact || "Not provided"}

Please contact this client and share the next steps.`;
}

function openWhatsApp(message) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

function finishBrief() {
  const packageName = estimatePackage();
  const summary = `
<strong>Your website requirement brief is ready.</strong>

Website idea: ${brief.idea}
Website type: ${brief.type}
Main goal: ${brief.goals}
Budget: ${brief.budget}
Timeline: ${brief.timeline}
Client contact: ${brief.contact}

Suggested package: ${packageName}.

Tap "Send to WhatsApp" and the full details will open directly to Seeking Perfection on WhatsApp.`;

  addMessage(summary, "bot");
  showReplies(["Send to WhatsApp", "Start again", "Fill contact form"]);
}

if (quickReplies) {
  quickReplies.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLButtonElement)) return;

    if (event.target.textContent === "Start again") {
      Object.keys(brief).forEach((key) => {
        brief[key] = "";
      });
      step = 0;
      chatLog.innerHTML = "";
      showReplies([]);
      nextQuestion();
    }

    if (event.target.textContent === "Send to WhatsApp") {
      openWhatsApp(buildWhatsAppMessage("AI Chatbot"));
    }

    if (event.target.textContent === "Fill contact form") {
      document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
      const textarea = document.querySelector(".contact-form textarea");
      textarea.value = `Website idea: ${brief.idea}
Website type: ${brief.type}
Main goal: ${brief.goals}
Budget: ${brief.budget}
Timeline: ${brief.timeline}
Contact: ${brief.contact}`;
    }
  });
}

if (chatForm) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitAnswer(chatInput.value);
  });
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const message = `New website inquiry from contact form

Name: ${data.get("name")}
Client phone/WhatsApp: ${data.get("contact")}

Project details:
${data.get("message")}`;

    openWhatsApp(message);
  });
}

const portfolioProjects = [
  {
    name: "Grocery Shopping",
    folder: "generalstore",
    category: "Local Business",
    description: "Grocery and general store website built to present products, offers and direct contact options.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "Jewellery Shop",
    folder: "jwelleryshop",
    category: "Retail Website",
    description: "Jewellery storefront concept with polished product presentation and customer contact flow.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "Restaurant Website",
    folder: "resturantwebsite",
    category: "Hospitality Website",
    description: "Restaurant website for menu discovery, ambience, location and booking/contact intent.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "Blood Test Lab",
    folder: "bloodtestlab",
    category: "Healthcare Website",
    description: "Diagnostic lab website focused on services, trust signals and quick patient enquiries.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "Coaching Institute",
    folder: "coaching",
    category: "Education Website",
    description: "Course-led coaching website with clear sections for programs, outcomes and contact actions.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "E-Commerce Clothes",
    folder: "ecommerceclothes",
    category: "Online Store",
    description: "Fashion storefront experience for browsing clothing products and building purchase intent.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "Electronics",
    folder: "electonics",
    category: "Product Website",
    description: "Electronics business website with product-focused presentation and conversion sections.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "Haunman Furniture Saw",
    folder: "haunmanfurnituresaw",
    category: "Manufacturing Website",
    description: "Furniture and saw business website for services, craftsmanship and enquiry generation.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "Job Placement",
    folder: "jobplacment",
    category: "Recruitment Website",
    description: "Placement service website structured around opportunities, process and applicant enquiries.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "Mixer Company",
    folder: "mixercompany",
    category: "Industrial Website",
    description: "Company website for mixer products with service details, product highlights and leads.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "Real Estate Website",
    folder: "realestatewebsite",
    category: "Property Website",
    description: "Real estate experience for showcasing listings, locations and buyer enquiry actions.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "School Website",
    folder: "schoolwebsite",
    category: "Institution Website",
    description: "School website highlighting academics, activities, admissions and parent communication.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "Suraj Katna Hospital",
    folder: "surajkatnahospital",
    category: "Hospital Website",
    description: "Hospital website for departments, care information and fast patient contact.",
    tech: ["HTML", "CSS", "JavaScript"]
  }
];

function initProjectShowcase() {
  const grid = document.getElementById("projectCardGrid");
  const frame = document.getElementById("projectPreviewFrame");
  const loader = document.getElementById("previewLoader");
  const empty = document.getElementById("previewEmpty");
  const error = document.getElementById("previewError");
  const errorLink = document.getElementById("previewErrorLink");
  const previewTitle = document.getElementById("previewTitle");
  const previewOpenLink = document.getElementById("previewOpenLink");

  if (!grid || !frame || !loader || !empty || !error || !errorLink || !previewTitle || !previewOpenLink) {
    return;
  }

  let activeButton = null;
  function getProjectUrl(project) {
    return `allprojects/${project.folder}/`;
  }

  function getProjectIndexUrl(project) {
    return `${getProjectUrl(project)}index.html`;
  }

  function showLoading(project) {
    loader.hidden = false;
    empty.hidden = true;
    error.hidden = true;
    frame.hidden = false;
    frame.classList.add("is-switching");
    previewTitle.textContent = project.name;
    previewOpenLink.href = getProjectIndexUrl(project);
    previewOpenLink.setAttribute("aria-disabled", "false");
    errorLink.href = getProjectIndexUrl(project);
  }

  function loadProject(project, button) {
    if (activeButton) {
      activeButton.closest(".portfolio-card").classList.remove("active");
      activeButton.setAttribute("aria-pressed", "false");
    }

    activeButton = button;
    activeButton.closest(".portfolio-card").classList.add("active");
    activeButton.setAttribute("aria-pressed", "true");
    showLoading(project);

    window.setTimeout(() => {
      frame.src = getProjectIndexUrl(project);
    }, 120);

    window.setTimeout(() => {
      loader.hidden = true;
      frame.classList.remove("is-switching");
    }, 3500);
  }

  frame.addEventListener("load", () => {
    loader.hidden = true;
    error.hidden = true;
    frame.hidden = false;
    window.requestAnimationFrame(() => frame.classList.remove("is-switching"));
  });

  portfolioProjects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "portfolio-card reveal";

    const visual = document.createElement("div");
    visual.className = `work-visual visual-${["one", "two", "three"][index % 3]}`;
    visual.setAttribute("role", "img");
    visual.setAttribute("aria-label", `${project.name} preview placeholder`);

    const category = document.createElement("p");
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

    const previewButton = document.createElement("button");
    previewButton.className = "button button-primary";
    previewButton.type = "button";
    previewButton.textContent = "Live Preview";
    previewButton.setAttribute("aria-label", `Preview ${project.name}`);
    previewButton.setAttribute("aria-pressed", "false");
    previewButton.addEventListener("click", () => loadProject(project, previewButton));

    const fullScreenLink = document.createElement("a");
    fullScreenLink.className = "button button-ghost";
    fullScreenLink.href = getProjectIndexUrl(project);
    fullScreenLink.target = "_blank";
    fullScreenLink.rel = "noopener";
    fullScreenLink.textContent = "Open Full Screen";
    fullScreenLink.setAttribute("aria-label", `Open ${project.name} full screen`);

    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) return;
      loadProject(project, previewButton);
    });

    actions.append(previewButton, fullScreenLink);
    card.append(visual, category, title, description, techList, actions);
    grid.appendChild(card);

    if (typeof revealObserver !== "undefined") {
      card.style.transitionDelay = `${Math.min(index * 35, 210)}ms`;
      revealObserver.observe(card);
    }
  });
}

initProjectShowcase();
updateProgress();
setActiveNav();
if (chatLog && chatInput) {
  nextQuestion();
}

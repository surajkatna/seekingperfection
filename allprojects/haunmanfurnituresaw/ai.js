// ==========================================================================
// 1. DOM SELECTORS BOUNDRIES
// ==========================================================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const toggleIcon = menuToggle.querySelector('i');

const messages = document.getElementById("chatMessages");
const quickReplies = document.getElementById("quickReplies");
const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const resetButton = document.getElementById("resetChat");
const photoToggle = document.getElementById("photoToggle");
const photoPanel = document.getElementById("photoPanel");
const roomPhoto = document.getElementById("roomPhoto");
const roomPreview = document.getElementById("roomPreview");
const uploadText = document.getElementById("uploadText");
const roomType = document.getElementById("roomType");
const wallWidth = document.getElementById("wallWidth");
const analyzeRoom = document.getElementById("analyzeRoom");

let uploadedRoomImage = null;

// ==========================================================================
// 2. PRODUCT DATA & REUSABLE ASSETS
// ==========================================================================
const products = {
  bed: {
    label: "bed",
    questions: ["dimensions", "budget", "wood"],
    suggestions: ["6 x 6.5 feet", "King size", "Queen size"],
    rate: 1250,
  },
  door: {
    label: "door",
    questions: ["dimensions", "location", "budget"],
    suggestions: ["7 x 3 feet", "Exterior door", "Interior door"],
    rate: 1150,
  },
  window: {
    label: "window",
    questions: ["dimensions", "style", "budget"],
    suggestions: ["4 x 4 feet", "Sliding", "Hinged"],
    rate: 1050,
  },
  wardrobe: {
    label: "wardrobe",
    questions: ["dimensions", "style", "budget", "wood"],
    suggestions: ["7 x 6 feet", "Sliding", "Hinged"],
    rate: 1450,
  },
  table: {
    label: "table",
    questions: ["dimensions", "budget", "wood"],
    suggestions: ["6 x 3 feet", "Dining table", "Study table"],
    rate: 1350,
  },
  cabinet: {
    label: "cabinet",
    questions: ["dimensions", "budget", "wood"],
    suggestions: ["6 x 4 feet", "Kitchen cabinet", "Storage cabinet"],
    rate: 1300,
  },
  furniture: {
    label: "furniture",
    questions: ["product", "dimensions", "budget"],
    suggestions: ["Bed", "Wardrobe", "Dining table"],
    rate: 1200,
  },
};

const questionText = {
  product: "What would you like us to build: a bed, wardrobe, table, door, window or something else?",
  dimensions: "What are the approximate dimensions? You can reply like “6 x 6.5 feet”.",
  budget: "What approximate budget range do you have in mind?",
  wood: "Do you prefer Sal, Teak, Sheesham, plywood, or would you like me to recommend one?",
  location: "Will this be an interior door or an exterior/main door?",
  style: "Which style do you prefer: sliding or hinged?",
};

const state = {
  product: "",
  customProduct: "",
  dimensions: "",
  budget: "",
  wood: "",
  location: "",
  style: "",
  awaiting: "",
};

// ==========================================================================
// 3. RESPONSIVE NAVIGATION CONTROL
// ==========================================================================
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  if (navLinks.classList.contains('active')) {
    toggleIcon.classList.replace('fa-bars', 'fa-xmark');
  } else {
    toggleIcon.classList.replace('fa-xmark', 'fa-bars');
  }
});

// Auto collapse on viewport navigation click links selection
document.querySelectorAll('.links .hot').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    toggleIcon.classList.replace('fa-xmark', 'fa-bars');
  });
});

// ==========================================================================
// 4. SECURITY & VIEW CONTROL ENGINE UTILITIES
// ==========================================================================
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function addMessage(text, sender = "bot") {
  const bubble = document.createElement("div");
  bubble.className = `message ${sender}`;
  bubble.innerHTML = sender === "bot" ? text : escapeHtml(text);
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
  return bubble;
}

function setQuickReplies(options = []) {
  quickReplies.innerHTML = "";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => submitMessage(option));
    quickReplies.appendChild(button);
  });
}

// ==========================================================================
// 5. NATURAL INTELLIGENCE PARSING LOGIC
// ==========================================================================
function detectProduct(text) {
  const aliases = {
    bed: ["bed", "cot"],
    door: ["door", "gate"],
    window: ["window"],
    wardrobe: ["wardrobe", "almirah", "closet"],
    table: ["table", "desk"],
    cabinet: ["cabinet", "cupboard"],
    furniture: ["furniture", "interior", "carpentry"],
  };
  return Object.entries(aliases).find(([, words]) =>
    words.some((word) => text.includes(word))
  )?.[0] || "";
}

function detectDetails(text) {
  const foundProduct = detectProduct(text);
  if (foundProduct) state.product = foundProduct;

  const dimensions = text.match(/\b\d+(?:\.\d+)?\s*(?:ft|feet|foot|')?\s*[x×]\s*\d+(?:\.\d+)?(?:\s*(?:ft|feet|foot|'))?(?:\s*[x×]\s*\d+(?:\.\d+)?)?/i);
  if (dimensions) state.dimensions = dimensions[0];

  const budget = text.match(/(?:₹|rs\.?|inr)?\s*\d[\d,]*(?:\s*(?:k|thousand|lakh|lakhs))?/i);
  if (budget && (text.includes("budget") || state.awaiting === "budget")) {
    state.budget = budget[0];
  }

  if (/\bteak\b/i.test(text)) state.wood = "Teak";
  if (/\bsal\b/i.test(text)) state.wood = "Sal";
  if (/\bsheesham\b|\brosewood\b/i.test(text)) state.wood = "Sheesham";
  if (/\bplywood\b|\bply\b/i.test(text)) state.wood = "Plywood";
  if (/\brecommend\b|\byou choose\b|\bnot sure\b/i.test(text) && state.awaiting === "wood") state.wood = "recommend";

  if (/\bexterior\b|\bmain door\b|\boutside\b/i.test(text)) state.location = "exterior";
  if (/\binterior\b|\binside\b|\broom door\b/i.test(text)) state.location = "interior";
  if (/\bsliding\b/i.test(text)) state.style = "sliding";
  if (/\bhinged\b|\bhinge\b/i.test(text)) state.style = "hinged";

  if (state.awaiting === "product" && !state.product) {
    state.product = "furniture";
    state.customProduct = text.trim();
  } else if (state.awaiting && !state[state.awaiting]) {
    state[state.awaiting] = text.trim();
  }
}

// ==========================================================================
// 6. BUSINESS CALCULATION ARCHITECTURE
// ==========================================================================
function chooseWood() {
  if (state.wood && state.wood !== "recommend") return state.wood;
  if (state.product === "door" && state.location === "exterior") return "Sal";
  if (state.product === "door" || state.product === "window") return "Teak";
  if (state.product === "bed" || state.product === "table") return "Sheesham";
  if (state.product === "wardrobe" || state.product === "cabinet") return "BWP plywood with a quality laminate";
  return "seasoned Sal or Sheesham";
}

function woodReason(wood) {
  if (wood.includes("Sal")) return "It is strong, durable and a practical choice for structural use.";
  if (wood.includes("Teak")) return "It offers excellent durability, moisture resistance and a premium finish.";
  if (wood.includes("Sheesham")) return "It is strong, attractive and well suited to long-lasting furniture.";
  if (wood.includes("plywood")) return "It stays dimensionally stable and works well for modern storage furniture.";
  return "It provides a good balance of strength, appearance and value.";
}

function parseArea() {
  const numbers = state.dimensions.match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
  return numbers.length >= 2 ? numbers[0] * numbers[1] : 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0
  }).format(value);
}

function buildRecommendation() {
  const product = products[state.product];
  const productLabel = state.customProduct || product.label;
  const wood = chooseWood();
  const area = parseArea();
  const estimate = area ? area * product.rate : 0;
  const estimateText = estimate ? `${formatCurrency(estimate * 0.85)}–${formatCurrency(estimate * 1.25)}` : "available after site measurements";

  const summary = [
    `<strong>Recommended material:</strong> ${wood}`,
    `<strong>Why:</strong> ${woodReason(wood)}`,
    `<strong>Approximate size:</strong> ${escapeHtml(state.dimensions || "to be confirmed")}`,
    `<strong>Rough project estimate:</strong> ${estimateText}`,
  ].join("<br>");

  const whatsappText = encodeURIComponent(
    `Hello Hanuman Saw Mill, I want a ${productLabel}. Size: ${state.dimensions || "not confirmed"}. Budget: ${state.budget || "not confirmed"}. Recommended wood: ${wood}. Please contact me with a final quotation.`
  );

  return `${summary}<br><br>This is an initial recommendation. Hardware, polish, design complexity and wood grade can change the final price.<br><br><a href="https://wa.me/917870734451?text=${whatsappText}" target="_blank" rel="noopener noreferrer">Send these details to Hanuman Saw Mill on WhatsApp</a>`;
}

function nextQuestion() {
  if (!state.product) {
    state.awaiting = "product";
    setQuickReplies(["Bed", "Door", "Wardrobe", "Dining table"]);
    return questionText.product;
  }

  const product = products[state.product];
  const missing = product.questions.find((field) => !state[field]);

  if (missing) {
    state.awaiting = missing;
    if (missing === "dimensions") setQuickReplies(product.suggestions.slice(0, 1));
    else if (missing === "budget") setQuickReplies(["Under ₹25,000", "₹25,000–₹50,000", "Above ₹50,000"]);
    else if (missing === "wood") setQuickReplies(["Please recommend", "Sal", "Teak", "Sheesham"]);
    else if (missing === "location") setQuickReplies(["Interior door", "Exterior door"]);
    else if (missing === "style") setQuickReplies(["Sliding", "Hinged"]);
    return questionText[missing];
  }

  state.awaiting = "";
  setQuickReplies(["Start another project", "Call 7870734451"]);
  return buildRecommendation();
}

// ==========================================================================
// 7. OPERATIONS PROCESS PIPELINES
// ==========================================================================
function botResponse(rawText) {
  const text = rawText.toLowerCase().trim();
  if (/^(hi|hello|hey|namaste|good morning|good evening)\b/.test(text) && !state.product) {
    setQuickReplies(["I need a bed", "I need a door", "I need a wardrobe"]);
    return "Hello! Welcome to Hanuman Saw Mill. What would you like to build today?";
  }
  if (text.includes("start another") || text === "restart") {
    resetState();
    return "Of course. What would you like to build next?";
  }
  if (text.includes("call 7870734451")) {
    setQuickReplies([]);
    return `You can call us at <a href="tel:+917870734451">7870734451</a>, or message us on <a href="https://wa.me/917870734451" target="_blank" rel="noopener noreferrer">WhatsApp</a>.`;
  }
  detectDetails(text);
  return nextQuestion();
}

function submitMessage(value) {
  const text = value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  setQuickReplies([]);

  const typing = addMessage("Hanuman AI is thinking…", "bot");
  typing.classList.add("typing");

  window.setTimeout(() => {
    typing.remove();
    addMessage(botResponse(text));
    input.focus();
  }, 450);
}

function resetState() {
  Object.keys(state).forEach((key) => (state[key] = ""));
  messages.innerHTML = "";
  setQuickReplies(["Bed", "Door", "Wardrobe", "Dining table"]);
}

// ==========================================================================
// 8. IMAGE & ROOM MATRIX COMPUTATION PLANNERS
// ==========================================================================
function getRoomRecommendations(type, width) {
  const usableWidth = Math.max(3, width - 2);
  const recommendations = {
    bedroom: [
      ["Bed", width >= 12 ? "6 x 6.5 ft king bed" : width >= 10 ? "5 x 6.5 ft queen bed" : "4 x 6.5 ft double bed"],
      ["Wardrobe", `${Math.min(7, Math.max(4, usableWidth * 0.45)).toFixed(1)} ft wide x 2 ft deep x 7 ft high`],
      ["Bedside table", width >= 10 ? "1.5 x 1.5 ft, one on each side" : "1.25 x 1.25 ft, one side only"],
    ],
    living: [
      ["Main sofa", `${Math.min(8, Math.max(5, usableWidth * 0.6)).toFixed(1)} ft wide x 3 ft deep`],
      ["TV unit", `${Math.min(7, Math.max(4, usableWidth * 0.5)).toFixed(1)} ft wide x 1.3 ft deep`],
      ["Coffee table", width >= 11 ? "4 x 2 ft" : "3 x 1.8 ft"],
    ],
    dining: [
      ["Dining table", width >= 12 ? "6 x 3 ft, 6-seater" : width >= 9 ? "4.5 x 3 ft, 4-seater" : "3.5 ft round, 4-seater"],
      ["Sideboard", `${Math.min(6, Math.max(3, usableWidth * 0.35)).toFixed(1)} ft wide x 1.5 ft deep`],
      ["Chair clearance", "Keep at least 3 ft around the table"],
    ],
    study: [
      ["Study desk", `${Math.min(6, Math.max(3.5, usableWidth * 0.45)).toFixed(1)} ft wide x 2 ft deep`],
      ["Bookshelf", `${Math.min(5, Math.max(3, usableWidth * 0.35)).toFixed(1)} ft wide x 1 ft deep x 7 ft high`],
      ["Storage cabinet", "2.5 ft wide x 1.5 ft deep"],
    ],
    kitchen: [
      ["Base cabinets", `${Math.max(4, usableWidth).toFixed(1)} linear ft x 2 ft deep x 2.8 ft high`],
      ["Wall cabinets", `${Math.max(4, usableWidth * 0.75).toFixed(1)} linear ft x 1.2 ft deep`],
      ["Counter clearance", "Keep a 3.5 to 4 ft working passage"],
    ],
  };
  return recommendations[type];
}

function analyzeImageLight(image) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const sampleWidth = 80;
  const sampleHeight = Math.max(40, Math.round((sampleWidth * image.naturalHeight) / image.naturalWidth));
  canvas.width = sampleWidth;
  canvas.height = sampleHeight;
  context.drawImage(image, 0, 0, sampleWidth, sampleHeight);

  const pixels = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
  let brightness = 0;
  for (let index = 0; index < pixels.length; index += 4) {
    brightness += pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114;
  }
  const average = brightness / (pixels.length / 4);
  if (average < 85) return "The photo appears dark, so lighter wood tones or warm laminates may keep the room from feeling heavy.";
  if (average > 180) return "The room appears bright, so medium or darker wood finishes can add useful contrast.";
  return "The room has balanced lighting, so both natural and medium wood finishes should work well.";
}

function buildRoomAnalysis() {
  const width = Number(wallWidth.value);
  if (!uploadedRoomImage || !uploadedRoomImage.complete) {
    addMessage("Please upload a clear room photo first.");
    return;
  }
  if (!width || width < 4) {
    addMessage("Please enter the approximate width of the visible wall. A photo alone has no reliable measurement scale.");
    wallWidth.focus();
    return;
  }

  const type = roomType.value;
  const label = roomType.options[roomType.selectedIndex].text;
  const orientation = uploadedRoomImage.naturalWidth >= uploadedRoomImage.naturalHeight ? "wide" : "tall";
  const lightAdvice = analyzeImageLight(uploadedRoomImage);
  const furniture = getRoomRecommendations(type, width).map(([name, size]) => `<li><strong>${name}:</strong> ${size}</li>`).join("");
  const whatsappText = encodeURIComponent(`Hello Hanuman Saw Mill, I have a ${label} photo. The visible wall is about ${width} ft wide. Please review the room and confirm suitable furniture and dimensions.`);

  addMessage(
    `<strong>Room photo plan: ${label}</strong><br>The uploaded photo has a ${orientation} composition. ${lightAdvice}<ul class="room-result-list">${furniture}</ul><strong>Layout rule:</strong> Keep about 2.5 to 3 ft of clear walking space around major furniture.<br><br>These are planning estimates, not measurements taken from the photo. Door swings, windows and electrical points must be checked on site.<br><br><a href="https://wa.me/917870734451?text=${whatsappText}" target="_blank" rel="noopener noreferrer">Ask Hanuman Saw Mill to verify this room plan</a>`
  );

  photoPanel.hidden = true;
  photoToggle.setAttribute("aria-expanded", "false");
}

function startChat() {
  resetState();
  addMessage("Hello! Welcome to <strong>Hanuman Saw Mill</strong>. What would you like to build today?");
}

// ==========================================================================
// 9. EVENT REGISTRATIONS SYSTEMS
// ==========================================================================
form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitMessage(input.value);
});

resetButton.addEventListener("click", startChat);
photoToggle.addEventListener("click", () => {
  const willOpen = photoPanel.hidden;
  photoPanel.hidden = !willOpen;
  photoToggle.setAttribute("aria-expanded", String(willOpen));
});

roomPhoto.addEventListener("change", () => {
  const file = roomPhoto.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    addMessage("Please choose a JPG, PNG or WebP room photo.");
    roomPhoto.value = "";
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    addMessage("That photo is larger than 10 MB. Please choose a smaller image.");
    roomPhoto.value = "";
    return;
  }

  if (roomPreview.src.startsWith("blob:")) URL.revokeObjectURL(roomPreview.src);
  roomPreview.src = URL.createObjectURL(file);
  roomPreview.hidden = false;
  uploadText.textContent = file.name;
  uploadedRoomImage = roomPreview;
});

analyzeRoom.addEventListener("click", buildRoomAnalysis);

// Initialize System Engine
startChat();
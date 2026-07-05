/**
 * ElectroWorld Showroom
 * Part 1 - Core Bootstrap & Data Layer
 */

"use strict";

(() => {

const CONFIG = {
    DATA_ENDPOINT: "products.json",
    WHATSAPP_NUMBER: "919876543210",

    IMAGE_FALLBACK:
        "images/products/accessories.svg",

    IMAGE_FALLBACK_SVG:
        "images/products/accessories.svg",

    SEARCH_DEBOUNCE: 250,

    SCROLL_THRESHOLD: 300
};

const state = {
    products: [],
    filtered: [],
    activeCategory: "all",
    searchQuery: "",
    sortBy: "newest"
};

const DOM = {
    body: document.body,

    header: document.querySelector("header"),

    nav: document.querySelector("header nav"),

    navToggle: document.getElementById("nav-toggle"),

    navMenu: document.querySelector(".nav-menu"),

    categories: document.querySelector(".categories"),

    controlsHook:
        document.getElementById(
            "showroom-controls-hook"
        ),

    contactForm:
        document.querySelector(".contact-form"),

    newsletter:
        document.querySelector(".newsletter-box"),

    progress:
        document.getElementById(
            "scroll-progress-indicator"
        )
};

let searchInput = null;
let sortSelect = null;
let productCounter = null;

let lightbox = null;

let backToTop = null;

let whatsappFloating = null;

const CATEGORY_META = {
    "phones": ["Smartphones", "Handheld Devices", "fa-mobile-screen-button"],
    "laptops": ["Laptops", "Personal Architecture", "fa-laptop"],
    "headphones": ["Headphones", "Acoustic Solitude", "fa-headphones"],
    "cameras": ["Cameras", "Visual Chronology", "fa-camera"],
    "smart-watches": ["Smart Watches", "Haute Chronometry", "fa-clock"],
    "accessories": ["Accessories", "Monolithic Essentials", "fa-plug"],
    "gaming": ["Gaming", "Spatial Simulation", "fa-gamepad"],
    "speakers": ["Bluetooth Speakers", "Kinetic Resonance", "fa-volume-high"],
    "tablets": ["Tablets", "Portable Canvases", "fa-tablet-screen-button"],
    "earbuds": ["Earbuds", "Pocket Acoustics", "fa-ear-listen"],
    "action-cameras": ["Action Cameras", "Motion Capture", "fa-video"],
    "printers": ["Printers", "Studio Output", "fa-print"],
    "monitors": ["Monitors", "Visual Workstations", "fa-desktop"]
};



document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);



async function initializeApplication() {

    try {

        createFloatingButtons();

        createControls();

        createLightbox();

        setupNavigation();

        setupCategories();

        setupGlobalEvents();

        setupScrollEvents();

        setupIntersectionAnimations();

        setupForms();

        await loadProducts();

    }

    catch (error) {

        console.error(
            "Initialization Error",
            error
        );

        showFatalError(error);

    }

}



async function loadProducts() {

    try {

        const response =
            await fetch(CONFIG.DATA_ENDPOINT);

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const json =
            await response.json();

        if (!Array.isArray(json)) {

            throw new Error(
                "products.json must contain an array."
            );

        }

        state.products =
            json.map(normalizeProduct);

        state.filtered =
            [...state.products];

        ensureCategoryFilters();

        ensureProductSections();

        renderAll();

    }

    catch (error) {

        console.error(error);

        showFatalError(error);

    }

}



function normalizeProduct(item) {

    return {

        id:
            Number(item.id) ||
            crypto.randomUUID(),

        brand:
            String(
                item.brand || "Premium"
            ).trim(),

        name:
            String(
                item.name || "Unnamed Product"
            ).trim(),

        category:
            normalizeCategory(
                item.category || "Accessories"
            ),

        rawCategory:
            String(
                item.category || "Accessories"
            ).trim(),

        price:
            Number(item.price) || 0,

        stock:
            item.stock || "In Stock",

        image:
            resolveImage(item.image)

    };

}



function normalizeCategory(category) {

    return String(category)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

}



function resolveImage(image) {

    if (
        typeof image !== "string"
    ) {

        return CONFIG.IMAGE_FALLBACK;

    }

    image = image.trim();

    if (!image.length) {

        return CONFIG.IMAGE_FALLBACK;

    }

    return image;

}



function attachImageFallback(img) {

    if (!img) return;

    img.addEventListener(
        "error",
        () => {

            if (
                !img.dataset.failed
            ) {

                img.dataset.failed = "1";

                img.src =
                    CONFIG.IMAGE_FALLBACK;

                return;

            }

            img.src =
                CONFIG.IMAGE_FALLBACK_SVG;

        },
        {
            once: false
        }
    );

}



function renderAll() {

    filterProducts();

    sortProducts();

    renderProducts();

}



function filterProducts() {

    const query =
        state.searchQuery
            .toLowerCase()
            .trim();

    state.filtered =
        state.products.filter(product => {

            const categoryMatch =
                state.activeCategory === "all"
                ||
                product.category ===
                state.activeCategory;

            const searchMatch =
                !query
                ||
                product.name
                    .toLowerCase()
                    .includes(query)
                ||
                product.brand
                    .toLowerCase()
                    .includes(query);

            return (
                categoryMatch &&
                searchMatch
            );

        });

}



function sortProducts() {

    switch (state.sortBy) {

        case "price-low":

            state.filtered.sort(
                (a, b) =>
                    a.price -
                    b.price
            );

            break;

        case "price-high":

            state.filtered.sort(
                (a, b) =>
                    b.price -
                    a.price
            );

            break;

        case "alphabetical":

            state.filtered.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
            );

            break;

        default:

            state.filtered.sort(
                (a, b) =>
                    b.id - a.id
            );

    }

}/* ============================================================
   PART 2 - Rendering Engine, Search, Sort & Categories
============================================================ */

function renderProducts() {

    getProductSections().forEach(section => {

        const grid = section.querySelector(".product-grid");

        if (grid) grid.innerHTML = "";

        section.style.display = "none";

    });

    if (!state.filtered.length) {

        renderEmptyState();

        return;

    }

    const fragments = {};

    state.filtered.forEach(product => {

        const sectionId = product.category;

        const section =
            document.getElementById(sectionId);

        if (!section) return;

        if (!fragments[sectionId]) {

            fragments[sectionId] =
                document.createDocumentFragment();

        }

        fragments[sectionId].appendChild(
            createProductCard(product)
        );

        section.style.display = "block";

    });

    Object.entries(fragments).forEach(([id, fragment]) => {

        const grid =
            document
                .getElementById(id)
                ?.querySelector(".product-grid");

        if (grid) {

            grid.appendChild(fragment);

        }

    });

    if (productCounter) {

        productCounter.textContent =
            getProductCountLabel(
                state.filtered.length
            );

    }

}



function createProductCard(product) {

    const formatter =
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        });

    const card =
        document.createElement("div");

    card.className = "card";

    card.dataset.id = product.id;

    const imageWrap =
        document.createElement("div");
    imageWrap.className =
        "card-img-container";

    const image =
        document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    image.decoding = "async";
    attachImageFallback(image);

    const brand =
        document.createElement("div");
    brand.className = "brand-label";
    brand.textContent = product.brand;

    const title =
        document.createElement("h3");
    title.textContent = product.name;

    const price =
        document.createElement("div");
    price.className = "price-tag";
    price.textContent =
        formatter.format(product.price);

    const actions =
        document.createElement("div");
    actions.className = "card-actions";

    const details =
        document.createElement("button");
    details.className = "btn-details";
    details.type = "button";
    details.textContent = "Details";

    const inquiry =
        document.createElement("button");
    inquiry.className = "btn-inquiry";
    inquiry.type = "button";
    inquiry.innerHTML =
        '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Inquiry';

    imageWrap.appendChild(image);
    actions.append(details, inquiry);
    card.append(imageWrap, brand, title, price, actions);

    return card;

}



function renderEmptyState() {

    if (productCounter) {

        productCounter.textContent =
            getProductCountLabel(0);

    }

    let section =
        document.getElementById("phones");

    if (
        state.activeCategory !== "all"
    ) {

        section =
            document.getElementById(
                state.activeCategory
            );

    }

    if (!section) return;

    section.style.display = "block";

    const grid =
        section.querySelector(".product-grid");

    if (!grid) return;

    grid.innerHTML = `

<div class="showroom-empty-state">

<i class="fa-solid fa-box-open"></i>

<h3>No Products Found</h3>

<p>

Try another category or search.

</p>

</div>

`;

}



function showFatalError(error) {

    if (!DOM.controlsHook) return;

    DOM.controlsHook.innerHTML = `

<div class="showroom-empty-state">

<i class="fa-solid fa-triangle-exclamation"></i>

<h2>Unable to load products</h2>

<p>

${error.message}

</p>

</div>

`;

}



function createControls() {

    if (!DOM.controlsHook) return;

    DOM.controlsHook.innerHTML = `

<div class="showroom-controls">

<div class="search-box-wrap">

<i class="fa-solid fa-magnifying-glass"></i>

<input
id="showroom-search"
type="text"
placeholder="Search products...">

</div>

<div class="sort-box-wrap">

<select id="showroom-sort">

<option value="newest">

Newest

</option>

<option value="price-low">

Price Low → High

</option>

<option value="price-high">

Price High → Low

</option>

<option value="alphabetical">

A → Z

</option>

</select>

</div>

<div
class="product-counter-bar"
id="product-counter">

Loading...

</div>

</div>

`;

    searchInput =
        document.getElementById(
            "showroom-search"
        );

    sortSelect =
        document.getElementById(
            "showroom-sort"
        );

    productCounter =
        document.getElementById(
            "product-counter"
        );

    searchInput?.addEventListener(

        "input",

        debounce(event => {

            state.searchQuery =
                event.target.value;

            renderAll();

        }, CONFIG.SEARCH_DEBOUNCE)

    );

    sortSelect?.addEventListener(

        "change",

        event => {

            state.sortBy =
                event.target.value;

            renderAll();

        }

    );

}



function setupCategories() {

    if (!DOM.categories) return;

    DOM.categories.addEventListener(

        "click",

        event => {

            const category =
                event.target.closest(".category");

            if (!category) return;

            DOM.categories
                .querySelectorAll(".category")
                .forEach(node => {

                    node.classList.remove(
                        "active-filter"
                    );

                });

            category.classList.add(
                "active-filter"
            );

            const value =
                category.dataset.cat;

            if (!value) {

                state.activeCategory =
                    "all";

            } else {

                state.activeCategory =
                    normalizeCategory(value);

            }

            renderAll();

        }

    );

    DOM.categories.addEventListener(

        "keydown",

        event => {

            if (
                event.key !== "Enter" &&
                event.key !== " "
            ) {

                return;

            }

            const category =
                event.target.closest(".category");

            if (!category) return;

            event.preventDefault();

            category.click();

        }

    );

}



function getProductSections() {

    return document.querySelectorAll(
        "section.products"
    );

}



function getCategoryLabel(slug) {

    const match =
        state.products.find(
            product => product.category === slug
        );

    if (match?.rawCategory) {

        return match.rawCategory;

    }

    if (CATEGORY_META[slug]) {

        return CATEGORY_META[slug][0];

    }

    return slug
        .split("-")
        .map(part =>
            part.charAt(0).toUpperCase() +
            part.slice(1)
        )
        .join(" ");

}



function ensureCategoryFilters() {

    if (!DOM.categories) return;

    if (
        !DOM.categories.querySelector(
            "[data-cat='all']"
        )
    ) {

        const all =
            createCategoryTile(
                "all",
                "All",
                "fa-layer-group"
            );

        all.classList.add("active-filter");

        DOM.categories.prepend(all);

    }

    const existing =
        new Set(
            [...DOM.categories.querySelectorAll(".category")]
                .map(node =>
                    normalizeCategory(
                        node.dataset.cat || "all"
                    )
                )
        );

    const slugs =
        [...new Set(
            state.products.map(
                product => product.category
            )
        )];

    slugs.forEach(slug => {

        if (existing.has(slug)) return;

        const label =
            getCategoryLabel(slug);

        const tile =
            createCategoryTile(
                label,
                label,
                CATEGORY_META[slug]?.[2] ||
                    "fa-microchip"
            );

        DOM.categories.appendChild(tile);

    });

}



function createCategoryTile(value, label, icon) {

    const tile =
        document.createElement("div");

    tile.className = "category";
    tile.dataset.cat = value;
    tile.role = "button";
    tile.tabIndex = 0;
    tile.setAttribute(
        "aria-label",
        `Filter ${label} Category`
    );

    const glyph =
        document.createElement("i");
    glyph.className =
        `fa-solid ${icon}`;
    glyph.setAttribute("aria-hidden", "true");

    const heading =
        document.createElement("h3");
    heading.textContent = label;

    tile.append(glyph, heading);

    return tile;

}



function ensureProductSections() {

    const existing =
        new Set(
            [...getProductSections()].map(
                section => section.id
            )
        );

    const anchor =
        document.querySelector(".features");

    const slugs =
        [...new Set(
            state.products.map(
                product => product.category
            )
        )];

    slugs.forEach((slug, index) => {

        if (existing.has(slug)) return;

        const meta =
            CATEGORY_META[slug];

        const section =
            document.createElement("section");
        section.id = slug;
        section.className =
            "products fade-in-section";

        const title =
            meta?.[0] ||
            getCategoryLabel(slug);

        const eyebrow =
            meta?.[1] ||
            getCategoryLabel(slug);

        const sectionTitle =
            document.createElement("div");
        sectionTitle.className =
            "section-title";

        const label =
            document.createElement("p");
        label.textContent =
            `${String(index + 1).padStart(2, "0")} / ${eyebrow}`;

        const heading =
            document.createElement("h2");
        heading.textContent = title;

        const grid =
            document.createElement("div");
        grid.className = "product-grid";

        sectionTitle.append(label, heading);
        section.append(sectionTitle, grid);

        anchor?.before(section);

    });

}

/* ============================================================
   PART 3A - Event Delegation, Modal & WhatsApp
============================================================ */

function setupGlobalEvents() {

    document.body.addEventListener("click", handleGlobalClick);

}

function handleGlobalClick(event) {

    const detailsBtn =
        event.target.closest(".btn-details");

    const inquiryBtn =
        event.target.closest(".btn-inquiry");

    if (!detailsBtn && !inquiryBtn) return;

    const card =
        event.target.closest(".card");

    if (!card) return;

    const id =
        Number(card.dataset.id);

    const product =
        state.products.find(
            item => Number(item.id) === id
        );

    if (!product) return;

    if (detailsBtn) {

        openProductModal(product);

    }

    if (inquiryBtn) {

        openWhatsApp(product);

    }

}



function createLightbox() {

    lightbox =
        document.createElement("div");

    lightbox.id = "product-lightbox";

    lightbox.className =
        "showroom-lightbox";

    lightbox.innerHTML = `

<div class="lightbox-dialog">

<button
class="lightbox-close-btn">

&times;

</button>

<div class="lightbox-media">

<img src="" alt="">

</div>

<div class="lightbox-details">

<div class="lightbox-brand"></div>

<h2 class="lightbox-title"></h2>

<div class="lightbox-price"></div>

<div class="lightbox-stock"></div>

<button
class="btn-lightbox-action">

<i class="fa-brands fa-whatsapp"></i>

WhatsApp Inquiry

</button>

</div>

</div>

`;

    document.body.appendChild(lightbox);

    lightbox
        .querySelector(".lightbox-close-btn")
        .addEventListener(
            "click",
            closeProductModal
        );

    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {

                closeProductModal();

            }

        }
    );

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeProductModal();

            }

        }
    );

}



function openProductModal(product) {

    if (!lightbox) return;

    lightbox.dataset.id = product.id;

    const formatter =
        new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        );

    const image =
        lightbox.querySelector("img");

    image.src = product.image;

    image.alt = product.name;

    attachImageFallback(image);

    lightbox.querySelector(
        ".lightbox-brand"
    ).textContent =
        product.brand;

    lightbox.querySelector(
        ".lightbox-title"
    ).textContent =
        product.name;

    lightbox.querySelector(
        ".lightbox-price"
    ).textContent =
        formatter.format(product.price);

    lightbox.querySelector(
        ".lightbox-stock"
    ).textContent =
        product.stock;

    lightbox.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

    const button =
        lightbox.querySelector(
            ".btn-lightbox-action"
        );

    button.onclick = () =>
        openWhatsApp(product);

}



function closeProductModal() {

    if (!lightbox) return;

    lightbox.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}



function openWhatsApp(product) {

    const formatter =
        new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        );

    const message =

`Hello,

I'm interested in

${product.name}

Brand: ${product.brand}

Price: ${formatter.format(product.price)}

Please provide more details.`;

    window.open(

`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,

"_blank"

    );

}/* ============================================================
   PART 3B - Navigation, Scroll & Floating Widgets
============================================================ */

function setupNavigation() {

    if (!DOM.nav) return;

    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) return;

            const target =
                document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            if (DOM.navToggle) {

                DOM.navToggle.checked = false;

            }

            document.body.style.overflow = "";

        });

    });

    document.addEventListener("click", event => {

        if (!DOM.navToggle?.checked) return;

        if (!DOM.nav.contains(event.target)) {

            DOM.navToggle.checked = false;

            document.body.style.overflow = "";

        }

    });

    window.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        if (DOM.navToggle?.checked) {

            DOM.navToggle.checked = false;

            document.body.style.overflow = "";

        }

    });

    DOM.navToggle?.addEventListener("change", () => {

        document.body.style.overflow =
            DOM.navToggle.checked
                ? "hidden"
                : "";

    });

}



function createFloatingButtons() {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "floating-widgets-container";

    wrapper.innerHTML = `

<button
id="scroll-top-btn"
class="floating-btn">

<i class="fa-solid fa-arrow-up"></i>

</button>

<button
id="floating-whatsapp"
class="floating-btn">

<i class="fa-brands fa-whatsapp"></i>

</button>

`;

    document.body.appendChild(wrapper);

    backToTop =
        document.getElementById(
            "scroll-top-btn"
        );

    whatsappFloating =
        document.getElementById(
            "floating-whatsapp"
        );

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

    whatsappFloating.addEventListener(
        "click",
        () => {

            window.open(

`https://wa.me/${CONFIG.WHATSAPP_NUMBER}`,

"_blank"

            );

        }
    );

}



function setupScrollEvents() {

    let ticking = false;

    window.addEventListener(

        "scroll",

        () => {

            if (ticking) return;

            requestAnimationFrame(() => {

                updateScrollUI();

                highlightCurrentSection();

                ticking = false;

            });

            ticking = true;

        },

        {
            passive: true
        }

    );

}



function updateScrollUI() {

    const scrollTop =
        window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    if (DOM.progress) {

        DOM.progress.style.width =

`${(scrollTop / pageHeight) * 100}%`;

    }

    if (backToTop) {

        if (
            scrollTop >
            CONFIG.SCROLL_THRESHOLD
        ) {

            backToTop.classList.add(
                "active"
            );

            whatsappFloating.classList.add(
                "active"
            );

        }

        else {

            backToTop.classList.remove(
                "active"
            );

            whatsappFloating.classList.remove(
                "active"
            );

        }

    }

}



function highlightCurrentSection() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    let current = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 140;

        if (

            window.scrollY >= top

        ) {

            current = section.id;

        }

    });

    document.querySelectorAll(".nav-menu a")
        .forEach(link => {

            link.classList.remove(
                "active"
            );

            if (

                link.getAttribute("href") ===
                "#" + current

            ) {

                link.classList.add(
                    "active"
                );

            }

        });

}/* ============================================================
   PART 3C - Forms, Observer, Utilities & Finalization
============================================================ */

function setupIntersectionAnimations() {

    const elements =
        document.querySelectorAll(".fade-in-section");

    if (!elements.length) return;

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        }, {
            threshold: 0.15
        });

    elements.forEach(element => {

        observer.observe(element);

    });

}



function setupForms() {

    if (DOM.contactForm) {

        DOM.contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                if (!DOM.contactForm.checkValidity()) {

                    DOM.contactForm.reportValidity();

                    return;

                }

                alert(
                    "Thank you! We received your message."
                );

                DOM.contactForm.reset();

            }
        );

    }

    if (DOM.newsletter) {

        DOM.newsletter.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const email =
                    DOM.newsletter.querySelector(
                        "input[type='email']"
                    );

                if (!email) return;

                if (!email.checkValidity()) {

                    email.reportValidity();

                    return;

                }

                alert(
                    "Newsletter subscription successful."
                );

                DOM.newsletter.reset();

            }
        );

    }

}



function debounce(callback, delay) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}



function getProductCountLabel(count) {

    return `${count} Product${count === 1 ? "" : "s"}`;

}



/* ---------- Utility Functions ---------- */

function formatPrice(value) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(value);

}



function findProductById(id) {

    return state.products.find(
        product => Number(product.id) === Number(id)
    );

}



/* ---------- Initial Scroll Sync ---------- */

window.addEventListener(
    "load",
    () => {

        updateScrollUI();

        highlightCurrentSection();

    }
);



})(); // End of ElectroWorld Application

console.log("SeekingP")



/*=========================================
        DOM ELEMENTS
=========================================*/

const header = document.getElementById("header");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");
const revealItems = document.querySelectorAll(
  ".feature-card,.collection-card,.product-card,.about-wrapper,.testimonial-card,.gallery-item,.footer-grid",
);

/*=========================================
        LOADER
=========================================*/

window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  const loader = document.querySelector(".loader");

  if (loader) {
    loader.classList.add("hide");

    setTimeout(() => {
      loader.remove();
    }, 700);
  }
});

/*=========================================
        STICKY HEADER
=========================================*/

function stickyHeader() {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

stickyHeader();

window.addEventListener("scroll", stickyHeader);

/*=========================================
        MOBILE MENU
=========================================*/

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");

    navMenu.classList.toggle("show");

    document.body.classList.toggle("menu-open");
  });
}

/*=========================================
        CLOSE MENU
=========================================*/

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("show")) {
      navMenu.classList.remove("show");

      menuToggle.classList.remove("active");

      document.body.classList.remove("menu-open");
    }
  });
});

/*=========================================
        SMOOTH SCROLL
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      e.preventDefault();

      window.scrollTo({
        top: target.offsetTop - 80,

        behavior: "smooth",
      });
    }
  });
});

/*=========================================
        ACTIVE NAVIGATION
=========================================*/

function activeMenu() {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 180;

    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", activeMenu);

/*=========================================
        SCROLL REVEAL
=========================================*/

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },

  {
    threshold: 0.15,
  },
);

revealItems.forEach((item) => {
  item.classList.add("fade-up");

  observer.observe(item);
});

/*=========================================
        HERO PARALLAX
=========================================*/

const hero = document.getElementById("hero");

window.addEventListener("scroll", () => {
  const y = window.pageYOffset;

  if (hero) {
    hero.style.backgroundPosition = `center ${y * 0.45}px`;
  }
});

/*=========================================
        BUTTON RIPPLE
=========================================*/

document
  .querySelectorAll(".primary-btn,.hero-btn,.header-btn,.about-btn")
  .forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");

      ripple.className = "ripple";

      const size = Math.max(
        this.clientWidth,

        this.clientHeight,
      );

      const rect = this.getBoundingClientRect();

      ripple.style.width = size + "px";

      ripple.style.height = size + "px";

      ripple.style.left = e.clientX - rect.left - size / 2 + "px";

      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 700);
    });
  });

/*=========================================
        IMAGE LAZY FADE
=========================================*/

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("image-loaded");

      imageObserver.unobserve(entry.target);
    }
  });
});

images.forEach((img) => {
  imageObserver.observe(img);
});

/*=========================================
        HEADER SHADOW
=========================================*/

window.addEventListener("scroll", () => {
  header.style.boxShadow =
    window.scrollY > 40 ? "0 12px 35px rgba(0,0,0,.25)" : "none";
});

/*=========================================
        ESC CLOSE MENU
=========================================*/

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navMenu.classList.remove("show");

    menuToggle.classList.remove("active");
  }
});

/*=========================================
        RESIZE
=========================================*/

window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    navMenu.classList.remove("show");

    menuToggle.classList.remove("active");
  }
});

/*=========================================
        CONSOLE
=========================================*/

console.log(
  "%c Terra Jewels",

  "color:#d4a458;font-size:20px;font-weight:bold;",
);

console.log(
  "%c Luxury Website Loaded Successfully",

  "color:white;background:#1f1a14;padding:8px 12px;border-radius:4px;",
);

/*=========================================
        CUSTOM CURSOR
=========================================*/

const cursor = document.createElement("div");
cursor.className = "cursor";

const cursorDot = document.createElement("div");
cursorDot.className = "cursor-dot";

document.body.append(cursor, cursorDot);

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";
});

document.querySelectorAll("a,button").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-hover");
  });

  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-hover");
  });
});

/*=========================================
        MOUSE GLOW
=========================================*/

const glow = document.createElement("div");

glow.className = "mouse-glow";

document.body.appendChild(glow);

window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";

  glow.style.top = e.clientY + "px";
});

/*=========================================
        HERO FLOAT
=========================================*/

const heroContent = document.querySelector(".hero-content");

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 18;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 18;

  if (heroContent) {
    heroContent.style.transform = `translate(${mouseX}px,${mouseY}px)`;
  }
});

/*=========================================
        MAGNETIC BUTTONS
=========================================*/

document
  .querySelectorAll(".hero-btn,.primary-btn,.about-btn")
  .forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();

      const x = e.clientX - rect.left - rect.width / 2;

      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.18}px,${y * 0.18}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0,0)";
    });
  });

/*=========================================
        3D IMAGE HOVER
=========================================*/

document.querySelectorAll(".collection-card,.product-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 14;
    const rotateX = (y / rect.height - 0.5) * -14;

    card.style.transform = `perspective(900px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/*=========================================
        HERO TITLE LETTER EFFECT
=========================================*/

const heroTitle = document.querySelector(".hero-title");

if (heroTitle) {
  heroTitle.innerHTML = heroTitle.textContent

    .split("")

    .map((letter) => {
      if (letter === " ") return " ";

      return `<span>${letter}</span>`;
    })

    .join("");

  const letters = document.querySelectorAll(".hero-title span");

  letters.forEach((letter, index) => {
    letter.style.animationDelay = index * 40 + "ms";
  });
}

/*=========================================
        FLOATING PARTICLES
=========================================*/

const particles = document.createElement("div");

particles.className = "particles";

document.body.appendChild(particles);

for (let i = 0; i < 35; i++) {
  const p = document.createElement("span");

  p.style.left = Math.random() * 100 + "%";

  p.style.animationDuration = 6 + Math.random() * 8 + "s";

  p.style.animationDelay = Math.random() * 6 + "s";

  particles.appendChild(p);
}

/*=========================================
        HERO IMAGE SCALE
=========================================*/

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  if (hero) {
    hero.style.backgroundSize = 100 + scroll * 0.02 + "%";
  }
});

/*=========================================
        SECTION TITLE REVEAL
=========================================*/

document.querySelectorAll(".section-title").forEach((title) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("title-show");
      }
    });
  });

  observer.observe(title);
});

/*=========================================
        GOLD GLOW ON HOVER
=========================================*/

document.querySelectorAll(".collection-card,.product-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 30px 70px rgba(200,154,82,.18)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "";
  });
});

/*=========================================
        HERO BUTTON PULSE
=========================================*/

setInterval(() => {
  const btn = document.querySelector(".hero-btn");

  if (btn) {
    btn.animate(
      [
        {
          transform: "scale(1)",
        },

        {
          transform: "scale(1.04)",
        },

        {
          transform: "scale(1)",
        },
      ],
      {
        duration: 1400,
      },
    );
  }
}, 5000);

/*=========================================
        IMAGE PARALLAX
=========================================*/

window.addEventListener("mousemove", (e) => {
  document
    .querySelectorAll(".about-main img,.gallery-item img")
    .forEach((img) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;

      const y = (e.clientY / window.innerHeight - 0.5) * 10;

      img.style.transform = `translate(${x}px,${y}px) scale(1.05)`;
    });
});

/*=========================================
        PAGE VISIBILITY
=========================================*/

document.addEventListener(
  "visibilitychange",

  () => {
    if (document.hidden) {
      document.title = "Come back to Terra Jewels ✨";
    } else {
      document.title = "Terra Jewels";
    }
  },
);

/*=========================================
        END
=========================================*/

console.log("Hero animations loaded.");

/*==========================================
            WISHLIST SYSTEM
==========================================*/

const wishlistButtons = document.querySelectorAll(".wishlist");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/*==========================================
        INITIAL STATE
==========================================*/

wishlistButtons.forEach((button) => {
  const id = button.dataset.product;

  if (wishlist.includes(id)) {
    button.classList.add("active");

    const icon = button.querySelector("i");

    icon.classList.remove("fa-regular");

    icon.classList.add("fa-solid");
  }
});

/*==========================================
        CLICK
==========================================*/

wishlistButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.product;

    const icon = button.querySelector("i");

    /* REMOVE */

    if (wishlist.includes(id)) {
      wishlist = wishlist.filter((item) => item !== id);

      button.classList.remove("active");

      icon.classList.remove("fa-solid");

      icon.classList.add("fa-regular");

      wishlistToast("Removed from Wishlist");
    } else {

    /* ADD */
      wishlist.push(id);

      button.classList.add("active");

      icon.classList.remove("fa-regular");

      icon.classList.add("fa-solid");

      heartPop(button);

      wishlistToast("Added to Wishlist");
    }

    localStorage.setItem(
      "wishlist",

      JSON.stringify(wishlist),
    );

    updateWishlistCount();
  });
});

/*==========================================
        COUNT
==========================================*/

function updateWishlistCount() {
  const counter = document.querySelector(".wishlist-count");

  if (counter) {
    counter.textContent = wishlist.length;
  }
}

updateWishlistCount();

/*==========================================
        HEART POP
==========================================*/

function heartPop(button) {
  button.animate(
    [
      {
        transform: "scale(1)",
      },

      {
        transform: "scale(1.35)",
      },

      {
        transform: "scale(.92)",
      },

      {
        transform: "scale(1)",
      },
    ],
    {
      duration: 450,

      easing: "ease",
    },
  );
}

/*==========================================
        TOAST
==========================================*/

function wishlistToast(text) {
  let toast = document.querySelector(".wishlist-toast");

  if (!toast) {
    toast = document.createElement("div");

    toast.className = "wishlist-toast";

    document.body.appendChild(toast);
  }

  toast.textContent = text;

  toast.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

/*==========================================
    CART STORAGE
==========================================*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartButtons = document.querySelectorAll(".add-cart");
const cartCounter = document.querySelector(".cart-count");

updateCartCount();

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  if (cartCounter) {
    cartCounter.textContent = cart.length;
  }
}

/*==========================================
    ADD TO CART
==========================================*/

cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");

    const id = card.dataset.id;

    const title = card.dataset.title;

    const price = Number(card.dataset.price);

    const image = card.dataset.image;

    const existing = cart.find((item) => item.id === id);

    if (existing) {
      existing.qty++;
    } else {
      cart.push({
        id,
        title,
        price,
        image,
        qty: 1,
      });
    }

    saveCart();

    updateCartCount();

    cartToast(title);

    flyImage(card);
  });
});

/*==========================================
    TOAST
==========================================*/

function cartToast(productName) {
  let toast = document.querySelector(".cart-toast");

  if (!toast) {
    toast = document.createElement("div");

    toast.className = "cart-toast";

    document.body.appendChild(toast);
  }

  toast.innerHTML = `
        <i class="fa-solid fa-check"></i>
        <span>${productName} added to cart</span>
    `;

  toast.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

/*==========================================
    FLYING IMAGE
==========================================*/

function flyImage(card) {
  const img = card.querySelector("img");

  const cart = document.querySelector(".cart-btn");

  if (!img || !cart) return;

  const clone = img.cloneNode(true);

  const start = img.getBoundingClientRect();
  const end = cart.getBoundingClientRect();

  clone.style.position = "fixed";
  clone.style.left = start.left + "px";
  clone.style.top = start.top + "px";
  clone.style.width = start.width + "px";
  clone.style.height = start.height + "px";
  clone.style.objectFit = "cover";
  clone.style.borderRadius = "10px";
  clone.style.pointerEvents = "none";
  clone.style.transition = "all .8s cubic-bezier(.2,.8,.2,1)";
  clone.style.zIndex = "999999";

  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    clone.style.left = end.left + 10 + "px";
    clone.style.top = end.top + 10 + "px";
    clone.style.width = "25px";
    clone.style.height = "25px";
    clone.style.opacity = ".2";
    clone.style.transform = "scale(.2) rotate(360deg)";
  });

  clone.addEventListener("transitionend", () => {
    clone.remove();

    cart.animate(
      [
        {
          transform: "scale(1)",
        },

        {
          transform: "scale(1.25)",
        },

        {
          transform: "scale(1)",
        },
      ],
      {
        duration: 300,
      },
    );
  });
}

/*==========================================
        CART DRAWER
==========================================*/

const cartDrawer = document.querySelector(".cart-drawer");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartBtn = document.querySelector(".cart-btn");
const closeCart = document.querySelector(".close-cart");

if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    cartDrawer.classList.add("active");
    renderCart();
  });
}

if (closeCart) {
  closeCart.addEventListener("click", () => {
    cartDrawer.classList.remove("active");
  });
}

/*==========================================
        CLOSE DRAWER ON OUTSIDE CLICK
==========================================*/

document.addEventListener("click", (e) => {
  if (
    cartDrawer &&
    cartDrawer.classList.contains("active") &&
    !cartDrawer.contains(e.target) &&
    !cartBtn.contains(e.target)
  ) {
    cartDrawer.classList.remove("active");
  }
});

/*==========================================
        RENDER CART
==========================================*/

function renderCart() {
  if (!cartItems) return;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const cartItem = `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.title}">

                <div class="cart-info">

                    <h4>${item.title}</h4>

                    <p>₹${item.price}</p>

                    <div class="qty-box">

                        <button
                            class="qty-minus"
                            data-index="${index}">
                            -
                        </button>

                        <span>${item.qty}</span>

                        <button
                            class="qty-plus"
                            data-index="${index}">
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-item"
                    data-index="${index}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>
        `;

    cartItems.insertAdjacentHTML("beforeend", cartItem);
  });

  cartTotal.textContent = "₹" + total.toLocaleString();

  bindCartButtons();
}

/*==========================================
        QUICK VIEW
==========================================*/

const quickButtons = document.querySelectorAll(".quick-view");

const quickModal = document.querySelector(".quick-view-modal");

const closeQuick = document.querySelector(".close-quick");

const quickImage = document.getElementById("quickImage");

const quickTitle = document.getElementById("quickTitle");

const quickPrice = document.getElementById("quickPrice");

const quickCategory = document.getElementById("quickCategory");

const quickDescription = document.getElementById("quickDescription");

quickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    quickImage.src = button.dataset.image;

    quickTitle.textContent = button.dataset.title;

    quickPrice.textContent = button.dataset.price;

    quickCategory.textContent = button.dataset.category;

    quickDescription.textContent = button.dataset.description;

    quickModal.classList.add("show");
  });
});

closeQuick.addEventListener("click", () => {
  quickModal.classList.remove("show");
});

quickModal.addEventListener("click", (e) => {
  if (e.target === quickModal) {
    quickModal.classList.remove("show");
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    quickModal.classList.remove("show");
  }
});

/*======================================
        SEARCH
======================================*/

const searchBtn = document.querySelector(".search-btn");

const searchOverlay = document.querySelector(".search-overlay");

const closeSearch = document.querySelector(".close-search");

const searchInput = document.getElementById("searchInput");

const results = document.querySelector(".search-results");

const products = [
  {
    title: "Golden Bloom",

    price: "₹2499",

    image: "images/product1.jpg",
  },

  {
    title: "Emerald Ring",

    price: "₹3199",

    image: "images/product2.jpg",
  },

  {
    title: "Nature Necklace",

    price: "₹4299",

    image: "images/product3.jpg",
  },

  {
    title: "Pearl Earrings",

    price: "₹2899",

    image: "images/product4.jpg",
  },

  {
    title: "Boho Bracelet",

    price: "₹1999",

    image: "images/product5.jpg",
  },
];

searchBtn.addEventListener("click", () => {
  searchOverlay.classList.add("show");

  searchInput.focus();

  renderResults(products);
});

closeSearch.addEventListener("click", () => {
  searchOverlay.classList.remove("show");
});

searchOverlay.addEventListener("click", (e) => {
  if (e.target === searchOverlay) {
    searchOverlay.classList.remove("show");
  }
});

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = products.filter((item) =>
    item.title.toLowerCase().includes(value),
  );

  renderResults(filtered);
});

function renderResults(list) {
  results.innerHTML = "";

  if (list.length === 0) {
    results.innerHTML = `

<p style="color:#999">

No products found

</p>

`;

    return;
  }

  list.forEach((item) => {
    results.innerHTML += `

<div class="search-item">

<img src="${item.image}">

<div>

<h4>

${item.title}

</h4>

<p>

${item.price}

</p>

</div>

</div>

`;
  });
}

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();

    searchOverlay.classList.add("show");

    searchInput.focus();
  }

  if (e.key === "Escape") {
    searchOverlay.classList.remove("show");
  }
});

/*==================================
        LIGHTBOX
==================================*/

const galleryImages = document.querySelectorAll(".gallery-img");

const lightbox = document.querySelector(".lightbox");

const lightboxImg = document.querySelector(".lightbox-image");

const closeLightbox = document.querySelector(".lightbox-close");

const nextBtn = document.querySelector(".lightbox-next");

const prevBtn = document.querySelector(".lightbox-prev");

let currentImage = 0;

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentImage = index;

    showImage();

    lightbox.classList.add("show");
  });
});

function showImage() {
  lightboxImg.src = galleryImages[currentImage].src;
}

nextBtn.addEventListener("click", () => {
  currentImage++;

  if (currentImage >= galleryImages.length) {
    currentImage = 0;
  }

  showImage();
});

prevBtn.addEventListener("click", () => {
  currentImage--;

  if (currentImage < 0) {
    currentImage = galleryImages.length - 1;
  }

  showImage();
});

closeLightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("show");
  }
});

window.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;

  if (e.key === "Escape") {
    lightbox.classList.remove("show");
  }

  if (e.key === "ArrowRight") {
    nextBtn.click();
  }

  if (e.key === "ArrowLeft") {
    prevBtn.click();
  }
});

let touchStartX = 0;

lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].clientX;

  if (touchStartX - touchEndX > 60) {
    nextBtn.click();
  }

  if (touchEndX - touchStartX > 60) {
    prevBtn.click();
  }
});

/*==================================
        PRODUCT GALLERY
==================================*/

const mainImage = document.getElementById("mainProductImage");

const thumbs = document.querySelectorAll(".thumb");

const lens = document.querySelector(".zoom-lens");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    thumbs.forEach((t) => {
      t.classList.remove("active");
    });

    thumb.classList.add("active");

    mainImage.src = thumb.src;
  });
});

/*==================================
        IMAGE ZOOM
==================================*/

const imageContainer = document.querySelector(".product-main");

if (imageContainer) {
  imageContainer.addEventListener("mousemove", zoom);

  imageContainer.addEventListener("mouseenter", () => {
    lens.style.display = "block";
  });

  imageContainer.addEventListener("mouseleave", () => {
    lens.style.display = "none";

    mainImage.style.transform = "scale(1)";
  });
}

function zoom(e) {
  const rect = imageContainer.getBoundingClientRect();

  const x = e.clientX - rect.left;

  const y = e.clientY - rect.top;

  const percentX = (x / rect.width) * 100;

  const percentY = (y / rect.height) * 100;

  mainImage.style.transform = "scale(2)";

  mainImage.style.transformOrigin = `${percentX}% ${percentY}%`;

  lens.style.left = x - 90 + "px";

  lens.style.top = y - 90 + "px";
}

/*==================================
        DYNAMIC RATING
==================================*/

const rating = 4.8;
const reviews = 238;

const ratingContainer = document.getElementById("ratingStars");

const ratingText = document.getElementById("ratingText");

if (ratingContainer) {
  ratingContainer.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");

    if (i <= Math.floor(rating)) {
      star.className = "fa-solid fa-star";
    } else if (i - rating <= 0.5) {
      star.className = "fa-solid fa-star-half-stroke";
    } else {
      star.className = "fa-regular fa-star";
    }

    ratingContainer.appendChild(star);
  }

  ratingText.textContent = `${rating} (${reviews} Reviews)`;
}

/*==================================
        STOCK STATUS
==================================*/

const stock = Math.floor(Math.random() * 25) + 5;

const stockText = document.getElementById("stockText");

const stockDot = document.querySelector(".stock-indicator");

if (stockText) {
  if (stock > 10) {
    stockText.textContent = `In Stock (${stock} Available)`;

    stockDot.style.background = "#34c759";
  } else {
    stockText.textContent = `Only ${stock} Left`;

    stockDot.style.background = "#ff9500";
  }
}

/*==================================
        DELIVERY DATE
==================================*/

const delivery = new Date();

delivery.setDate(delivery.getDate() + Math.floor(Math.random() * 4) + 3);

const options = {
  weekday: "long",

  day: "numeric",

  month: "long",
};

const deliveryText = document.getElementById("deliveryDate");

if (deliveryText) {
  deliveryText.textContent =
    "Estimated Delivery: " +
    delivery.toLocaleDateString(
      "en-IN",

      options,
    );
}

/*==================================
        COUPON SYSTEM
==================================*/

const couponInput = document.getElementById("couponInput");

const couponBtn = document.getElementById("applyCoupon");

const couponMessage = document.querySelector(".coupon-message");

const subtotalText = document.getElementById("subTotal");

const discountText = document.getElementById("discountPrice");

const finalPriceText = document.getElementById("finalPrice");

const coupons = {
  SAVE10: 10,

  WELCOME20: 20,

  LUXURY30: 30,
};

let appliedDiscount = 0;

/*==================================
        CALCULATE TOTAL
==================================*/

function calculateTotal() {
  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.qty;
  });

  const discount = (subtotal * appliedDiscount) / 100;

  const total = subtotal - discount;

  subtotalText.textContent = "-₹" + subtotal.toLocaleString();

  discountText.textContent = "- ₹" + discount.toLocaleString();

  finalPriceText.textContent = "₹" + total.toLocaleString();
}

/*==================================
        APPLY COUPON
==================================*/

// couponBtn.addEventListener("click", () => {
//   const code = couponInput.value

//     .trim()

//     .toUpperCase();

//   if (coupons[code]) {
//     appliedDiscount = coupons[code];

//     localStorage.setItem(
//       "coupon",

//       code,
//     );

//     couponMessage.className = "coupon-message success";

//     couponMessage.textContent = `${code} Applied (${appliedDiscount}% OFF)`;
//   } else {
//     appliedDiscount = 0;

//     localStorage.removeItem("coupon");

//     couponMessage.className = "coupon-message error";

//     couponMessage.textContent = "Invalid Coupon";
//   }

//   calculateTotal();
// });

/*==================================
        LOAD SAVED COUPON
==================================*/

const savedCoupon = localStorage.getItem("coupon");

if (savedCoupon && coupons[savedCoupon]) {
  couponInput.value = savedCoupon;

  appliedDiscount = coupons[savedCoupon];

  couponMessage.className = "coupon-message success";

  couponMessage.textContent = `${savedCoupon} Applied (${appliedDiscount}% OFF)`;
}

calculateTotal();

/*==================================
        SHARE
==================================*/

const shareBtn =
document.querySelector(".share-product");

if(shareBtn){

shareBtn.addEventListener("click",async()=>{

if(navigator.share){

try{

await navigator.share({

title:document.title,

text:"Check this beautiful jewelry.",

url:location.href

});

}catch(err){}

}else{

copyCurrentLink();

}

});

}



/*==================================
        COPY LINK
==================================*/

const copyBtn=
document.querySelector(".copy-link");

if(copyBtn){

copyBtn.addEventListener("click",()=>{

copyCurrentLink();

});

}



function copyCurrentLink(){

navigator.clipboard.writeText(location.href);

showCopyToast("Link Copied");

}



/*==================================
        TOAST
==================================*/

function showCopyToast(text){

let toast=

document.querySelector(".copy-toast");

if(!toast){

toast=document.createElement("div");

toast.className="copy-toast";

document.body.appendChild(toast);

}

toast.textContent=text;

toast.classList.add("show");

clearTimeout(toast.timer);

toast.timer=setTimeout(()=>{

toast.classList.remove("show");

},1800);

}



/*==================================
        RECENTLY VIEWED
==================================*/

const currentProduct={

title:"Golden Bloom",

price:"₹2499",

image:"images/product1.jpg"

};

let recent=

JSON.parse(

localStorage.getItem("recentProducts")

)||[];

recent=recent.filter(

item=>item.title!==currentProduct.title

);

recent.unshift(currentProduct);

recent=recent.slice(0,4);

localStorage.setItem(

"recentProducts",

JSON.stringify(recent)

);



const recentList=

document.querySelector(".recent-list");



if(recentList){

recentList.innerHTML="";

recent.forEach(item=>{

recentList.innerHTML+=`

<div class="recent-card">

<img src="${item.image}" alt="">

<h4>${item.title}</h4>

<p>${item.price}</p>

</div>

`;

});

}
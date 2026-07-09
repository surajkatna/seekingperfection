"use strict";

/*=========================================
AASHNA JEWELS
LUXURY JAVASCRIPT
PART 1
Core • Loader • Navigation
=========================================*/


/*=========================================
GLOBAL ELEMENTS
=========================================*/

const body = document.body;

const header = document.getElementById("header");

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

const navItems = document.querySelectorAll(".nav-link");

const backTop = document.querySelector(".back-top");

const loader = document.querySelector(".loader");

const searchOverlay = document.querySelector(".search-overlay");

const searchBtn = document.querySelector(".search-btn");

const searchClose = document.querySelector(".search-close");

const searchInput = document.querySelector(".search-input");



/*=========================================
GLOBAL STATE
=========================================*/

const APP = {

    menuOpen:false,

    searchOpen:false,

    ticking:false

};



/*=========================================
HELPERS
=========================================*/

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);



/*=========================================
LOADER
=========================================*/

window.addEventListener("load",()=>{

    if(!loader) return;

    loader.classList.add("hide");

    setTimeout(()=>{

        loader.remove();

    },700);

});



/*=========================================
MOBILE MENU
=========================================*/

function toggleMenu(){

    if(!navLinks) return;

    APP.menuOpen=!APP.menuOpen;

    navLinks.classList.toggle("active");

    menuBtn.classList.toggle("active");

    body.classList.toggle("menu-open");

}

if(menuBtn){

    menuBtn.addEventListener("click",toggleMenu);

}



/*=========================================
CLOSE MENU AFTER CLICK
=========================================*/

navItems.forEach(link=>{

    link.addEventListener("click",()=>{

        if(!APP.menuOpen) return;

        toggleMenu();

    });

});



/*=========================================
SEARCH OVERLAY
=========================================*/

function openSearch(){

    if(!searchOverlay) return;

    APP.searchOpen=true;

    searchOverlay.classList.add("active");

    body.classList.add("search-open");

    setTimeout(()=>{

        searchInput?.focus();

    },200);

}



function closeSearch(){

    if(!searchOverlay) return;

    APP.searchOpen=false;

    searchOverlay.classList.remove("active");

    body.classList.remove("search-open");

}



searchBtn?.addEventListener("click",openSearch);

searchClose?.addEventListener("click",closeSearch);



document.addEventListener("keydown",e=>{

    if(e.key==="Escape"){

        closeSearch();

    }

});



/*=========================================
STICKY HEADER
=========================================*/

function updateHeader(){

    if(!header) return;

    if(window.scrollY>80){

        header.classList.add("sticky");

    }

    else{

        header.classList.remove("sticky");

    }

}



/*=========================================
BACK TO TOP
=========================================*/

function updateBackTop(){

    if(!backTop) return;

    if(window.scrollY>500){

        backTop.classList.add("active");

    }

    else{

        backTop.classList.remove("active");

    }

}



backTop?.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});



/*=========================================
OPTIMIZED SCROLL
=========================================*/

function handleScroll(){

    updateHeader();

    updateBackTop();

    APP.ticking=false;

}



window.addEventListener("scroll",()=>{

    if(APP.ticking) return;

    APP.ticking=true;

    requestAnimationFrame(handleScroll);

});



/*=========================================
SMOOTH ANCHOR LINKS
=========================================*/

navItems.forEach(link=>{

    link.addEventListener("click",e=>{

        const target=link.getAttribute("href");

        if(!target.startsWith("#")) return;

        e.preventDefault();

        const section=document.querySelector(target);

        if(!section) return;

        section.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    });

});



/*=========================================
INITIALIZE
=========================================*/

updateHeader();

updateBackTop();



/*=========================================
END PART 1
=========================================*/

/*=========================================
AASHNA JEWELS
LUXURY JAVASCRIPT
PART 2
Reveal • Counter • Scroll Progress
=========================================*/


/*=========================================
REVEAL ELEMENTS
=========================================*/

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        entry.target.classList.add("active");

        revealObserver.unobserve(entry.target);

    });

},{
    threshold:0.15
});

revealElements.forEach(element=>{

    revealObserver.observe(element);

});



/*=========================================
COUNTER ANIMATION
=========================================*/

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.count);

        const duration = 1800;

        const start = performance.now();

        function update(now){

            const progress = Math.min(

                (now-start)/duration,

                1

            );

            counter.textContent = Math.floor(

                progress*target

            ).toLocaleString();

            if(progress<1){

                requestAnimationFrame(update);

            }

            else{

                counter.textContent=

                target.toLocaleString();

            }

        }

        requestAnimationFrame(update);

        counterObserver.unobserve(counter);

    });

},{
    threshold:.4
});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});



/*=========================================
ACTIVE NAVIGATION
=========================================*/

const sections = document.querySelectorAll("section[id]");

const navObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const id = entry.target.id;

        navItems.forEach(link=>{

            link.classList.toggle(

                "active",

                link.getAttribute("href")==="#"+id

            );

        });

    });

},{
    threshold:.55
});

sections.forEach(section=>{

    navObserver.observe(section);

});



/*=========================================
SCROLL PROGRESS RING
=========================================*/

const progressRing = document.querySelector(".progress-ring");

function updateProgressRing(){

    if(!progressRing) return;

    const max =

    document.documentElement.scrollHeight

    -window.innerHeight;

    const value =

    (window.scrollY/max)*100;

    progressRing.style.setProperty(

        "--progress",

        value

    );

}

window.addEventListener(

    "scroll",

    updateProgressRing,

    {passive:true}

);

updateProgressRing();



/*=========================================
LAZY IMAGES
=========================================*/

const lazyImages =

document.querySelectorAll("img[data-src]");

const imageObserver =

new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const image = entry.target;

        image.src=image.dataset.src;

        image.onload=()=>{

            image.classList.add("loaded");

        };

        imageObserver.unobserve(image);

    });

},{
    rootMargin:"100px"
});

lazyImages.forEach(image=>{

    imageObserver.observe(image);

});



/*=========================================
PARALLAX ORBS
=========================================*/

const heroOrbs =

document.querySelectorAll(".orb");

window.addEventListener("mousemove",e=>{

    const x=e.clientX/window.innerWidth;

    const y=e.clientY/window.innerHeight;

    heroOrbs.forEach((orb,index)=>{

        const speed=(index+1)*18;

        orb.style.transform=

        `translate(${x*speed}px,${y*speed}px)`;

    });

});



/*=========================================
SECTION FADE
=========================================*/

const fadeSections=

document.querySelectorAll("section");

const sectionObserver=

new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{
    threshold:.08
});

fadeSections.forEach(section=>{

    sectionObserver.observe(section);

});



/*=========================================
END PART 2
=========================================*/


/*=========================================
AASHNA JEWELS
LUXURY JAVASCRIPT
PART 3
Cursor • Magnetic • Tilt • Shine
=========================================*/


/*=========================================
CURSOR GLOW
=========================================*/

const cursorGlow = document.querySelector(".cursor-glow");

const mouseLight = document.querySelector(".mouse-light");

if(cursorGlow && mouseLight){

    window.addEventListener("mousemove",(e)=>{

        const x=e.clientX;

        const y=e.clientY;

        cursorGlow.style.left=x+"px";
        cursorGlow.style.top=y+"px";

        mouseLight.style.left=x+"px";
        mouseLight.style.top=y+"px";

    });

}



/*=========================================
MAGNETIC BUTTONS
=========================================*/

const magneticButtons=document.querySelectorAll(".magnetic");

magneticButtons.forEach(button=>{

    button.addEventListener("mousemove",(e)=>{

        const rect=button.getBoundingClientRect();

        const x=e.clientX-rect.left-rect.width/2;

        const y=e.clientY-rect.top-rect.height/2;

        button.style.transform=

        `translate(${x*0.25}px,${y*0.25}px)`;

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="";

    });

});



/*=========================================
3D TILT CARDS
=========================================*/

const tiltCards=document.querySelectorAll(".tilt-card");

tiltCards.forEach(card=>{

    let frame;

    card.addEventListener("mousemove",(e)=>{

        cancelAnimationFrame(frame);

        frame=requestAnimationFrame(()=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const rotateY=((x/rect.width)-0.5)*14;

            const rotateX=((y/rect.height)-0.5)*-14;

            card.style.transform=

            `perspective(1200px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

        });

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});



/*=========================================
IMAGE SHINE
=========================================*/

const collectionImages=document.querySelectorAll(".collection-image");

collectionImages.forEach(image=>{

    image.addEventListener("mouseenter",()=>{

        const shine=document.createElement("span");

        shine.className="image-shine";

        image.appendChild(shine);

        setTimeout(()=>{

            shine.remove();

        },900);

    });

});



/*=========================================
CARD HOVER SHADOW
=========================================*/

const collectionCards=document.querySelectorAll(".collection-card");

collectionCards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        card.style.setProperty("--mouse-x",x+"px");

        card.style.setProperty("--mouse-y",y+"px");

    });

});



/*=========================================
RIPPLE BUTTON
=========================================*/

document.querySelectorAll(".primary-btn")

.forEach(button=>{

    button.addEventListener("click",(e)=>{

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=button.getBoundingClientRect();

        ripple.style.left=

        (e.clientX-rect.left)+"px";

        ripple.style.top=

        (e.clientY-rect.top)+"px";

        button.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },700);

    });

});



/*=========================================
HEADER ICON HOVER
=========================================*/

document.querySelectorAll(".icon-btn")

.forEach(icon=>{

    icon.addEventListener("mouseenter",()=>{

        icon.animate([

            {

                transform:"translateY(0)"

            },

            {

                transform:"translateY(-6px)"

            },

            {

                transform:"translateY(0)"

            }

        ],{

            duration:400,

            easing:"ease"

        });

    });

});



/*=========================================
SMOOTH HERO FLOAT
=========================================*/

const heroImage=document.querySelector(".hero-image img");

if(heroImage){

    let angle=0;

    function animateHero(){

        angle+=0.01;

        heroImage.style.transform=

        `translateY(${Math.sin(angle)*8}px)
         rotate(${Math.sin(angle)*1.2}deg)`;

        requestAnimationFrame(animateHero);

    }

    animateHero();

}



/*=========================================
END PART 3
=========================================*/

/*=========================================
AASHNA JEWELS
LUXURY JAVASCRIPT
PART 4
Cart • Wishlist • Quick View
=========================================*/


/*=========================================
LOCAL STORAGE
=========================================*/

const cart = JSON.parse(

localStorage.getItem("cart")

) || [];

const wishlist = JSON.parse(

localStorage.getItem("wishlist")

) || [];


/*=========================================
SAVE DATA
=========================================*/

function saveCart(){

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

}

function saveWishlist(){

localStorage.setItem(

"wishlist",

JSON.stringify(wishlist)

);

}



/*=========================================
COUNTERS
=========================================*/

const cartCounter=document.querySelector(".cart-count");

const wishCounter=document.querySelector(".wish-count");

function updateCounters(){

if(cartCounter){

cartCounter.textContent=cart.length;

}

if(wishCounter){

wishCounter.textContent=wishlist.length;

}

}

updateCounters();



/*=========================================
TOAST
=========================================*/

function showToast(message){

const toast=document.createElement("div");

toast.className="luxury-toast";

toast.textContent=message;

document.body.appendChild(toast);

requestAnimationFrame(()=>{

toast.classList.add("show");

});

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},400);

},2200);

}



/*=========================================
ADD TO CART
=========================================*/

document.querySelectorAll(".add-cart")

.forEach(button=>{

button.addEventListener("click",()=>{

const card=button.closest(".collection-card");

if(!card) return;

const product={

id:card.dataset.id,

title:card.dataset.title,

price:card.dataset.price,

image:card.dataset.image

};

cart.push(product);

saveCart();

updateCounters();

showToast("Added to Cart");

});

});



/*=========================================
WISHLIST
=========================================*/

document.querySelectorAll(".wishlist-btn")

.forEach(button=>{

button.addEventListener("click",()=>{

const card=button.closest(".collection-card");

if(!card) return;

const id=card.dataset.id;

if(wishlist.includes(id)){

showToast("Already in Wishlist");

return;

}

wishlist.push(id);

saveWishlist();

updateCounters();

button.classList.add("active");

showToast("Added to Wishlist");

});

});



/*=========================================
QUICK VIEW
=========================================*/

const quickView=document.querySelector(".quick-view");

const quickImage=document.querySelector(".quick-image");

const quickTitle=document.querySelector(".quick-title");

const quickPrice=document.querySelector(".quick-price");

const quickClose=document.querySelector(".quick-close");

document.querySelectorAll(".collection-card")

.forEach(card=>{

card.addEventListener("dblclick",()=>{

if(!quickView) return;

quickImage.src=card.dataset.image;

quickTitle.textContent=card.dataset.title;

quickPrice.textContent=card.dataset.price;

quickView.classList.add("show");

});

});

quickClose?.addEventListener("click",()=>{

quickView.classList.remove("show");

});

quickView?.addEventListener("click",(e)=>{

if(e.target===quickView){

quickView.classList.remove("show");

}

});



/*=========================================
LIVE SEARCH
=========================================*/

const liveSearch=document.querySelector(".search-input");

if(liveSearch){

liveSearch.addEventListener("input",()=>{

const value=

liveSearch.value.toLowerCase();

document.querySelectorAll(".collection-card")

.forEach(card=>{

const title=

card.dataset.title.toLowerCase();

card.style.display=

title.includes(value)

? ""

: "none";

});

});

}



/*=========================================
END PART 4
=========================================*/

/*=========================================
AASHNA JEWELS
LUXURY JAVASCRIPT
PART 5
Forms • Theme • Music • Init
=========================================*/


/*=========================================
NEWSLETTER
=========================================*/

const newsletterForm=document.querySelector(".newsletter-form");

newsletterForm?.addEventListener("submit",(e)=>{

    e.preventDefault();

    const input=newsletterForm.querySelector("input");

    const email=input.value.trim();

    const emailPattern=

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){

        showToast("Enter a valid email");

        return;

    }

    showToast("Thank you for subscribing!");

    newsletterForm.reset();

});


/*=========================================
CONTACT FORM
=========================================*/

const contactForm=document.querySelector(".contact-form");

contactForm?.addEventListener("submit",(e)=>{

    e.preventDefault();

    const fields=

    contactForm.querySelectorAll(

        "input,textarea"

    );

    let valid=true;

    fields.forEach(field=>{

        if(field.value.trim()===""){

            valid=false;

            field.classList.add("error");

        }

        else{

            field.classList.remove("error");

        }

    });

    if(!valid){

        showToast("Please fill all fields");

        return;

    }

    showToast("Message Sent Successfully");

    contactForm.reset();

});



/*=========================================
THEME TOGGLE
=========================================*/

const themeButton=

document.querySelector(".theme-toggle");

const savedTheme=

localStorage.getItem("theme");

if(savedTheme==="dark"){

    document.body.classList.add("dark");

}

themeButton?.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    localStorage.setItem(

        "theme",

        document.body.classList.contains("dark")

        ? "dark"

        : "light"

    );

});



/*=========================================
BACKGROUND MUSIC
=========================================*/

const music=

document.getElementById("ambientMusic");

let musicStarted=false;

function startMusic(){

    if(!music || musicStarted) return;

    music.volume=.25;

    music.play()

    .then(()=>{

        musicStarted=true;

    })

    .catch(()=>{});

}

document.addEventListener(

    "click",

    startMusic,

    {once:true}

);



/*=========================================
DRAWERS
=========================================*/

const cartDrawer=

document.querySelector(".cart-drawer");

const wishlistDrawer=

document.querySelector(".wishlist-drawer");

const cartButton=

document.querySelector(".cart-btn");

const wishlistButton=

document.querySelector(".header-icons .wishlist-btn");

const drawerClose=

document.querySelector(".drawer-close");

const wishlistClose=

document.querySelector(".wishlist-close");

cartButton?.addEventListener("click",()=>{

    cartDrawer?.classList.add("show");

});

wishlistButton?.addEventListener("click",()=>{

    wishlistDrawer?.classList.add("show");

});

drawerClose?.addEventListener("click",()=>{

    cartDrawer?.classList.remove("show");

});

wishlistClose?.addEventListener("click",()=>{

    wishlistDrawer?.classList.remove("show");

});



/*=========================================
ESC CLOSE
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key!=="Escape") return;

    quickView?.classList.remove("show");

    cartDrawer?.classList.remove("show");

    wishlistDrawer?.classList.remove("show");

    closeSearch();

});



/*=========================================
PRELOAD HERO IMAGE
=========================================*/

const heroImageElement=

document.querySelector(".hero-image img");

if(heroImageElement){

    const preload=new Image();

    preload.src=heroImageElement.src;

}



/*=========================================
PERFORMANCE
=========================================*/

window.addEventListener("pageshow",()=>{

    updateCounters();

    updateHeader();

    updateBackTop();

});



/*=========================================
INITIALIZE
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    updateCounters();

    updateHeader();

    updateBackTop();

    updateProgressRing();

    console.log(

        "%cAASHNA JEWELS READY",

        "color:#c6a46a;font-size:16px;font-weight:bold"

    );

});



/*=========================================
END OF SCRIPT
=========================================*/
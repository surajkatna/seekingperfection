// =========================
// HAMBURGER MENU
// =========================

const hamburger =
document.querySelector(".hamburger");

const navLinks =
document.querySelector(".nav-links");

hamburger.addEventListener("click",()=>{

    hamburger.classList.toggle("open");

    navLinks.classList.toggle("active");

});

// CLOSE MENU AFTER CLICK

document
.querySelectorAll(".nav-links a")
.forEach(link=>{

    link.addEventListener("click",()=>{

        hamburger.classList.remove("open");

        navLinks.classList.remove("active");

    });

});


// =========================
// NAVBAR SCROLL EFFECT
// =========================

const navbar =
document.querySelector("nav");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 50){

        navbar.style.background =
        "rgba(10,10,10,.95)";

        navbar.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.3)";

    }

    else{

        navbar.style.background =
        "rgba(255,255,255,.08)";

        navbar.style.boxShadow =
        "none";

    }

});


// =========================
// CONTACT FORM
// =========================

const contactForm =
document.getElementById("contactForm");

contactForm.addEventListener(
"submit",
(e)=>{

    e.preventDefault();

    alert(
    "Thank you! Your message has been sent."
    );

    contactForm.reset();

});


// =========================
// SCROLL REVEAL
// =========================

const revealElements =
document.querySelectorAll(
".contact-form, .contact-info, .map-box, .cta-box"
);

revealElements.forEach(el=>{

    el.style.opacity = "0";

    el.style.transform =
    "translateY(50px)";

    el.style.transition =
    ".8s ease";

});

function reveal(){

    revealElements.forEach(el=>{

        const top =
        el.getBoundingClientRect().top;

        if(
        top < window.innerHeight - 100
        ){

            el.style.opacity = "1";

            el.style.transform =
            "translateY(0)";

        }

    });

}

window.addEventListener(
"scroll",
reveal
);

reveal();


// =========================
// BUTTON HOVER EFFECT
// =========================

const buttons =
document.querySelectorAll("button");

buttons.forEach(button=>{

    button.addEventListener(
    "mouseenter",
    ()=>{

        button.style.transform =
        "translateY(-3px)";

    });

    button.addEventListener(
    "mouseleave",
    ()=>{

        button.style.transform =
        "translateY(0)";

    });

});


// =========================
// BOOK TABLE BUTTONS
// =========================

const bookButtons =
document.querySelectorAll(
".nav-btn, .cta-box button"
);

bookButtons.forEach(button=>{

    button.addEventListener(
    "click",
    ()=>{

        alert(
        "Table Reservation Page Coming Soon!"
        );

        // OR

        // window.location.href =
        // "booking.html";

    });

});


// =========================
// SMOOTH SCROLL TO FORM
// =========================

const heroButton =
document.querySelector(".gold-btn");

if(heroButton){

    heroButton.addEventListener(
    "click",
    ()=>{

        document
        .querySelector(".contact-form")
        .scrollIntoView({

            behavior:"smooth"

        });

    });

}
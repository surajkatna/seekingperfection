// =========================
// HAMBURGER MENU
// =========================

const hamburger =
document.querySelector(".hamburger");

const navLinks =
document.querySelector(".nav-links");

if(hamburger){

    hamburger.addEventListener("click",()=>{

        hamburger.classList.toggle("open");
        navLinks.classList.toggle("active");

    });

}

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
// SCROLL REVEAL ANIMATION
// =========================

const revealElements =
document.querySelectorAll(
".story, .feature-box, .chef, .testimonial, .stat"
);

revealElements.forEach(element=>{

    element.style.opacity = "0";
    element.style.transform =
    "translateY(50px)";
    element.style.transition =
    ".8s ease";

});

function revealOnScroll(){

    revealElements.forEach(element=>{

        const top =
        element.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            element.style.opacity = "1";

            element.style.transform =
            "translateY(0)";

        }

    });

}

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();

// =========================
// COUNTER ANIMATION
// =========================

const counters =
document.querySelectorAll(".stat h2");

let counterStarted = false;

function runCounters(){

    if(counterStarted) return;

    const statsSection =
    document.querySelector(".stats");

    if(!statsSection) return;

    const top =
    statsSection.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){

        counterStarted = true;

        counters.forEach(counter=>{

            const target =
            +counter.dataset.target;

            let count = 0;

            const speed =
            target / 100;

            const updateCounter = ()=>{

                count += speed;

                if(count < target){

                    counter.innerText =
                    Math.floor(count);

                    requestAnimationFrame(
                    updateCounter
                    );

                }

                else{

                    counter.innerText =
                    target;

                }

            };

            updateCounter();

        });

    }

}

window.addEventListener(
"scroll",
runCounters
);

runCounters();

// =========================
// STORY BUTTON
// =========================

const storyButton =
document.querySelector(".story-btn");

if(storyButton){

    storyButton.addEventListener(
    "click",
    ()=>{

        const storySection =
        document.querySelector(".story");

        if(storySection){

            storySection.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

}

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
        "Table Booking System Coming Soon!"
        );

    });

});

// =========================
// TESTIMONIAL HOVER EFFECT
// =========================

const testimonials =
document.querySelectorAll(".testimonial");

testimonials.forEach(card=>{

    card.addEventListener(
    "mouseenter",
    ()=>{

        card.style.transform =
        "translateY(-10px)";

        card.style.transition =
        ".4s";

    });

    card.addEventListener(
    "mouseleave",
    ()=>{

        card.style.transform =
        "translateY(0)";

    });

});

// =========================
// FEATURE BOX HOVER
// =========================

const featureBoxes =
document.querySelectorAll(".feature-box");

featureBoxes.forEach(box=>{

    box.addEventListener(
    "mouseenter",
    ()=>{

        box.style.transform =
        "translateY(-10px)";

    });

    box.addEventListener(
    "mouseleave",
    ()=>{

        box.style.transform =
        "translateY(0)";

    });

});
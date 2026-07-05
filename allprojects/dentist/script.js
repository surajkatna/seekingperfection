// ===============================
// LUXE SMILES - SCRIPT.JS
// ===============================

// Navbar Elements
const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// ===============================
// HAMBURGER MENU
// ===============================

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");

    });

    document.querySelectorAll(".navLinks a").forEach(link => {

        link.addEventListener("click", () => {

            hamburger.classList.remove("active");
            navLinks.classList.remove("active");

        });

    });

}



// ===============================
// STICKY NAVBAR
// ===============================

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

});




// ===============================
// ACTIVE NAV LINK
// ===============================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 180;
        const height = section.offsetHeight;

        if (window.scrollY >= top &&
            window.scrollY < top + height) {

            current = section.id;

        }

    });

    document.querySelectorAll(".navLinks a").forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});




// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});




// ===============================
// SCROLL REVEAL
// ===============================

const revealElements = document.querySelectorAll(

".serviceCard,.doctorCard,.testimonial,.galleryCard,.featureBox,.stat,.aboutWrapper,.contactBox"

);

const reveal = () => {

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            el.classList.add("show");

        }

    });

};

window.addEventListener("scroll", reveal);

reveal();




// ===============================
// COUNTER
// ===============================

const counters = document.querySelectorAll(".stat h2");

let counterStarted = false;

function startCounter() {

    const stats = document.getElementById("stats");

    if (!stats || counterStarted) return;

    if (window.scrollY > stats.offsetTop - 500) {

        counterStarted = true;

        counters.forEach(counter => {

            const target = parseInt(counter.dataset.target);

            let count = 0;

            const speed = target / 150;

            const update = () => {

                count += speed;

                if (count < target) {

                    counter.innerText = Math.floor(count);

                    requestAnimationFrame(update);

                }

                else {

                    counter.innerText = target + "+";

                }

            }

            update();

        });

    }

}

window.addEventListener("scroll", startCounter);

startCounter();




// ===============================
// BACK TO TOP
// ===============================

const topBtn = document.createElement("button");

topBtn.className = "topBtn";

topBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.classList.add("show");

    }

    else {

        topBtn.classList.remove("show");

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};




// ===============================
// GALLERY LIGHTBOX
// ===============================

const gallery = document.querySelectorAll(".galleryCard img");

gallery.forEach(image => {

    image.addEventListener("click", () => {

        const overlay = document.createElement("div");

        overlay.className = "lightbox";

        overlay.innerHTML = `

        <img src="${image.src}" alt="">

        `;

        document.body.appendChild(overlay);

        overlay.onclick = () => overlay.remove();

    });

});




// ===============================
// BUTTON RIPPLE
// ===============================

document.querySelectorAll(

".primaryBtn,.bookBtn,.secondaryBtn"

).forEach(button => {

    button.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        ripple.style.left = e.offsetX + "px";

        ripple.style.top = e.offsetY + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        },600);

    });

});




// ===============================
// PRELOADER
// ===============================

window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    if(loader){

        loader.classList.add("hide");

        setTimeout(()=>{

            loader.remove();

        },700);

    }

});




// ===============================
// IMAGE HOVER
// ===============================

document.querySelectorAll(".doctorCard img").forEach(img=>{

    img.addEventListener("mouseenter",()=>{

        img.style.transform="scale(1.08)";

    });

    img.addEventListener("mouseleave",()=>{

        img.style.transform="scale(1)";

    });

});




// ===============================
// END
// ===============================
// =========================
// CATEGORY FILTER
// =========================

const categoryButtons = document.querySelectorAll(".category-btn");
const menuSections = document.querySelectorAll(".menu-section");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        menuSections.forEach(section => {

            if (
                category === "all" ||
                section.classList.contains(category)
            ) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }

        });

    });

});

// =========================
// HAMBURGER MENU
// =========================

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {

    hamburger.addEventListener("click", () => {

        hamburger.classList.toggle("open");
        navLinks.classList.toggle("active");

    });

}

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    link.addEventListener("click", () => {

        hamburger.classList.remove("open");
        navLinks.classList.remove("active");

    });

});

// =========================
// NAVBAR SCROLL EFFECT
// =========================

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(10,10,10,.95)";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.3)";

    } else {

        navbar.style.background = "rgba(255,255,255,.08)";
        navbar.style.boxShadow = "none";

    }

});

// =========================
// SCROLL REVEAL ANIMATION
// =========================

const cards = document.querySelectorAll(".food-card");

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = ".6s ease";

});

function revealCards() {

    cards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }

    });

}

window.addEventListener("scroll", revealCards);

revealCards();

// =========================
// ADD TO CART EFFECT
// =========================

const addButtons = document.querySelectorAll(".bottom button");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.innerHTML = "✓";

        button.style.background = "#d4af37";
        button.style.color = "#000";

        setTimeout(() => {

            button.innerHTML = "+";

            button.style.background = "transparent";
            button.style.color = "#d4af37";

        }, 1000);

    });

});

// =========================
// BUTTON HOVER EFFECT
// =========================

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-3px)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0)";
    });

});

// =========================
// RESERVATION BUTTON
// =========================

const reserveButton = document.querySelector(".reservation-box button");

if (reserveButton) {

    reserveButton.addEventListener("click", () => {

        alert("Reservation system coming soon!");

    });

}
app.post("/book", async(req,res)=>{

    const {
        name,
        phone,
        date,
        time,
        guests
    } = req.body;

    await Booking.create({
        name,
        phone,
        date,
        time,
        guests
    });

    res.json({
        success:true
    });

});

// BOOKING FORM

const bookingForm =
document.getElementById("bookingForm");

if(bookingForm){

    bookingForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const name =
        document.getElementById("name").value;

        const phone =
        document.getElementById("phone").value;

        const date =
        document.getElementById("date").value;

        const time =
        document.getElementById("time").value;

        const guests =
        document.getElementById("guests").value;

        alert(
        `Booking Confirmed!

Name: ${name}
Phone: ${phone}
Date: ${date}
Time: ${time}
Guests: ${guests}`
        );

        bookingForm.reset();

    });

}
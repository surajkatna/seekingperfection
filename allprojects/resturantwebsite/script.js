const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.05)";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
    });
});

const reveals = document.querySelectorAll('.reveal');

function revealOnScroll(){

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){
            item.classList.add('active');
        }

    });

}

window.addEventListener('scroll', revealOnScroll);

revealOnScroll();

/* HAMBURGER */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if(hamburger){

    hamburger.addEventListener("click",()=>{

        navLinks.classList.toggle("active");
        hamburger.classList.toggle("open");

    });

}

const bookButtons = document.querySelectorAll(
".nav-btn, .gold-btn"
);

bookButtons.forEach(button => {

    button.addEventListener("click", () => {

        window.open(
        "https://wa.me/7018629671",
        "_blank"
        );

    });

});
const hamburger = document.getElementById("hamburger");
const NavLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    NavLinks.classList.toggle("show");
});

/* -------- TYPING ANIMATION -------- */

const typingElement = document.querySelector(".typing");
const iam = document.querySelector(".iam");
const words = ["Kartik", "a Developer", "a Coder","a Creator"];
const colors = [ "#00eaff", "#4dffb8", "#ffac4d","#c084ff"];


let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 120;

function typeEffect() {
    const currentWord = words[wordIndex];
    const currentColor = colors[wordIndex];
    // typing
    typingElement.style.color = currentColor;
    if (!isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        // when word is fully typed
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;

        }

    } else {
        // deleting
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        // when word is deleted fully
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // move to next word

        }
    }

    const speed = isDeleting ? 80 : 140; // <-- delete = 60ms, type = 120ms

    setTimeout(typeEffect, speed);
}

typeEffect();

/*----------wiggle----------*/

setInterval (() => {
    const btn = document.querySelector(".wiggle-btn");
    btn.classList.add("wiggle-animate");

    // Remove after animation so it can trigger again
    setTimeout(() => {
        btn.classList.remove("wiggle-animate");
    }, 500);

}, 2000);


/*--------TAB CHANGE--------*/

const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll(".content");

tabs.forEach(tab => {
    tab.addEventListener('click',()=>{
        tabs.forEach(t=>t.classList.remove('active'));
        contents.forEach(c => c.classList.remove("active"));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.tab);
        target.classList.add("active");
    })
});

/*--------FADE UP ANIMATION--------*/
const elements_1  = document.querySelectorAll('.fade-up-element');

const observer_1 = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('fade-up-show');
        }
        if(!(entry.isIntersecting)){
            entry.target.classList.remove('fade-up-show');
        }
    });
},{threshold: 0.2})

elements_1.forEach(el=> observer_1.observe(el));



/*--------FADE IN ANIMATION--------*/
const elements_2  = document.querySelectorAll('.fade-in-element');

const observer_2 = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('fade-in-show');
        }
        if(!(entry.isIntersecting)){
            entry.target.classList.remove('fade-in-show');
        }
    });
},{threshold: 0.2})

elements_2.forEach(el=> observer_2.observe(el));


// ---- NAVBAR ACTIVE LINK ON SCROLL ----

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});

/*---------LOADING------*/
const toast = document.getElementById("toast");
const loadingOverlay = document.getElementById("loading-overlay");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

/*--------MAIL JS--------*/
const form = document.getElementById("contact-form");
const serviceId = "service_2cxf47d";
const templateId = "template_vfd2jvl";


form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    loadingOverlay.classList.add("active");

    emailjs.send(serviceId, templateId, params)
    .then(() => {
        loadingOverlay.classList.remove('active');
        
        document.getElementById("name").value="";
        document.getElementById("email").value="";
        document.getElementById("message").value="";

        showToast("Email Sent Successfully!")
        
    })
    .catch((err) => {
            loadingOverlay.classList.remove('active');
            console.log(err);
            showToast("Failed to send message!");
        });
})

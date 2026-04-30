/* ============================================
   KARTIK MAHESHWARI — PORTFOLIO · script.js
   ============================================ */

/* ---- SCROLL PROGRESS ---- */
const scrollBar = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollBar.style.width = ((window.scrollY / max) * 100) + "%";
});

/* ---- NAVBAR SCROLL STATE ---- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
});

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("show");
});

navLinks.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("show");
    });
});

/* ============================================
   CUSTOM CURSOR
   ============================================ */
const cursorDot  = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");

if (window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId;

    document.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top  = mouseY + "px";
    });

    // Smooth ring follow via rAF
    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = ringX + "px";
        cursorRing.style.top  = ringY + "px";
        rafId = requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover states on interactive elements
    const hoverTargets = "a, button, .skill-item, .project-card, .tab, input, textarea, .overlay-link";
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursorDot.classList.add("hover");
            cursorRing.classList.add("hover");
        });
        el.addEventListener("mouseleave", () => {
            cursorDot.classList.remove("hover");
            cursorRing.classList.remove("hover");
        });
    });

    document.addEventListener("mousedown", () => {
        cursorDot.classList.add("clicking");
        cursorRing.classList.add("clicking");
    });
    document.addEventListener("mouseup", () => {
        cursorDot.classList.remove("clicking");
        cursorRing.classList.remove("clicking");
    });

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
        cursorDot.style.opacity  = "0";
        cursorRing.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
        cursorDot.style.opacity  = "1";
        cursorRing.style.opacity = "1";
    });
}

/* ---- TYPING ANIMATION ---- */
const typingEl = document.querySelector(".typing");
const words  = ["a Developer", "a Coder", "a Creator"];
const colors = ["#e8e4dc", "#9eb8a0", "#b8a49e", "#a09eb8"];

let wordIdx = 0, charIdx = 0, deleting = false;

function typeEffect() {
    const word  = words[wordIdx];
    const color = colors[wordIdx];
    typingEl.style.color = color;

    if (!deleting) {
        typingEl.textContent = word.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === word.length) {
            deleting = true;
            setTimeout(typeEffect, 1600);
            return;
        }
    } else {
        typingEl.textContent = word.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            deleting  = false;
            wordIdx   = (wordIdx + 1) % words.length;
        }
    }
    setTimeout(typeEffect, deleting ? 75 : 130);
}
typeEffect();

/* ---- WIGGLE BUTTON ---- */
setInterval(() => {
    const btn = document.querySelector(".wiggle-btn");
    if (!btn) return;
    btn.classList.add("wiggle-animate");
    setTimeout(() => btn.classList.remove("wiggle-animate"), 400);
}, 3000);

/* ---- TABS ---- */
document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab)?.classList.add("active");
    });
});

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
const observerConfig = { threshold: 0.15 };

const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => e.target.classList.toggle("fade-up-show", e.isIntersecting));
}, observerConfig);
document.querySelectorAll(".fade-up-element").forEach(el => fadeUpObserver.observe(el));

// Staggered fade-in for skill groups & project cards
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("fade-in-show"), i * 90);
        } else {
            e.target.classList.remove("fade-in-show");
        }
    });
}, { threshold: 0.08 });
document.querySelectorAll(".fade-in-element").forEach(el => fadeInObserver.observe(el));

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
const sections    = document.querySelectorAll("section[id]");
const allNavLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            allNavLinks.forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        }
    });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(s => sectionObserver.observe(s));

/* ============================================
   TEXT SCRAMBLE EFFECT  (on section headings)
   ============================================ */
const CHARS = "!<>-_\\/[]{}—=+*^?#abcdefghijklmnopqrstuvwxyz";

class TextScramble {
    constructor(el) {
        this.el    = el;
        this.original = el.textContent;
        this.queue = [];
        this.frame = 0;
        this.resolve = null;
    }

    setText(text) {
        const oldText = this.el.textContent;
        const len     = Math.max(oldText.length, text.length);
        return new Promise(resolve => {
            this.resolve = resolve;
            this.queue   = [];
            for (let i = 0; i < len; i++) {
                const from  = oldText[i] || '';
                const to    = text[i] || '';
                const start = Math.floor(Math.random() * 12);
                const end   = start + Math.floor(Math.random() * 16);
                this.queue.push({ from, to, start, end, char: '' });
            }
            cancelAnimationFrame(this.frame);
            this.frameCount = 0;
            this.update();
        });
    }

    update() {
        let output  = '';
        let complete = 0;
        for (const item of this.queue) {
            const { from, to, start, end } = item;
            if (this.frameCount >= end) {
                complete++;
                output += to;
            } else if (this.frameCount >= start) {
                if (!item.char || Math.random() < 0.28) {
                    item.char = CHARS[Math.floor(Math.random() * CHARS.length)];
                }
                output += `<span class="scramble-char">${item.char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve && this.resolve();
        } else {
            this.frame = requestAnimationFrame(() => {
                this.frameCount++;
                this.update();
            });
        }
    }
}

// Inject scramble char style once
const scrambleStyle = document.createElement('style');
scrambleStyle.textContent = `.scramble-char { color: var(--text-dim); }`;
document.head.appendChild(scrambleStyle);

// Observe section titles and trigger scramble when entering viewport
const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fx = new TextScramble(entry.target);
            fx.setText(entry.target.textContent.replace(/<[^>]*>/g, '') || entry.target.getAttribute('data-original') || '');
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll("[data-scramble]").forEach(el => {
    el.setAttribute("data-original", el.textContent);
    scrambleObserver.observe(el);
});

/* ============================================
   3D CARD TILT on project cards
   ============================================ */
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect   = card.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) / (rect.width  / 2);
        const dy     = (e.clientY - cy) / (rect.height / 2);
        const tiltX  = dy * -5;   // max ±5 deg
        const tiltY  = dx *  5;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.012)`;
        card.style.boxShadow = `${-dx * 10}px ${-dy * 10}px 30px rgba(0,0,0,0.35)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "";
    });
});

/* ============================================
   MAGNETIC BUTTONS (hero CTAs)
   ============================================ */
if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".btn-primary, .btn-ghost").forEach(btn => {
        btn.addEventListener("mousemove", e => {
            const rect = btn.getBoundingClientRect();
            const dx   = e.clientX - (rect.left + rect.width  / 2);
            const dy   = e.clientY - (rect.top  + rect.height / 2);
            btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`;
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "";
        });
    });
}

/* ============================================
   TOAST
   ============================================ */
const toast = document.getElementById("toast");
function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3500);
}

/* ============================================
   CONTACT FORM (EmailJS)
   ============================================ */
const loadingOverlay = document.getElementById("loading-overlay");
const form       = document.getElementById("contact-form");
const SERVICE_ID  = "service_2cxf47d";
const TEMPLATE_ID = "template_vfd2jvl";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const params = {
        name:    document.getElementById("name").value,
        email:   document.getElementById("email").value,
        message: document.getElementById("message").value,
    };
    loadingOverlay.classList.add("active");
    emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
        .then(() => {
            loadingOverlay.classList.remove("active");
            form.reset();
            showToast("Message sent successfully.");
        })
        .catch(err => {
            loadingOverlay.classList.remove("active");
            console.error(err);
            showToast("Failed to send. Try again.");
        });
});
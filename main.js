// ================================
//   CYNARD EYE CLINIC — MAIN JS
//   VagabondCode | Maxwell Idowu
// ================================

// --- NAVBAR SCROLL EFFECT ---
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// --- HAMBURGER / MOBILE NAV ---
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileNav.classList.toggle("open");
  document.body.style.overflow = mobileNav.classList.contains("open")
    ? "hidden"
    : "";
});

function closeMobileNav() {
  hamburger.classList.remove("open");
  mobileNav.classList.remove("open");
  document.body.style.overflow = "";
}

// Close mobile nav on outside click
document.addEventListener("click", (e) => {
  if (
    mobileNav.classList.contains("open") &&
    !mobileNav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMobileNav();
  }
});

// --- ACTIVE NAV LINK ---
const navLinks = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// --- SCROLL REVEAL ---
const revealElements = document.querySelectorAll(
  ".service-card, .why-point, .testimonial-card, .service-page-card, .contact-info-item",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  },
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  revealObserver.observe(el);
});

// --- CONTACT FORM (contact page) ---
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !phone) {
      alert("Please fill in your name and phone number.");
      return;
    }

    const waMessage = `Hello Cynard Eye Clinic,%0A%0AMy name is *${name}*%0APhone: ${phone}%0AService interested in: ${service}%0A%0A${message}`;
    const waURL = `https://wa.me/2348037091379?text=${waMessage}`;
    window.open(waURL, "_blank");
  });
}

// --- SMOOTH SCROLL for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

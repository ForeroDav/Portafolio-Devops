const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const navigationLinks = document.querySelectorAll(".nav-links a[href^='#']");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");

document.getElementById("currentYear").textContent = new Date().getFullYear();

// Scroll Effects
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// Mobile Menu Toggle
menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

// Close mobile menu when clicking a link
navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
  });
});

// Intersection Observer for scroll animations
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Active link highlighting on scroll
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navigationLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  {
    rootMargin: "-20% 0px -79% 0px"
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// Parallax effect for hero tech rings
document.addEventListener('mousemove', (e) => {
  const rings = document.querySelectorAll('.tech-ring');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  rings.forEach((ring, index) => {
    const speed = (index + 1) * 20;
    const xOffset = (x - 0.5) * speed;
    const yOffset = (y - 0.5) * speed;
    
    ring.style.marginLeft = `${xOffset}px`;
    ring.style.marginTop = `${yOffset}px`;
  });
});

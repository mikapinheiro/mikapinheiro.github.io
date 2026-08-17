// =========================================
// CUSTOM CURSOR
// =========================================
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
let cursorScale = 1;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate3d(${mx - 5}px, ${my - 5}px, 0) scale(${cursorScale})`;
});

function animateRing() {
  rx += (mx - rx - 18) * 0.15;
  ry += (my - ry - 18) * 0.15;
  ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document
  .querySelectorAll("a, button, .project-card, .location-wrapper, .tool-box")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorScale = 2.5;
      cursor.style.transform = `translate3d(${mx - 5}px, ${my - 5}px, 0) scale(${cursorScale})`;
      ring.style.opacity = "0.2";
    });
    el.addEventListener("mouseleave", () => {
      cursorScale = 1;
      cursor.style.transform = `translate3d(${mx - 5}px, ${my - 5}px, 0) scale(${cursorScale})`;
      ring.style.opacity = "0.6";
    });
  });

// =========================================
// SCROLL PROGRESS E OBSERVER
// =========================================
const scrollLine = document.getElementById("scrollLine");
window.addEventListener("scroll", () => {
  const pct =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollLine.style.width = pct + "%";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 100);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

// =========================================
// TYPING EFFECT
// =========================================
const roles = [
  "Java Developer",
  "Front-end Developer",
  "Mobile Dev (Flutter)",
  "React & Angular Dev",
  "Estudante de CS",
];
let ri = 0,
  ci = 0,
  deleting = false;
const typingEl = document.getElementById("typingText");
function type() {
  const word = roles[ri];
  if (!deleting) {
    typingEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typingEl.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// =========================================
// MODO CLARO / ESCURO (THEME TOGGLE)
// =========================================
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-theme")) {
    body.classList.replace("dark-theme", "light-theme");
    themeIcon.src = "img/lua.png";
  } else {
    body.classList.replace("light-theme", "dark-theme");
    themeIcon.src = "img/sol.png";
  }
});

// =========================================
// DROPDOWN DE IDIOMA
// =========================================
const langToggleBtn = document.getElementById("langToggleBtn");
const langMenu = document.getElementById("langMenu");
const langOptions = document.querySelectorAll(".lang-option");
let currentLang = "PT";

// Abre/Fecha menu
langToggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langMenu.classList.toggle("show");
});

// Fecha menu ao clicar fora
document.addEventListener("click", () => {
  langMenu.classList.remove("show");
});

// Troca Idioma
langOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    currentLang = e.target.getAttribute("data-lang");
    langToggleBtn.textContent = e.target.textContent;

    document.querySelectorAll("[data-pt]").forEach((el) => {
      let text = "";
      if (currentLang === "PT") text = el.getAttribute("data-pt");
      if (currentLang === "EN") text = el.getAttribute("data-en");
      if (currentLang === "ES") text = el.getAttribute("data-es");
      if (text) el.innerHTML = text;
    });
  });
});

// =========================================
// FILTRO DE PROJETOS (SIDEBAR)
// =========================================
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".filter-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active de todos e bota no clicado
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (
        filterValue === "all" ||
        card.getAttribute("data-category") === filterValue
      ) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

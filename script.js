// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Nav background on scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 30));

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
  })
);

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Cube: tap to scramble, tap again to solve
const COLORS = ["#d2042d", "#ff7aa8", "#ffd1df", "#fbeff3", "#2a1f22", "#8e0220"];
const SOLVED = "#d2042d";
const cube = document.getElementById("cube");
const hint = document.getElementById("cubeHint");
const tiles = Array.from({ length: 9 }, () => {
  const t = document.createElement("div");
  t.className = "tile";
  t.style.background = SOLVED;
  cube.appendChild(t);
  return t;
});
let scrambled = false;
let busy = false;

function paint(getColor, done) {
  busy = true;
  tiles.forEach((t, i) => {
    setTimeout(() => {
      t.classList.add("pop");
      t.style.background = getColor(i);
      setTimeout(() => t.classList.remove("pop"), 180);
      if (i === tiles.length - 1) setTimeout(() => { busy = false; done(); }, 250);
    }, i * 60);
  });
}

function toggleCube() {
  if (busy) return;
  if (!scrambled) {
    paint(() => COLORS[Math.floor(Math.random() * COLORS.length)], () => {
      scrambled = true;
      hint.textContent = "Scrambled. Tap again to solve it";
    });
  } else {
    paint(() => SOLVED, () => {
      scrambled = false;
      hint.textContent = "Solved. Under 2 minutes, every time";
    });
  }
}
cube.addEventListener("click", toggleCube);
cube.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCube(); }
});
// Start scrambled once so visitors see it move
setTimeout(toggleCube, 900);

// Copy email
const copyBtn = document.getElementById("copyBtn");
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(copyBtn.dataset.copy).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy email"), 1500);
  });
});

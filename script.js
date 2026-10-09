// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Announcement bar (remembers if it was dismissed) ----------
const announce = document.getElementById("announce");
const announceKey = "bli-announce-2026-27";
try {
  if (localStorage.getItem(announceKey) === "dismissed") announce.hidden = true;
} catch (e) {}
document.getElementById("announce-close").addEventListener("click", () => {
  announce.hidden = true;
  try { localStorage.setItem(announceKey, "dismissed"); } catch (e) {}
});

// ---------- Header shadow on scroll ----------
const header = document.getElementById("site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ---------- Mobile menu ----------
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("site-nav");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  })
);

// ---------- Fade sections in as they scroll into view ----------
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );
  revealItems.forEach((el) => io.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("is-visible"));
}

// ---------- Highlight the nav link for the section on screen ----------
const links = [...nav.querySelectorAll("a[href^='#']")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const navIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => navIo.observe(s));
}

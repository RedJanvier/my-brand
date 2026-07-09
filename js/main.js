/* ============================================================
   main.js — shared behavior for every page.
   Everything here is cheap: transform/opacity animations only,
   IntersectionObserver instead of scroll listeners where possible,
   and full prefers-reduced-motion support.
   ============================================================ */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Shared header & footer ---------- */
function injectChrome() {
  const path = location.pathname.split("/").pop() || "index.html";
  const active = (p) => (path === p ? 'aria-current="page"' : "");

  const header = document.createElement("header");
  header.innerHTML = `
    <nav class="nav" id="nav">
      <a class="nav-logo" href="index.html">Red<em>Janvier</em></a>
      <button class="nav-burger" id="burger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" id="nav-links">
        <a href="index.html#about" ${active("")}>About</a>
        <a href="index.html#experience">Experience</a>
        <a href="projects.html" ${active("projects.html")}>Projects</a>
        <!-- <a href="blog.html" ${active("blog.html")}>Writing</a> ->
        <a href="index.html#contact">Contact</a>
      </div>
    </nav>
    <div class="progress" id="progress"></div>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  const year = new Date().getFullYear();
  footer.innerHTML = `
    <span>&copy; ${year} Janvier Ntwali Habiyaremye</span>
    <span>Kigali, Rwanda &middot; UTC+2</span>
    <span>
      <a href="https://github.com/redjanvier" target="_blank" rel="noopener">GitHub</a> /
      <a href="https://linkedin.com/in/red-janvier" target="_blank" rel="noopener">LinkedIn</a> /
      <a href="https://x.com/red_janvier" target="_blank" rel="noopener">X</a>
    </span>`;
  document.body.append(footer);
}

/* ---------- Nav state ---------- */
function initNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const links = document.getElementById("nav-links");

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle("scrolled", window.scrollY > 24);
      const progress = document.getElementById("progress");
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      ticking = false;
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    nav.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      nav.classList.remove("menu-open");
    }
  });
}

/* ---------- Scroll reveals ---------- */
function initReveals() {
  const els = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Animated counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;
  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      el.firstChild.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (reduceMotion) {
    counters.forEach((el) => (el.firstChild.textContent = el.dataset.count));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
    }
  }, { threshold: 0.5 });
  counters.forEach((el) => io.observe(el));
}

/* ---------- Custom cursor ---------- */
function initCursor() {
  if (reduceMotion || !matchMedia("(pointer: fine)").matches) return;
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  document.body.append(dot);
  let x = 0, y = 0, cx = 0, cy = 0, raf;
  const loop = () => {
    cx += (x - cx) * 0.22;
    cy += (y - cy) * 0.22;
    dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
    raf = requestAnimationFrame(loop);
  };
  addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
  loop();
  document.addEventListener("mouseover", (e) => {
    dot.classList.toggle("big", !!e.target.closest("a, button"));
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else loop();
  });
}

/* ---------- Marquee duplication (seamless loop) ---------- */
function initMarquee() {
  document.querySelectorAll(".marquee").forEach((m) => {
    const track = m.querySelector(".marquee-track");
    if (track) m.append(track.cloneNode(true));
  });
}

injectChrome();
initNav();
initReveals();
initCounters();
initCursor();
initMarquee();

/* ============================================
   Besago Ventures — main.js
   Header state, nav, staggered reveals,
   hero parallax, active section, back-to-top,
   mailto contact form, footer year.
   ============================================ */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Header: transparent → solid navy ---------- */
  const header = document.querySelector(".site-header");
  const firstSection = document.getElementById("about");

  const clearActive = () => {
    document
      .querySelectorAll('.site-nav a[href^="#"].active')
      .forEach((a) => a.classList.remove("active"));
  };

  const onScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);

    // No active nav link while still in the hero
    if (firstSection) {
      const heroBottom = firstSection.offsetTop - window.innerHeight * 0.5;
      if (window.scrollY < heroBottom) clearActive();
    }

    // Back-to-top visibility
    if (backBtn) backBtn.classList.toggle("show", window.scrollY > 600);
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close the menu after choosing a link
    nav.addEventListener("click", (e) => {
      if (e.target.closest && e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Active link underline (gold) ---------- */
  const sections = ["about", "services", "partnership", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const setActive = (id) => {
      document
        .querySelectorAll('.site-nav a[href^="#"]')
        .forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
    };

    const navIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => navIO.observe(s));
  }

  /* ---------- Staggered reveal on scroll ----------
     Elements get an index-based delay, then the reveal classes are
     removed once the transition finishes so hover transitions on
     cards/rows are not slowed down by the reveal timing. */
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const revealed = new Set();

  const show = (el) => {
    if (revealed.has(el)) return;
    revealed.add(el);

    // Stagger: position among .reveal siblings in the same parent
    const siblings = Array.from(el.parentElement ? el.parentElement.children : []).filter(
      (c) => c.classList && c.classList.contains("reveal")
    );
    const idx = Math.max(0, siblings.indexOf(el));
    const delay = Math.min(idx, 6) * 80;
    if (delay) el.style.transitionDelay = delay + "ms";

    el.classList.add("visible");

    // Clean up after the transition so component transitions stay crisp
    window.setTimeout(() => {
      el.style.transitionDelay = "";
      el.classList.remove("reveal", "visible");
    }, delay + 950);
  };

  // Show anything already in the first viewport right away — don't make
  // above-the-fold content wait on the observer (or on a hidden document).
  const revealInView = () => {
    const limit = window.innerHeight + 80;
    revealEls.forEach((el) => {
      if (revealed.has(el)) return;
      if (el.getBoundingClientRect().top < limit) show(el);
    });
  };
  setTimeout(revealInView, 100);

  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach(show);
  }

  /* ---------- Subtle hero parallax ---------- */
  const shapes = Array.from(document.querySelectorAll("[data-parallax]"));

  if (shapes.length) {
    let ticking = false;

    const applyParallax = () => {
      ticking = false;
      if (reduceMotion.matches) return;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.3) return; // hero is off-screen
      shapes.forEach((el) => {
        const factor = parseFloat(el.getAttribute("data-parallax")) || 0;
        el.style.setProperty("--py", (y * factor).toFixed(1) + "px");
      });
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(applyParallax);
        }
      },
      { passive: true }
    );
  }

  /* ---------- Back to top ---------- */
  const backBtn = document.getElementById("back-to-top");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
      const logo = document.querySelector(".site-header .logo");
      if (logo) logo.focus({ preventScroll: true });
    });
  }

  /* ---------- Contact form → opens the visitor's mail client ----------
     There is no backend: submitting builds a mailto: link to
     besagoventures@gmail.com with the name and message pre-filled.
     Nothing is sent from this website itself. */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const RECIPIENT = "besagoventures@gmail.com";

  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Reset state
      status.textContent = "";
      status.className = "form-status";
      form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));

      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const message = form.querySelector("#message");
      let firstInvalid = null;

      const flag = (field) => {
        field.classList.add("invalid");
        if (!firstInvalid) firstInvalid = field;
      };

      if (!name.value.trim()) flag(name);
      if (!message.value.trim()) flag(message);

      const emailValue = email.value.trim();
      if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        flag(email);
      }

      if (firstInvalid) {
        status.textContent = "Please fill in the highlighted fields.";
        status.classList.add("err");
        firstInvalid.focus();
        return;
      }

      // Build the mailto: link (name + message pre-filled, plus email if given)
      const subject = `Website enquiry from ${name.value.trim()}`;
      const lines = [`Name: ${name.value.trim()}`];
      if (emailValue) lines.push(`Email: ${emailValue}`);
      lines.push("", message.value.trim());

      const href =
        `mailto:${RECIPIENT}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(lines.join("\r\n"))}`;

      status.textContent =
        `Opening your email application… If nothing happens, email us directly at ${RECIPIENT}.`;
      status.classList.add("info");

      // Hand off to the visitor's mail client (values stay in the form
      // in case the mail app does not open and they need to copy them).
      window.location.href = href;
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Initial state ---------- */
  onScroll();
})();

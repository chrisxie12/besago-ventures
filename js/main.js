/* ============================================
   Besago Ventures — main.js
   ============================================ */
(function () {
  "use strict";

  /* ---------- Sticky header state ---------- */
  const header = document.querySelector(".site-header");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

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
      if (e.target.tagName === "A") {
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

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  // Show anything already in the first viewport right away — don't make
  // above-the-fold content wait on the observer (or on a hidden document).
  const revealInView = () => {
    const limit = window.innerHeight + 80;
    revealEls.forEach((el) => {
      if (el.classList.contains("visible")) return;
      if (el.getBoundingClientRect().top < limit) el.classList.add("visible");
    });
  };
  setTimeout(revealInView, 100);

  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;

    if (reduceMotion) {
      el.textContent = String(target);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (counters.length) {
    if ("IntersectionObserver" in window) {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => cio.observe(el));
    } else {
      counters.forEach((el) => (el.textContent = el.dataset.count));
    }
  }

  /* ---------- Contact form (client-side demo) ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Reset state
      status.textContent = "";
      status.className = "form-status";
      form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));

      // Validate required fields
      const required = form.querySelectorAll("[required]");
      let firstInvalid = null;

      required.forEach((field) => {
        const value = field.value.trim();
        const validEmail =
          field.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        if (!value || !validEmail) {
          field.classList.add("invalid");
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (firstInvalid) {
        status.textContent = "Please fill in the highlighted fields.";
        status.classList.add("err");
        firstInvalid.focus();
        return;
      }

      // No backend yet — show a success message and reset.
      status.textContent = "Thanks! Your message has been recorded — we'll be in touch.";
      status.classList.add("ok");
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();

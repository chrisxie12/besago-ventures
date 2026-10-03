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
})();

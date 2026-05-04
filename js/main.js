/* ===========================================
   MAIN — page bootstrap + interactivity
   - Hydrates [data-button] placeholders
   - Renders dynamic sections from SITE_DATA
   - Wires mobile nav, accordion, testimonial
     slider, contact form validation
   =========================================== */

(function () {
  "use strict";

  /* ----- Reusable helpers ----- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function debounce(fn, wait = 150) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  /* ----- Boot ----- */
  document.addEventListener("DOMContentLoaded", () => {
    setCopyYear();
    hydrateButtons(document);
    renderAllSections();
    initMobileNav();
    initAccordion();
    initTestimonialSlider();
    initContactForm();
    initSubscribeForm();
  });

  /* ----- Year ----- */
  function setCopyYear() {
    const el = $("#copyYear");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ----- Render dynamic sections ----- */
  function renderAllSections() {
    if (!window.SITE_DATA) return;
    const D = window.SITE_DATA;
    const services = $("#servicesGrid");
    if (services) renderServices(services, D.services);

    const cs = $("#caseStudies");
    if (cs) renderCaseStudies(cs, D.caseStudies);

    const proc = $("#processList");
    if (proc) renderProcess(proc, D.process);

    const team = $("#teamGrid");
    if (team) renderTeam(team, D.team);

    const tt = $("#testimonialsTrack");
    if (tt) renderTestimonials(tt, D.testimonials);
  }

  /* ----- Mobile Nav ----- */
  function initMobileNav() {
    const toggle = $(".nav-toggle");
    const panel = $("#mobileNav");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      if (open) {
        panel.setAttribute("hidden", "");
      } else {
        panel.removeAttribute("hidden");
      }
    });

    // Close menu on link click
    panel.querySelectorAll("a, .btn").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        panel.setAttribute("hidden", "");
      });
    });

    // Close on resize to desktop
    window.addEventListener("resize", debounce(() => {
      if (window.innerWidth >= 1024) {
        toggle.setAttribute("aria-expanded", "false");
        panel.setAttribute("hidden", "");
      }
    }, 150));
  }

  /* ----- Accordion ----- */
  function initAccordion() {
    const items = $$(".process-item");
    items.forEach((item) => {
      const trigger = item.querySelector(".process-trigger");
      if (!trigger) return;
      trigger.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        // Close all
        items.forEach((i) => {
          i.classList.remove("is-open");
          const t = i.querySelector(".process-trigger");
          if (t) t.setAttribute("aria-expanded", "false");
          updateAccordionIcon(i, false);
        });
        // Toggle current
        if (!isOpen) {
          item.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
          updateAccordionIcon(item, true);
        }
      });
      // Initial icon state
      updateAccordionIcon(item, item.classList.contains("is-open"));
    });
  }

  function updateAccordionIcon(item, open) {
    const toggleEl = item.querySelector(".process-toggle");
    if (!toggleEl) return;
    toggleEl.innerHTML = open
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#191A23" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#191A23" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`;
  }

  /* ----- Testimonial Slider ----- */
  function initTestimonialSlider() {
    const track = $("#testimonialsTrack");
    const prev = $("#prevTestimonial");
    const next = $("#nextTestimonial");
    const dotsBox = $("#testimonialDots");
    if (!track || !prev || !next || !dotsBox) return;

    const cards = Array.from(track.children);
    if (!cards.length) return;

    let perView = computePerView();
    let pages = Math.max(1, Math.ceil(cards.length - perView + 1));
    let index = 0;

    function computePerView() {
      const w = window.innerWidth;
      if (w < 700) return 1;
      if (w < 1024) return 2;
      return 3;
    }

    function recalc() {
      perView = computePerView();
      pages = Math.max(1, cards.length - perView + 1);
      if (index > pages - 1) index = pages - 1;
      buildDots();
      update();
    }

    function buildDots() {
      dotsBox.innerHTML = "";
      for (let i = 0; i < pages; i++) {
        const b = document.createElement("button");
        b.className = "dot" + (i === index ? " is-active" : "");
        b.setAttribute("aria-label", `Go to slide ${i + 1}`);
        b.addEventListener("click", () => {
          index = i;
          update();
        });
        dotsBox.appendChild(b);
      }
    }

    function update() {
      const card = cards[0];
      const gap = parseFloat(getComputedStyle(track).gap) || 40;
      const cardWidth = card.getBoundingClientRect().width + gap;
      track.style.transform = `translateX(${-index * cardWidth}px)`;
      $$("#testimonialDots .dot").forEach((d, i) => {
        d.classList.toggle("is-active", i === index);
      });
    }

    prev.addEventListener("click", () => {
      index = Math.max(0, index - 1);
      update();
    });
    next.addEventListener("click", () => {
      index = Math.min(pages - 1, index + 1);
      update();
    });

    // Touch swipe
    let startX = null;
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) index = Math.min(pages - 1, index + 1);
        else index = Math.max(0, index - 1);
        update();
      }
      startX = null;
    });

    window.addEventListener("resize", debounce(recalc, 150));
    // Wait for fonts/images to lay out before measuring
    window.requestAnimationFrame(() => requestAnimationFrame(recalc));
  }

  /* ----- Contact form ----- */
  function initContactForm() {
    const form = $("#contactForm");
    const status = $("#formStatus");
    if (!form) return;

    function setError(name, msg) {
      const input = form.querySelector(`[name="${name}"]`);
      const small = form.querySelector(`[data-error-for="${name}"]`);
      if (input) input.classList.toggle("is-invalid", !!msg);
      if (small) small.textContent = msg || "";
    }

    function validate(values) {
      const errors = {};
      if (!values.name || values.name.trim().length < 2) {
        errors.name = "Please enter your name.";
      }
      if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Please enter a valid email.";
      }
      if (!values.message || values.message.trim().length < 5) {
        errors.message = "Message must be at least 5 characters.";
      }
      return errors;
    }

    // Live error clearing
    ["name", "email", "message"].forEach((field) => {
      const input = form.querySelector(`[name="${field}"]`);
      if (input) input.addEventListener("input", () => setError(field, ""));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const errors = validate(data);

      ["name", "email", "message"].forEach((f) => setError(f, errors[f] || ""));

      if (Object.keys(errors).length === 0) {
        status.textContent = "Thanks! Your message has been received. We'll be in touch shortly.";
        status.className = "form-status is-success";
        form.reset();
      } else {
        status.textContent = "Please correct the highlighted fields.";
        status.className = "form-status is-error";
      }
    });
  }

  /* ----- Subscribe form ----- */
  function initSubscribeForm() {
    const form = $("#subscribeForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input").value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!valid) {
        alert("Please enter a valid email.");
        return;
      }
      alert("Thanks for subscribing!");
      form.reset();
    });
  }
})();

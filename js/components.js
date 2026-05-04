/* ===========================================
   COMPONENTS — reusable UI builders
   The Button component is the central reusable
   piece used across the entire page. Section
   renderers below also use it.
   =========================================== */

function createButton({ text = "Button", variant = "primary", href = null, type = "button", block = false, icon = null, onClick = null, ariaLabel = null } = {}) {
  const isLink = !!href;
  const el = document.createElement(isLink ? "a" : "button");
  el.classList.add("btn", "btn--" + variant);
  if (block) el.classList.add("btn--block");
  if (isLink) el.setAttribute("href", href);
  else el.setAttribute("type", type);
  if (ariaLabel) el.setAttribute("aria-label", ariaLabel);
  el.textContent = text;
  if (icon) {
    const iconWrap = document.createElement("span");
    iconWrap.innerHTML = icon;
    el.appendChild(iconWrap);
  }
  if (onClick && typeof onClick === "function") el.addEventListener("click", onClick);
  return el;
}

function hydrateButtons(root) {
  root = root || document;
  root.querySelectorAll("[data-button]").forEach((node) => {
    const btn = createButton({
      text: node.dataset.text || "Button",
      variant: node.dataset.variant || "primary",
      href: node.dataset.href || null,
      type: node.dataset.type || "button",
      block: node.dataset.block === "true"
    });
    node.replaceWith(btn);
  });
}

const SERVICE_ILLUSTRATIONS = {
  seo: '<svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg"><circle cx="55" cy="55" r="32" fill="none" stroke="#191A23" stroke-width="6"/><line x1="78" y1="78" x2="105" y2="105" stroke="#191A23" stroke-width="8" stroke-linecap="round"/><circle cx="55" cy="55" r="14" fill="#B9FF66"/></svg>',
  ppc: '<svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="40" width="90" height="60" rx="6" fill="#191A23"/><rect x="20" y="40" width="90" height="14" fill="#B9FF66"/><circle cx="40" cy="80" r="6" fill="#B9FF66"/><rect x="55" y="74" width="45" height="4" rx="2" fill="#fff"/><rect x="55" y="84" width="35" height="4" rx="2" fill="#fff"/></svg>',
  social: '<svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="55" r="22" fill="#191A23"/><circle cx="85" cy="80" r="22" fill="#B9FF66" stroke="#191A23" stroke-width="3"/><rect x="22" y="92" width="38" height="6" rx="3" fill="#191A23"/></svg>',
  email: '<svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="35" width="100" height="60" rx="6" fill="#fff" stroke="#191A23" stroke-width="3"/><path d="M15 40 L65 75 L115 40" fill="none" stroke="#191A23" stroke-width="3"/><circle cx="105" cy="35" r="14" fill="#B9FF66" stroke="#191A23" stroke-width="2"/></svg>',
  content: '<svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="22" width="70" height="86" rx="6" fill="#fff" stroke="#191A23" stroke-width="3"/><line x1="32" y1="40" x2="80" y2="40" stroke="#191A23" stroke-width="3"/><line x1="32" y1="55" x2="80" y2="55" stroke="#191A23" stroke-width="3"/><line x1="32" y1="70" x2="64" y2="70" stroke="#191A23" stroke-width="3"/><circle cx="92" cy="92" r="20" fill="#191A23"/><path d="M82 92 L91 100 L104 84" stroke="#B9FF66" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  analytics: '<svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="60" width="14" height="40" fill="#B9FF66"/><rect x="42" y="40" width="14" height="60" fill="#fff"/><rect x="64" y="50" width="14" height="50" fill="#B9FF66"/><rect x="86" y="20" width="14" height="80" fill="#fff"/><line x1="14" y1="105" x2="116" y2="105" stroke="#fff" stroke-width="2"/></svg>'
};

function renderServices(target, services) {
  target.innerHTML = "";
  services.forEach((s) => {
    const card = document.createElement("article");
    card.className = "service-card " + (s.theme === "dark" ? "is-dark" : s.theme === "primary" ? "is-primary" : "");
    const titleHtml = s.title.map((line) => "<span>" + line + "</span>").join("<br/>");
    card.innerHTML =
      '<div class="service-top">' +
        '<h3 class="service-title">' + titleHtml + '</h3>' +
        '<div class="service-illustration">' + (SERVICE_ILLUSTRATIONS[s.illustration] || "") + '</div>' +
      '</div>' +
      '<a href="#contact" class="service-cta">' +
        '<span class="arrow" aria-hidden="true">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7M9 7h8v8"/></svg>' +
        '</span>Learn more</a>';
    target.appendChild(card);
  });
}

function renderCaseStudies(target, studies) {
  target.innerHTML = "";
  studies.forEach((c) => {
    const card = document.createElement("article");
    card.className = "case-card";
    card.innerHTML =
      '<p>' + c.text + '</p>' +
      '<a href="#contact" class="case-link">Learn more ' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7M9 7h8v8"/></svg></a>';
    target.appendChild(card);
  });
}

function renderProcess(target, steps) {
  target.innerHTML = "";
  steps.forEach((step, idx) => {
    const item = document.createElement("article");
    item.className = "process-item" + (idx === 0 ? " is-open" : "");
    item.innerHTML =
      '<button class="process-trigger" aria-expanded="' + (idx === 0) + '">' +
        '<span class="process-num-title">' +
          '<span class="process-num">' + step.num + '</span>' +
          '<span class="process-title">' + step.title + '</span>' +
        '</span>' +
        '<span class="process-toggle" aria-hidden="true">' +
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#191A23" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>' +
        '</span>' +
      '</button>' +
      '<div class="process-content"><p>' + step.body + '</p></div>';
    target.appendChild(item);
  });
}

function teamPhotoSvg(initials) {
  return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100" height="100" fill="#F3F3F3"/>' +
    '<circle cx="50" cy="40" r="18" fill="#191A23"/>' +
    '<path d="M16 100 C16 76 30 64 50 64 C70 64 84 76 84 100 Z" fill="#191A23"/>' +
    '<text x="50" y="46" text-anchor="middle" fill="#B9FF66" font-family="Space Grotesk" font-size="18" font-weight="600">' + initials + '</text></svg>';
}

function getInitials(name) {
  return name.split(" ").map(function (p) { return p[0]; }).slice(0, 2).join("").toUpperCase();
}

function renderTeam(target, members) {
  target.innerHTML = "";
  members.forEach((m) => {
    const card = document.createElement("article");
    card.className = "team-card";
    const initials = getInitials(m.name);
    const fallback = encodeURIComponent(teamPhotoSvg(initials));
    const photo = m.profilImage
      ? '<img src="' + m.profilImage + '" alt="' + m.name + '" loading="lazy" onerror="this.onerror=null;this.src=\'data:image/svg+xml;utf8,' + fallback + '\';" />'
      : teamPhotoSvg(initials);
    card.innerHTML =
      '<div class="team-head">' +
        '<div class="team-photo">' + photo + '</div>' +
        '<div><p class="team-name">' + m.name + '</p><p class="team-role">' + m.role + '</p></div>' +
        '<a href="#" class="team-link" aria-label="' + m.name + ' on LinkedIn">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.5 0h4.37v1.92h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v7.46h-4.55V15.4c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.85-2.72 3.76V22H7.72V8z"/></svg>' +
        '</a>' +
      '</div>' +
      '<hr class="team-divider"/>' +
      '<p class="team-bio">' + m.bio + '</p>';
    target.appendChild(card);
  });
}

function renderTestimonials(target, items) {
  target.innerHTML = "";
  items.forEach((t) => {
    const li = document.createElement("li");
    li.className = "testimonial-card";
    li.innerHTML =
      '<div class="testimonial-bubble"><p>"' + t.quote + '"</p></div>' +
      '<div class="testimonial-author">' +
        '<p class="testimonial-name">' + t.name + '</p>' +
        '<p class="testimonial-role">' + t.role + '</p>' +
      '</div>';
    target.appendChild(li);
  });
}

window.createButton = createButton;
window.hydrateButtons = hydrateButtons;
window.renderServices = renderServices;
window.renderCaseStudies = renderCaseStudies;
window.renderProcess = renderProcess;
window.renderTeam = renderTeam;
window.renderTestimonials = renderTestimonials;

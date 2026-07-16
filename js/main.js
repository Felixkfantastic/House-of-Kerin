/* House of Kerin — shared site behavior */

const WHATSAPP_NUMBER = "256706613331"; // +256 706 613331, international format, no plus

function waLink(productName, price){
  const msg = `Hi House of Kerin! I'm interested in the ${productName}${price ? ` (UGX ${Number(price).toLocaleString()})` : ""}. Is it available?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* ------------------------------- Nav behavior ------------------------------ */

function initNav(){
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-menu-toggle");
  const links = document.querySelector(".nav-links");

  if (nav){
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && links){
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "✕" : "☰";
    });
    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.textContent = "☰";
      });
    });
  }
}

/* --------------------------- Scroll reveal (GSAP) --------------------------- */

function initReveal(){
  if (typeof gsap === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll("[data-reveal]").forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: (i % 4) * 0.06,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none"
      }
    });
  });
}

/* --------------------------- Hero frame draw-in ----------------------------- */

function initHeroFrame(){
  const rect = document.querySelector(".hero-frame rect");
  if (!rect) return;
  const length = rect.getTotalLength ? rect.getTotalLength() : 1600;
  rect.style.strokeDasharray = length;
  rect.style.strokeDashoffset = length;

  if (typeof gsap === "undefined"){
    rect.style.strokeDashoffset = 0;
    return;
  }
  gsap.to(rect, {
    strokeDashoffset: 0,
    duration: 1.8,
    ease: "power2.inOut",
    delay: 0.3
  });
  gsap.from(".hero-copy > *", {
    opacity: 0,
    y: 22,
    duration: 0.9,
    stagger: 0.12,
    delay: 0.5,
    ease: "power3.out"
  });
  gsap.from(".hero-photo", {
    opacity: 0,
    scale: 1.06,
    duration: 1.4,
    delay: 0.3,
    ease: "power2.out"
  });
}

/* -------------------------------- Product filters --------------------------- */

function initFilters(){
  const pills = document.querySelectorAll(".filter-pill");
  const cards = document.querySelectorAll(".product-card");
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const filter = pill.dataset.filter;

      cards.forEach(card => {
        const cats = (card.dataset.category || "").split(" ");
        const show = filter === "all" || cats.includes(filter);
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
}

/* --------------------------- Wire up WhatsApp buttons ----------------------- */

function initWhatsappButtons(){
  document.querySelectorAll("[data-wa-name]").forEach(btn => {
    const name = btn.dataset.waName;
    const price = btn.dataset.waPrice;
    btn.href = waLink(name, price);
    btn.target = "_blank";
    btn.rel = "noopener";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initHeroFrame();
  initReveal();
  initFilters();
  initWhatsappButtons();
});

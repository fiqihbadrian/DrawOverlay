/* ==========================================================================
   Stellaire DrawOverlay — Website
   Interaksi ringan tanpa dependensi: nav mobile, akordeon FAQ,
   sorotan TOC docs, animasi muncul saat scroll.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // --- Nav mobile (hamburger) ---
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Tutup menu saat link diklik (mobile)
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- FAQ: buka satu per satu (tutup yang lain) ---
  const faqs = document.querySelectorAll("details.faq");
  faqs.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqs.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  // --- Sorotan TOC docs saat scroll ---
  const tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length) {
    const sections = [];
    tocLinks.forEach(function (link) {
      const id = link.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) sections.push({ id: id, el: el, link: link });
    });

    function highlight() {
      let current = sections[0];
      for (const s of sections) {
        if (s.el.getBoundingClientRect().top <= 120) current = s;
        else break;
      }
      tocLinks.forEach(function (l) {
        l.classList.toggle("active", l === current.link);
      });
    }

    window.addEventListener("scroll", highlight, { passive: true });
    highlight();
  }

  // --- Animasi muncul saat scroll ---
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // --- Tahun footer otomatis ---
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});

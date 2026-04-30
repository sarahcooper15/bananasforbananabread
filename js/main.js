/* ══════════════════════════════════════════════════════
   The Cooper Kitchen — Shared JS (nav + footer injection)
   ══════════════════════════════════════════════════════ */

const LOGO_SVG = `
<svg class="logo-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M8 3v9M6 3v6M10 3v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M8 12v13" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  <ellipse cx="20" cy="7.5" rx="4" ry="5.5" stroke="currentColor" stroke-width="2"/>
  <line x1="20" y1="13" x2="20" y2="25" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
</svg>`;

const NAV_HTML = `
<nav class="site-nav" role="navigation" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="index.html" class="logo" aria-label="The Cooper Kitchen – Home">
      ${LOGO_SVG}
      <span class="logo-text">The Cooper <em>Kitchen</em></span>
    </a>
    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" role="list">
      <li><a href="index.html"                    data-page="home">Home</a></li>
      <li><a href="cooper-family-recipes.html"    data-page="cooper">Cooper Family Recipes</a></li>
      <li><a href="our-favorite-recipes.html"     data-page="favorites">Our Favorite Recipes</a></li>
      <li><a href="recommended-products.html"     data-page="products">Recommended Products</a></li>
    </ul>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      ${LOGO_SVG}
      <span>The Cooper Kitchen</span>
    </div>
    <p class="footer-tagline">Family recipes. Made with love. Passed down forever.</p>
    <nav class="footer-nav" aria-label="Footer navigation">
      <a href="index.html">Home</a>
      <a href="cooper-family-recipes.html">Cooper Family Recipes</a>
      <a href="our-favorite-recipes.html">Our Favorite Recipes</a>
      <a href="recommended-products.html">Recommended Products</a>
    </nav>
    <p class="footer-copy">© ${new Date().getFullYear()} The Cooper Kitchen &nbsp;·&nbsp; Made with love for family</p>
    <p class="footer-disclaimer">This site may contain affiliate links. We may earn a small commission at no extra cost to you — it helps keep the kitchen running!</p>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {

  // ── Inject nav ──────────────────────────────────────
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

  // ── Inject footer ───────────────────────────────────
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // ── Active nav link ─────────────────────────────────
  const currentPage = document.body.dataset.page || '';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ── Mobile toggle ───────────────────────────────────
  const toggle   = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Scroll shadow on nav ────────────────────────────
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ── Fade-in on scroll ───────────────────────────────
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
});

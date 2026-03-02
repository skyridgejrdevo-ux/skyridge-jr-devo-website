/**
 * components.js
 * Injects shared nav and footer into every page.
 * Update this file to change nav/footer across all 7 pages at once.
 *
 * Each page needs:
 *   <div id="site-nav"></div>   — at the top of <body>
 *   <div id="site-footer"></div> — at the bottom of <body>
 *   <script src="/scripts/components.js"></script>
 */

(function () {
  var NAV_HTML = `
<nav>
  <div class="nav-inner">
    <a href="/" class="nav-logo">
      <img src="/assets/images/skyridge_jr-devo_logo.png" alt="Skyridge Jr Devo logo">
      <span>Skyridge Jr Devo<em>Lehi, Utah · NICA</em></span>
    </a>
    <div class="nav-links">
      <a href="/">Home</a>
      <a href="/about.html">About</a>
      <a href="/sponsorships.html">Sponsors</a>
      <a href="/ride-leaders.html">Ride Leaders</a>
      <a href="/rules.html">Rules</a>
      <a href="/contact.html">Contact</a>
      <a href="/registration.html" class="nav-cta">Register</a>
    </div>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav-mobile" role="navigation" aria-label="Mobile navigation">
    <a href="/">Home</a>
    <a href="/about.html">About</a>
    <a href="/sponsorships.html">Sponsorships</a>
    <a href="/ride-leaders.html">Ride Leaders</a>
    <a href="/rules.html">Rules</a>
    <a href="/contact.html">Contact</a>
    <a href="/registration.html">Register for 2026</a>
  </div>
</nav>`;

  var FOOTER_HTML = `
<div class="footer-inner">
  <div class="footer-top">
    <div class="footer-brand">
      <a href="/" class="footer-logo">
        <img src="/assets/images/skyridge_jr-devo_logo.png" alt="Skyridge Jr Devo">
        <span>Skyridge Junior Devo</span>
      </a>
      <p>Youth mountain bike development for 7th &amp; 8th graders in Lehi, Utah. Non-profit. NICA league.</p>
    </div>
    <div class="footer-nav-col">
      <h4>Team</h4>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about.html">About</a></li>
        <li><a href="/registration.html">Registration</a></li>
        <li><a href="/ride-leaders.html">Ride Leaders</a></li>
        <li><a href="/rules.html">Rules</a></li>
      </ul>
    </div>
    <div class="footer-nav-col">
      <h4>Support</h4>
      <ul>
        <li><a href="/sponsorships.html">Sponsorships</a></li>
        <li><a href="/contact.html">Contact Us</a></li>
        <li><a href="https://utahmtb.org/" target="_blank" rel="noopener">Utah MTB (UHSCL)</a></li>
        <li><a href="https://pitzone.nationalmtb.org" target="_blank" rel="noopener">PitZone</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 Skyridge Junior Devo &mdash; Lehi, Utah</span>
    <span>Questions? <a href="mailto:skyridgejrdevo@gmail.com">skyridgejrdevo@gmail.com</a></span>
  </div>
</div>`;

  // Inject nav
  var navEl = document.getElementById('site-nav');
  if (navEl) navEl.innerHTML = NAV_HTML;

  // Inject footer
  var footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  // Highlight active nav link
  var path = window.location.pathname;
  var filename = path.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    var hFile = href.split('/').pop() || 'index.html';
    if (hFile === filename) a.classList.add('active');
    // Home page: match empty path or index.html
    if ((path === '/' || path === '/index.html') && (href === '/' || href === '/index.html')) {
      a.classList.add('active');
    }
  });

  // Mobile menu toggle
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.nav-toggle');
    if (!toggle) return;
    var mobile = document.querySelector('.nav-mobile');
    var open = mobile && mobile.classList.contains('open');
    if (mobile) mobile.classList.toggle('open', !open);
    toggle.classList.toggle('open', !open);
    toggle.setAttribute('aria-expanded', String(!open));
  });
})();

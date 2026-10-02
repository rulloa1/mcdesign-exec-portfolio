import re

out_file = r'C:\Users\roryulloa\.gemini\antigravity-ide\scratch\mcdesign-portfolio\index.html'
with open(out_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Inject Lenis
html = html.replace('</head>', '<script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>\n</head>')

# 1. CSS Adjustments (Noise, Cursor, Loader)
css_additions = """
    /* ── PRO MAX UX/UI UPGRADES ─────────────────────────────────────────── */
    body { cursor: none; } /* Hide default cursor for custom cursor */
    
    /* Noise Texture */
    .noise-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    /* Custom Cursor */
    .cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 6px; height: 6px;
      background: #D4AF37;
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transform: translate(-50%, -50%);
      transition: transform 0.15s ease-out, background 0.3s ease;
    }
    .cursor-ring {
      position: fixed;
      top: 0; left: 0;
      width: 32px; height: 32px;
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease, background 0.3s ease, border-color 0.3s ease;
    }
    /* Hover states for cursor */
    .cursor-hover .cursor-dot { transform: translate(-50%, -50%) scale(0); }
    .cursor-hover .cursor-ring {
      width: 64px; height: 64px;
      background: rgba(212, 175, 55, 0.1);
      border-color: rgba(212, 175, 55, 0.8);
      backdrop-filter: blur(2px);
    }

    /* Initial Loader */
    .loader {
      position: fixed; inset: 0;
      background: #0a0a0a;
      z-index: 99999;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 1s cubic-bezier(0.76, 0, 0.24, 1), transform 1s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .loader.loaded {
      opacity: 0; pointer-events: none; transform: translateY(-20px);
    }
    .loader-text {
      color: #D4AF37;
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    /* Smooth Image Scales on Cards */
    .pcard-img-inner img {
      transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
    }
    .pcard:hover .pcard-img-inner img {
      transform: scale(1.05);
    }
    
    html.lenis { height: auto; }
    .lenis.lenis-smooth { scroll-behavior: auto; }
    .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
    .lenis.lenis-stopped { overflow: hidden; }
    .lenis.lenis-scrolling iframe { pointer-events: none; }
"""
html = html.replace('</style>', css_additions + '\n</style>')

# 2. HTML Elements (Loader, Noise, Cursor)
body_additions = """
<div class="loader" id="loader"><div class="loader-text">mcdesign.bio</div></div>
<div class="noise-overlay"></div>
<div class="cursor-dot" id="cursor-dot"></div>
<div class="cursor-ring" id="cursor-ring"></div>
"""
html = re.sub(r'(<body[^>]*>)', r'\1\n' + body_additions, html)

# 3. JavaScript additions (Lenis init, Cursor logic, Loader remove)
js_additions = """
// ── PRO MAX UX/UI UPGRADES ───────────────────────────────────────────────────

// 1. Lenis Smooth Scrolling
var lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate GSAP with Lenis
if (typeof ScrollTrigger !== 'undefined') {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0, 0);
}

// 2. Custom Cursor Logic
var dot = document.getElementById('cursor-dot');
var ring = document.getElementById('cursor-ring');
var cursorX = window.innerWidth / 2;
var cursorY = window.innerHeight / 2;
var ringX = cursorX;
var ringY = cursorY;

window.addEventListener('mousemove', function(e) {
  cursorX = e.clientX;
  cursorY = e.clientY;
  dot.style.transform = 'translate(calc(' + cursorX + 'px - 50%), calc(' + cursorY + 'px - 50%))';
});

function renderCursor() {
  ringX += (cursorX - ringX) * 0.15; // smooth easing
  ringY += (cursorY - ringY) * 0.15;
  if(ring) {
    ring.style.transform = 'translate(calc(' + ringX + 'px - 50%), calc(' + ringY + 'px - 50%))';
  }
  requestAnimationFrame(renderCursor);
}
requestAnimationFrame(renderCursor);

// Add hover effects to links and buttons
document.querySelectorAll('a, button').forEach(function(el) {
  el.addEventListener('mouseenter', function() { document.body.classList.add('cursor-hover'); });
  el.addEventListener('mouseleave', function() { document.body.classList.remove('cursor-hover'); });
});

// 3. Loader Removal
window.addEventListener('load', function() {
  setTimeout(function() {
    var loader = document.getElementById('loader');
    if(loader) loader.classList.add('loaded');
  }, 400); // slight delay for polish
});
"""

html = html.replace('// ── Scroll Reveal ─────────────────────────────────────────────────────────────', js_additions + '\n// ── Scroll Reveal ─────────────────────────────────────────────────────────────')

with open(out_file, 'w', encoding='utf-8') as f:
    f.write(html)

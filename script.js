/* ═══════════════════════════════════════════════════════
   ISHTAMCHAT — COMING SOON PAGE
   Interactive canvas particles + typewriter effect
   Pure vanilla JS — zero dependencies
   ═══════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ─── Typewriter ────────────────────────────────────── */
  const taglines = [
    "Where hearts find their home\u2026",
    "Meaningful connections, thoughtfully made.",
    "Your story of love begins here.",
    "Discover someone who truly understands you.",
  ];

  const typewriterEl = document.getElementById("typewriter-text");
  let taglineIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeStep() {
    const current = taglines[taglineIdx];

    if (!isDeleting) {
      charIdx++;
      typewriterEl.textContent = current.slice(0, charIdx);
      if (charIdx >= current.length) {
        // Pause before deleting
        setTimeout(function () {
          isDeleting = true;
          typeStep();
        }, 2400);
        return;
      }
      setTimeout(typeStep, 60 + Math.random() * 45);
    } else {
      charIdx--;
      typewriterEl.textContent = current.slice(0, charIdx);
      if (charIdx <= 0) {
        isDeleting = false;
        taglineIdx = (taglineIdx + 1) % taglines.length;
        setTimeout(typeStep, 350);
        return;
      }
      setTimeout(typeStep, 28);
    }
  }

  // Start after entry animation
  setTimeout(typeStep, 800);

  /* ─── Email signup form ─────────────────────────────── */
  var form = document.getElementById("signup-form");
  var emailInput = document.getElementById("email-input");
  var errorEl = document.getElementById("email-error");
  var successEl = document.getElementById("signup-success");
  var confirmedEmailEl = document.getElementById("confirmed-email");

  // Simple email regex — intentionally permissive
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorEl.hidden = true;
    errorEl.textContent = "";

    var value = emailInput.value.trim();

    if (!value) {
      showError("Please enter your email address.");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      showError("Please enter a valid email address.");
      return;
    }

    // In production, POST to your backend here.
    // Example:
    // fetch('/api/early-access', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: value })
    // });

    confirmedEmailEl.textContent = value;
    form.hidden = true;
    successEl.hidden = false;
  });

  emailInput.addEventListener("input", function () {
    errorEl.hidden = true;
    errorEl.textContent = "";
  });

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  /* ─── Heart particle canvas ─────────────────────────── */
  var canvas = document.getElementById("heart-canvas");
  var ctx = canvas.getContext("2d");
  var particles = [];
  var mouse = { x: -1, y: -1 };

  var COLORS = [
    "rgba(122, 24, 53, 0.35)",
    "rgba(199, 122, 139, 0.30)",
    "rgba(216, 178, 140, 0.25)",
    "rgba(167, 88, 106, 0.28)",
    "rgba(92, 16, 39, 0.20)",
    "rgba(248, 200, 210, 0.22)",
  ];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    var count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.3 - 0.1,
        size: Math.random() * 14 + 6,
        alpha: Math.random() * 0.4 + 0.1,
        aDir: Math.random() > 0.5 ? 1 : -1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.02,
      });
    }
  }

  function drawHeart(x, y, size) {
    ctx.beginPath();
    var top = size * 0.3;
    ctx.moveTo(x, y + top);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + top);
    ctx.bezierCurveTo(x - size / 2, y + (size + top) / 2, x, y + (size + top) / 1.5, x, y + size);
    ctx.bezierCurveTo(x, y + (size + top) / 1.5, x + size / 2, y + (size + top) / 2, x + size / 2, y + top);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + top);
    ctx.closePath();
  }

  function animate() {
    var w = canvas.width;
    var h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // Mouse interaction — gentle push away
      if (mouse.x >= 0) {
        var dx = p.x - mouse.x;
        var dy = p.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          var force = ((160 - dist) / 160) * 0.6;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }
      }

      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rotV;

      // Breathing alpha
      p.alpha += p.aDir * 0.003;
      if (p.alpha > 0.5) { p.alpha = 0.5; p.aDir = -1; }
      if (p.alpha < 0.05) { p.alpha = 0.05; p.aDir = 1; }

      // Drag
      p.vx *= 0.995;
      p.vy *= 0.995;

      // Wrap edges
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      drawHeart(0, -p.size / 2, p.size);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  // Pointer tracking (works with mouse and touch)
  window.addEventListener("pointermove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("pointerleave", function () {
    mouse.x = -1;
    mouse.y = -1;
  });

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  requestAnimationFrame(animate);
})();

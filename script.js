/**
 * ISHTAMCHAT — COMING SOON PAGE
 * Interactive Vibrant Features:
 * 1. Multi-color Glowing Sparkles & Heart particles on Canvas
 * 2. Mouse cursor trailing particle bursts
 * 3. Typewriter rotator with romantic matrimonial phrases
 * 4. Form validation, VIP reserving animation & colorful confetti burst
 * 5. Smooth card 3D tilt responsiveness
 */

(function () {
  "use strict";

  /* ─── 1. Typewriter Tagline Rotator ────────────────────────────── */
  var taglines = [
    "Where hearts find their true home…",
    "Deep compatibility, crafted for forever.",
    "Meaningful marriages begin with genuine trust.",
    "No swiping. Pure intention & verified souls.",
    "Your next chapter of love begins right here."
  ];

  var typewriterEl = document.getElementById("typewriter-text");
  var taglineIdx = 0;
  var charIdx = 0;
  var isDeleting = false;
  var typeSpeed = 50;

  function typeLoop() {
    var currentPhrase = taglines[taglineIdx];

    if (!isDeleting) {
      charIdx++;
      typewriterEl.textContent = currentPhrase.substring(0, charIdx);

      if (charIdx >= currentPhrase.length) {
        setTimeout(function () {
          isDeleting = true;
          typeLoop();
        }, 2800);
        return;
      }
      setTimeout(typeLoop, typeSpeed + Math.random() * 20);
    } else {
      charIdx--;
      typewriterEl.textContent = currentPhrase.substring(0, charIdx);

      if (charIdx <= 0) {
        isDeleting = false;
        taglineIdx = (taglineIdx + 1) % taglines.length;
        setTimeout(typeLoop, 450);
        return;
      }
      setTimeout(typeLoop, 22);
    }
  }

  setTimeout(typeLoop, 900);

  /* ─── 2. Email VIP Form & Submission ───────────────────────────── */
  var form = document.getElementById("waitlist-form");
  var emailInput = document.getElementById("email-input");
  var errorEl = document.getElementById("email-error");
  var successCard = document.getElementById("signup-success");
  var confirmedEmailEl = document.getElementById("confirmed-email");
  var resetBtn = document.getElementById("reset-btn");
  var submitBtn = document.getElementById("submit-btn");

  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearError();

    var email = emailInput.value.trim();

    if (!email) {
      triggerError("Please provide your email address to receive an invitation.");
      emailInput.focus();
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      triggerError("Please enter a valid email address (e.g., name@example.com).");
      emailInput.focus();
      return;
    }

    // Interactive button state
    submitBtn.disabled = true;
    var btnText = submitBtn.querySelector(".btn-text");
    var originalText = btnText.textContent;
    btnText.textContent = "Securing Spot...";

    setTimeout(function () {
      confirmedEmailEl.textContent = email;
      form.hidden = true;
      successCard.hidden = false;

      submitBtn.disabled = false;
      btnText.textContent = originalText;

      // Launch vibrant confetti explosion
      launchCelebration();
    }, 500);
  });

  emailInput.addEventListener("input", function () {
    if (!errorEl.hidden) {
      clearError();
    }
  });

  resetBtn.addEventListener("click", function () {
    successCard.hidden = true;
    form.hidden = false;
    emailInput.value = "";
    clearError();
    emailInput.focus();
  });

  function triggerError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  function clearError() {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  /* ─── 3. 3D Card Interactive Tilt ───────────────────────────────── */
  var card = document.getElementById("main-card");
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (card && !isTouch && window.innerWidth > 992) {
    document.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      var dx = (e.clientX - cx) / (window.innerWidth / 2);
      var dy = (e.clientY - cy) / (window.innerHeight / 2);

      var rotX = dy * -3.8;
      var rotY = dx * 3.8;

      card.style.transform = "perspective(1200px) rotateX(" + rotX.toFixed(2) + "deg) rotateY(" + rotY.toFixed(2) + "deg)";
    });

    document.addEventListener("mouseleave", function () {
      card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    });
  }

  /* ─── 4. Vibrant Magical Canvas Sparkles & Heart Embers ─────────── */
  var canvas = document.getElementById("sparkle-canvas");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var trailParticles = [];
    var mouse = { x: -1, y: -1, prevX: -1, prevY: -1 };

    var VIBRANT_PALETTE = [
      { r: 255, g: 42, b: 95 },   // Ruby Neon
      { r: 255, g: 176, b: 32 },  // Amber Glow
      { r: 255, g: 90, b: 121 },  // Neon Rose
      { r: 217, g: 27, b: 92 },   // Deep Magenta
      { r: 168, g: 85, b: 247 },  // Electric Violet
      { r: 255, g: 215, b: 0 }    // Pure Gold
    ];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBackgroundParticles();
    }

    function initBackgroundParticles() {
      particles = [];
      var count = Math.min(Math.floor((canvas.width * canvas.height) / 22000), 55);
      for (var i = 0; i < count; i++) {
        particles.push(createAmbientParticle(true));
      }
    }

    function createAmbientParticle(randomY) {
      var colorObj = VIBRANT_PALETTE[Math.floor(Math.random() * VIBRANT_PALETTE.length)];
      var isHeart = Math.random() > 0.72; // ~28% floating micro-hearts

      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 15,
        size: isHeart ? Math.random() * 8 + 6 : Math.random() * 3 + 1.2,
        isHeart: isHeart,
        color: colorObj,
        alpha: Math.random() * 0.65 + 0.25,
        speedY: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulseDir: Math.random() > 0.5 ? 1 : -1
      };
    }

    function drawMiniHeart(x, y, size) {
      ctx.beginPath();
      var top = size * 0.3;
      ctx.moveTo(x, y + top);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + top);
      ctx.bezierCurveTo(x - size / 2, y + (size + top) / 2, x, y + (size + top) / 1.5, x, y + size);
      ctx.bezierCurveTo(x, y + (size + top) / 1.5, x + size / 2, y + (size + top) / 2, x + size / 2, y + top);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + top);
      ctx.closePath();
    }

    // Mouse movement adds dynamic romantic sparkles
    window.addEventListener("pointermove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (mouse.prevX !== -1) {
        var dist = Math.hypot(mouse.x - mouse.prevX, mouse.y - mouse.prevY);
        if (dist > 8 && trailParticles.length < 40) {
          var col = VIBRANT_PALETTE[Math.floor(Math.random() * VIBRANT_PALETTE.length)];
          trailParticles.push({
            x: mouse.x + (Math.random() - 0.5) * 12,
            y: mouse.y + (Math.random() - 0.5) * 12,
            size: Math.random() * 4 + 2,
            color: col,
            alpha: 1,
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * -1.5 - 0.5,
            life: 1,
            decay: Math.random() * 0.03 + 0.02
          });
        }
      }
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    });

    window.addEventListener("pointerleave", function () {
      mouse.x = -1;
      mouse.y = -1;
      mouse.prevX = -1;
      mouse.prevY = -1;
    });

    function renderCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Ambient Floating Glow Particles & Hearts
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.alpha += p.pulseDir * p.pulseSpeed;
        if (p.alpha >= 0.85) { p.alpha = 0.85; p.pulseDir = -1; }
        if (p.alpha <= 0.15) { p.alpha = 0.15; p.pulseDir = 1; }

        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
          particles[i] = createAmbientParticle(false);
          continue;
        }

        var colStr = "rgba(" + p.color.r + "," + p.color.g + "," + p.color.b + ",";

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.shadowColor = colStr + "0.8)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = colStr + p.alpha + ")";

        if (p.isHeart) {
          drawMiniHeart(0, -p.size / 2, p.size);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Render Mouse Trail Sparkles
      for (var t = trailParticles.length - 1; t >= 0; t--) {
        var tp = trailParticles[t];
        tp.x += tp.vx;
        tp.y += tp.vy;
        tp.alpha -= tp.decay;

        if (tp.alpha <= 0) {
          trailParticles.splice(t, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, tp.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + tp.color.r + "," + tp.color.g + "," + tp.color.b + "," + tp.alpha + ")";
        ctx.shadowColor = "rgba(" + tp.color.r + "," + tp.color.g + "," + tp.color.b + ", 0.9)";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(renderCanvas);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    requestAnimationFrame(renderCanvas);
  }

  /* ─── 5. Colorful Confetti Celebration Fireworks ───────────────── */
  function launchCelebration() {
    if (!canvas || !ctx) return;
    var burstCount = 50;
    var fireworks = [];
    var cx = canvas.width / 2;
    var cy = canvas.height / 2;

    for (var i = 0; i < burstCount; i++) {
      var angle = Math.random() * Math.PI * 2;
      var speed = Math.random() * 8 + 3;
      var col = VIBRANT_PALETTE[Math.floor(Math.random() * VIBRANT_PALETTE.length)];
      fireworks.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 3,
        color: col,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.012
      });
    }

    function animateCelebration() {
      if (fireworks.length === 0) return;

      for (var j = fireworks.length - 1; j >= 0; j--) {
        var f = fireworks[j];
        f.x += f.vx;
        f.y += f.vy;
        f.vy += 0.12; // gentle gravity
        f.alpha -= f.decay;

        if (f.alpha <= 0) {
          fireworks.splice(j, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + f.color.r + "," + f.color.g + "," + f.color.b + "," + f.alpha + ")";
        ctx.shadowColor = "rgba(" + f.color.r + "," + f.color.g + "," + f.color.b + ", 0.9)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      if (fireworks.length > 0) {
        requestAnimationFrame(animateCelebration);
      }
    }

    requestAnimationFrame(animateCelebration);
  }

})();

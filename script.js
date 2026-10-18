/**
 * ISHTAMCHAT — COMING SOON PAGE
 * Open-Canvas Interactive Features:
 * 1. Multi-intent pillar tab switcher (Marriage, Living Together, Friendship)
 * 2. Typewriter rotator responding dynamically to selected intent
 * 3. VIP Early access form handling & multi-colored celebration confetti
 * 4. Ambient light bokeh canvas particles + gentle mouse spark trail
 */

(function () {
  "use strict";

  /* ─── 1. Intent Switcher & Dynamic Taglines ──────────────────────── */
  var INTENT_TAGLINES = {
    all: [
      "Whether marriage, living together, or genuine friendship…",
      "Find someone who truly aligns with what you seek.",
      "Meaningful compatibility, zero superficial swiping.",
      "Deep connections rooted in shared values & mutual trust.",
      "Your story begins with authentic intentions."
    ],
    marriage: [
      "Finding a lifelong companion built on mutual values & trust.",
      "Thoughtful matchmaking designed for marriage intentions.",
      "Where two families and two hearts connect with purpose.",
      "Verified profiles with genuine lifelong intentions."
    ],
    living: [
      "Discover someone compatible to share your life and home with.",
      "Co-living & companionship based on real lifestyle harmony.",
      "Explore shared futures with honesty, trust, and openness.",
      "Designed for modern couples looking to build together."
    ],
    friendship: [
      "Connect with kindred spirits and build genuine friendships.",
      "Deep conversations and real bonds beyond casual swiping.",
      "Find friends who share your passions, values, and humor.",
      "Authentic connections that enrich your everyday life."
    ]
  };

  var currentIntent = "all";
  var taglines = INTENT_TAGLINES[currentIntent];
  var typewriterEl = document.getElementById("typewriter-text");
  var taglineIdx = 0;
  var charIdx = 0;
  var isDeleting = false;
  var typeTimer = null;
  var typeSpeed = 48;

  function typeLoop() {
    var currentPhrase = taglines[taglineIdx];
    if (!currentPhrase) {
      taglineIdx = 0;
      currentPhrase = taglines[0];
    }

    if (!isDeleting) {
      charIdx++;
      typewriterEl.textContent = currentPhrase.substring(0, charIdx);

      if (charIdx >= currentPhrase.length) {
        typeTimer = setTimeout(function () {
          isDeleting = true;
          typeLoop();
        }, 2800);
        return;
      }
      typeTimer = setTimeout(typeLoop, typeSpeed + Math.random() * 20);
    } else {
      charIdx--;
      typewriterEl.textContent = currentPhrase.substring(0, charIdx);

      if (charIdx <= 0) {
        isDeleting = false;
        taglineIdx = (taglineIdx + 1) % taglines.length;
        typeTimer = setTimeout(typeLoop, 450);
        return;
      }
      typeTimer = setTimeout(typeLoop, 22);
    }
  }

  typeTimer = setTimeout(typeLoop, 800);

  // Intent Switcher Tabs Click Handler
  var intentTabs = document.querySelectorAll(".intent-tab");
  intentTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      intentTabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      var selectedIntent = tab.getAttribute("data-intent");
      if (selectedIntent && INTENT_TAGLINES[selectedIntent]) {
        currentIntent = selectedIntent;
        taglines = INTENT_TAGLINES[currentIntent];

        // Reset typewriter to new intent immediately
        clearTimeout(typeTimer);
        isDeleting = false;
        charIdx = 0;
        taglineIdx = 0;
        typewriterEl.textContent = "";
        typeLoop();
      }
    });
  });

  /* ─── 2. Email VIP Form & Submission ───────────────────────────── */
  var form = document.getElementById("waitlist-form");
  var emailInput = document.getElementById("email-input");
  var errorEl = document.getElementById("email-error");
  var successPanel = document.getElementById("signup-success");
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

    // Button loading animation
    submitBtn.disabled = true;
    var btnText = submitBtn.querySelector(".btn-text");
    var originalText = btnText.textContent;
    btnText.textContent = "Reserving Spot...";

    setTimeout(function () {
      confirmedEmailEl.textContent = email;
      form.hidden = true;
      successPanel.hidden = false;

      submitBtn.disabled = false;
      btnText.textContent = originalText;

      // Launch celebration fireworks
      launchCelebration();
    }, 450);
  });

  emailInput.addEventListener("input", function () {
    if (!errorEl.hidden) {
      clearError();
    }
  });

  resetBtn.addEventListener("click", function () {
    successPanel.hidden = true;
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

  /* ─── 3. Ambient Bokeh Particle Canvas ─────────────────────────── */
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
      var count = Math.min(Math.floor((canvas.width * canvas.height) / 24000), 50);
      for (var i = 0; i < count; i++) {
        particles.push(createAmbientParticle(true));
      }
    }

    function createAmbientParticle(randomY) {
      var colorObj = VIBRANT_PALETTE[Math.floor(Math.random() * VIBRANT_PALETTE.length)];

      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 15,
        size: Math.random() * 3.5 + 1.5,
        color: colorObj,
        alpha: Math.random() * 0.65 + 0.25,
        speedY: Math.random() * 0.45 + 0.18,
        speedX: (Math.random() - 0.5) * 0.25,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulseDir: Math.random() > 0.5 ? 1 : -1
      };
    }

    // Gentle cursor trail
    window.addEventListener("pointermove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (mouse.prevX !== -1) {
        var dist = Math.hypot(mouse.x - mouse.prevX, mouse.y - mouse.prevY);
        if (dist > 10 && trailParticles.length < 35) {
          var col = VIBRANT_PALETTE[Math.floor(Math.random() * VIBRANT_PALETTE.length)];
          trailParticles.push({
            x: mouse.x + (Math.random() - 0.5) * 10,
            y: mouse.y + (Math.random() - 0.5) * 10,
            size: Math.random() * 3.5 + 1.5,
            color: col,
            alpha: 0.9,
            vx: (Math.random() - 0.5) * 1.2,
            vy: Math.random() * -1.2 - 0.4,
            decay: Math.random() * 0.035 + 0.025
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

      // Render Ambient Bokeh Circles
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.alpha += p.pulseDir * p.pulseSpeed;
        if (p.alpha >= 0.85) { p.alpha = 0.85; p.pulseDir = -1; }
        if (p.alpha <= 0.15) { p.alpha = 0.15; p.pulseDir = 1; }

        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
          particles[i] = createAmbientParticle(false);
          continue;
        }

        var colStr = "rgba(" + p.color.r + "," + p.color.g + "," + p.color.b + ",";

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.shadowColor = colStr + "0.8)";
        ctx.shadowBlur = 8;
        ctx.fillStyle = colStr + p.alpha + ")";
        ctx.fill();
        ctx.restore();
      }

      // Render Mouse Trail
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
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(renderCanvas);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    requestAnimationFrame(renderCanvas);
  }

  /* ─── 4. Celebration Confetti Explosion ────────────────────────── */
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
        f.vy += 0.12;
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

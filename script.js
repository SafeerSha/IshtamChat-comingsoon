/**
 * ISHTAMCHAT — COMING SOON PAGE
 * Interactive Google Stitch inspired behaviors:
 * 1. Gentle ambient stardust canvas
 * 2. Elegant typewriter tagline rotator
 * 3. Form validation, submission & smooth state switching
 * 4. Subtle 3D card tilt & tactile physics
 */

(function () {
  "use strict";

  /* ─── 1. Tagline Rotator (Typewriter) ────────────────────────── */
  var taglines = [
    "Where hearts find their true home…",
    "Meaningful compatibility, thoughtfully curated.",
    "Conversations that lead to forever.",
    "Privacy-first discovery for modern relationships."
  ];

  var typewriterEl = document.getElementById("typewriter-text");
  var taglineIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typingSpeed = 55;

  function typeLoop() {
    var currentText = taglines[taglineIndex];

    if (!isDeleting) {
      charIndex++;
      typewriterEl.textContent = currentText.substring(0, charIndex);

      if (charIndex >= currentText.length) {
        // Pause when full phrase typed
        setTimeout(function () {
          isDeleting = true;
          typeLoop();
        }, 2600);
        return;
      }
      setTimeout(typeLoop, typingSpeed + (Math.random() * 25));
    } else {
      charIndex--;
      typewriterEl.textContent = currentText.substring(0, charIndex);

      if (charIndex <= 0) {
        isDeleting = false;
        taglineIndex = (taglineIndex + 1) % taglines.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 25);
    }
  }

  // Initial delay before typing starts
  setTimeout(typeLoop, 1000);

  /* ─── 2. Email Signup Handling ───────────────────────────────── */
  var form = document.getElementById("waitlist-form");
  var emailInput = document.getElementById("email-input");
  var errorEl = document.getElementById("email-error");
  var successCard = document.getElementById("signup-success");
  var confirmedEmailEl = document.getElementById("confirmed-email");
  var resetBtn = document.getElementById("reset-btn");
  var submitBtn = document.getElementById("submit-btn");

  // Email regex (standard RFC 5322 compatible check)
  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    hideError();

    var emailValue = emailInput.value.trim();

    if (!emailValue) {
      showError("Please enter your email address to continue.");
      emailInput.focus();
      return;
    }

    if (!EMAIL_REGEX.test(emailValue)) {
      showError("Please enter a valid email address (e.g., name@example.com).");
      emailInput.focus();
      return;
    }

    // Button loading feedback
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.75";
    var originalBtnText = submitBtn.querySelector(".btn-text").textContent;
    submitBtn.querySelector(".btn-text").textContent = "Reserving...";

    // Simulated quick async confirmation (backend hook point)
    setTimeout(function () {
      confirmedEmailEl.textContent = emailValue;
      form.hidden = true;
      successCard.hidden = false;

      // Restore button
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      submitBtn.querySelector(".btn-text").textContent = originalBtnText;

      // Gentle celebratory micro-particle burst
      burstConfetti();
    }, 450);
  });

  emailInput.addEventListener("input", function () {
    if (!errorEl.hidden) {
      hideError();
    }
  });

  resetBtn.addEventListener("click", function () {
    successCard.hidden = true;
    form.hidden = false;
    emailInput.value = "";
    hideError();
    emailInput.focus();
  });

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  function hideError() {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  /* ─── 3. Subtle 3D Card Tilt Effect on Hover (Desktop) ────────── */
  var card = document.getElementById("main-card");
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (card && !isTouchDevice && window.innerWidth > 992) {
    document.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var cardX = rect.left + rect.width / 2;
      var cardY = rect.top + rect.height / 2;

      var deltaX = (e.clientX - cardX) / (window.innerWidth / 2);
      var deltaY = (e.clientY - cardY) / (window.innerHeight / 2);

      var rotateX = deltaY * -3.5;
      var rotateY = deltaX * 3.5;

      card.style.transform = "perspective(1200px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg)";
    });

    document.addEventListener("mouseleave", function () {
      card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    });
  }

  /* ─── 4. Ambient Stardust Canvas (Subtle Floating Embers) ──────── */
  var canvas = document.getElementById("ambient-canvas");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var stars = [];
    var maxStars = 45;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    }

    function initStars() {
      stars = [];
      var count = Math.min(Math.floor((canvas.width * canvas.height) / 28000), maxStars);
      for (var i = 0; i < count; i++) {
        stars.push(createStar(true));
      }
    }

    function createStar(randomY) {
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 10,
        radius: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.45 ? "rgba(197, 155, 114, " : "rgba(184, 93, 115, ",
        alpha: Math.random() * 0.45 + 0.15,
        speedY: Math.random() * 0.35 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        fadeSpeed: (Math.random() * 0.004) + 0.002,
        fadeIn: Math.random() > 0.5
      };
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];

        // Alpha twinkle
        if (s.fadeIn) {
          s.alpha += s.fadeSpeed;
          if (s.alpha >= 0.6) s.fadeIn = false;
        } else {
          s.alpha -= s.fadeSpeed;
          if (s.alpha <= 0.05) s.fadeIn = true;
        }

        s.y -= s.speedY;
        s.x += s.speedX;

        // Reset if drifted outside
        if (s.y < -10 || s.x < -10 || s.x > canvas.width + 10) {
          stars[i] = createStar(false);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.max(0, Math.min(1, s.alpha)) + ")";
        ctx.shadowColor = s.color + "0.6)";
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      requestAnimationFrame(drawStars);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    requestAnimationFrame(drawStars);
  }

  /* ─── 5. Micro Confetti Burst on Signup ───────────────────────── */
  function burstConfetti() {
    if (!canvas || !ctx) return;
    var burstCount = 28;
    var burstParticles = [];
    var cx = canvas.width / 2;
    var cy = canvas.height / 2;

    for (var i = 0; i < burstCount; i++) {
      var angle = Math.random() * Math.PI * 2;
      var velocity = Math.random() * 5 + 2;
      burstParticles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: Math.random() * 4 + 2,
        color: i % 2 === 0 ? "rgba(197, 155, 114," : "rgba(107, 17, 43,",
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }

    function animateBurst() {
      if (burstParticles.length === 0) return;

      for (var j = burstParticles.length - 1; j >= 0; j--) {
        var p = burstParticles[j];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          burstParticles.splice(j, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();
      }

      if (burstParticles.length > 0) {
        requestAnimationFrame(animateBurst);
      }
    }

    requestAnimationFrame(animateBurst);
  }

})();

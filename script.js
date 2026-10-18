/**
 * ISHTAMCHAT — COMING SOON
 * Minimal, Classy, Zero-Clutter Logic:
 * 1. Email validation & success state transition
 * 2. Subtle ambient floating champagne/burgundy bokeh glow
 */

(function () {
  "use strict";

  /* ─── 1. Email Signup Form Handling ────────────────────────────── */
  var form = document.getElementById("waitlist-form");
  var emailInput = document.getElementById("email-input");
  var errorEl = document.getElementById("email-error");
  var successPanel = document.getElementById("signup-success");
  var confirmedEmailEl = document.getElementById("confirmed-email");
  var resetBtn = document.getElementById("reset-btn");
  var submitBtn = document.getElementById("submit-btn");

  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearError();

      var email = emailInput.value.trim();

      if (!email) {
        showError("Please enter your email address.");
        emailInput.focus();
        return;
      }

      if (!EMAIL_REGEX.test(email)) {
        showError("Please enter a valid email address.");
        emailInput.focus();
        return;
      }

      // Button feedback
      submitBtn.disabled = true;
      var btnText = submitBtn.querySelector(".btn-text");
      var originalText = btnText ? btnText.textContent : "Get Notified";
      if (btnText) btnText.textContent = "Submitting...";

      setTimeout(function () {
        confirmedEmailEl.textContent = email;
        form.hidden = true;
        successPanel.hidden = false;

        submitBtn.disabled = false;
        if (btnText) btnText.textContent = originalText;
      }, 350);
    });

    emailInput.addEventListener("input", function () {
      if (!errorEl.hidden) {
        clearError();
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        successPanel.hidden = true;
        form.hidden = false;
        emailInput.value = "";
        clearError();
        emailInput.focus();
      });
    }
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  function clearError() {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  /* ─── 2. Subtle Luxury Ambient Bokeh Canvas ─────────────────────── */
  var canvas = document.getElementById("sparkle-canvas");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var particles = [];

    // App's signature luxury palette: Champagne Gold, Blush Rose, Soft Burgundy
    var LUXURY_COLORS = [
      { r: 216, g: 178, b: 140 }, // Champagne Gold (#D8B28C)
      { r: 199, g: 122, b: 139 }, // Blush Rose (#C77A8B)
      { r: 122, g: 24,  b: 53  }, // Royal Burgundy (#7A1835)
      { r: 247, g: 232, b: 235 }  // Warm Pearl Ivory
    ];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    function initParticles() {
      particles = [];
      var count = Math.min(Math.floor((canvas.width * canvas.height) / 32000), 35);
      for (var i = 0; i < count; i++) {
        particles.push(createParticle(true));
      }
    }

    function createParticle(randomY) {
      var colorObj = LUXURY_COLORS[Math.floor(Math.random() * LUXURY_COLORS.length)];

      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 15,
        size: Math.random() * 2.8 + 1.2,
        color: colorObj,
        alpha: Math.random() * 0.45 + 0.15,
        speedY: Math.random() * 0.35 + 0.12,
        speedX: (Math.random() - 0.5) * 0.18,
        pulseSpeed: Math.random() * 0.012 + 0.004,
        pulseDir: Math.random() > 0.5 ? 1 : -1
      };
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.alpha += p.pulseDir * p.pulseSpeed;
        if (p.alpha >= 0.65) { p.alpha = 0.65; p.pulseDir = -1; }
        if (p.alpha <= 0.12) { p.alpha = 0.12; p.pulseDir = 1; }

        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -15 || p.x < -15 || p.x > canvas.width + 15) {
          particles[i] = createParticle(false);
          continue;
        }

        var colStr = "rgba(" + p.color.r + "," + p.color.g + "," + p.color.b + ",";

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.shadowColor = colStr + "0.6)";
        ctx.shadowBlur = 6;
        ctx.fillStyle = colStr + p.alpha + ")";
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(renderCanvas);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    requestAnimationFrame(renderCanvas);
  }

})();

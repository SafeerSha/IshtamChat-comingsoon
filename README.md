# IshtamChat — Coming Soon Page

A simple, attractive, and beautiful "Coming Soon" landing page for **IshtamChat**, redesigned with **Google Stitch & Material 3 Expressive** design principles.

## ✨ Design & Features

- **Google Stitch Elevated Architecture**: Clean, floating frosted glass/ceramic card container (`backdrop-filter: blur(28px)`) with subtle 3D hover physics.
- **Warm Ambient Fluid Lighting**: Multi-layered organic radial mesh in deep royal burgundy, warm champagne gold, and soft blush rose.
- **Stitch Unified Pill Form**: Seamless email capsule input with an embedded icon, sleek typography, and a glowing CTA button.
- **Delicate Ambient Stardust**: Non-distracting, golden and rose floating stardust canvas that gently drifts and twinkles.
- **Typewriter Rotator**: Smooth cycling between curated brand taglines.
- **Stitch Feature Chips**: Three pill badges highlighting key value propositions:
  - 🛡️ 100% Verified Profiles
  - 💫 Deep Compatibility
  - 🔒 Privacy By Design
- **Polished State Transitions**: Clean error handling with shake animation, smooth VIP invitation confirmation card with confetti micro-burst, and "Add another email" reset.
- **Zero Dependencies**: Pure HTML5, Vanilla CSS, and lightweight JavaScript. No frameworks or heavy libraries needed.

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or serve it with any static server:

```bash
# Serve locally on port 4000:
npx -y serve -p 4000 .
```

Then visit: [http://localhost:4000](http://localhost:4000)

## 🔌 Connecting Email Collection to Backend

In `script.js`, find the submit handler inside `form.addEventListener("submit", ...)`:

```javascript
// Replace the setTimeout with your backend endpoint:
fetch('https://api.ishtamchat.com/v1/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: emailValue })
});
```

## 📦 Project Structure

```
ishtamchat-coming-soon/
├── index.html    # Semantic, accessible HTML with SEO meta tags
├── styles.css    # Google Stitch design tokens, fluid lighting & animations
├── script.js     # Stardust canvas, typewriter, 3D tilt & form logic
└── README.md     # Documentation
```

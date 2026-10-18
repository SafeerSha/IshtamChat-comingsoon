# IshtamChat — Coming Soon Page

A premium, interactive "Coming Soon" landing page for IshtamChat.

## Features

- 🎨 **Animated gradient background** with floating glow orbs
- 💕 **Interactive heart particles** that react to mouse movement (canvas-based)
- ✍️ **Typewriter tagline** cycling through romantic phrases
- 📧 **Email signup form** with client-side validation (backend-ready)
- 📱 **Fully responsive** — looks great on mobile, tablet, and desktop
- ♿ **Accessible** — ARIA labels, reduced-motion support, semantic HTML
- ⚡ **Zero dependencies** — pure HTML, CSS, and vanilla JavaScript

## Getting Started

Just open `index.html` in a browser. No build step, no node_modules, nothing to install.

```bash
# Or serve it locally:
npx -y serve .
```

## Connecting the Email Backend

In `script.js`, find the `form.addEventListener("submit", ...)` handler.  
Uncomment and update the `fetch(...)` call to POST to your backend API:

```js
fetch('/api/early-access', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: value })
});
```

## Deployment

This is a static site — deploy anywhere:

- **Vercel**: `npx -y vercel --prod`
- **Netlify**: Drag & drop the folder
- **GitHub Pages**: Push and enable Pages in repo settings
- **Any web server**: Just serve the 3 files

## File Structure

```
ishtamchat-coming-soon/
├── index.html    ← Main HTML page
├── styles.css    ← All styles + animations + responsive
├── script.js     ← Typewriter + particles + form logic
└── README.md
```

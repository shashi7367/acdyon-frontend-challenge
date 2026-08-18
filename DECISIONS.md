# Project Decisions & Design Rationale

This document summarizes the core technical decisions, trade-offs, and verification steps made during the development of the Portlight landing page.

---

## 1. Why Vanilla HTML/CSS/JS Over Next.js/React/Tailwind?

The obvious alternative for a modern SaaS home page is a framework stack like Next.js or Vite+React, combined with TailwindCSS and component libraries. We rejected this route in favor of pure **Semantic HTML5, Vanilla CSS, and ES6 JavaScript** for three reasons:

* **Zero Build Overhead & Security:** A static website has zero compilation steps, no security vulnerability warnings in dependency trees (`npm audit`), and works out of the box on any free static provider (GitHub Pages, Netlify, Vercel).
* **Frictionless Responsive Customization:** Designing a realistic interactive dashboard with a side-drawer inspector and custom status filters is easier to control using custom CSS Grid, Flexbox, and CSS properties than fighting Tailwind configurations or component wrapper abstractions.
* **100% Code Ownership:** The code is completely self-contained. Every line of Javascript logic and CSS rule is directly inspectable and defendable line-by-line in a technical interview, avoiding dependency black boxes.

---

## 2. Time Limit Trade-offs & Next Steps

* **Current Trade-off:** The dashboard log proxy streams simulated localhost data instead of linking to a live CLI service.
* **What I'd do with a full week:**
  1. Build a functional Go-based CLI proxy daemon that intercepts local loopback port sockets and opens a secure localhost WebSocket server.
  2. Connect the landing page Web UI directly to that websocket connection (`ws://localhost:9900/stream`), converting the landing page mockup into a fully operational local developer tool.
  3. Support full dark/light theme switching based on operating system preferences, rather than a hardcoded dark-first design.

---

## 3. AI Usage & Verification

* **AI Assistance:** AI was utilized to draft initial HTML sections, suggest vector patterns for SVG icons, generate mock JSON database payloads for the inspector, and map key events for the Konami sequence.
* **What I Personally Verified & Tuned:**
  * **Layout & Responsiveness:** Re-engineered the dashboard layout to stack vertically on screen widths below `820px` to prevent table columns clipping or horizontal overflow.
  * **State Management:** Wrote the filtering and rendering logic inside `index.js` manually to ensure selecting specific ports or search terms doesn't disrupt the active log streaming loop.
  * **Accessibility & Details:** Verified keyboard-navigable interactive status buttons, clean contrast colors matching AAA readability standards, and clipboard copy success indicators.

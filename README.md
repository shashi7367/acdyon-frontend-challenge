# Portlight — Local HTTP Traffic Inspector & Tunnel

A privacy-focused, local-first HTTP traffic inspector and tunnel manager for developers. Intercept localhost server requests, inspect HTTP headers and JSON payloads, and share secure public tunnels—completely private, straight from your machine.

This project is a premium home page design and interactive mockup submission built for the **Acdyon Technologies Frontend Challenge (Part 2)**.

---

## 🌟 Key Features

* **Zero-Configuration Intercept:** Proxy local loopback port sockets automatically. No root certificate setups, or DNS overrides.
* **Interactive Live Dashboard:** Stream simulated local requests, search path strings, and filter by status codes (`2xx`, `3xx`, `4xx`, `5xx`).
* **Deep Payload Inspector:** Switch tabs to inspect request/response header maps and pretty-print JSON payload structures.
* **On-Demand Tunnels:** Spin up secure public tunnels (`share.portlight.dev`) to expose local ports for Webhooks validation (Stripe, GitHub) or sharing work.
* **Sleek Dark Theme:** High-contrast, accessibility-friendly developer aesthetics built with pure Vanilla CSS custom properties.
* **ASCII Easter Egg:** Listen for the Konami Code (`ArrowUp` `ArrowUp` `ArrowDown` `ArrowDown` `ArrowLeft` `ArrowRight` `ArrowLeft` `ArrowRight` `b` `a`) to unlock a retro ASCII overlay.

---

## 🛠️ Tech Stack & Architecture

This repository uses a zero-dependency, build-free architecture designed for high performance, direct layout control, and line-by-line code ownership:
* **HTML5:** Clean, semantic structure with embedded inline SVGs for zero asset load delays.
* **Vanilla CSS:** Flexbox and CSS Grid styling with layout variables and custom media queries responsive down to `390px` mobile devices.
* **Vanilla ES6 JavaScript:** DOM manipulation, request log generation loops, and interactive state management.

For details on design trade-offs, tech architecture choices, and AI tool disclosures, view the [DECISIONS.md](DECISIONS.md) file.

---

## 🚀 How to Run Locally

Since this is a build-free static web application, you can run it instantly using any static server.

### 1. Serve with Python (Quickest)
Navigate to the root directory and run:
```bash
python3 -m http.server 9900
```
Then visit: [http://localhost:9900](http://localhost:9900)

### 2. Serve with Node.js/npx
```bash
npx serve .
```

### 3. Open Directly
Alternatively, double-click the `index.html` file to run it directly inside your web browser.

---

## 📜 Honesty & Integrity Statement

In accordance with the Acdyon grading guidelines:
* **No Fabricated Social Proof:** This page contains zero fake testimonials, fake client counts, or fabricated corporate customer logos.
* **No Fake Metrics:** All data logs and metrics displayed on the dashboard are explicitly marked as localhost example logs.
* **MIT Licensed:** Released under the MIT Open Source License.

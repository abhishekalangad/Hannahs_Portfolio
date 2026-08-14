# Hannah Elangovan — Professional Portfolio

A professional, high-fidelity hybrid portfolio showcasing the capabilities, achievements, scholastic pedigree, and ventures of **Hannah Elangovan** (E-Commerce Founder & Legal Scholar).

This site is built using a clean, modern **Hybrid Executive Design System** utilizing Light Sage canvases paired with Dark Forest Green Bento layouts, optimized for fluid interactions and robust multi-device support.

---

## 🚀 Key Features

*   **Responsive Multi-Device Layouts**:
    *   **Desktop view**: Displays an interactive 3D card layout and a grid interface for selected works.
    *   **Mobile & Tablet view**: Seamlessly switches the grid layout to a native, touch-friendly **Horizontal Swipe Scroll Track** to ensure maximum accessibility and clean card proportions on all screen sizes.
*   **Next.js Frame Proxy Integration**:
    *   Integrates a live website preview of the Web Mall enterprise directly inside the Case Dossier modal popup.
    *   Uses a client-side CORS proxy sequence (`corsproxy.io` and `api.allorigins.win`) to fetch the landing page HTML.
    *   Injects a custom compatibility patch script (`URL` constructor virtualization, `history` state safety overrides, and relative `fetch` rerouting) to bypass browser `X-Frame-Options: DENY` blocks and prevent Next.js runtime crashes inside the iframe.
*   **Clean Usability Standards**:
    *   Removed disruptive custom cursors and mouse-following physical micro-animations (e.g. magnetic buttons, card tilt triggers) to favor standard, browser-native interactions and high accessibility scores.
*   **Progressive Capabilities Matrix**:
    *   Visual progress displays highlighting domain mastery in Legal Jurisprudence, Enterprise Growth, and Linguistics.
*   **Formspree Contact Integration**:
    *   Fully functional contact form with client-side state handling and Confetti reward animation upon successful submissions.

---

## 🛠️ Technology Stack

*   **Core**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite 6](https://vite.dev/)
*   **Styling**: Vanilla CSS (Fluid spacing tokens, glassmorphism, responsive clamp sizes)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Animations**: [Lottie Web](https://github.com/airbnb/lottie-web) (vector illustrations)
*   **Build Tooling**: Vite bundler with production asset optimization

---

## 📦 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd Hannah_Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the local development server:
```bash
npm run dev
```
Open your browser and navigate to the address shown in the terminal (typically `http://127.0.0.1:5173/`).

### Building for Production

To compile and optimize the site for production:
```bash
npm run build
```
The production bundle will be generated in the `dist/` directory.

### Previewing the Production Build

To run the local server against the compiled production files:
```bash
npm run preview
```

---

## 🌐 Vercel IFrame Deployment Integration

Because the Web Mall site (`https://web-mall-sand.vercel.app`) is hosted on Vercel, it uses standard security headers that block iframe embeds. If you wish to bypass CORS proxies and load the iframe natively, you should add a `vercel.json` file in the root of the **Web Mall project** to allow frame ancestors:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "frame-ancestors 'self' https://hannah-elangovan.com http://localhost:5173 http://localhost:5174 http://127.0.0.1:5173 http://127.0.0.1:5174"
        },
        {
          "key": "X-Frame-Options",
          "value": "ALLOWALL"
        }
      ]
    }
  ]
}
```

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

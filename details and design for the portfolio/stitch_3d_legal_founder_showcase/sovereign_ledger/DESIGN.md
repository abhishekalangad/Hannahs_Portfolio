---
name: Sovereign Ledger
colors:
  surface: '#111415'
  surface-dim: '#111415'
  surface-bright: '#373a3b'
  surface-container-lowest: '#0c0f10'
  surface-container-low: '#191c1d'
  surface-container: '#1d2021'
  surface-container-high: '#282a2b'
  surface-container-highest: '#323536'
  on-surface: '#e1e3e4'
  on-surface-variant: '#cec5ba'
  inverse-surface: '#e1e3e4'
  inverse-on-surface: '#2e3132'
  outline: '#979085'
  outline-variant: '#4b463d'
  surface-tint: '#d3c5ad'
  primary: '#ffffff'
  on-primary: '#382f1e'
  primary-container: '#f0e0c8'
  on-primary-container: '#6e634f'
  inverse-primary: '#685d4a'
  secondary: '#bfc5e4'
  on-secondary: '#292f48'
  secondary-container: '#424862'
  on-secondary-container: '#b1b7d6'
  tertiary: '#ffffff'
  on-tertiary: '#313030'
  tertiary-container: '#e5e2e1'
  on-tertiary-container: '#656464'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f0e0c8'
  primary-fixed-dim: '#d3c5ad'
  on-primary-fixed: '#221b0b'
  on-primary-fixed-variant: '#4f4533'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#bfc5e4'
  on-secondary-fixed: '#141a32'
  on-secondary-fixed-variant: '#3f465f'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#111415'
  on-background: '#e1e3e4'
  surface-variant: '#323536'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.15em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-mobile: 24px
  margin-desktop: 80px
  section-gap: 160px
---

## Brand & Style

The design system embodies a "Modern Intellectual meets Entrepreneurial Luxury" aesthetic, specifically tailored for a dual-career narrative of high-stakes law and luxury e-commerce. The brand personality is authoritative yet innovative, blending the structured tradition of legal practice with the fluid dynamism of high-end commerce.

The style is a hybrid of **Corporate Modern** and **Glassmorphism**, elevated by **Minimalist** layouts. It utilizes expansive whitespace (negative space) to signal luxury and intellectual clarity. Subtle grid lines are employed to create a "blueprint" feel, nodding to the precision of law, while translucent surfaces and vibrant blurs introduce a contemporary, tech-forward entrepreneurial energy. The emotional response should be one of profound trust, exclusivity, and forward-thinking sophistication.

## Colors

This design system utilizes a high-contrast dark mode to evoke the atmosphere of London law offices at dusk and the prestige of luxury branding.

- **Primary (Champagne Gold):** Used sparingly for high-impact accents, active states, and primary calls to action. It represents the "Founder" side—radiant and premium.
- **Secondary (Midnight Navy):** The core background foundation. It provides a deep, scholarly depth that feels more sophisticated than pure black.
- **Tertiary (Charcoal):** Used for structural elements, cards, and subtle layering to provide depth without breaking the dark aesthetic.
- **Neutral (Silk White):** Reserved for primary typography and essential icons to ensure maximum legibility and a crisp, clean finish.
- **Surface Accents:** Use a 5-10% opacity white for glassmorphic borders and dividers to maintain a "blueprint" architectural feel.

## Typography

The typography strategy relies on the tension between the classical **Playfair Display** and the utilitarian **Inter**. 

- **Headlines:** Use Playfair Display for all major headings. For a more "avant-garde" feel, use italicized weights for specific keywords within a sentence to emphasize the intellectual narrative.
- **Body Text:** Inter provides a neutral, high-legibility counterpoint to the decorative nature of the serif. It should be set with generous line height to maintain a spacious, breathable feel.
- **Labels:** Use uppercase Inter with wide letter-spacing for category tags, overlines, and navigation elements to mimic the look of legal documents and luxury architectural signage.

## Layout & Spacing

The layout follows a **Fixed Grid** model with an emphasis on asymmetric balance. 

- **Grid:** Use a 12-column grid for desktop. Elements should frequently "break" the grid slightly or align to thin, 1px champagne-tinted vertical lines that run the height of the page sections.
- **Rhythm:** Utilize vertical "breathing room." Section gaps are intentionally large (160px+) to force the user to slow down and digest the content, mimicking the pace of a luxury gallery or a complex legal brief.
- **Mobile Adaptivity:** On mobile, margins reduce to 24px, and the 12-column grid collapses to a single-column flow. Typography scales down aggressively for headlines while maintaining the body-text size for readability.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and **Tonal Layering** rather than traditional shadows.

- **Glass Surfaces:** Cards and modals use a background blur (20px-30px) with a semi-transparent Midnight Navy fill (approx. 40-60% opacity). 
- **Edges:** Instead of shadows, use 1px "Silk White" borders at 10% opacity to define the perimeter of surfaces. 
- **Active Elevation:** When an element is interacted with, its border opacity increases, or a subtle "Champagne Gold" inner glow is applied. 
- **Background:** The base background is a deep gradient from Midnight Navy (#0A1128) to Charcoal (#1C1C1C), creating a sense of infinite, immersive space.

## Shapes

The shape language is primarily **Soft (0.25rem)** to maintain a sense of structural discipline and professional rigor.

- **Primary Containers:** Use the standard `rounded` (0.25rem) for a sharp, tailored appearance.
- **Interactive Elements:** Buttons may use `rounded-lg` (0.5rem) to feel slightly more approachable, but avoid pill-shapes as they are too casual for this brand identity.
- **Imagery:** Photography should feature sharp corners or very minimal rounding to maintain the "editorial" and "architectural" feel.

## Components

- **Buttons:** Primary buttons are solid Champagne Gold with Midnight Navy text (Inter Bold). Secondary buttons are "Ghost" style with a 1px Champagne border and Silk White text.
- **Cards:** Glassmorphic containers with the 1px subtle border. Content should have generous internal padding (40px).
- **Input Fields:** Bottom-border only (1px Silk White at 20% opacity). When focused, the border transitions to Champagne Gold. Labels use the `label-caps` style.
- **Chips/Tags:** Small, rectangular containers with a subtle charcoal background. No heavy rounding.
- **List Items:** Separated by thin 1px horizontal lines that span the container width, reinforcing the grid-based "ledger" look.
- **The "Case Study" Reveal:** Use a large-scale hover effect where an image preview follows the cursor when hovering over legal or commerce project titles, adding a dynamic, avant-garde layer to the navigation.
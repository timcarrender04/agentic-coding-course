---
name: Classroom Console
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#5654a8'
  on-secondary: '#ffffff'
  secondary-container: '#a7a5ff'
  on-secondary-container: '#393689'
  tertiary: '#515f74'
  on-tertiary: '#ffffff'
  tertiary-container: '#95a4bb'
  on-tertiary-container: '#2c3a4d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#100563'
  on-secondary-fixed-variant: '#3e3c8f'
  tertiary-fixed: '#d5e3fc'
  tertiary-fixed-dim: '#b9c7df'
  on-tertiary-fixed: '#0d1c2e'
  on-tertiary-fixed-variant: '#3a485b'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-xl:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.7'
  label-caps:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  button:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-padding: 32px
  gutter: 24px
---

## Brand & Style

This design system is built for the high-stakes environment of a live technical classroom. The brand personality is authoritative yet enabling—positioning the instructor as a pilot in a sophisticated "teaching cockpit." The aesthetic prioritizes extreme legibility and rapid information processing, essential for students viewing the interface on bright projectors or high-glare screens.

The chosen style is **High-Contrast / Modern**. It leverages deep structural tones to frame instructional content, creating a focused "stage" for code and concepts. By combining the rigid discipline of a terminal-inspired layout with the accessibility of modern educational interfaces, the system ensures that the most important information—the content—remains the brightest object in the room.

## Colors

The palette is engineered for WCAG AAA compliance, specifically optimized for projection. 

- **Primary (Emerald):** Reserved strictly for progression, successful states, and "Start" actions. It provides a vibrant focal point against the darker interface frame.
- **Secondary (Deep Indigo):** Used for the structural "cockpit" elements—sidebars, headers, and navigation rails. This creates a psychological boundary between the tool and the content.
- **Tertiary (Slate):** Handles secondary navigation, meta-information, and borders.
- **Neutral (Crisp White/Slate 50):** The background for all "Work" areas. This ensures that text-heavy content and code remain highly readable.
- **Surface Contrast:** A near-black indigo used for deep background layers to make the white content panels "pop" forward.

## Typography

This design system utilizes **Lexend** as the primary typeface for its unique origin in improving reading speed and accessibility—critical for educational software. 

**JetBrains Mono** is utilized for code-adjacent details, terminal outputs, and variable names within prose. This distinction helps students immediately identify what is "language" versus what is "instruction." 

To maintain high contrast, avoid thin weights. Use Bold and Semi-Bold weights generously for headers to ensure they survive the "blur test" often encountered in the back of a physical classroom.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid Grid**. The primary navigation rail and instructor "cockpit" controls are fixed-width to maintain muscle memory for the user. The main content area is a fluid 12-column grid that expands to fill the projector width, but is capped at 1440px to prevent code lines from becoming too long for comfortable scanning.

A strict 4px baseline rhythm is enforced. Elements should use `md (16px)` and `lg (24px)` spacing for internal grouping, while `xl (40px)` separates major functional sections. Keyboard-friendly navigation is supported by a clear, high-visibility focus ring (3px width) that follows this spacing rhythm.

## Elevation & Depth

To maintain high contrast and clarity for projection, this design system avoids soft ambient shadows which often "wash out" on lower-quality projectors. Instead, it utilizes **Tonal Layering and Bold Borders**.

- **Level 0 (Base):** Deep Indigo (#312E81) for the main application shell.
- **Level 1 (Panels):** Crisp White content panels sit "on top" of the base. These are not defined by shadows, but by the sharp contrast against the dark background.
- **Level 2 (Overlays):** Modals and popovers use a 2px solid Slate (#475569) border to define their edges, ensuring they are visible even if the projector's black levels are poor.
- **Interactive States:** Buttons and inputs use a slight vertical offset (2px) and a bottom-border "edge" to provide a tactile feel without relying on complex gradients.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a professional, geometric feel that aligns with code editors and IDEs, while the subtle rounding prevents the interface from feeling "hostile" or overly industrial.

- **Primary Action Buttons:** Use `rounded-lg` (0.5rem) to distinguish them from structural panels.
- **Code Snippets:** Use a `0px` radius on the left side to align with the vertical line of the code, and `rounded-sm` on the right.
- **Status Pills:** Use fully rounded (pill-shaped) geometry to contrast against the mostly rectangular layout.

## Components

- **Primary Action Button:** Background: Emerald; Text: White; Weight: Bold. On hover, a solid 2px offset "ghost" border appears to increase visibility.
- **The "Console" Input:** Monospaced (JetBrains Mono) text input with a dark slate background and a 2px emerald focus ring. This is the primary tool for teacher-student interaction.
- **Progress Trackers:** Vertical "ladder" navigation on the left, using Indigo for incomplete steps and Emerald for completed steps.
- **Content Cards:** Stark white background with a 1px slate-200 border. No shadows. Header areas within cards should have a subtle Slate-50 tint to separate them from the card body.
- **Keyboard Shortcuts:** Visual "KBD" tags should be highly visible—Slate-800 background with white JetBrains Mono text—to encourage students to learn the cockpit's power-user features.
- **Code Blocks:** Dark-themed syntax highlighting within white panels to provide maximum local contrast.
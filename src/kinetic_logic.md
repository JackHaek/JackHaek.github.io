Image 1.markdown
# Design System Documentation: High-End Editorial Portfolio

## 1. Overview & Creative North Star
**Creative North Star: The Kinetic Blueprint**
This design system is built for the intersection of rigorous engineering and high-end digital craftsmanship. For a modeling and simulation engineer, the UI shouldn't just be a container; it should feel like a sophisticated instrument.

We are moving away from the "template" look characterized by rigid grids and 1px borders. Instead, we embrace **The Kinetic Blueprint**: a style defined by intentional asymmetry, high-contrast typography scales, and "breathing" layouts. We prioritize the "Void"—using generous white space (from the Spacing Scale) to create focus, allowing high-impact simulation imagery to act as the primary structural element. Transitions must be fluid, mimicking the physics-based simulations the user creates.

## 2. Colors & Tonal Depth
The palette is anchored in deep tech-charcoals and a singular, vibrant cyan accent that feels "electrified."

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections or cards. Layout boundaries must be established solely through background color shifts. For example, a `surface-container-low` section should sit directly on a `surface` background to create a soft, sophisticated transition.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers (Lowest to Highest) to create "nested" depth.
- **Base Layer:** `surface` (#131316)
- **Secondary Sectioning:** `surface-container-low` (#1b1b1e)
- **Interactive/Floating Elements:** `surface-container-high` (#2a2a2d) or `highest` (#353438)

### The "Glass & Gradient" Rule
To elevate the experience, use **Glassmorphism** for navigation bars and floating overlays. Apply semi-transparent versions of `surface` with a `backdrop-blur` (e.g., 20px).
- **Signature Accent:** Use a subtle linear gradient for primary CTAs or hero highlights, transitioning from `primary_fixed_dim` (#00dddd) to `primary_container` (#00f7f7) at a 135-degree angle. This adds "visual soul" and depth that a flat hex code cannot achieve.

## 3. Typography
The system utilizes a dual-font strategy to balance technical precision with editorial elegance.

*   **Display & Headlines (Space Grotesk):** This is our "Technical Signature." Its geometric, slightly quirky terminals suggest a machine-like precision. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero titles to create high impact.
*   **Body & Titles (Inter):** A neutral, highly legible sans-serif that balances the "loudness" of Space Grotesk. It provides the grounding necessary for technical descriptions.
*   **Labels (Space Grotesk):** Use `label-md` or `label-sm` in ALL CAPS with wide letter-spacing (+0.1em) for metadata or simulation parameters. This reinforces the "Blueprint" aesthetic.

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering** rather than traditional drop shadows.

*   **The Layering Principle:** Stack `surface-container-lowest` cards on a `surface-container-low` background. This creates a soft "lift" that feels integrated into the UI rather than "pasted on."
*   **Ambient Shadows:** If an element must float (e.g., a modal or a floating action button), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow must never be pure black; it should be a tinted version of the background.
*   **The "Ghost Border" Fallback:** If a boundary is strictly required for accessibility, use the `outline-variant` token at 15% opacity. High-contrast, 100% opaque borders are strictly forbidden.

## 5. Components

### Buttons
- **Primary:** Background: `primary_container` (#00f7f7); Label: `on_primary_container`. Shape: `md` (0.375rem). Use a 300ms ease-out transition on hover to scale slightly (1.02x).
- **Secondary (Ghost):** No background. `outline-variant` ghost border (20% opacity). Label: `primary`.
- **Tertiary:** Text-only. `label-md` uppercase with a 1px underline that expands from the center on hover.

### Project Cards
Forbid divider lines. Use `surface-container-low` for the card body. The image within the card should have a `none` or `sm` roundedness to maintain a technical, "cut" look. Use `spacing-6` (2rem) for internal padding to ensure the content "breathes."

### Technical Chips
Use for software tools (e.g., "C++", "CUDA", "PhysX").
- Style: `surface-container-highest` background, `md` roundedness, `label-sm` typography. No border.

### Simulation Inputs
- **Text Fields:** Use a "Minimalist Undersline" approach. No box. A bottom border of `outline-variant` (30% opacity) that turns to `primary_container` (#00f7f7) and 2px thick on focus.
- **Toggle Strategy:** For Light/Dark mode, use a "Sun/Moon" icon set that morphs via SVG path animation. The toggle should sit in a `surface-container-high` glassmorphic pill in the top right corner.

### Data Visualization Widgets
Since this is for a simulation engineer, include "Live Telemetry" widgets. Use `surface-container-lowest` as the widget base, with `primary` (#ebfffe) for data points and `primary_fixed_dim` for sparklines.

## 6. Do's and Don'ts

### Do:
*   **Embrace Asymmetry:** Align text to the left while placing high-impact imagery slightly offset to the right.
*   **Use the Spacing Scale:** Stick strictly to the scale. Use `spacing-20` (7rem) between major sections to emphasize the premium "Editorial" feel.
*   **Focus on Motion:** Ensure every hover state has a smooth transition. Use `cubic-bezier(0.23, 1, 0.32, 1)` for all movements—it’s the "Gold Standard" for high-end feel.

### Don't:
*   **Don't Use Dividers:** Never use `<hr>` or solid lines to separate content. Use a background color shift or `spacing-16`.
*   **Don't Overuse the Accent:** The Cyan (#00F7F7) is a "Lighthouse" color. If everything is cyan, nothing is important. Use it only for CTAs, active states, and critical data points.
*   **Don't Use Default Shadows:** Avoid the standard "Material Design" shadows. If it looks like a standard app, we’ve failed the editorial brief. Keep shadows ambient and barely perceptible.
*   **Don't Crowd the Content:** If a section feels "full," double the padding. High-end design is defined by what you leave out.
    Skip to main content
    Build your ideas with Gemini
    Image 1.markdown
    text
    Build me an app with screens that look like this. You can hotlink images from the html


---
name: RoyalBite Fine Dine Restaurant
description: Warm, premium Indian fine-dining — where every meal becomes a memory.
colors:
  warm-ivory: "#FAF7F2"
  ivory-alt: "#F3EDE4"
  white: "#FFFFFF"
  deep-olive: "#1E392A"
  olive-deep: "#152B1F"
  olive-mid: "#2A4E3B"
  harvest-amber: "#E58B24"
  amber-dark: "#C97A18"
  amber-pale: "#FDF3E7"
  ink: "#17261E"
  body-green: "#3E5449"
  muted-sage: "#7A8F82"
  sand-border: "#E3DAD0"
  border-soft: "#EDE6DC"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.2rem, 3.2vw, 3.2rem)"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "normal"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.9rem, 2.8vw, 2.7rem)"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.97rem"
    fontWeight: 400
    lineHeight: 1.75
  script:
    fontFamily: "Great Vibes, cursive"
    purpose: "Occasional decorative handwritten flourish"
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.2em"
    textTransform: "uppercase"
rounded:
  sm: "6px"
  md: "12px"
  lg: "18px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "10px"
  md: "16px"
  lg: "28px"
  xl: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.deep-olive}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.olive-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.body-green}"
    rounded: "0"
    padding: "0 0 2px 0"
  pill-active:
    backgroundColor: "{colors.deep-olive}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "7px 18px"
---

# Design System: RoyalBite Fine Dine Restaurant

## Overview

**Creative North Star: "The Garden Table" — earthy luxury where candlelight meets courtyard greenery.**

RoyalBite's visual identity is rooted in warm organic materials: the hue of unbleached linen, the depth of forest-dark olive wood, and the glow of harvest amber catching the light. The palette draws on the restaurant's own interior — warm Ivory walls, the deep green of hand-painted shutters, brass fixtures — translated into pixels without losing the warmth.

The typographic architecture is deliberately dual-voiced: Cormorant Garamond carries the restaurant's heritage (generous serifs, classical proportions, confident italics used sparingly for personality), while DM Sans grounds it in legibility for menus, forms, and body copy. The pairing feels effortlessly premium without aesthetic pretension.

Density is moderate: generous section padding creates breathing room, but individual components (cards, form fields, info rows) maintain a snug rhythm that signals precision and care. Every section should feel like a course in a tasting menu — distinct, purposeful, complete.

**Key Characteristics:**
- Warm, earthy palette anchored by Ivory, Olive, and Amber
- Serif/sans dual voice: Cormorant for heritage, DM Sans for clarity
- Organic elevation: tinted box-shadows in Olive-green, not grey
- Rounded-full pill buttons and pill filter chips; gently rounded cards
- Amber used sparingly as the accent of conviction — reservation CTA, eyebrow labels, active states

## Colors

The palette is a single warm family — no cool greys, no saturated accents — unified by the restaurant's own physical warmth.

### Primary
- **Deep Olive** (#1E392A): The brand anchor. Used on primary buttons, the About section background, the footer, nav active indicators, and shadow tones. The colour of the restaurant's signature shutters.
- **Harvest Amber** (#E58B24): The conviction accent. Appears on eyebrow labels, active pill tabs, the award badge, border-bottom on ghost links, and footer social hover. Never used for full backgrounds on light surfaces.

### Neutral
- **Warm Ivory** (#FAF7F2): The page canvas. The body background. Never cool.
- **Ivory Alt** (#F3EDE4): Secondary surface — Reservation section, features strip backgrounds, form fields.
- **Ink** (#17261E): Display text and headings. Deep olive-black, not pure black.
- **Body Green** (#3E5449): Primary body text and nav links.
- **Muted Sage** (#7A8F82): Secondary text, captions, meta, placeholders.
- **Sand Border** (#E3DAD0): Dividers and card borders.
- **Amber Pale** (#FDF3E7): Icon badge backgrounds, feature icon fill, warm tint surfaces.

### Named Rules
**The Amber Scarcity Rule.** Amber covers ≤15% of any given screen. Its warmth is the point; overuse neutralises it. Reserve it for the single most important action or signal on a view.

**The No-Cold-Grey Rule.** No cool greys. Every neutral is warm: Ivory, Sand, Sage. The system must stay in the same temperature family as the restaurant's physical space.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, serif fallback)
**Body Font:** DM Sans (with system sans-serif fallback)

**Character:** Cormorant leads with editorial authority — its high contrast strokes and bracketed serifs signal heritage and craft. DM Sans provides the warmth and legibility at small sizes that Cormorant sacrifices for display beauty. Together they create the "knowledgeable maître d'" voice: authoritative yet approachable.

### Hierarchy
- **Display** (700, clamp(2.2rem–3.2rem), 1.18): Hero headlines only. Set in Cormorant. Italics used on a single word for emphasis — never full italic headlines.
- **Headline** (600, clamp(1.9rem–2.7rem), 1.2): Section titles. Cormorant. em-italics for one key word per heading.
- **Title** (700, 1.1rem, 1.2): Card titles, form section headers. Cormorant.
- **Body** (400, 0.97rem, 1.75): Prose, descriptions, card captions. DM Sans. Max ~70ch.
- **Label** (700, 0.72rem, 1, 0.2em tracking, uppercase): Eyebrow labels, category pills, footer column headings. DM Sans.

### Named Rules
**The Italic Accent Rule.** One italic word per heading, used only in Cormorant display and headline roles. Italics applied to an entire heading read as unsure; applied to one word they read as a signature.

## Layout

The page is a single-column scroll of stacked sections, each occupying its own visual chapter. Container max-width is 1200px at 90% viewport width — never full-bleed on desktop. Section padding is 96px vertical (top and bottom).

Internal layouts use CSS Grid: 2-column for About (visuals | text), Reservation (info | form), Contact (info cards | form); 3-column for Menu cards and Gallery tiles. On tablet (≤768px) the grid collapses to 1-column; on mobile (≤480px) gallery and menu cards stack to single column.

Horizontal rhythm uses an 8px base unit. Component internal padding follows the spacing scale (sm = 10px, md = 16px, lg = 28px). Sections alternate background surfaces (Ivory → Olive → Ivory → Ivory-Alt → White → Ivory-Alt → Ivory) to create spatial separation without relying on dividers.

## Elevation & Depth

This system uses tinted organic shadows, not neutral grey. Every `box-shadow` is derived from Olive Green (rgba(30,57,42,*)) at low opacity, so depth feels like it belongs to the same material family as the surface it lifts.

### Shadow Vocabulary
- **xs** (`0 1px 4px rgba(30,57,42,.06)`): Card resting state, input resting state.
- **sm** (`0 4px 16px rgba(30,57,42,.09)`): Header on scroll, hover card, stat bar.
- **md** (`0 10px 32px rgba(30,57,42,.11)`): Modal-weight cards (Reservation form, Contact form), badge overlays.
- **lg** (`0 20px 52px rgba(30,57,42,.14)`): Dish ring hero image, floating badge pop.

### Named Rules
**The Flat-by-Default Rule.** Surfaces are flat at rest. Shadows elevate only on hover or to signal a card/modal layer. A shadow visible at rest must be the lightest rung (xs).

## Shapes

Corners follow a strict vocabulary: `6px` (sm — input focus rings, feature icons, logo box), `12px` (md — form fields, gallery tiles resting), `18px` (lg — gallery tiles, card hover), `24px` (xl — hero dish image inner frame, form card containers). Pill shape (`9999px`) is reserved for navigation pills, filter chips, CTA buttons, and the newsletter input — never for cards.

The hero dish image is presented in a circular format (border-radius 50%) with a dashed orbital ring that rotates slowly — the one expressive silhouette in an otherwise rectilinear system. This is the signature geometry; nothing else on the page uses a circle.

**The Circle Singularity Rule.** The circular dish ring in the hero is the system's only circle. Using circles elsewhere (avatar photos, decorative blobs) dilutes this signature and should be rejected.

## Components

### Buttons
- **Shape:** Pill (border-radius: 9999px) — primary and ghost CTA
- **Primary:** Deep Olive background (#1E392A), white text, 12px/24px padding, 2px solid Olive border. Icon left of label at 14–15px.
- **Hover / Focus:** Background shifts to Olive-deep (#152B1F), 1px translateY(-1px) lift, Olive shadow-md. Transition: 0.32s cubic-bezier(.25,.46,.45,.94).
- **Ghost:** Transparent background, Body-Green text, amber bottom-border (2px). Hover: text shifts to Olive, gap grows to 10px (arrow slides right).
- **Add-to-cart circle:** 34px circle, Deep Olive background. Hover: shifts to Amber.

### Cards (Menu)
- **Corner:** 24px radius (xl)
- **Background:** White on Ivory canvas
- **Shadow:** xs at rest → md on hover
- **Border:** 1px sand-border at rest → border (darker) on hover
- **Hover:** translateY(-4px) lift, shadow promotes to md
- **Image area:** 200px tall, overflow hidden, image scale(1.06) on card hover
- **Internal padding:** 16px/18px body area

### Inputs / Fields
- **Style:** 1.5px sand-border stroke, Ivory background (cream), 12px radius
- **Focus:** Border shifts to Deep Olive, background to White, 0 0 0 3px Olive/8% box glow
- **Placeholder:** Muted Sage (#7A8F82)

### Navigation
- **Style:** Fixed header, 70px tall, Ivory background at 94% opacity with 14px backdrop blur
- **Link style:** 0.875rem DM Sans medium, Body Green. Hover: Olive text + Ivory-Alt background fill
- **Active:** Olive text, bold, 2px amber underbar centered under label
- **CTA button:** Primary pill, "Book a Table" with calendar icon

### Pill Filter Chips
- **Default:** Body-muted text, transparent background, on White container with sand-border
- **Active:** Deep Olive background, white text, same pill shape
- **Container:** Rounded-full wrapper (White, 1px sand-border, xs shadow), centered

### Gallery Tiles
- **Shape:** 12px radius (lg), various aspect ratios (1:1, tall 2:1, wide)
- **Hover:** Dark Olive overlay (rgba(30,57,42,.48)), zoom-in icon fades in, image scales to 1.07

## Do's and Don'ts

### Do:
- **Do** use Cormorant Garamond for all headings and prices. The serif is the brand.
- **Do** use Harvest Amber (#E58B24) only for eyebrow labels, the active state accent, and the amber CTA button variant.
- **Do** make box-shadows olive-tinted (rgba(30,57,42,*)) at the correct rung.
- **Do** use `clamp()` for display and headline sizes so they scale gracefully.
- **Do** keep the hero dish in its circular ring — the one circle on the page.
- **Do** preserve the Ivory/Olive/Amber temperature across all sections; no cool neutrals.

### Don't:
- **Don't** use pure black (#000) or cool grey anywhere. The darkest tone is Ink (#17261E).
- **Don't** apply pill shape to cards, image containers, or gallery tiles — pill is reserved for interactive controls.
- **Don't** use Amber for backgrounds on light pages — amber-pale (#FDF3E7) is the safe fill; #E58B24 is for text and icon accents only.
- **Don't** stack more than two fonts in one component — Cormorant + DM Sans is the complete pairing.
- **Don't** add circular elements beyond the hero dish ring; the circle is the hero's signature.
- **Don't** use neutral grey box-shadows; the system's shadow colour is Olive-tinted.

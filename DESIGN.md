---
version: "alpha"
name: "Scrapbook Ghost"
description: "A tactile scrapbook on graph paper: torn, crumpled sheets, bold lowercase grotesque type on offset khaki highlights, felt-star stickers, and faint code that wakes up behind the cursor."
colors:
  background: "#f4efe4"
  grid-line: "#cfcabd"
  paper: "#e0d7ce"
  text: "#0a0a0a"
  text-soft: "#3c3830"
  highlight: "#c2b89e"
  label: "#f1e4cd"
  pin: "#ebc67f"
  red: "#bb2a24"
  gold: "#a37a39"
  green: "#5d6f59"
  brown: "#563023"
  pill: "#6b665e"
  ghost-code: "#7a7264"
typography:
  display:
    fontFamily: "'Helvetica Neue', Helvetica, Arimo, Arial, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.025em"
    lineHeight: "1"
  body-md:
    fontFamily: "'Helvetica Neue', Helvetica, Arimo, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.45"
  label:
    fontFamily: "'Helvetica Neue', Helvetica, Arimo, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
  ghost-code:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "12px"
rounded:
  none: "0px"
  pill: "99px"
spacing:
  grid-cell: "38px"
  section: "70px"
components:
  highlight-block:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
  label-pinned:
    backgroundColor: "{colors.label}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
    padding: "0.28em 0.5em"
  page-counter:
    backgroundColor: "{colors.pill}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
---

## Overview

Built from an original Instagram design. The site should feel like a page someone assembled by hand, then left a computer running underneath it. The paper is warm and physical; the code is a quiet ghost that only shows up where the cursor has been.

## Colors

Warm neutrals do almost all the work. Red, gold, green and brown appear only in stickers and tape, never in text or large surfaces.

## Typography

All display type is lowercase, bold and tightly tracked. Sentence fragments beat full sentences.

## Layout

- Graph paper fills the page; everything else is laid on top of it.
- One large torn sheet per major moment, with stickers overlapping its corners and edges.
- Project scraps sit at small, different angles on an uneven grid. Keep tilts under 2 degrees.

## Elevation & Depth

Depth comes from real objects only: soft warm drop shadows under paper and stickers. Layer order, bottom to top: graph paper, paper sheets, ghost code, text, stickers.

## Shapes

- Highlights are hard rectangles that run past the word on one side, and sit low enough for ascenders to poke out the top. Alternate which side overhangs from line to line.
- Pinned labels have gold dots on opposite corners, like selection handles.
- Paper edges are always torn, with a pale fibrous rim.

## Components

- **Ghost code:** monospace code across the viewport, almost invisible at rest (about 4% opacity). It rises to 30% within 115px of the cursor (20% on touch), then fades slowly like e-paper ghosting.
- **Stickers:** real cut-outs, draggable, with a shadow that lifts on hover.
- **Page counter:** a small grey pill like an Instagram carousel counter, tracking the current section.
- **Cursor:** a crisp black-and-white pixel arrow, kept within 32px.
- **Code portrait:** a cut-out photo redrawn in monospace characters on torn paper. Only a faint outline shows at rest; the cursor fills in the face, then it fades back. On touch, a tap wakes it and a second tap or scrolling away puts it back to sleep.
- **Project pages:** a short torn-sheet header, then numbered paper scraps for how it works, ending with an honest note about what the project is and isn't.

## Do's and Don'ts

- Do put every piece of text on an opaque highlight or label, or clear the ghost code behind it, so code never runs through words.
- Do turn the ghost animation off for `prefers-reduced-motion`.
- Do use transparent PNG or WebP cut-outs for anything that should look real.
- Don't use rounded cards, gradients, or flat vector stand-ins for paper objects.
- Don't let ghost code get darker than a pencil mark.
- Don't use the accent colors for text.

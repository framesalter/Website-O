# The Forces Be With You

A physics worksheet with an interactive activity and two playground games.

## File structure

```
index.html               Home with links and settings
activity.html            Main quiz (Items 7-10)
sample.html              Worked sample problems (stub)
credits.html             Credits page with the wandering button
playground.html          Hub with two game cards
case-opener.html         Game 1: Star case opener
feed-blackhole.html      Game 2: Feed a black hole
css/style.css            All styles
js/utils.js              Number parsing, KaTeX, shuffle helpers
js/questions.js          Question bank (Items 7-10)
js/quiz.js               Activity state machine
js/particles.js          Background particle animation
js/games/stars.js        Star data for the case opener
js/games/case-opener.js  Case opener logic
js/games/feed-blackhole.js  Black hole game logic
```

## How to edit stars (case opener)

Open `js/games/stars.js`. Each star is one object in the `STARS` array:

```js
{ id: "sol", name: "Sol", class: "Yellow Dwarf", tier: "common" }
```

- `id` must be unique. It is the localStorage key for the pedia.
- `name` is the display name.
- `class` is the stellar classification.
- `tier` is one of `"common"`, `"rare"`, `"legendary"`, `"mythic"`.
- Set `neutron: true` for neutron stars. This enables the pulsing halo.

To change drop rates, edit `TIER_WEIGHTS` in the same file. The four weights must sum to 100.

To add a star, append a new object to `STARS`. The pedia and the reel will pick it up automatically.

## How to edit feed objects (black hole game)

Open `js/games/feed-blackhole.js`. The `FEED_OBJECTS` array holds the shapes you can feed:

```js
{ id: "asteroid", name: "Asteroid", points: 1, art: " . * .\n * * *\n . * ." }
```

- `art` is the ASCII drawing. `\n` is a newline.
- `points` is the base value before diminishing returns.
- Diminishing returns kick in after repeated use of the same object; edit `DIMINISH_RATE` if you want a different curve.

## How to edit the credits page

Open `credits.html`. Each card is a `<div class="credit-card">` block. Change the heading, name, and description text directly. Add or remove cards by copying a whole block. The grid uses `auto-fit` so it wraps automatically.

The "Made With" chip row uses `<span class="chip">`. Add or remove chips by copying a line.

To update the copyright year or version string, edit the `<footer class="credits-footer">` block near the bottom of the file.

## How to edit sample problems

`sample.html` is a stub. When you fill it in, use the same visual language as the activity page. Wrap each problem in `<section class="panel">` and use `.subq-solution` style blocks for GRESA solutions.

## How to edit settings

Settings live in `localStorage` under the key `sat.settings`. The object has two fields:

- `hints`: show the hint button during quiz (default `false`)
- `particles`: show the animated particle background (default `true`)

To add a new setting, add a checkbox to the dialog on `index.html`, read it in `loadSettings()` in `js/quiz.js`, and apply it wherever it matters.

## How to deploy

This site is a static bundle. No build step.

1. Push the repo to GitHub.
2. In repo Settings, under Pages, set the source to `main` branch and `/` (root).
3. GitHub serves the site at `https://<username>.github.io/<repo>/`.

Live preview in VSCode: right-click `index.html` and choose Open with Live Server.

## Troubleshooting

- Blank page or no interactivity: open DevTools Console. A red error at the top usually means an import failed. Confirm `js/quiz.js` begins with `import { sci } from "./utils.js";` and that no stray `import` lines were pasted into the wrong file.
- Start button does nothing: check the console for `wire failed: ...`. The boot block at the bottom of `js/quiz.js` logs this if any click handler could not be attached.
- Particles do not show: check the settings toggle. Particles are also disabled when the OS reports `prefers-reduced-motion`.
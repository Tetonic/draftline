# Draftline (concept mockup)

Front-end-only clickable mockup of an AI visual editor for Astro marketing sites: chat on the left, live site preview on the right, click elements to reference them in chat, edits saved as commits on a Draft, then Publish.

- Live: https://astro-editor-mockup-tetonic.vercel.app/
- No backend. The assistant is scripted; the preview site ("Northfork Outfitters") and all data are fictional sample content.
- Plain HTML/CSS/JS, no build step. Open `index.html` or serve the folder statically.
- Screenshots: `screenshots/`. Regenerate with `python .shots.py [URL]` (Playwright).

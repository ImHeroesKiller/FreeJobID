# Palette's Journal - Critical UX & Accessibility Learnings

## 2026-08-13 - Correcting Language Switching Runtime Crash & Enhancing Iframe/Link Accessibility
**Learning:** Found a typo in `jobs/insurance-administrator.html` where `document.getElementId` instead of `document.getElementById` crashed language-switching functionality. Also found that embedded iframes lacked `title` attributes (violating WCAG 2.4.1), and link labels like "click here" lacked proper accessible names for screen reader users. Additionally, hardcoded iframe widths caused horizontal overflow and broke responsiveness on narrow mobile viewports.
**Action:** Always check the browser console for runtime crashes on interactive content, ensure all `iframe` elements have descriptive `title` attributes, avoid uninformative link text like "click here" by adding clear `aria-label` tags, and use fluid responsive layouts (`width: 100%; max-width: ...`) instead of fixed pixel widths for media elements.

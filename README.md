# SIP'S NETWORK — opening page

Static teaser page for the SIP'S NETWORK Minecraft network. Plain HTML/CSS/JS,
no build step — drop it straight into a GitHub Pages repo.

## Before you deploy — edit these

Open `index.html` and search for `EDIT_ME`:

1. **Discord invite code** — in the `<script>` block:
   ```js
   const CONFIG = {
     DISCORD_INVITE_CODE: "EDIT_ME", // e.g. "abcXYZ" from discord.gg/abcXYZ
   ```
   This single value drives every "Join Discord" button *and* the live
   online-member count (fetched from Discord's public invite endpoint —
   no bot or token required). The invite must not be set to expire.

2. **Application form** — two `href="https://forms.gle/EDIT_ME"` links
   (Apply section + footer). Swap in your real Google Form link.

3. **Countdown target** — same `CONFIG` block:
   ```js
   COUNTDOWN_TARGET_ISO: "2026-09-12T18:00:00+02:00",
   ```
   This powers the hidden "Vault" countdown (see below).

4. Update `https://siphcf.eu/` in the `<head>` (canonical, Open Graph,
   Twitter, JSON-LD, `sitemap.xml`, `robots.txt`) if the final domain differs.

## The hidden countdown

Click the small round crown icon in the footer five times, or visit
`/#the-vault` directly, to reveal a full-screen countdown to
`COUNTDOWN_TARGET_ISO`. Share the direct link as a teaser if you want.

## Structure

```
index.html         all markup, styles and script (single file)
favicon.ico / site.webmanifest / img/icon-*.png    favicons + PWA icons
img/hero-cave.jpg          hero background
img/crown-banner.jpg       F-Top section artwork
img/sip-network-logo.gif   animated logo (nav + hero + footer)
img/og-banner.jpg          social share image (1200×630)
robots.txt / sitemap.xml   basic SEO plumbing
```

## Notes

- No frameworks, no bundler — just static files. Push to a repo, enable
  GitHub Pages on the `main` branch, done.
- The ember particle field, scroll reveals and hero parallax all respect
  `prefers-reduced-motion`.
- This page is intentionally separate from the future ReactJS main site —
  it's the pre-launch teaser only.

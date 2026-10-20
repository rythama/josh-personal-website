# Joshua Paroongsup — film & photography site

A plain HTML/CSS/JS site with no build step and no dependencies.

## Editing content
Everything lives in **`content.js`**: name, bio, films, photo series, links.
Search for `PLACEHOLDER` to find what still needs replacing.

- **Photos and stills:** put image files in an `assets/` folder and reference them as `"assets/name.jpg"`, or paste a full image URL. Around 1500px wide is plenty.
- **Films:** paste a YouTube or Vimeo link into `video` and it embeds in the viewer. Leave it `""` to show "Coming soon".
- **Hero viewfinder:** rotates through the film thumbnails. Add `hero: false` to a film to leave it out.
- **Contact sheets:** each entry in `series` becomes its own film strip.

## Fonts
Both are free Google Fonts that can be used for anything, paid work included, with no credit needed.
- **Archivo** (extra condensed, extra bold) for titles.
- **Courier Prime** for everything else.

## Running locally
```bash
python3 -m http.server 4173
```
Then open http://localhost:4173.

## Deploying
Drag the folder onto Netlify Drop, or push it to GitHub Pages, Vercel or Cloudflare Pages. It's all static files.

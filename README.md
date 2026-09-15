# Georgios Alexandros Asvestas: research website

Single-page academic site: UAV remote sensing and GeoAI for archaeology.
Plain HTML, CSS and JavaScript. No build step.

## Structure

```
index.html              the page
assets/css/style.css    layout, colours, dark mode
assets/js/main.js       layer explorer and full-size figure viewer
assets/img/             figures (-1200 for the page, -2400 / larger for the viewer)
assets/favicon.svg
cv/Asvestas_Academic_CV.pdf
.nojekyll               tells GitHub Pages to serve files as they are
```

## Publish on GitHub Pages

1. Create a public repository named `USERNAME.github.io` (your GitHub username),
   so the site lives at `https://USERNAME.github.io`.
2. On the repository page choose **Add file > Upload files**, drag in the
   *contents* of this folder (not the folder itself), and commit.
   `.nojekyll` is hidden on some systems; if it does not upload, create an empty
   file with that name through **Add file > Create new file**.
3. Go to **Settings > Pages**, set **Source** to *Deploy from a branch*,
   branch `main`, folder `/ (root)`, and save.
4. The site appears within a few minutes.

## Common edits

- **Text:** edit `index.html` directly on GitHub (pencil icon) and commit.
- **Replace a figure:** upload a new file with the same name into `assets/img/`.
  Keep web versions around 1200 px wide; the viewer versions can be 2400 px or more.
- **Update the CV:** upload a new PDF with the same name into `cv/`.
- **Add the DOI** when the article is online: in `index.html`, find
  `<span class="status">Accepted</span>` and add a link to `https://doi.org/...`.
- **Custom domain:** add it under Settings > Pages; GitHub creates a `CNAME` file.

## Preview locally

```
python3 -m http.server
```
then open http://localhost:8000.

# D'Casa Homes static website

This is a plain HTML, CSS and vanilla JavaScript site. There is no build step, server code or package installation. `index.html` is at the deployable site root.

The default palette is White & Sand. Visitors can choose another palette from the palette button in the header; their choice is saved in the browser.

## Images

The supplied logo and 34 JPG photos are included in `assets/`. The hero, five featured project cards and About section use selected images. The expandable gallery under Projects displays all 34 supplied photos. Add `favicon.png` to `assets/` to complete the browser tab icon. See `assets/PUT-IMAGES-HERE.txt` for the image map.

## Replace before publishing

- Replace the `XX+` experience, project and family stats with verified numbers.
- Replace project titles and locations with approved portfolio details.
- Replace sample testimonial copy with real client-approved reviews, or remove the section until then.
- Update the phone, email, office address, WhatsApp number and Instagram link.
- Review the editable FAQ responses and company description.

## Formspree

Create a Formspree form and replace `YOUR_FORM_ID` in the form `action` in `index.html` with its form ID, keeping the URL format `https://formspree.io/f/FORM_ID`.

## Preview locally

Open `index.html` in a browser, or from this directory run:

```sh
python3 -m http.server
```

Then visit `http://localhost:8000`.

## Deploy on Render

Create a **Static Site** from the repository. Leave **Build Command** blank and set **Publish Directory** to `.`. Deploy directly from the repository root containing `index.html`.

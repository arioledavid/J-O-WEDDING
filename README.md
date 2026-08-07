# Joseph & Olivia Wedding Ceremony Programme

An elegant, mobile-responsive, print-optimized digital wedding programme. Designed with Playfair Display typography, warm cream backgrounds, satin gold accents, and detailed timeline layouts.

## Project Structure
- `index.html`: The HTML layout containing the order of service, scripture verses, and complete hymn lyrics.
- `style.css`: Responsive design system & critical `@media print` rules for A4 paper.
- `main.js`: Interactive client-side enhancements (accordion toggles for hymns, navigation smooth scroll).
- `generate-pdf.js`: Node.js script using Puppeteer to convert the program into `wedding-programme.pdf` matching A4 dimensions.
- `assets/`: Contains image assets for the couple (`hero-colored.jpg` and `portrait-bw.jpg`).

---

## Local Development & Setup

### 1. Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed. Run:
```bash
npm install
```

### 2. Run Dev Server
Start the local Vite server to preview the site:
```bash
npm run dev
```
Open the printed URL (usually `http://localhost:3000`) in your browser.

### 3. Generate PDF
To generate the high-quality A4 PDF of the program:
```bash
npm run generate-pdf
```
This script starts a temporary local server, loads the page in headless Chrome using Puppeteer, compiles it to an A4 layout, and saves it as `wedding-programme.pdf` in the root folder.

---

## How to Customize

1. **Names & Date:** Edit the header, cover page, and footer sections in [index.html](file:///Users/mac/.gemini/antigravity-ide/scratch/wedding-programme/index.html) to update names or dates.
2. **Timeline Items:** Add, remove, or edit entries in the `<div class="programme-timeline">` container in [index.html](file:///Users/mac/.gemini/antigravity-ide/scratch/wedding-programme/index.html).
3. **Photos:** Replace the files inside [assets/](file:///Users/mac/.gemini/antigravity-ide/scratch/wedding-programme/assets):
   - `portrait-bw.jpg`: Main portrait shown on the cover.
   - `hero-colored.jpg`: Secondary photo shown on the thank-you page.
4. **Hymns & Lyrics:** Standard verses for *Great Is Thy Faithfulness* and *To God Be the Glory* are fully written in the code. You can update or replace them inside the `<section id="hymns">` container.

---

## QR Code & Hosting Workflow

To make this program accessible to your wedding guests:

1. **Generate the PDF:**
   Run `npm run generate-pdf` to output `wedding-programme.pdf`.
2. **Host the PDF or Web Page:**
   - **Static Web Page:** Deploy this folder directly to [GitHub Pages](https://pages.github.com/), [Vercel](https://vercel.com/), or [Netlify](https://www.netlify.com/). This gives guests an interactive mobile app experience when they scan the code!
   - **Direct PDF:** Upload `wedding-programme.pdf` to Google Drive, Dropbox, AWS S3, or your church website. (Ensure the share link is set to "Public" so anyone with the link can view it).
3. **Create the QR Code:**
   Use a QR Code generator (such as [QR Code Generator](https://www.qr-code-generator.com/) or [QR Tiger](https://www.qrcode-tiger.com/)) and paste your hosted URL (web app link or direct PDF link).
4. **Distribute:**
   Print the QR code on signs placed at the venue, welcome tables, invitation cards, or the program cover itself!

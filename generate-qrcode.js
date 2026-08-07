import QRCode from 'qrcode';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default hosted URL — points to the auto-download page
const defaultUrl = 'https://joseph-and-olivia.wedding/download.html';
const url = process.argv[2] || defaultUrl;
const outputPath = path.join(__dirname, 'qr-code.png');

console.log(`Generating QR code for: ${url}`);

QRCode.toFile(outputPath, url, {
  errorCorrectionLevel: 'H', // High error tolerance (excellent for physical prints)
  type: 'png',
  width: 600,                // High resolution for clear printing
  margin: 2,
  color: {
    dark: '#2C2A29',         // Deep slate charcoal to match the wedding theme
    light: '#FFFFFF'         // Clean crisp white background
  }
}, (err) => {
  if (err) {
    console.error('Error generating QR code:', err);
    process.exit(1);
  }
  console.log(`Successfully generated high-resolution QR code at: ${outputPath}`);
});

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 8089;

// Simple static server using built-in HTTP module
const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  // Resolve paths containing query parameters or hash fragments
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  filePath = path.join(__dirname, urlObj.pathname === '/' ? 'index.html' : urlObj.pathname);

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start server, run Puppeteer, output PDF, stop server
server.listen(PORT, async () => {
  console.log(`Temp server running on http://localhost:${PORT}`);
  console.log('Generating PDF, please wait...');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Go to local server address
    await page.goto(`http://localhost:${PORT}/index.html`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Emulate print media
    await page.emulateMediaType('print');

    // Save as A4 PDF
    await page.pdf({
      path: 'public/wedding-programme.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px'
      }
    });

    console.log('Successfully generated: public/wedding-programme.pdf');
  } catch (err) {
    console.error('Error generating PDF:', err);
  } finally {
    if (browser) {
      await browser.close();
    }
    server.close(() => {
      console.log('Temp server stopped.');
      process.exit(0);
    });
  }
});

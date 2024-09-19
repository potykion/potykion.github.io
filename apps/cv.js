const puppeteer = require('puppeteer');

async function generatePdf(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle0' });

    let margin = '30px';
    await page.pdf({
      path: outputPath,
      format: 'A4',
      margin: {
        top: margin,
        right: margin,
        bottom: margin,
        left: margin
      },
      displayHeaderFooter: false,
      printBackground: true
    });

    console.log(`PDF saved to ${outputPath}`);

  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    await browser.close();
  }
}

// Usage
generatePdf(
    // 'https://potyk.io/n/cv',
    'http://127.0.0.1:5000/n/cv',
    'cv.pdf',
    );

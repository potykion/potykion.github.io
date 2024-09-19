const puppeteer = require('puppeteer');

async function generatePdf(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: outputPath,
      format: 'A4',
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
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
generatePdf('https://potyk.io/n/cv', 'cv.pdf');

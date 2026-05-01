const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function runTest() {
  const screenshotDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('🚀 Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('🌐 Navigating to google.com...');
    await page.goto('https://www.google.com', { waitUntil: 'networkidle' });

    const title = await page.title();
    console.log(`✅ Page Title: ${title}`);

    const screenshotPath = path.join(screenshotDir, 'google.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Screenshot saved to: ${screenshotPath}`);

    if (title.toLowerCase().includes('google')) {
      console.log('🌟 Validation Successful!');
    } else {
      console.log('❌ Validation Failed: Title does not match.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error during browser test:', error);
    process.exit(1);
  } finally {
    await browser.close();
    console.log('🔒 Browser closed.');
  }
}

runTest();

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function runFrontendTest() {
  const screenshotDir = path.join(__dirname, 'screenshots', 'frontend');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('🚀 Launching browser for frontend validation...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  const consoleLogs = [];

  // Listen for console errors and logs
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    errors.push(`Page Error: ${err.message}`);
  });

  try {
    const url = 'http://localhost:5173';
    console.log(`🌐 Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait a bit for animations
    await page.waitForTimeout(2000);

    const title = await page.title();
    console.log(`✅ Page Title: ${title}`);

    // Capture Landing Page
    const landingPath = path.join(screenshotDir, 'landing.png');
    await page.screenshot({ path: landingPath, fullPage: true });
    console.log(`📸 Landing screenshot saved to: ${landingPath}`);

    // Check for "StudySync" text
    const hasText = await page.textContent('body');
    if (hasText.includes('StudySync')) {
      console.log('✨ Brand name found in page content.');
    } else {
      console.warn('⚠️ Brand name "StudySync" not found in visible content.');
    }

    // Navigate to Login
    console.log('🔗 Navigating to /login...');
    await page.goto(`${url}/login`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const loginPath = path.join(screenshotDir, 'login.png');
    await page.screenshot({ path: loginPath });
    console.log(`📸 Login screenshot saved to: ${loginPath}`);

    // Summary of logs
    console.log(`\n--- Console Logs (${consoleLogs.length}) ---`);
    consoleLogs.slice(-10).forEach(log => console.log(log));

    if (errors.length > 0) {
      console.log(`\n❌ Found ${errors.length} errors:`);
      errors.forEach(err => console.error(`  - ${err}`));
    } else {
      console.log('\n✅ No runtime errors detected on landing or login pages.');
    }

  } catch (error) {
    console.error('❌ Error during frontend test:', error);
    process.exit(1);
  } finally {
    await browser.close();
    console.log('🔒 Browser closed.');
  }
}

runFrontendTest();

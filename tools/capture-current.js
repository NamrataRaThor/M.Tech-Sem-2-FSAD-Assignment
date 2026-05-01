const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureCurrent() {
  const analysisDir = path.join(__dirname, 'screenshots', 'analysis');
  if (!fs.existsSync(analysisDir)) {
    fs.mkdirSync(analysisDir, { recursive: true });
  }

  console.log('🚀 Launching browser for current state capture...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const baseUrl = 'http://localhost:5173';
  const routes = [
    { name: 'landing', path: '/' },
    { name: 'login', path: '/login' },
    { name: 'dashboard', path: '/dashboard' },
    { name: 'groups', path: '/dashboard/groups' },
    { name: 'bookings', path: '/dashboard/bookings' },
    { name: 'profile', path: '/dashboard/profile' },
    { name: 'admin', path: '/dashboard/admin' },
  ];

  try {
    for (const route of routes) {
      const url = `${baseUrl}${route.path}`;
      console.log(`🌐 Capturing ${route.name} at ${url}...`);
      
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 5000 });
        await page.waitForTimeout(2000); // Wait for transitions
        
        const screenshotPath = path.join(analysisDir, `current_${route.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: route.name === 'landing' });
        console.log(`📸 Screenshot saved: ${screenshotPath}`);
      } catch (e) {
        console.warn(`⚠️ Failed to capture ${route.name}: ${e.message}`);
      }
    }

    // Extract design tokens from our own app
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const currentTokens = await page.evaluate(() => {
      const styles = window.getComputedStyle(document.body);
      return {
        fontFamily: styles.fontFamily,
        backgroundColor: styles.backgroundColor,
        color: styles.color,
      };
    });

    const tokensPath = path.join(analysisDir, 'current_tokens.json');
    fs.writeFileSync(tokensPath, JSON.stringify(currentTokens, null, 2));
    console.log(`📄 Current tokens saved to: ${tokensPath}`);

  } catch (error) {
    console.error('❌ Error during current state capture:', error);
    process.exit(1);
  } finally {
    await browser.close();
    console.log('🔒 Browser closed.');
  }
}

captureCurrent();

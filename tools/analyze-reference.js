const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function analyzeReference() {
  const analysisDir = path.join(__dirname, 'screenshots', 'analysis');
  if (!fs.existsSync(analysisDir)) {
    fs.mkdirSync(analysisDir, { recursive: true });
  }

  console.log('🚀 Launching browser for reference analysis...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  try {
    const url = 'https://wherecolorsdream.art/';
    console.log(`🌐 Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000); // Wait for animations

    // 1. Capture full page screenshot
    const mainScreenshot = path.join(analysisDir, 'reference_full.png');
    await page.screenshot({ path: mainScreenshot, fullPage: true });
    console.log(`📸 Reference screenshot saved to: ${mainScreenshot}`);

    // 2. Extract Design Tokens
    const designTokens = await page.evaluate(() => {
      const getStyles = (el) => window.getComputedStyle(el);
      
      const body = document.body;
      const bodyStyles = getStyles(body);
      
      // Look for specific elements that might have gradients/colors
      const sections = Array.from(document.querySelectorAll('section, div, canvas'));
      
      const colors = new Set();
      const fonts = new Set();
      
      fonts.add(bodyStyles.fontFamily);
      
      sections.forEach(el => {
        const s = getStyles(el);
        if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent') {
          colors.add(s.backgroundColor);
        }
        if (s.backgroundImage && s.backgroundImage.includes('gradient')) {
          colors.add(s.backgroundImage);
        }
        if (s.color) {
          colors.add(s.color);
        }
      });

      return {
        title: document.title,
        fontFamily: bodyStyles.fontFamily,
        backgroundColor: bodyStyles.backgroundColor,
        detectedColors: Array.from(colors),
        detectedFonts: Array.from(fonts),
        metaDescription: document.querySelector('meta[name="description"]')?.content || '',
      };
    });

    console.log('✨ Design Tokens Extracted:');
    console.log(JSON.stringify(designTokens, null, 2));

    const tokensPath = path.join(analysisDir, 'reference_tokens.json');
    fs.writeFileSync(tokensPath, JSON.stringify(designTokens, null, 2));
    console.log(`📄 Tokens saved to: ${tokensPath}`);

  } catch (error) {
    console.error('❌ Error during reference analysis:', error);
    process.exit(1);
  } finally {
    await browser.close();
    console.log('🔒 Browser closed.');
  }
}

analyzeReference();

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

/**
 * Common Browser Utilities for StudySync Campus
 */
class BrowserHelper {
  constructor(options = {}) {
    this.headless = options.headless !== false;
    this.screenshotDir = options.screenshotDir || path.join(process.cwd(), 'tools', 'screenshots');
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async init() {
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true });
    }
    this.browser = await chromium.launch({ headless: this.headless });
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 2,
    });
    this.page = await this.context.newPage();
    return this.page;
  }

  async capture(name, fullPage = false) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(this.screenshotDir, `${name}_${timestamp}.png`);
    await this.page.screenshot({ path: filePath, fullPage });
    console.log(`📸 Screenshot captured: ${filePath}`);
    return filePath;
  }

  async checkConsole() {
    const errors = [];
    this.page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    this.page.on('pageerror', err => {
      errors.push(err.message);
    });
    return errors;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

module.exports = { BrowserHelper };

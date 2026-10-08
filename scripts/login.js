import { chromium } from 'playwright';
import dotenv from 'dotenv';
import path from 'path';

const rootDir = path.resolve(import.meta.dirname, '..');
dotenv.config({ path: path.resolve(rootDir, '.env') });

const appealUrl = process.env.APPEAL_URL;
const authPath = path.resolve(rootDir, 'auth.json');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to login...');
  await page.goto(appealUrl);

  console.log('Please log in and complete the Microsoft Authenticator prompt in the browser...');
  
  // Wait for navigation to complete after logging in successfully (e.g., waiting for a key page element)
  await page.waitForURL('**/appeal/new-saved-appeal**', { timeout: 120000 });

  // Save the logged-in browser state (cookies, local storage)
  await context.storageState({ path: authPath });
  console.log('Saved session state to auth.json successfully!');

  await browser.close();})();
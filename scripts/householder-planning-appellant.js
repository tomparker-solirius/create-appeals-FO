import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const rootDir = path.resolve(import.meta.dirname, '..');
dotenv.config({ path: path.resolve(rootDir, '.env') });

const appealUrl = process.env.APPEAL_URL;
const emailAddress = process.env.APPEAL_EMAIL;
const verificationCode = process.env.EMAIL_VERIFICATION_CODE;
const authPath = path.resolve(rootDir, 'auth.json');

//WIP
async function dumpPageInfo(page, stepName) {
  console.log(`\n=== STEP: ${stepName} ===`);
  console.log('URL:', page.url());
  const h1 = await page.locator('h1').allInnerTexts();
  console.log('H1:', h1);
  const legends = await page.locator('legend').allInnerTexts();
  if (legends.length > 0) console.log('Legends:', legends);
  const labels = await page.locator('label').allInnerTexts();
  console.log('Labels:', labels);
  const buttons = await page.locator('button, input[type="submit"], a.govuk-button').allInnerTexts();
  console.log('Buttons/Action Links:', buttons);
}

(async () => {
  const startTime = performance.now();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: authPath });
  const page = await context.newPage();

  console.log('Starting Householder planning appeal automation...');

  // 1. Initial appeal selection
  await page.goto(appealUrl);
  await page.getByLabel('Start a new appeal').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // 2. Select local planning authority
  await page.waitForTimeout(1000);
  await expect(page.locator('#local-planning-department')).toBeVisible();
  await page.locator('#local-planning-department').fill('System Test Borough Council 2');
  await expect(page.locator('#local-planning-department__option--0')).toBeVisible();
  await page.locator('#local-planning-department__option--0').click();
  await page.getByRole('button', { name: 'Continue' }).click();

  // 3. Appeal type selection - Householder planning
  await page.waitForTimeout(1000);
  await page.getByLabel('Householder planning').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // 4. Date application submitted
  await page.waitForTimeout(1000);
  await expect(page.getByLabel('Day')).toBeVisible();
  await page.getByLabel('Day').fill('10');
  await page.getByLabel('Month').fill('08');
  await page.getByLabel('Year').fill('2026');
  await page.getByRole('button', { name: 'Continue' }).click();

  // 5. Application status (Granted or refused)
  await page.waitForTimeout(1000);
  await page.getByLabel('Refused').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // 6. Decision letter date
  await page.waitForTimeout(1000);
  await expect(page.getByLabel('Day')).toBeVisible();
  await page.getByLabel('Day').fill('15');
  await page.getByLabel('Month').fill('09');
  await page.getByLabel('Year').fill('2026');
  await page.getByRole('button', { name: 'Continue' }).click();

  // 7. Next page
  await page.waitForTimeout(1000);
  await dumpPageInfo(page, 'After Decision letter date');

  await browser.close();
})();

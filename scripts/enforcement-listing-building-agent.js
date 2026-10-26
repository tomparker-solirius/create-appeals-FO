import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const rootDir = path.resolve(import.meta.dirname, '..');
dotenv.config({ path: path.resolve(rootDir, '.env') });

const appealUrl = process.env.APPEAL_URL;
const emailAddress = process.env.APPEAL_EMAIL;
const verificationCode = process.env.EMAIL_VERIFICATION_CODE;
const runHeadless = process.env.HEADLESS_MODE === 'true';
const authPath = path.resolve(rootDir, 'auth.json');

(async () => {
  const startTime = performance.now();
  // Launch browser in headed mode to see execution (set headless: true to run silently)
  const browser = await chromium.launch({ headless: runHeadless });
  const context = await browser.newContext({ storageState: authPath });
  const page = await context.newPage();

  console.log('Starting enforcement listed building appeal automation...');

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

  // 3. Appeal type selection - Enforcement notice for a listed building
  await page.waitForTimeout(1000);
  await page.getByLabel('Enforcement notice for a listed building').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // 4. Issue date on enforcement notice
  await page.waitForTimeout(1000);
  await expect(page.getByLabel('Day')).toBeVisible();
  await page.getByLabel('Day').fill('10');
  await page.getByLabel('Month').fill('09');
  await page.getByLabel('Year').fill('2026');
  await page.getByRole('button', { name: 'Continue' }).click();

  // 5. Effective date on enforcement notice
  await page.waitForTimeout(1000);
  await expect(page.getByLabel('Day')).toBeVisible();
  await page.getByLabel('Day').fill('3');
  await page.getByLabel('Month').fill('11');
  await page.getByLabel('Year').fill('2026');
  await page.getByRole('button', { name: 'Continue' }).click();

  // 6. Check answers / Eligibility check page
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Start appeal' }).click();

  // 7. Reference number on enforcement notice
  await page.waitForTimeout(1000);
  await expect(page.getByLabel('What is the reference number on the enforcement notice?')).toBeVisible();
  const refNumber = await createRefNumber();
  await page.getByLabel('What is the reference number on the enforcement notice?').fill(refNumber);
  await page.getByRole('button', { name: 'Continue' }).click();

  // 8. Email address & Verification (Maintained same authentication logic)
  await page.waitForTimeout(1000);
  await expect(page.getByLabel('What is your email address?')).toBeVisible();
  await page.getByLabel('What is your email address?').fill(emailAddress);
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.waitForTimeout(1000);
  await expect(page.getByLabel('Enter the code we sent to your email address')).toBeVisible();
  await page.getByLabel('Enter the code we sent to your email address').fill(verificationCode);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Continue' }).click(); // Email confirmed step

  // 9. Before you start overview
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Continue' }).click();

  // --- SECTION 1: Prepare Appeal ---

  // Who is appealing against the enforcement notice?
  await page.locator("//a[text()='Answer']").first().click();
  await page.getByLabel('An individual').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Name of individual
  await expect(page.getByLabel('First name')).toBeVisible();
  await page.getByLabel('First name').fill('Bilbo');
  await page.getByLabel('Last name').fill('Baggins');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Are you Bilbo Baggins?
  await page.getByLabel('No, I am appealing on behalf of Bilbo Baggins', { exact: true }).check();
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByRole('textbox', { name: 'First name' }).fill('Samwise');
  await page.getByRole('textbox', { name: 'Last name' }).fill('Gamgee');
  await page.getByRole('button', { name: 'Continue' }).click();


  // Phone number
  await expect(page.getByLabel('UK telephone number')).toBeVisible();
  await page.getByLabel('UK telephone number').fill('+447933454333');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Complete appeal on behalf overview page
  await page.getByRole('button', { name: 'Continue' }).click();

  // Address of the appeal site
  await expect(page.getByLabel('Address line 1')).toBeVisible();
  await page.getByLabel('Address line 1').fill('30 Shire Lane');
  await page.getByLabel('Town or city').fill('Hobbiton');
  await page.getByLabel('County (optional)').fill('The Shire');
  await page.getByLabel('Postcode').fill('CF10 1AA');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Is appeal site address your contact address?
  await page.getByLabel('Yes').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Interest in the land
  await page.getByLabel('Owner').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Site inspection access
  await page.locator("//input[@data-cy='answer-no']").check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Health and safety issues
  await page.locator("//input[@data-cy='answer-no']").check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Description of the alleged breach
  const breachDescription = 'Praesent porta, magna vitae dapibus pharetra, erat eros efficitur nunc, in mattis lectus libero a erat. In a tortor nunc. Vehicula tempor. Vivamus a semper tellus. Donec nonuma erat vel vehicula porttitor. Aliquam erat volutpat.';
  await expect(page.getByRole('textbox')).toBeVisible();
  await page.getByRole('textbox').fill(breachDescription);
  await page.getByRole('button', { name: 'Continue' }).click();

  // Choose grounds of appeal
  await page.getByLabel('Ground (a)').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Facts for ground (a)
  await expect(page.getByRole('textbox')).toBeVisible();
  await page.getByRole('textbox').fill(breachDescription);
  await page.getByRole('button', { name: 'Continue' }).click();

  // Documents to support ground (a) facts?
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Decision procedure preference
  await page.getByLabel('Written representations').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Linked appeals
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // --- SECTION 2: Upload Documents ---

  // Upload Enforcement notice (Using reference file test_data/test_doc_1.pdf)
  await page.getByRole('link', { name: 'Upload' }).first().click();
  await page.setInputFiles('input[type="file"]', path.resolve(rootDir, 'test_data/test_doc_1.pdf'));
  await page.getByRole('button', { name: 'Continue' }).click();

  // Upload Enforcement notice plan (Using reference file test_data/test_doc_2.pdf)
  await page.setInputFiles('input[type="file"]', path.resolve(rootDir, 'test_data/test_doc_2.pdf'));
  await page.getByRole('button', { name: 'Continue' }).click();

  // Planning obligation
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Award of appeal costs
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Other new documents
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // --- SECTION 3: Submit ---

  await page.locator("//a[text()='Continue']").first().click();
  await page.getByRole('button', { name: 'Accept and submit' }).click();

  await expect(page.locator("//h1[normalize-space()='Appeal submitted']")).toBeVisible();
  await page.locator("//a[text()='View your appeals']").click();
  await expect(page.locator("//h1[normalize-space()='Your appeals']")).toBeVisible();
  await page.locator('#tab_waiting-for-review').click();
  await expect(page.locator("//caption[normalize-space()='Waiting for review']")).toBeVisible();
  await page.reload();
  await page.waitForTimeout(1000);
  await page.reload();
  await page.waitForTimeout(1000);
  await expect(page.locator("//caption[normalize-space()='Waiting for review']")).toBeVisible();

  const appealNumber = await page.locator("//a[contains(@href, '60')]").last().textContent();
  const appealNumberTrimmed = appealNumber.trim();
  const endTime = performance.now();

  console.log('Form completed successfully!');
  await browser.close();
  console.log('Reference number:', refNumber);
  console.log('Appeal number:', appealNumberTrimmed);
  console.log(`Total execution time: ${(endTime - startTime) / 1000} seconds`);
})();

async function createRefNumber() {
  const now = new Date();
  const dayAbbr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][now.getDay()];
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const refNumber = `${dayAbbr}${hours}${minutes}`;
  return refNumber;
}
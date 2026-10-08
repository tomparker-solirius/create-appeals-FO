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

(async () => {
  const startTime = performance.now()
  // Launch browser in headed mode to see the execution (set headless: true to run silently)
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: authPath });
  const page = await context.newPage();

  console.log('Starting form automation...');

  // 1. Initial appeal selection
  await page.goto(appealUrl);
  await page.getByLabel('Start a new appeal').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // 2. Select local planning authority
  await page.waitForTimeout(1000)
  await expect(page.locator('#local-planning-department')).toBeVisible();
  await page.locator("#local-planning-department").fill("System Test Borough Council 2");
  await expect(page.locator('#local-planning-department__option--0')).toBeVisible();
  await page.locator('#local-planning-department__option--0').click();
  await page.getByRole('button', { name: 'Continue' }).click();

  // 3. Appeal type selection
  await page.waitForTimeout(1000)
  await page.getByLabel('Full planning').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // 4. Date application submitted
  await page.waitForTimeout(1000)
  await expect(page.getByLabel('Day')).toBeVisible();
  await page.getByLabel('Day').fill('10');
  await page.getByLabel('Month').fill('08');
  await page.getByLabel('Year').fill('2026');
  await page.getByRole('button', { name: 'Continue' }).click();

  // 5. Application status (Granted or refused)
  await page.waitForTimeout(1000)
  await page.getByLabel('Refused').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // 6. Decision letter date
  await page.waitForTimeout(1000)
  await expect(page.getByLabel('Day')).toBeVisible();
  await page.getByLabel('Day').fill('15');
  await page.getByLabel('Month').fill('09');
  await page.getByLabel('Year').fill('2026');
  await page.getByRole('button', { name: 'Continue' }).click();

  // 7. Eligibility check page
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Start appeal' }).click();

  // 8. Email address & Verification
  await page.waitForTimeout(1000)
  await expect(page.getByLabel('What is your email address?')).toBeVisible();
  await page.getByLabel('What is your email address?').fill(emailAddress);
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.waitForTimeout(1000)
  await expect(page.getByLabel('Enter the code we sent to your email address')).toBeVisible();
  await page.getByLabel('Enter the code we sent to your email address').fill(verificationCode);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Continue' }).click(); // Email confirmed step

  // 9. Before you start overview
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Continue' }).click();

  // --- SECTION 1: Prepare Appeal ---

  // Was application made in your name?
  await page.locator("//a[text()='Answer']").first().click();
  await page.getByLabel('Yes, the application was made in my name').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Contact details
  await expect(page.getByLabel('First name')).toBeVisible();
  await page.getByLabel('First name').fill('Bilbo');
  await page.getByLabel('Last name').fill('Baggins');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Phone number
  await expect(page.getByLabel('UK telephone number')).toBeVisible();
  await page.getByLabel('UK telephone number').fill('+447933454333');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Address
  await expect(page.getByLabel('Address line 1')).toBeVisible();
  await page.getByLabel('Address line 1').fill('30 Shire Lane');
  await page.getByLabel('Town or city').fill('Hobbiton');
  await page.getByLabel('County (optional)').fill('The Shire');
  await page.getByLabel('Postcode').fill('CF10 1AA');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Site area
  await page.locator("//input[@data-cy='answer-m²']").check();
  await expect(page.getByLabel('Site area, in square metres')).toBeVisible();
  await page.getByLabel('Site area, in square metres').fill('23');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Green belt
  await page.locator("//input[@data-cy='answer-no']").check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Land ownership
  await page.locator("//input[@data-cy='answer-yes']").check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Agricultural holding
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();


  // Site inspection access
  await page.locator("//input[@data-cy='answer-no']").check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Health and safety issues
  await page.locator("//input[@data-cy='answer-no']").check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Application reference number
  await expect(page.getByLabel('What is the application reference number?')).toBeVisible();
  const refNumber = await createRefNumber();
  await page.getByLabel('What is the application reference number?').fill(refNumber);
  await page.getByRole('button', { name: 'Continue' }).click();

  // Major or minor development
  await page.getByLabel('Minor development').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Development type
  await page.getByLabel('Householder development').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Description of development
  const descriptionText = 'Duis non quam et nisi tincidunt fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.';
  await expect(page.getByRole('textbox')).toBeVisible();
  await page.getByRole('textbox').fill(descriptionText);
  await page.getByRole('button', { name: 'Continue' }).click();

  // LPA description change
  await page.getByLabel('Yes, I agreed a new description with the local planning authority').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Reasons for appeal
  await expect(page.getByRole('textbox')).toBeVisible();
  await page.getByRole('textbox').fill(descriptionText);
  await page.getByRole('button', { name: 'Continue' }).click();

  // Significant changes
  await page.getByLabel('There have been no significant changes').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Decision procedure preference
  await page.getByLabel('Written representations').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Linked appeals
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // --- SECTION 2: Upload Documents ---

  // Upload Application Form
  await page.getByRole('link', { name: 'Upload' }).first().click();
  await page.setInputFiles('input[type="file"]', path.resolve(rootDir, 'test_data/test_doc_1.pdf'));
  await page.getByRole('button', { name: 'Continue' }).click();

  // Environmental statement
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Evidence of agreed description change
  await page.setInputFiles('input[type="file"]', path.resolve(rootDir, 'test_data/test_doc_2.pdf'));
  await page.getByRole('button', { name: 'Continue' }).click();

  // Decision letter
  await page.setInputFiles('input[type="file"]', path.resolve(rootDir, 'test_data/test_doc_3.pdf'));
  await page.getByRole('button', { name: 'Continue' }).click();

  // Planning obligation
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Separate ownership certificate
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Award of appeal costs
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.locator("//a[text()='Continue']").first().click();
  await page.locator("//button[@data-cy='submit-appeal']").click();
  await expect(page.locator("//h1[normalize-space()='Appeal submitted']")).toBeVisible();
  await page.locator("//a[text()='View your appeals']").click();
  await expect(page.locator("//h1[normalize-space()='Your appeals']")).toBeVisible();
  await page.locator("#tab_waiting-for-review").click();
  await expect(page.locator("//caption[normalize-space()='Waiting for review']")).toBeVisible();
  await page.reload();
  await page.waitForTimeout(1000);
  await page.reload();
  await page.waitForTimeout(1000);
  await expect(page.locator("//caption[normalize-space()='Waiting for review']")).toBeVisible();
  const appealNumber = await page.locator("//a[contains(@href, '60')]").last().textContent()
  const appealNumberTrimmed = appealNumber.trim();
  const endTime = performance.now()

  console.log('Form completed successfully!');
  await browser.close();
  console.log('Reference number:', refNumber);
  console.log('Appeal number:', appealNumberTrimmed);
  console.log(`Total execution time: ${(endTime - startTime) / 1000} seconds`);
})();

async function createRefNumber(){
  const now = new Date();
  const dayAbbr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][now.getDay()];
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const refNumber = `${dayAbbr}${hours}${minutes}`;
  return refNumber;
}
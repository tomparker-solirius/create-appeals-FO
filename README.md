# Appeal Automation Scripts

Cypress scripts for creating test appeals.

## Requirements

- Node.js and npm
- Access to the Planning Inspectorate test service
- A browser sign-in that can complete the required authentication prompt

## Setup

Install the project dependencies and Chromium:

```sh
npm install
npx playwright install chromium
```

Create a local environment file from the example:

```sh
cp .env.example .env
```

Edit `.env` and set values 

Replace the example values with the test service URL, your email address, and the current verification code. Keep `.env` private. 
 
Create and add your own PDF test documents to `test_data/` before running a submission script. The scripts expect these filenames:

`test_doc_1.pdf` 
`test_doc_2.pdf` 
`test_doc_3.pdf` 

## Run

1. Start the login helper:

   ```sh
   npm run login
   ```

2. Complete sign-in in the opened browser. The helper opens the URL configured in `APPEAL_URL` and saves the browser session to `auth.json`.

3. Set the current `EMAIL_VERIFICATION_CODE` in `.env`, then run one of the submission scripts to create an appeal:

   ```sh
   npm run full-planning:agent:hearing
   ```

import { defineConfig } from "cypress";
import dotenv from "dotenv";
import path from "path";

const rootDir = import.meta.dirname;
dotenv.config({ path: path.resolve(rootDir, ".env"), quiet: true });

const appealUrl = process.env.APPEAL_URL;

export default defineConfig({
  e2e: {
    baseUrl: appealUrl,
    viewportWidth: 1280,
    viewportHeight: 900,
    video: false,
    env: {
      APPEAL_URL: appealUrl,
      LPA_NAME: process.env.LPA_NAME,
      APPEAL_EMAIL: process.env.APPEAL_EMAIL,
      EMAIL_VERIFICATION_CODE: process.env.EMAIL_VERIFICATION_CODE,
    },
    setupNodeEvents(on) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
});

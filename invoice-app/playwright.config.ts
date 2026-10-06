import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const { E2E_DATABASE_URL, DATABASE_URL } = process.env;

if (!E2E_DATABASE_URL) throw new Error('Set E2E_DATABASE_URL to a separate test database');
if (E2E_DATABASE_URL === DATABASE_URL) {
  throw new Error('E2E_DATABASE_URL must differ from DATABASE_URL: the suite resets it');
}

const PORT = 3200;

export default defineConfig({
  testDir: './e2e',
  workers: 1,
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command: `npx prisma migrate reset --force && npx prisma db seed && npm run build && npm start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    env: { DATABASE_URL: E2E_DATABASE_URL },
    reuseExistingServer: false,
    timeout: 180_000,
  },
});

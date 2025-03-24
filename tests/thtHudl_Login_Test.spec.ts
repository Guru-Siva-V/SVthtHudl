import { test, expect } from '@playwright/test';
import { getEnv } from '../utils/env';

test.beforeAll(async() => {
  // Get the browser name from test.info() for each test run
  const browserName = test.info().project.name;
  console.log(`Starting HUDL Login tests on browser: ${browserName}`);
});

test.afterAll(async() => {
  // Get the browser name from test.info() for each test run
  const browserName = test.info().project.name;
  console.log(`Completed HUDL Login tests on browser: ${browserName}`);
});

test.describe('Hudl Login Tests', () => {

  // test level timeout, that will override the timeout configured in playwright.config.ts
  // test.setTimeout(3 * 60 * 1000); // moved to Global config

// ***** Positive Flow Login Tests *****
    // Login successfully with valid credentials
    // Login successfully with valid credentials and prefix/suffix white spaces in Username trimmed
    // Login successfully with valid credentials after wrong email edited back from password screen

  test.beforeEach(async () => {
    // This will run before each test
    console.log(`Test started: ${test.info().title}`);
  });
  
  test.afterEach(async () => {
    // This will run after each test, logging the completion
    console.log(`Test ended: ${test.info().title}`);
  });

  test('Login successfully with valid credentials', async ({ page }) => {
    // Navigate to Hudl Home page and to the login page
    await page.goto('https://www.hudl.com/en_gb/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('link', { name: 'Hudl logo mark Hudl' }).click();

    // Fill in Valid username and password from .env
    await page.getByRole('textbox', { name: 'Email' }).fill(getEnv('HUDL_USERNAME'));
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(getEnv('HUDL_PASSWORD'));
    await page.getByRole('button', { name: 'Continue' }).click();

    // Wait for navigation and verify successful login
    await page.waitForURL('**/home');
    expect(page.url()).toContain('https://www.hudl.com/home');

    // Verify the login screen standard menu visual look is as expected with the Login Landing Page standard menu visual look image stored
      const element_LILP_Menu= await page.locator('[id="ssr-webnav"]');
      await expect.soft(element_LILP_Menu).toHaveScreenshot('HudlLoginSuccess_ValidCredsSpace_PageMnu.png', { maxDiffPixelRatio: 0.1 });
    // await expect.soft(page).toHaveScreenshot('HudlLoginSuccess_ValidCreds_Page.png', { maxDiffPixelRatio: 0.05 });

    //Logout to clear login session
    await page.locator('[class="hui-globalusermenu"]').hover();
    await page.getByRole('link', { name: 'Log Out' }).click();
  });

  test('Login successfully with valid credentials and prefix/suffix white spaces in Username trimmed', async ({ page }) => {
    // Navigate to Hudl Home page and to the login page
    await page.goto('https://www.hudl.com/en_gb/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('link', { name: 'Hudl logo mark Hudl' }).click();

    // Fill in Valid username and password from .env
    await page.getByRole('textbox', { name: 'Email' }).fill(' '+getEnv('HUDL_USERNAME')+'  ');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(getEnv('HUDL_PASSWORD'));
    await page.getByRole('button', { name: 'Continue' }).click();

    // Wait for navigation and verify successful login
    await page.waitForURL('**/home');
    expect(page.url()).toContain('https://www.hudl.com/home');

    //Logout to clear login session
    await page.locator('[class="hui-globalusermenu"]').hover();
    await page.getByRole('link', { name: 'Log Out' }).click();
  });

  test('Login successfully with valid credentials after wrong email edited back from password screen', async ({ page }) => {
    // Navigate to Hudl Home page and to the login page
    await page.goto('https://www.hudl.com/en_gb/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('link', { name: 'Hudl logo mark Hudl' }).click();

    // Fill in Valid username from .env and invalid password 
    await page.getByRole('textbox', { name: 'Email' }).fill('invalid@example.com');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('invalidpass');
    await page.getByRole('button', { name: 'Continue' }).click();

    // Edit the wrong email by clicking on Edit
    await page.locator('[data-link-name="edit-username"]').click();
    await page.keyboard.type('Meta+A');

    await page.getByRole('textbox', { name: 'Email' }).fill(getEnv('HUDL_USERNAME'));
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(getEnv('HUDL_PASSWORD'));
    await page.getByRole('button', { name: 'Continue' }).click();

    // Wait for navigation and verify successful login
    await page.waitForURL('**/home');
    expect(page.url()).toContain('https://www.hudl.com/home');

    //Logout to clear login session
    await page.locator('[class="hui-globalusermenu"]').hover();
    await page.getByRole('link', { name: 'Log Out' }).click();
  });

// ***** Negative Flow Login Tests *****
    // Login failure with invalid credentials: password Only
    // Login failure with invalid credentials: email/password
    // Login failure for SQL Injection and XSS attempts

    test('Login failure with invalid credentials: password Only', async ({ page }) => {
    // Navigate to Hudl Home page and to the login page
    await page.goto('https://www.hudl.com/en_gb/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('link', { name: 'Hudl logo mark Hudl' }).click();

    // Fill in Valid username and Invalid password from .env
    await page.getByRole('textbox', { name: 'Email' }).fill(getEnv('HUDL_USERNAME'));
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('invalidpass');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Check for error message
    const errorMessage = page.locator('[id="error-element-password"]');
    await expect(errorMessage).toContainText('Your email or password is incorrect. Try again.');

      // Verify the login failure (for wrong password only) screen visual look is as expected with the Login failure page image stored
      await expect.soft(page).toHaveScreenshot('HudlLogin_InvalidPassword_Fail_Page.png', { maxDiffPixelRatio: 0.1 });
  });

  test('Login failure with invalid credentials: email/password', async ({ page }) => {
    // Navigate to Hudl Home page and to the login page
    await page.goto('https://www.hudl.com/en_gb/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('link', { name: 'Hudl logo mark Hudl' }).click();

    // Fill in Invalid username and password from .env
    await page.getByRole('textbox', { name: 'Email' }).fill('invalid@example.com');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Check for error message
    const errorMessage_pwdScrn = page.locator('[id="error-element-password"]');
    await expect(errorMessage_pwdScrn).toContainText('Incorrect username or password.');

  });

  test('Login failure for SQL Injection and XSS attempts', async ({ page }) => {
    // Navigate to Hudl Home page and to the login page
    await page.goto('https://www.hudl.com/en_gb/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('link', { name: 'Hudl logo mark Hudl' }).click();

    // Fill in SQL Injection Attempt
    await page.getByRole('textbox', { name: 'Email' }).fill("' OR '1'='1");
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Check for error message
    const errorMessage_LoginScrn_SQL_attempt = page.locator('[id="error-element-username"]');
    await expect(errorMessage_LoginScrn_SQL_attempt).toContainText('Enter a valid email.');

    // Fill in XSS Attempt
    await page.getByRole('textbox', { name: 'Email' }).fill("<script>alert('xss')</script>");
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Check for error message
    const errorMessage_LoginScrn_XSS_attempt = page.locator('[id="error-element-username"]');
    await expect(errorMessage_LoginScrn_XSS_attempt).toContainText('Enter a valid email.');
  });
});
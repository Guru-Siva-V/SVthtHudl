<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hudl - Take Home Test - SV</title>
</head>
<body>
  <h1>HUDL - Take Home Test - SV</h1>

  <p><strong>Hudl - Take Home Test</strong> is a web automation testing project developed with Playwright and TypeScript to test the functionality of the Hudl login page. The project contains both positive and negative test cases to ensure the robustness of the login process, including valid logins, handling of incorrect credentials, and preventing SQL injection and XSS attacks.</p>

  <h2>Features</h2>
  <ul>
    <li>Automated login testing for the <strong>Hudl</strong> web application.</li>
    <li>Tests for <strong>valid credentials</strong> and <strong>incorrect credentials</strong> scenarios.</li>
    <li>Handles edge cases such as <strong>prefix/suffix white spaces</strong> in usernames.</li>
    <li>Verifies <strong>error handling</strong> for invalid inputs (wrong passwords, invalid usernames).</li>
    <li>Prevents <strong>SQL injection</strong> and <strong>XSS attempts</strong> for security testing.</li>
    <li>Visual regression testing using Playwright's screenshot comparison capabilities.</li>
    <li>Integration with <strong>GitHub Actions</strong> for continuous integration and automated test execution on push or pull request events.</li>
  </ul>

  <h2>Prerequisites</h2>
  <p>Before you begin, ensure you have the following software installed:</p>
  <ul>
    <li><a href="https://nodejs.org/" target="_blank">Node.js</a> (v16 or later)</li>
    <li><a href="https://playwright.dev/" target="_blank">Playwright</a> (for running browser automation)</li>
    <li><a href="https://code.visualstudio.com" target="_blank">VS Code</a> for maintenance and running of code in Headful or Headless mode. Alternatively any other choice of Code Editor or Integrated Development Environment (IDE) of your choice compatible for Playwright/Typescript projects can be used</li>
    <li><a href="https://git-scm.com/" target="_blank">Git</a></li>
  </ul>

  <h2>Getting Started</h2>

  <p>To get a local copy of the project up and running on your machine, follow these steps:</p>

  <h3>1. Clone the Repository</h3>
  <pre><code>git clone https://github.com/Guru-Siva-V/SVthtHudl.git
cd SVthtHudl</code></pre>

  <h3>2. Install Dependencies</h3>
  <pre><code>npm install</code></pre>

  <h3>3. Install Playwright Browsers</h3>
  <pre><code>npx playwright install</code></pre>

  <h3>4. Set Up Environment Variables</h3>
  <p>The project requires the following environment variables for the login tests:</p>
  <ul>
    <li><strong>HUDL_USERNAME</strong>: The valid username for the login test.</li>
    <li><strong>HUDL_PASSWORD</strong>: The valid password for the login test.</li>
  </ul>

  <p>You can set these variables in a <code>.env</code> file in the root of the project:</p>
  <pre><code>HUDL_USERNAME=your_email@example.com
HUDL_PASSWORD=your_password</code></pre>

  <h3>5. Run the Tests</h3>
  <p>You can run the tests with the following command:</p>
  <pre><code>npx playwright test</code></pre>
  <p>This will run all the tests defined in the project.</p>
  <p>To view test execution visually in the local machine as it gets executed, please set the headless configuration in the "playwright.config.ts" to "headless: false"</p>

  <h2>GitHub Actions Integration</h2>

  <h3>Running Tests on Push or Pull Request</h3>
  <p>The project is configured to run tests automatically using <strong>GitHub Actions</strong> when changes are pushed to the <code>main</code> branch or a pull request is made. You can find the workflow configuration in <code>.github/workflows/playwright.yml</code>.</p>

  <h3>Manual Trigger of Tests</h3>
  <p>You can also manually trigger the tests from the GitHub web UI using <strong>workflow_dispatch</strong>. This allows you to start the tests on demand directly from the GitHub Actions tab.</p>

  <h4>Steps to Manually Trigger the Tests:</h4>
  <ol>
    <li>Go to the <strong>Actions</strong> tab of your GitHub repository.</li>
    <li>Select the <strong>Playwright Tests</strong> workflow.</li>
    <li>Click the <strong>Run workflow</strong> button to manually start the tests.</li>
  </ol>

  <h2>Directory Structure</h2>
  <pre><code>SVthtHudl/
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Actions workflow configuration
├── tests/                      # Test files
|   ├── playwright-report       # HTML view of complete test report can be visualised for every test runs
│   └── login.spec.ts           # Playwright test cases
├── package.json                # Project dependencies and scripts
├── playwright.config.ts        # Playwright configuration file
└── README.md                   # Project documentation</code></pre>

  <h2>Screenshots and Visual Regression</h2>
  <p>The project includes visual regression tests for key screens such as:</p>
  <ul>
    <li>Login success page</li>
    <li>Login failure page</li>
  </ul>
  <p>These screenshots are saved in the test folder and compared during test execution to detect any unintended changes.</p>

  <h2>Test Scenarios</h2>

  <h3>Positive Flow Tests</h3>
  <ul>
    <li><strong>Login with valid credentials</strong>: Verifies login functionality with correct username and password.</li>
    <li><strong>Login with trimmed username</strong>: Tests login when there are extra spaces before or after the username.</li>
    <li><strong>Login after incorrect email editing</strong>: Verifies login functionality after editing the wrong email on the password page.</li>
  </ul>

  <h3>Negative Flow Tests</h3>
  <ul>
    <li><strong>Login failure with incorrect password</strong>: Verifies error handling for invalid passwords.</li>
    <li><strong>Login failure with incorrect username/password</strong>: Verifies error handling for incorrect credentials.</li>
    <li><strong>SQL Injection and XSS protection</strong>: Tests the system's resilience to SQL injection and XSS attacks.</li>
  </ul>

  <h2>Contributing</h2>
  <p>Contributions are always welcome! If you would like to contribute, please follow these steps:</p>
  <ol>
    <li>Fork the repository.</li>
    <li>Create a new branch (<code>git checkout -b feature/your-feature</code>).</li>
    <li>Make your changes.</li>
    <li>Commit your changes (<code>git commit -am 'Add new feature'</code>).</li>
    <li>Push to the branch (<code>git push origin feature/your-feature</code>).</li>
    <li>Open a pull request.</li>
  </ol>
  <p>Please ensure that your changes pass the existing tests and add tests for any new functionality.</p>

  <h2>Acknowledgements</h2>
  <ul>
    <li><a href="https://playwright.dev/" target="_blank">Playwright</a> for browser automation.</li>
    <li><a href="https://github.com/features/actions" target="_blank">GitHub Actions</a> for continuous integration.</li>
  </ul>
</body>
</html>

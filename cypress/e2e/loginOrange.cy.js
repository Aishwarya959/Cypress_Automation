import { loginPage } from "../pages/loginPage";

const loginObj = new loginPage();

// Critical test to verify login with valid credentials
it('@critical Verify Login to the HRM App is working', { retries: { runMode: 2, openMode: 1 } }, () => {
  cy.fixture('example.json').then((testdata) => {
    const { baseUrlUsername, baseUrlPassword } = testdata;
    // Login test with valid credentials
    cy.loginHRM(baseUrlUsername, baseUrlPassword); 
  });
});

// Smoke test to verify login with invalid credentials
it('@smoke Verify Login to the HRM App is working with invalid credentials', { retries: { runMode: 2, openMode: 1 } }, () => {
  cy.fixture('example.json').then((testdata) => {
    const { baseUrlUsername, invalidPassword } = testdata;
    // Login attempt with invalid credentials
    cy.loginHRM(baseUrlUsername, invalidPassword, { timeout: 10000 }).should('be.visible');
    cy.wait(5000); // Wait for 5 seconds after test
  });
});

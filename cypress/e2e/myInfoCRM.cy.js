
describe('My Info Tests on Orange HRM Application', () => {
  
  it('Verify Login and My info to the HRM App is working', () => {
    // Access the data from the fixture
    cy.fixture('example.json').then((testdata) => {
      const { baseUrlUsername, baseUrlPassword } = testdata;

      // Use Cypress.env to get the URL dynamically from the environment variable
      cy.visit(Cypress.env('URL'));  // This will visit the URL defined in cypress.json

      // Perform login action
      cy.loginHRM(baseUrlUsername, baseUrlPassword);

      // Check if the "My Info" section is visible and click
      cy.xpath("//span[normalize-space()='My Info']")
        .should('be.visible', { timeout: 10000 })
        .click();

      // Call the 'myinfo' function that fills out the form
      cy.myinfo();

      // Ignore uncaught exceptions to prevent the test from failing when an error occurs
      Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception:', err);
        return false; // Prevents Cypress from failing the test on uncaught exceptions
      });
    });
  });

});








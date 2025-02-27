import 'cypress-xpath';
describe("Read data from Excel file in Cypress", () => {
  it("should use Excel data to perform login tests",{retries: 0},() => {
      cy.readExcelFile("datadriven.xlsx").then((data) => {
          data.shift(); // Remove headers if present
          data.forEach(([firstname, middlename, lastname]) => {
            cy.fixture('example.json').then((testdata) => {
                const { baseUrlUsername, baseUrlPassword } = testdata;
          
                // Use Cypress.env to get the URL dynamically from the environment variable
                cy.visit(Cypress.env('URL'));  // This will visit the URL defined in cypress.json
          
                // Perform login action
                cy.loginHRM(baseUrlUsername, baseUrlPassword);
          
                // Check if the "My Info" section is visible and click
                cy.xpath("//span[normalize-space()='My Info']").should('be.visible', { timeout: 10000 }) .click();

                cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').type(firstname);
                cy.get(':nth-child(2) > :nth-child(2) > .oxd-input').type(middlename);
                cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').type(lastname);
                cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button').click();
                cy.get('.oxd-userdropdown-tab > .oxd-icon').click();
                cy.get(':nth-child(4) > .oxd-userdropdown-link').click();
                Cypress.on('uncaught:exception', (err, runnable) => {
                    console.error('Uncaught exception:', err);
                    return false; // Prevents Cypress from failing the test on uncaught exceptions
                  });
      });
    });
          })
        });
    })

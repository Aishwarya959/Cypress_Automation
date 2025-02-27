export class registerPage {

    Weblocators = {
        firstName: '[name="firstName"]',
        middleName: '[name="middleName"]',
        lastName: '[name="lastName"]',

        employeeId: '.oxd-input.oxd-input--active', // General class selector
        otherId: '.oxd-input.oxd-input--active',   // General class selector
        driversLicenseNumber: '.oxd-input.oxd-input--active', // General class selector
        genderRadioMale: 'input[type="radio"][value="1"]',  // Male radio button
        genderRadioFemale: 'input[type="radio"][value="2"]', // Female radio button
        datePicker: '.oxd-icon.bi-calendar.oxd-date-input-icon', // Date Picker Icon
        nationalityDropdown: '.oxd-select-text.oxd-select-text--active',
        maritalStatusDropdown: '.oxd-select-text.oxd-select-text--active',
        saveButton: 'oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space',
    }

    openURL() {
        cy.visit(Cypress.env('URL'))
    }

    enterFirstName(Fname, isForce) {
        cy.get(this.Weblocators.firstName).scrollIntoView() .should('be.visible').clear()
          .type(Fname, { force: true });  // Use force if necessary
      }
      

    enterMiddleName(Mname) {
        cy.get(this.Weblocators.middleName).scrollIntoView().clear().type(Mname)
    }

    enterlastName(Lname) {
        cy.get(this.Weblocators.lastName).scrollIntoView().clear().type(Lname)
    }

    enterEmployeeId(EId) {
        cy.get(this.Weblocators.employeeId).eq(3).scrollIntoView().clear().type(EId); // .eq(1) selects the second input element
    }

    enterOtherId(OId) {
        cy.get(this.Weblocators.otherId).eq(4).scrollIntoView().clear().type(OId); // .eq(2) selects the third input element
    }

    enterDriversLicenseNumber(DLN) {
        cy.get(this.Weblocators.driversLicenseNumber).eq(5).scrollIntoView().clear().type(DLN); // .eq(3) selects the fourth input element
    }

    clickSaveButton(){
        cy.get(this.Weblocators.saveButton).eq(1).scrollIntoView().click();
    }

    selectGender(gender) {
        if (gender === 'female') {
            cy.get(this.Weblocators.genderRadioFemale)
                .scrollIntoView()
                .check({ force: true })
                .should('be.checked');
        } else if (gender === 'male') {
            cy.get(this.Weblocators.genderRadioMale)
                .scrollIntoView()
                .check({ force: true })
                .should('be.checked');
        } else {
            throw new Error('Invalid gender value. Choose "male" or "female".');
        }
    }
  

    // Add My Info and other actions after login
    fillFormAndSelectDetails() {
        // Selecting Date of Birth
        cy.get(this.Weblocators.datePicker).eq(0).click({ force: true });
        cy.wait(2000);

        // Select Nationality Dropdown
        cy.get(this.Weblocators.nationalityDropdown).eq(0).click({ force: true });
        cy.get('.oxd-grid-item.oxd-grid-item--gutters .oxd-select-option>span')
            .contains('Indian')
            .click();

        // Select Marital Status Dropdown
        cy.get(this.Weblocators.maritalStatusDropdown).eq(1).click();
        cy.get('.oxd-grid-item.oxd-grid-item--gutters .oxd-select-option>span')
            .contains('Married')
            .click();

        // Selecting Date of Marriage (or other date-related fields)
        cy.get(this.Weblocators.datePicker).eq(1).click({ force: true });
        cy.wait(2000);
        //cy.pause(); 
        

        // Handling uncaught exceptions
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error('Uncaught exception:', err);
            return false; // Prevent the test from failing
        }); 
      
    }

}

import 'cypress-xpath';
import 'cypress-mochawesome-reporter/register';
import { loginPage } from "../pages/loginPage";
import { registerPage } from '../pages/registerPage';
 
 export {};

 const data = require('../fixtures/example.json'); 

  Cypress.Commands.add('loginHRM', (email, pwd) => {
   const loginObj = new loginPage();
   
   loginObj.openURL();
   cy.wait(7000);
   loginObj.username(email);
   loginObj.password(pwd);
   loginObj.submit();
  })

  Cypress.Commands.add('myinfo', () => {
    const registerPageObj = new registerPage();

    // Use data from fixture or object (data.registerinfo) to fill out the form
    registerPageObj.enterFirstName(data.registerinfo.firstName, { force: true });
    registerPageObj.enterMiddleName(data.registerinfo.middleName);
    registerPageObj.enterlastName(data.registerinfo.lastName);
  
    // Add more fields based on your requirements
    registerPageObj.enterEmployeeId(data.registerinfo.employeeId);
    registerPageObj.enterOtherId(data.registerinfo.otherId);
    registerPageObj.enterDriversLicenseNumber(data.registerinfo.driversLicenseNumber);
    // Select gender (assuming data.registerinfo.gender is passed from the fixture)
    registerPageObj.selectGender(data.registerinfo.gender);
   
    
    // Call method to handle filling out date fields and dropdowns
    registerPageObj.fillFormAndSelectDetails();
    
  });
  Cypress.Commands.add("readExcelFile", (filePath) => {
    return cy.task("readExcelFile", { filePath });
  });
  

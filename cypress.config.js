const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
//const XLSX = require('node-xlsx');
//const { defineConfig } = require("cypress");
const xlsx = require('xlsx');



module.exports = defineConfig({
  

  e2e: {
    "chromeWebSecurity": false,
    specPattern: 'cypress/e2e/**/*.cy.js', 
    reporter: 'mochawesome', // Set Mochawesome as the reporter
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome', // Directory to store reports
      overwrite: false, // Overwrite the previous report
      html: true, // Generate HTML report
      json: true, // Generate JSON report
    },

    setupNodeEvents(on, config) {
      // Example: Add a listener for an event
      // on('before:run', (details) => {
      //   console.log('Test is about to run', details);
      // });
      on("task", {
        readExcelFile({ filePath }) {
            const fullPath = path.join(__dirname, "./cypress/fixtures", filePath);
  
            if (!fs.existsSync(fullPath)) {
                throw new Error(`File not found: ${fullPath}`);
            }
  
            // Read the Excel file
            const workbook = xlsx.readFile(fullPath);
            const sheetName = workbook.SheetNames[0]; // Get the first sheet
            const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
  
            return sheet; // Return Excel data as 
          }
        })
        return config;
      }
    },
    
 

  env : {
      URL : 'https://opensource-demo.orangehrmlive.com',
      
      test_order: [,
        "@critical Verify Login to the HRM App is working",
        "@smoke Verify Login to the HRM App is working with invalid credentials"
      ] 
      
  },
  
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  video: true
});
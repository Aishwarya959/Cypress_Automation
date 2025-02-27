export class loginPage{

    Weblocators={
        Username: '[name="username"]',
        Password:'[name="password"]',
        Submit: 'button[type="submit"]',
        InvalidCredentials: '.oxd-text oxd-text--p.oxd-alert-content-text',
    }

    openURL(){
        cy.visit(Cypress.env('URL'))
    }
    username(uname){
        cy.get(this.Weblocators.Username).type(uname)
    }
    password(pwd){
        cy.get(this.Weblocators.Password).type(pwd)
    }
    submit(){
        cy.get(this.Weblocators.Submit).click()
    }
    invalidCredentials(){
        cy.get(this.Weblocators.InvalidCredentials)
    }
    
}
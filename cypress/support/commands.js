// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
    cy.get(".btn-success").should("be.visible").then((visible) => {
        if (!visible) {
            cy.get(":nth-child(3) > .nav-link").click();
        }
    });

    /*
    cy.intercept("POST", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/oauth/token", {
        access_token: ,
        expires_in: 3600,
        refresh_token: ,
        token_type: "Bearer",
    }).as("login");
    */
    cy.intercept("POST","https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/oauth/token").as("login");
    cy.get(".input-sm").click().type(username);
    cy.get(".form-inline > .form-group > [name=\"password\"]").click().type(password);
    cy.get(".btn-success").click();
    cy.wait("@login");
});

Cypress.Commands.add("popularCar", () => {
    cy.intercept("GET", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models/c4u1mqnarscc72is00ng%7Cc4u1mqnarscc72is00sg").as("carPage");
    cy.get(":nth-child(2) > .card > a").click();
    cy.wait("@carPage");
});

Cypress.Commands.add("popularMake", () => {
    cy.intercept("GET", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/makes/c4u1mqnarscc72is00ng?modelsPage=1").as("modelPage");
    cy.get(":nth-child(1) > .card > a").click();
    cy.wait("@modelPage");
});

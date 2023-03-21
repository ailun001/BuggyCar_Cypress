/// <reference types="cypress" />

describe("User login", () =>{

    beforeEach(() => {
        cy.visit("/");
        cy.get(".input-sm").should("be.visible");
        cy.get(".form-inline > .form-group > [name=\"password\"]").should("be.visible");
        cy.get(".btn-success").should("be.visible");
    })

    // BC-LOG-001
    it("with valid credentials", () => {
        cy.get(".input-sm").click().type("Tester@a");
        cy.get(".form-inline > .form-group > [name=\"password\"]").click().type("Tester@123");
        cy.get(".btn-success").click();
        cy.contains("Profile").should("be.visible");
        cy.contains("Logout").should("be.visible");
        cy.contains("Hi, Test").should("be.visible");
        cy.get(":nth-child(3) > .nav-link").click();
    });

    // BC-LOG-002
    it("with invalid credentials", () => {
        cy.get(".input-sm").click().type("Tester");
        cy.get(".form-inline > .form-group > [name=\"password\"]").click().type("Tester@123");
        cy.get(".btn-success").click();
        cy.contains("Invalid username/password").should("be.visible");
    });
});
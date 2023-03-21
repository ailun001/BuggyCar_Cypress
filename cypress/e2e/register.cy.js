/// <reference types="cypress" />

describe("User Register",() => {
    beforeEach(function() {
        cy.visit("/");
        cy.get(".btn-success-outline").click();
    });

    it("is register page", () => {
        cy.url().should("contain", "register");
        cy.contains("Register with Buggy Cars Rating");
      });

    //BC-REG-001
    it("with valid information", () => {
        cy.get("#username").click().type("Tester" + new Date().getTime() + "@a");
        cy.get("#firstName").click().type("Test");
        cy.get("#lastName").click().type("Er");
        cy.get("#password").click().type("Tester@123");
        cy.get("#confirmPassword").click().type("Tester@123");
        cy.get(".btn-default").click();
        cy.contains("Registration is successful");
    });

    //BC-REG-002
    it("with invalid information", () => {
        cy.get("#username").click().type("Tester@a");
        cy.get("#firstName").click().type("Test");
        cy.get("#lastName").click().type("Er");
        cy.get("#password").click().type("Tester");
        cy.get("#confirmPassword").click().type("Tester");
        cy.get(".btn-default").click();
        cy.contains("Password did not conform with policy: Password not long enough");
    });

});
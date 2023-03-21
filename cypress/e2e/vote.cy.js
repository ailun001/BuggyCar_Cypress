/// <reference types="cypress" />

describe("User vote a car", () =>{

    beforeEach(function () {
        cy.visit("/");
        cy.intercept("GET", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/dashboard").as("dashboard");
        cy.wait("@dashboard");
        cy.get(":nth-child(2) > .card > a").should("be.visible");
    });

    //BC-VOT-001
    it("without logging in", () =>{
        cy.get(".btn-success").should("be.visible");
        cy.get(":nth-child(2) > .card > a").click();
        cy.contains("You need to be logged in to vote.").should("be.visible");
    });

    //BC-VOT-002
    //can put intercept when submit the vote
    it("with a comment ", () =>{
        cy.login("Tester@a", "Tester@123");
        cy.popularCar();
        if(!cy.get(".col-lg-4 > :nth-child(2) > :nth-child(2)").contains("Thank you for your vote!")) {
            cy.get("#comment").type("comment for a buggy@123car.");
            cy.get(".btn").should("not.be.disabled").click();
            cy.contains("Thank you for your vote!").should("be.visible");
            cy.get("tbody > :nth-child(1) > :nth-child(3)").contains("comment for a buggy@123car.");
        }else{
            cy.log("User has already voted.");
        }
    });

    //BC-VOT-003
    it("with multiple times", () => {
        cy.login("Tester@b", "Tester@123");
        cy.popularCar();
        if(!cy.get(".col-lg-4 > :nth-child(2) > :nth-child(2)").contains("Thank you for your vote!")) {
            cy.get("#comment").type("comment for a buggy@123car.");
            cy.get(".btn").should("not.be.disabled").click();
            cy.contains("Thank you for your vote!").should("be.visible");
            cy.get(".btn").should("not.exist");
            cy.reload();
            cy.contains("Thank you for your vote!").should("be.visible");
            cy.get(".btn").should("not.exist");
        }else{
            cy.log("User has already voted.");
        }
    });

    //BC-VOT-004
    it("can view their own comment for a buggy car", () => {
        const date = new Date().getTime();
        cy.login("Tester@c", "Tester@123");
        cy.popularCar();
        if(!cy.get(".col-lg-4 > :nth-child(2) > :nth-child(2)").contains("Thank you for your vote!")) {
            cy.get("#comment").type("comment " + date);
            cy.get(".btn").should("not.be.disabled").click();
            cy.contains("Thank you for your vote!").should("be.visible");
            cy.reload();
            cy.contains("comment " + date).should("be.visible");
        }else{
            cy.log("User has already voted.");
        }
    });
});
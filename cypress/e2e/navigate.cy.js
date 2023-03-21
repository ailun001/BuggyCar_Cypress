/// <reference types="cypress" />


describe("User Navigates", () =>{    
    beforeEach(function() {
        cy.visit("/");
    });

    //BC-NAV-001-1 && BC-NAV-003
    it("Popular make to the BuggyCars home page", () =>{
        cy.intercept("GET", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/dashboard").as("homePage");
        
        //cy.popularMake();
        cy.intercept("GET", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/makes/c4u1mqnarscc72is00ng?modelsPage=1").as("modelPage");
        cy.get(":nth-child(1) > .card > a").click();
        cy.wait("@modelPage");

        cy.url().should("include", "buggy.justtestit.org/make");
        cy.get(".navbar-brand").should("be.visible").click();
        cy.wait("@homePage");
        cy.url().should('eq', 'https://buggy.justtestit.org/');
        
        cy.go("back");
        cy.wait("@modelPage");
        cy.url().should("include", "buggy.justtestit.org/make");
    });

    //BC-NAV-001-2 && BC-NAV-004 && BC-NAV-005
    it("Popular car to the BuggyCars home page", () =>{
        cy.intercept("GET", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/dashboard").as("homePage");
        
        //cy.popularCar();
        cy.intercept("GET", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models/c4u1mqnarscc72is00ng%7Cc4u1mqnarscc72is00sg").as("carPage");
        cy.get(":nth-child(2) > .card > a").click();
        cy.wait("@carPage");

        cy.url().should("include", "buggy.justtestit.org/model");
        cy.get(".navbar-brand").should("be.visible").click();
        cy.wait("@homePage");
        cy.url().should('eq', 'https://buggy.justtestit.org/');

        cy.go("back");
        cy.wait("@carPage");
        cy.url().should("include", "buggy.justtestit.org/model");
    });

    //BC-NAV-001-3 && BC-NAV-002 && BC-NAV-005
    it("Overall Rating to the BuggyCars home page", () =>{
        cy.intercept("GET", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/dashboard").as("homePage");
        cy.intercept("GET","https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models?page=1").as("rankPage");
        cy.get(":nth-child(3) > .card > a").click();
        cy.wait("@rankPage");
        cy.url().should("include", "buggy.justtestit.org/overall");
        cy.get(".navbar-brand").should("be.visible").click();
        cy.wait("@homePage");
        cy.url().should('eq', 'https://buggy.justtestit.org/');

        cy.go("back");
        cy.wait("@rankPage");
        cy.url().should("include", "buggy.justtestit.org/overall");
    });

    //BC-NAV-001-4 && BC-NAV-005
    it("Register to the BuggyCars home page", () =>{
        cy.intercept("GET", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/dashboard").as("homePage");
        cy.get(".btn-success-outline").click();
        cy.url().should("include", "buggy.justtestit.org/register");
        cy.get(".navbar-brand").should("be.visible").click();
        cy.wait("@homePage");
        cy.url().should('eq', 'https://buggy.justtestit.org/');

        cy.go("back");
        cy.url().should("include", "buggy.justtestit.org/register");
    });

    //BC-NAV-006-1
    it("User views the buggy cars in popular make page", () => {
        // Navigate to Popular Make page
        cy.intercept("GET", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/makes/c4u1mqnarscc72is00ng?modelsPage=1").as("modelPage");
        cy.get(":nth-child(1) > .card > a").click();
        cy.wait("@modelPage");

        // Check that the buggy cars are displayed in a list format with the image, model, rank, vote, and comment
        cy.get("tbody > :nth-child(1)").should("be.visible");
        cy.get(":nth-child(1) > :nth-child(1) > a > .img-thumbnail").should("have.attr", "src").should("not.be.empty");
        cy.get("tbody > :nth-child(1) > :nth-child(2) > a").should("have.attr", "href").should("not.be.empty").and("include", "/model");
        cy.get("tbody > :nth-child(1) > :nth-child(3)").should("be.visible").should("not.be.empty");
        cy.get("tbody > :nth-child(1) > :nth-child(4)").should("be.visible").should("not.be.empty");
        cy.get("tbody > :nth-child(1) > :nth-child(5)").should("be.visible").should("not.be.empty");
    });

    //BC-NAV-006-2
    it("User views the buggy cars in overall ranking page", () => {
        // Navigate to Overall Ranking page 
        cy.intercept("GET","https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models?page=1").as("rankPage");
        cy.get(":nth-child(3) > .card > a").click();
        cy.wait("@rankPage");

        // Check that the buggy cars are displayed in a list format with the image, make, model, rank, vote, and comment
        cy.get("tbody > :nth-child(1)").should("be.visible");
        cy.get(":nth-child(1) > :nth-child(1) > a > .img-thumbnail").should("have.attr", "src").should("not.be.empty");
        cy.get("tbody > :nth-child(1) > :nth-child(2) > a").should("have.attr", "href").should("not.be.empty").and("include", "/make");
        cy.get("tbody > :nth-child(1) > :nth-child(3) > a").should("have.attr", "href").should("not.be.empty").and("include", "/model");
        cy.get("tbody > :nth-child(1) > :nth-child(4)").should("be.visible").should("not.be.empty");
        cy.get("tbody > :nth-child(1) > :nth-child(5)").should("be.visible").should("not.be.empty");
        cy.get("tbody > :nth-child(1) > :nth-child(7)").should("be.visible").should("not.be.empty");
    });

})
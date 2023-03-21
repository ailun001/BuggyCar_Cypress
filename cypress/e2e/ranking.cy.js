/// <reference types="cypress" />

describe("Buggy car ranked",() => {
    beforeEach(function() {
        cy.visit("/");
        cy.intercept("GET","https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models?page=1").as("rankPage");
        cy.get(":nth-child(3) > .card > a").click();
        cy.wait("@rankPage");
    });

    // BC-RNK-001
    it("base on total number of votes", () => {
        cy.get("tbody > :nth-child(1) > :nth-child(3) > a").should("be.visible"); //verify that there is the ranking first car
        cy.get("tbody").children().then(rows => {
            let vote1 = Number(rows[0].children[4].innerText);
            for (let i=1; i< rows.length; i++){
               let currentVote =  Number(rows[i].children[4].innerText);
               expect(vote1).to.be.at.least(currentVote);
               vote1 = currentVote;
            }
        });

        //user login and vote
        cy.intercept("GET", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models/c4u1mqnarscc72is00ng%7Cc4u1mqnarscc72is00sg").as("rank1car");
        cy.intercept("GET", "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models/c4u1mqnarscc72is00ng%7Cc4u1mqnarscc72is00r0").as("rank3car")
        cy.get("tbody > :nth-child(3) > :nth-child(5)").then((vote) =>{
            const number = Number(vote.text());
            cy.get("tbody > :nth-child(3) > :nth-child(3) > a").click();
            cy.wait("@rank3car");
            cy.login("Tester@a", "Tester@123");
            cy.wait("@rank3car");
            cy.get(".col-lg-4 > :nth-child(2) > :nth-child(2)").then(voteBox => {
                if(voteBox.find("#comment").length > 0){
                    let date = new Date().getTime();
                    cy.get("#comment").type("comment " + date);
                    cy.get(".btn").should("not.be.disabled").click();
                    cy.contains("Thank you for your vote!").should("be.visible");
                    cy.get(":nth-child(2) > :nth-child(1) > h4 > Strong").should("be.visible").should($el =>{
                        const value = Number($el.text());
                        expect(value).to.be.at.least(number);
                    });
                }else{
                    cy.log("User has already voted.");
                };
            });
        });
        
        cy.intercept("GET","https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models?page=1").as("loading");
        cy.go('back');
        cy.wait("@rankPage");

        cy.get("tbody").children().then(rows => {
            let vote1 = Number(rows[0].children[4].innerText);
            for (let i=1; i< rows.length; i++){
               let currentVote =  Number(rows[i].children[4].innerText);
               expect(vote1).to.be.at.least(currentVote);
               vote1 = currentVote;
            };
        });
    });
});
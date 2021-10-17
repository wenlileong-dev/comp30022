/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Test Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearCookies();
  });

  it("testing for login - correct input", () => {
    cy.get(".page-title").should("have.text", "Login");
    cy.get("[data-cy=login-email]").type("test@mail.com");
    cy.get("[data-cy=login-password]").type("123qwert");
    cy.get("[data-cy=login-button]").click();
    cy.get(".page-title").should("have.text", "Dashboard");
    cy.getCookie("token").should("exist");
  });

  it("testing for login - wrong password", () => {
    cy.get(".page-title").should("have.text", "Login");
    cy.get("[data-cy=login-email]").type("test@mail.com");
    cy.get("[data-cy=login-password]").type("123qw");
    cy.get("[data-cy=login-button]").click();
    cy.get("[data-cy=login-error]").should(
      "have.text",
      "Password is incorrect"
    );
    cy.get(".page-title").should("have.text", "Login");
  });

  it("testing for register - correct input", () => {
    cy.get(".page-title").should("have.text", "Login");
    cy.get("[data-cy=go-register]").click();
    cy.get("[data-cy=register-firstName]").type("Test");
    cy.get("[data-cy=register-lastName]").type("Auth");
    cy.get("[data-cy=register-email]").type("testing@mail.com");
    cy.get("[data-cy=register-password]").type("123qwert");
    cy.get("[data-cy=register-phoneNumber]").type("1234567890");
    cy.get("[data-cy=register-button]").click();
    cy.get(".page-title").should("have.text", "Dashboard");
    cy.getCookie("token").should("exist");

    //delete registered user
    const options = {
      method: "Delete",
      url: "http://localhost:5000/user/deleteUser/testing@mail.com",
    };
    cy.request(options);
  });

  it("testing for register - invalid password", () => {
    cy.get(".page-title").should("have.text", "Login");
    cy.get("[data-cy=go-register]").click();
    cy.get("[data-cy=register-firstName]").type("Test");
    cy.get("[data-cy=register-lastName]").type("Auth");
    cy.get("[data-cy=register-email]").type("testing2@mail.com");
    cy.get("[data-cy=register-password]").type("12345");
    cy.get("[data-cy=register-phoneNumber]").type("1234567890");
    cy.get("[data-cy=register-button]").click();
    cy.get("[data-cy=register-error]").should(
      "have.text",
      "Password not valid!"
    );
    cy.get(".page-title").should("have.text", "Login");
  });
});

describe("Test Authentication", () => {
  beforeEach(() => {
    const options = {
      method: "POST",
      url: `${Cypress.env("backend_url")}/api/user/login`,

      body: {
        email: "e2e@mail.com",
        password: "123qwert",
      },
    };
    cy.request(options);
    cy.visit("/user");
  });

  it("User Logout", () => {
    cy.get("[data-cy=logout-button]").click();
    cy.get(".page-title").should("have.text", "Login");
  });
});

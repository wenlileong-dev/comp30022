describe("End to End Testing for Calendar", () => {
  beforeEach(() => {
    //login user without animation (from api)
    const options = {
      method: "POST",
      url: "https://personal-crm-project.herokuapp.com/user/login",

      body: {
        email: "e2e@mail.com",
        password: "123qwert",
      },
    };
    cy.request(options);
    cy.visit("/calendar");
  });

  describe("Calendar Main Page", () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    it("Calendar Title Page - render current month", () => {
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let daysInMonth = new Date(year, month + 1, 0).getDate();
      let spaceDays = new Date(year, month, 1).getDay();
      cy.get(".page-title").should("have.text", "Calendar");
      cy.get("[data-cy=calendar-month-title]").should(
        "have.text",
        `${monthNames[month]}`
      );
      cy.get("[data-cy=calendar-year-title]").should("have.text", `${year}`);
      cy.get("[data-cy=prev-month-day]").should("have.length", spaceDays);
      cy.get("[data-cy=curr-month-day]").should("have.length", daysInMonth);
    });

    it("Calendar Title Page - render next month", () => {
      let today = new Date();
      let nextMonth = new Date(today.setMonth(today.getMonth() + 1));
      let month = nextMonth.getMonth();
      let year = nextMonth.getFullYear();
      let daysInMonth = new Date(year, month + 1, 0).getDate();
      let spaceDays = new Date(year, month, 1).getDay();
      cy.get("[data-cy=calendar-nextMonth]").click();
      cy.get(".page-title").should("have.text", "Calendar");
      cy.get("[data-cy=calendar-month-title]").should(
        "have.text",
        `${monthNames[month]}`
      );
      cy.get("[data-cy=calendar-year-title]").should("have.text", `${year}`);
      cy.get("[data-cy=prev-month-day]").should("have.length", spaceDays);
      cy.get("[data-cy=curr-month-day]").should("have.length", daysInMonth);
    });

    it("Calendar Title Page - render previous month", () => {
      let today = new Date();
      let nextMonth = new Date(today.setMonth(today.getMonth() - 1));
      let month = nextMonth.getMonth();
      let year = nextMonth.getFullYear();
      let daysInMonth = new Date(year, month + 1, 0).getDate();
      let spaceDays = new Date(year, month, 1).getDay();
      cy.get("[data-cy=calendar-prevMonth]").click();
      cy.get(".page-title").should("have.text", "Calendar");
      cy.get("[data-cy=calendar-month-title]").should(
        "have.text",
        `${monthNames[month]}`
      );
      cy.get("[data-cy=calendar-year-title]").should("have.text", `${year}`);
      cy.get("[data-cy=prev-month-day]").should("have.length", spaceDays);
      cy.get("[data-cy=curr-month-day]").should("have.length", daysInMonth);
    });
  });

  describe("Add, Edit, Delete Event", () => {
    it("add event with valid input", () => {
      cy.get("[data-cy=add-event-button]").click();
      cy.get("[data-cy=modal-popup]").should("be.visible");
      cy.get("[data-cy=add-event-form]").should("be.visible");
      cy.get("[data-cy=title]").type("test event");
      cy.get("[data-cy=description]").type("test event description");
      cy.get("[data-cy=people]").type("Testing E2E{enter}Not Contact{enter}");
      cy.get("[data-cy=add-event-confirm-button]").click();
      cy.reload();
      cy.contains("test event").should("be.visible");
    });

    it("test people link for the event", () => {
      cy.get("[data-cy=curr-month-day]")
        .contains(`${new Date().getDate()}`)
        .click();
      cy.get("[data-cy=people-link]").click();
      cy.contains("Contact Information").should("be.visible");
    });

    it("Not Clickable Meeting Link", () => {
      cy.get("[data-cy=curr-month-day]")
        .contains(`${new Date().getDate()}`)
        .click();
      cy.get("button").contains("Open Event").should("be.disabled");
    });

    it("update event with valid input", () => {
      cy.get("[data-cy=curr-month-day]")
        .contains(`${new Date().getDate()}`)
        .click();
      cy.get("button").contains("Edit Event").click();
      cy.get("[data-cy=meetingLink]").type(
        "https://us05web.zoom.us/j/8092863873?pwd=RFpCcFFNL3dxWDdTWkJONEl6UWZEdz09"
      );
      cy.get("[data-cy=meetingNotes]").type(
        "Proin placerat risus vel ligula dignissim, in laoreet lectus luctus."
      );
      cy.get("[data-cy=update-event-button-submit]").click();
      cy.reload();
      cy.get("[data-cy=curr-month-day]")
        .contains(`${new Date().getDate()}`)
        .click();
      cy.get("[data-cy=meeting-notes-expansion]").click();
      cy.get("[data-cy=meeting-notes-paragraph]").should(
        "have.text",
        "Proin placerat risus vel ligula dignissim, in laoreet lectus luctus."
      );
    });

    it("Clickable Meeting Link", () => {
      cy.get("[data-cy=curr-month-day]")
        .contains(`${new Date().getDate()}`)
        .click();
      cy.get("button").contains("Open Event").should("not.be.disabled");
    });

    it("delete event", () => {
      cy.get("[data-cy=curr-month-day]")
        .contains(`${new Date().getDate()}`)
        .click();
      cy.get("button").contains("Edit Event").click();
      cy.get("[data-cy=delete-event-button]").click();
    });
  });
});

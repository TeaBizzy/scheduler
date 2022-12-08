beforeEach(() => {
  cy.request("/api/debug/reset");
  cy.visit("/");
  cy.contains("Monday");
});

describe("Appointments", () => {
  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();
    
      cy.get("[data-testid=student-name-input]")
        .type("Lydia Miller-Jones");

      cy.get("[alt='Sylvia Palmer']")
        .click();

      cy.contains("Save")
        .click();
      
      cy.contains(".appointment__card--show", "Lydia Miller-Jones", "Sylvia Palmer")
  });


  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
    .first()
    .click({force: true});
  
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Stefan Talbot");

    cy.get("[alt='Tori Malcolm']")
      .click();

    cy.contains("Save")
      .click();
    
    cy.contains(".appointment__card--show", "Stefan Talbot", "Tori Malcolm")
  });
});
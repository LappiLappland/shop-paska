describe('Testing profile', () => {

  beforeEach(() => {
    cy.setCookie('token', '0');
  })

  it('Can open profile', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-testid="nav-profile-button"]').click();

    cy.contains('Texas@Penguins.com');
  })

  it('Can edit main information', () => {
    cy.visit('http://localhost:8080/profile/account');

    cy.contains('Texas@Penguins.com');

    cy.get('#firstName').clear().type("Cellinia");
    cy.get('#lastName').clear().type("Texas");
    cy.get('#birth').clear().type('1975-12-12');
    cy.get('#sex').click();
    cy.contains('Male').click();

    cy.get('[data-testid="profile-save"]').click();

    cy.contains('Saved successfuly');

    cy.get('[data-testid="nav-logo"]').click();

    cy.get('[data-testid="nav-profile-button"]').click();
    cy.get('#firstName').should('contain.value', 'Cellinia');
    cy.get('#lastName').should('contain.value', "Texas");
    cy.get('#birth').should('contain.value', '1975-12-12');
    cy.get('#sex').contains('Male');
  })
})
describe('Testing auth', () => {

  beforeEach(() => {
    cy.clearCookie('token');
  })

  it('Can login by email', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-testid="nav-profile-button"]').click();

    cy.get('[data-testid="sign-email"]').click();

    cy.get('#email').type('Texas@penguins.com');
    cy.get('#password').type('12');
    
    cy.get('[data-testid="sign"]').click();

    cy.contains('Incorrect');

    cy.get('#password').clear().type('12345');

    cy.get('[data-testid="sign"]').click();

    cy.url().should('include', '/profile/account');

    cy.contains('Texas@Penguins.com');
  })

  it('Can signup by phone', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-testid="nav-profile-button"]').click();

    cy.get('#phone').type('8999666333');

    cy.get('[data-testid="sign-phone"]').click();

    cy.get('#code').type('197530');
    cy.get('#agreed').check({force: true});

    cy.get('[data-testid="sign"]').click();

    cy.url().should('include', '/profile/account');

    cy.contains('8999666333');
  })
})
describe('Testing cart', () => {
  it('Does not allow to add product without selecting size and color', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-testid="product-card"]').first().click({force: true});

    const addButton = cy.get('[data-testid="product-add-button"]');

    addButton.click();

    cy.contains('You have to choose color and size');

    cy.get('[data-testid="color-select"]').first().click({force: true});
    
    cy.contains('You have to choose color and size').should('not.exist');

    cy.get('[data-testid="size-select"]').first().click({force: true});

    addButton.click();

    cy.contains('You have to choose color and size').should('not.exist');
  })

  it('Adds product to the cart', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-testid="nav-cart-button"]').click();

    cy.get('[data-testid="cart-product"]').should('not.exist');

    cy.get('[data-testid="nav-logo"]').click();

    cy.get('[data-testid="product-card"]').first().click({force: true});

    const addButton = cy.get('[data-testid="product-add-button"]');

    cy.get('[data-testid="color-select"]').first().click({force: true});

    cy.get('[data-testid="size-select"]').first().click({force: true});

    addButton.click();
    
    addButton.click();

    cy.url().should('include', '/cart');

    cy.get('[data-testid="cart-product"]');
  })

  it('Cart product controls work', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-testid="product-card"]').first().click({force: true});

    const addButton = cy.get('[data-testid="product-add-button"]');

    cy.get('[data-testid="color-select"]').first().click({force: true});

    cy.get('[data-testid="size-select"]').first().click({force: true});

    addButton.click();
    
    addButton.click();

    cy.get('[data-testid="cart-product"]').contains('1');
    
    cy.get('[data-testid="control-add"]').click();

    cy.get('[data-testid="cart-product"]').contains('2');

    cy.get('[data-testid="control-remove"]').click();

    cy.get('[data-testid="cart-product"]').contains('1');
    
    cy.get('[data-testid="control-remove"]').click();

    cy.get('[data-testid="cart-product"]').should('not.exist');
  })
})
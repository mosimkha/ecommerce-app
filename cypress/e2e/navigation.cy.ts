describe('Page Navigation', () => {
  it('should navigate through all pages', () => {
    // Test homepage load
    cy.visit('/')
    cy.contains('Product List').should('exist')
    cy.contains('Cart').should('exist')

    // Test product details page navigation
    cy.get('a[href*="/products/"]').first().click()
    cy.contains('ADD TO CART').should('exist')
    cy.contains('Description:').should('exist')

    // Test cart page navigation
    cy.contains('Cart').click()
    cy.contains('Shopping Cart').should('exist')

    // Test return to home
    cy.contains('Home').click()
    cy.contains('Product List').should('exist')
  })
})
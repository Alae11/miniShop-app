import cy from "cypress";

beforeEach(() => {
    cy.visit('/');
});

describe('Cart functionality', () => {
    it('should add items to the cart', () => {
        // Click on a product to view details
        cy.get('.product-link').first().click();

        // Click the "Add to Cart" button
        cy.get('.product-actions button').click();

        // Verify that the cart count increases
        cy.get('.cart-count').should('have.text', '1');

        // Navigate back to the homepage
        cy.get('.navbar-link').first().click();

        // Repeat the process for another product
        cy.get('.product-link').eq(1).click();
        cy.get('.product-actions button').click();

        // Verify that the cart count increases again
        cy.get('.cart-count').should('have.text', '2');
    });
});
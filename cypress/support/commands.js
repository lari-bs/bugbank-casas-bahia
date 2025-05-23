Cypress.Commands.add('visitLandingPage', () => {
    cy.visit('/')
})

Cypress.Commands.add('validateAlert', (selector, errorMessage) => {
    cy.screenshot('validação')
    selector.parent().find('p')
        .should('exist')
        .should('contain.text', errorMessage, { force: true });
});


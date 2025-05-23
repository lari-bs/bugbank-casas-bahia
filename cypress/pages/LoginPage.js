class LoginPage {
  elements = {
    emailInput: () => cy.get('.card__login [name=email]'),
    passwordInput: () => cy.get('.card__login [name=password]'),
    accessButton: () => cy.contains('button', 'Acessar'),
    registerButton: () => cy.contains('button', 'Registrar'),
    loginAlert: () => cy.get('#modalText'),
  };

  typeEmail(email) {
    this.elements.emailInput().clear().type(email);
  }

  clickEmail() {
    this.elements.emailInput().click();
  }

  typePassword(password) {
    this.elements.passwordInput().clear().type(password);
  }

  clickPassword() {
    this.elements.passwordInput().click();
  }

  clickAccessButton() {
    this.elements.accessButton().should('be.visible').click();
  }

  clickRegisterButton() {
    this.elements.registerButton()
        .should('be.visible')
        .click({ force: true });
  }

  validateAlert(selector, expectedMessage) {
    cy.validateAlert(selector, expectedMessage);
  }

  login(email, password) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickAccessButton();
  }

}

export const loginPage = new LoginPage();
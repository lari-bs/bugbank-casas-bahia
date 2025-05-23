import texts from "../fixtures/texts.json";

class RegisterPage {

    elements = {
        emailInput: () => cy.get('.card__register [name=email]'),
        nameInput: () => cy.get('.card__register [name=name]'),
        registerAlert: () => cy.get('#modalText'),
        passwordInput: () => cy.get('.card__register [name=password]'),
        passwordConfirmInput: () => cy.get('.card__register [name=passwordConfirmation]'),
        registerButton: () => cy.contains('button', 'Cadastrar'),
        toggleAddBalance: () => cy.get('#toggleAddBalance'),
        accountAlert: () => cy.get('#modalText'),
        closeModalButton: () => cy.get('#btnCloseModal'),
    };

    typeEmail(email) {
        this.elements.emailInput().clear({force: true}).type(email, {force: true});
    }

    clickEmail() {
        this.elements.emailInput().click({force: true});
    }

    typeName(name) {
        this.elements.nameInput().clear({force: true}).type(name, {force: true});
    }

    clickName() {
        this.elements.nameInput().click({force: true});
    }

    typePassword(password) {
        this.elements.passwordInput().clear({force: true}).type(password, {force: true});
    }

    clickPassword() {
        this.elements.passwordInput().click({force: true});
    }

    typePasswordConfirmation(password) {
        this.elements.passwordConfirmInput().clear({force: true}).type(password, {force: true});
    }

    clickPasswordConfirmation() {
        this.elements.passwordConfirmInput().click({force: true});
    }

    clickAddBalanceButton() {
        this.elements.toggleAddBalance().click({force: true});
    }

    clickRegisterButton() {
        this.elements.registerButton().click({force: true});
    }

    validateAlert(selector, expectedMessage) {
        cy.validateAlert(selector, expectedMessage);
    }

    extractAccountNumber(aliasName) {
        this.elements.accountAlert()
            .invoke('text')
            .then((text) => {
                const match = text.match(/\d+-\d+/);
                if (match) {
                    cy.wrap(match[0]).as(aliasName)
                } else {
                    throw new Error('Não foi possível extrair o número da conta.');
                }
            });
        this.closeAlert();
    }

    getAccountNumber(aliasName) {
        return cy.get(`@${aliasName}`);
    }
    closeAlert() {
        this.elements.closeModalButton().should('be.visible').click();
    }

    createAccount(email, name, password, passwordConfirmation, balanceToggle = true) {
        this.typeEmail(email);
        this.typeName(name);
        this.typePassword(password);
        this.typePasswordConfirmation(passwordConfirmation);
        if (balanceToggle) this.clickAddBalanceButton();
        this.clickRegisterButton();
    }

    confirmAccountRegistration(aliasName = 'accountNumber') {
        this.validateAlert(this.elements.accountAlert(), texts.accountCreatedAlert);
        this.extractAccountNumber(aliasName)
    }
}

export const registerPage = new RegisterPage();
import {loginPage} from '../pages/LoginPage';
import {registerPage} from '../pages/RegisterPage';
import texts from '../fixtures/texts.json'
import users from '../fixtures/users.json'

describe('Login Tests', () => {
    beforeEach(() => {
        cy.visitLandingPage();
    });

    if (!Cypress.env('TAGS') || Cypress.env('TAGS') === '@all' || Cypress.env('TAGS').includes('@login')) {
        it('Cenário 1: Deve cadastrar usuário com sucesso', () => {
            loginPage.clickRegisterButton();
            registerPage.createAccount(users.validEmail, users.validName, users.validPassword, users.validPassword, true, 'contaLarissa');
        });
    }

    if (!Cypress.env('TAGS') || Cypress.env('TAGS') === '@all' || Cypress.env('TAGS').includes('@login')) {
        it('Cenário 2: Deve mostrar alertas ao tentar fazer login com dados inválidos', () => {
            loginPage.clickEmail();
            loginPage.clickPassword();
            loginPage.clickEmail();
            loginPage.validateAlert(loginPage.elements.emailInput(), texts.mandatoryAlert);
            loginPage.validateAlert(loginPage.elements.passwordInput(), texts.mandatoryAlert);
            loginPage.typeEmail(users.invalidEmail);
            loginPage.validateAlert(loginPage.elements.emailInput(), texts.invalidFormatAlert);
            loginPage.typeEmail(users.validEmail);
            loginPage.typePassword(users.validPassword);
            loginPage.clickAccessButton();
            loginPage.validateAlert(loginPage.elements.loginAlert(), texts.userAlert);
        });
    }

    if (!Cypress.env('TAGS') || Cypress.env('TAGS') === '@all' || Cypress.env('TAGS').includes('@login')) {
        it('Cenário 5: Não deve cadastrar usuário com dados inválidos', () => {
            loginPage.clickRegisterButton();
            registerPage.clickEmail();
            registerPage.clickName();
            registerPage.clickPassword();
            registerPage.clickPasswordConfirmation();
            registerPage.clickEmail();
            registerPage.validateAlert(registerPage.elements.emailInput(), texts.mandatoryAlert);
            registerPage.validateAlert(registerPage.elements.passwordInput(), texts.mandatoryAlert);
            registerPage.validateAlert(registerPage.elements.passwordConfirmInput(), texts.mandatoryAlert);
            registerPage.typeEmail(users.invalidEmail);
            registerPage.validateAlert(registerPage.elements.emailInput(), texts.invalidFormatAlert);
            registerPage.typeEmail(users.validEmail);
            registerPage.typePassword(users.validPassword);
            registerPage.typePasswordConfirmation(users.invalidPassword);
            registerPage.clickRegisterButton();
            registerPage.validateAlert(registerPage.elements.registerAlert(), texts.nameAlert);
            registerPage.typeName(users.invalidEmail)
            registerPage.clickRegisterButton();
            registerPage.validateAlert(registerPage.elements.registerAlert(), texts.passwordAlert);
            registerPage.closeAlert();
        });
    }
});

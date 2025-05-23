import {loginPage} from '../../pages/LoginPage';
import {registerPage} from '../../pages/RegisterPage';
import texts from '../../fixtures/texts.json'
import users from '../../fixtures/users.json'
import {homePage} from "../../pages/HomePage";
import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';

Given('que acesso a tela de registro de usuário', () => {
    loginPage.clickRegisterButton();
});

When('cadastrar o usuário {string}, {string}, {string}', (email, name, password) => {
    registerPage.createAccount(email, name, password, password, true);
});

Then('o usuário é cadastrado com sucesso', () => {
    registerPage.confirmAccountRegistration('contaLarissa')
});

Given('que acesso a tela de login', () => {

});

When('utilizar dados inválidos', () => {
    loginPage.clickEmail();
    loginPage.clickPassword();
    loginPage.clickEmail();
});

Then('alerta de dados inválidos é exibida', () => {
    loginPage.validateAlert(loginPage.elements.emailInput(), texts.mandatoryAlert);
    loginPage.validateAlert(loginPage.elements.passwordInput(), texts.mandatoryAlert);
    loginPage.typeEmail(users.invalidEmail);
    loginPage.validateAlert(loginPage.elements.emailInput(), texts.invalidFormatAlert);
    loginPage.typeEmail(users.validEmail);
    loginPage.typePassword(users.validPassword);
    loginPage.clickAccessButton();
    loginPage.validateAlert(loginPage.elements.loginAlert(), texts.userAlert);
});

When('cadastrar o usuário inválido', () => {
    registerPage.clickEmail();
    registerPage.clickName();
    registerPage.clickPassword();
    registerPage.clickPasswordConfirmation();
    registerPage.clickEmail();
});

Then('alerta de email inválido é exibido', () => {
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

Given('que faço login em conta com saldo', () => {
    loginPage.clickRegisterButton();
    registerPage.createAccount(users.receiverEmail, users.receiverName, users.validPassword, users.validPassword, false);
    registerPage.confirmAccountRegistration('contaBarbosa')
    loginPage.clickRegisterButton();
    registerPage.createAccount(users.senderEmail, users.senderName, users.validPassword, users.validPassword, true);
    registerPage.confirmAccountRegistration('contaLarissa')
    loginPage.login(users.receiverEmail, users.validPassword);
    homePage.validateGreetingText(users.receiverName);
    homePage.setBalance('saldoInicialBarbosa');
    homePage.logout();
    loginPage.login(users.senderEmail, users.validPassword);
    homePage.validateGreetingText(users.senderName);
    homePage.setBalance('saldoInicialLarissa');
});

Given('que faço login em conta sem saldo', () => {
    loginPage.clickRegisterButton();
    registerPage.createAccount(users.senderEmail, users.senderName, users.validPassword, users.validPassword, false);
    registerPage.confirmAccountRegistration('contaLarissa')
    loginPage.login(users.senderEmail, users.validPassword);
    homePage.validateGreetingText(users.senderName);
    homePage.setBalance('saldoInicialLarissa');
});

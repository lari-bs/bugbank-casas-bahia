import {loginPage} from '../pages/LoginPage';
import {registerPage} from '../pages/RegisterPage';
import texts from '../fixtures/texts.json'
import users from "../fixtures/users.json";
import {homePage} from "../pages/HomePage";

describe('Withdraw Tests', () => {
    beforeEach(() => {
        cy.visitLandingPage();
    });

    it('Cenário 4: Não deve realizar saque de valor maior que o saldo disponível', () => {
        loginPage.clickRegisterButton();
        registerPage.createAccount(users.validEmail, users.validName, users.validPassword, users.validPassword, true, 'contaLarissa');
        loginPage.login(users.validEmail, users.validPassword);
        homePage.validateGreetingText(users.validName);
        homePage.setBalance('saldoLarissa');
        homePage.clickWithdrawButton();
        homePage.validateAlert(homePage.elements.withdrawAlert(), texts.developmentAlert);
    });

    it('Cenário 7: Não deve realizar saque sem saldo na conta', () => {
        loginPage.clickRegisterButton();
        registerPage.createAccount(users.validEmail, users.validName, users.validPassword, users.validPassword, false, 'contaLarissa');
        loginPage.login(users.validEmail, users.validPassword);
        homePage.validateGreetingText(users.validName);
        homePage.setBalance('saldoLarissa');
        homePage.clickWithdrawButton();
        homePage.validateAlert(homePage.elements.withdrawAlert(), texts.developmentAlert);
    });


});

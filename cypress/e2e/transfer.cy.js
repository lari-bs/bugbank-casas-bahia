import {loginPage} from '../pages/LoginPage';
import {registerPage} from '../pages/RegisterPage';
import texts from '../fixtures/texts.json'
import users from "../fixtures/users.json";
import {homePage} from "../pages/HomePage";
import {transferPage} from "../pages/TransferPage";

describe('Transfer Tests', () => {
    beforeEach(() => {
        cy.visitLandingPage();
    });

    it('Cenário 3: Deve realizar transferência de valor entre contas com sucesso', () => {
        let transferAmount = 50;
        loginPage.clickRegisterButton();
        registerPage.createAccount(users.receiverEmail, users.receiverName, users.validPassword, users.validPassword, false, 'contaBarbosa');
        loginPage.clickRegisterButton();
        registerPage.createAccount(users.senderEmail, users.senderName, users.validPassword, users.validPassword, true, 'contaLarissa');
        loginPage.login(users.receiverEmail, users.validPassword);
        homePage.validateGreetingText(users.receiverName);
        homePage.setBalance('saldoInicialBarbosa');
        homePage.logout();
        loginPage.login(users.senderEmail, users.validPassword);
        homePage.validateGreetingText(users.senderName);
        homePage.setBalance('saldoInicialLarissa');
        homePage.clickTransferButton();
        transferPage.transferBalance('contaBarbosa', transferAmount, 'Teste');
        transferPage.validateAlert(transferPage.elements.transferAlert(), texts.transferAlert);
        transferPage.closeAlert();
    });

    it('Cenário 6: Não deve realizar transferência para uma conta inexistente', () => {
        cy.wrap('0-0').as('contaInexistente');
        loginPage.clickRegisterButton();
        registerPage.createAccount(users.validEmail, users.validName, users.validPassword, users.validPassword, true, 'contaLarissa');
        loginPage.login(users.validEmail, users.validPassword);
        homePage.validateGreetingText(users.validName);
        homePage.setBalance('saldoLarissa');
        homePage.clickTransferButton();
        transferPage.transferBalance('contaInexistente', 50, 'Teste');
        transferPage.validateAlert(transferPage.elements.transferAlert(), texts.invalidAccountAlert);
        transferPage.closeAlert();
    });

    it('Cenário 8: Deve realizar transferência de valor entre contas com sucesso', () => {
        let transferAmount = 50;
        loginPage.clickRegisterButton();
        registerPage.createAccount(users.receiverEmail, users.receiverName, users.validPassword, users.validPassword, false, 'contaBarbosa');
        loginPage.clickRegisterButton();
        registerPage.createAccount(users.senderEmail, users.senderName, users.validPassword, users.validPassword, true, 'contaLarissa');
        loginPage.login(users.receiverEmail, users.validPassword);
        homePage.validateGreetingText(users.receiverName);
        homePage.setBalance('saldoInicialBarbosa');
        homePage.logout();
        loginPage.login(users.senderEmail, users.validPassword);
        homePage.validateGreetingText(users.senderName);
        homePage.setBalance('saldoInicialLarissa');
        homePage.clickTransferButton();
        transferPage.transferBalance('contaBarbosa', transferAmount, 'Teste');
        transferPage.validateAlert(transferPage.elements.transferAlert(), texts.transferAlert);
        transferPage.closeAlert();
        transferPage.clickBackButton();
        homePage.setBalance('saldoFinalLarissa');
        homePage.validateSenderBalance('saldoInicialLarissa', 'saldoFinalLarissa', transferAmount);
        homePage.logout();
        loginPage.login(users.receiverEmail, users.validPassword);
        homePage.validateGreetingText(users.receiverName);
        homePage.setBalance('saldoFinalBarbosa');
        homePage.validateReceiverBalance('saldoInicialBarbosa', 'saldoFinalBarbosa', transferAmount);
    });

});

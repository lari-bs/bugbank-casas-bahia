import {loginPage} from '../../pages/LoginPage';
import texts from '../../fixtures/texts.json'
import users from "../../fixtures/users.json";
import {homePage} from "../../pages/HomePage";
import {transferPage} from "../../pages/TransferPage";
import {When, Then} from '@badeball/cypress-cucumber-preprocessor';
let transferAmount = 50;

When('faço uma transferência entre contas', () => {
    homePage.clickTransferButton();
});

When('preencho com uma conta válida', () => {
    transferPage.transferBalance('contaBarbosa', transferAmount, 'Teste');
});

Then('transferência acontece com sucesso', () => {
    transferPage.validateAlert(transferPage.elements.transferAlert(), texts.transferAlert);
    transferPage.closeAlert();
});

Then('preencho com uma conta inválida', () => {
    cy.wrap('0-0').as('contaInexistente');
    transferPage.transferBalance('contaInexistente', 50, 'Teste');
});

Then('transferência não deve ser realizada', () => {
    transferPage.validateAlert(transferPage.elements.transferAlert(), texts.invalidAccountAlert);
    transferPage.closeAlert();
});

Then('saldo atual é o saldo antigo - valor da transferência na conta origem', () => {
    transferPage.clickBackButton();
    homePage.setBalance('saldoFinalLarissa');
    homePage.validateSenderBalance('saldoInicialLarissa', 'saldoFinalLarissa', transferAmount);
    homePage.logout();
});

Then('saldo atual é o saldo antigo + valor da transferência na conta destino', () => {
    loginPage.login(users.receiverEmail, users.validPassword);
    homePage.validateGreetingText(users.receiverName);
    homePage.setBalance('saldoFinalBarbosa');
    homePage.validateReceiverBalance('saldoInicialBarbosa', 'saldoFinalBarbosa', transferAmount);
});

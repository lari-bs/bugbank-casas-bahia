import texts from '../../fixtures/texts.json'
import {homePage} from "../../pages/HomePage";
import {When, Then} from '@badeball/cypress-cucumber-preprocessor';

When('faço um saque da conta', () => {
    homePage.clickWithdrawButton();
});

When('o valor do saque é maior que o saldo disponível', () => {
    let saque = 2000;
});

Then('alerta informando que o valor do saque é maior que o saldo da conta é exibido', () => {
    homePage.validateAlert(homePage.elements.withdrawAlert(), texts.developmentAlert);
});

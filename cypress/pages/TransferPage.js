import {registerPage} from "./RegisterPage";

class TransferPage {
  elements = {
    accountNumberInput: () => cy.get('[name="accountNumber"]'),
    digitInput: () => cy.get('[name="digit"]'),
    transferValueInput: () => cy.get('[name="transferValue"]'),
    descriptionInput: () => cy.get('[name="description"]'),
    transferButton: () => cy.get('[type="submit"]'),
    transferAlert: () => cy.get('#modalText'),
    closeAlert: () => cy.get('#btnCloseModal'),
    backButton: () => cy.get('#btnBack'),
  };

  transferBalance(aliasName, value, description) {
    registerPage.getAccountNumber(aliasName).then((accountNumber) => {
      const [account, digit] = accountNumber.split('-');
      this.elements.accountNumberInput().clear().type(account);
      this.elements.digitInput().clear().type(digit);
      this.elements.transferValueInput().clear().type(value);
      this.elements.descriptionInput().clear().type(description);
      this.clickTransferButton()
    })
  }

  clickTransferButton() {
    this.elements.transferButton().click();
  }

  clickBackButton() {
    this.elements.backButton().click();
  }

  closeAlert() {
    this.elements.closeAlert().click();
  }

  validateAlert(selector, expectedMessage) {
    cy.validateAlert(selector, expectedMessage);
  }
}

export const transferPage = new TransferPage();
class HomePage {
    elements = {
        greetingText: () => cy.get('#textName'),
        balanceText: () => cy.get('#textBalance span'),
        transferMenuButton: () => cy.get('#btn-TRANSFERÊNCIA'),
        withdrawMenuButton: () => cy.get('#btn-SAQUE'),
        withdrawAlert: () => cy.get('#modalText'),
        exitButton: () => cy.get('#btnExit'),
    };

    validateAlert(selector, expectedMessage) {
        cy.validateAlert(selector, expectedMessage);
    }

    validateGreetingText(user) {
        this.elements.greetingText().should('have.text', `Olá ${user},`);
    }

    setBalance(aliasName) {
        this.elements.balanceText()
            .invoke('text')
            .then((text) => {
                const balance = parseFloat(
                    text.replace('R$', '').replace('.', '').replace(',', '.').trim()
                );
                cy.wrap(balance).as(aliasName);
            });
    }

    getBalance(aliasName) {
        return cy.get(`@${aliasName}`);
    }

    clickTransferButton() {
        this.elements.transferMenuButton().click();
    }

    clickWithdrawButton() {
        this.elements.withdrawMenuButton().click();
    }

    logout() {
        this.elements.exitButton().click();
    }

    validateSenderBalance(initialBalanceAlias, finalBalanceAlias, transferAmount) {
        this.getBalance(initialBalanceAlias).then((initialBalance) => {
            this.getBalance(finalBalanceAlias).then((finalBalance) => {
                expect(finalBalance).to.equal(initialBalance - transferAmount);
            });
        });
    }

    validateReceiverBalance(initialBalanceAlias, finalBalanceAlias, transferAmount) {
        this.getBalance(initialBalanceAlias).then((initialBalance) => {
            this.getBalance(finalBalanceAlias).then((finalBalance) => {
                expect(finalBalance).to.equal(initialBalance + transferAmount);
            });
        });
    }
}

export const homePage = new HomePage();
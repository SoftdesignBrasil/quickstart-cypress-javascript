import loc from '../locators'

Cypress.Commands.add('acessarMenuContas',() =>{
    cy.get(loc.MENU.OPCOES).click()
    cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add('inserirConta',conta =>{
    cy.get(loc.CONTAS.NOME).type(conta)
    cy.get(loc.CONTAS.BTN_SALVAR).click()    
})

Cypress.Commands.add('selecionarContaParaAlterar',conta =>{
    cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR(conta)).click()  
})

Cypress.Commands.add('alterarContaPara',conta =>{
    cy.get(loc.CONTAS.NOME)
            .clear()
            .type(conta)
})

Cypress.Commands.add('clicarBotaoSalvar',() =>{
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})


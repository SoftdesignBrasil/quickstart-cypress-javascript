import loc from '../locators'


Cypress.Commands.add('inserirMovimentacao',(desc,valor,interessado,conta) =>{
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type(desc)
    cy.get(loc.MOVIMENTACAO.VALOR).type(valor)
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type(interessado)
    cy.get(loc.MOVIMENTACAO.CONTA).select(conta)
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()    
})


Cypress.Commands.add('validacoesMovimentacaoCriada',(desc,valor) =>{
    cy.get(loc.EXTRATO.LINHAS).should('have.length',7)
    cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO(desc,valor)).should('exist')    
})

Cypress.Commands.add('removerMovimentacao',(movimentacao) =>{
    cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO(`${movimentacao}`)).click()    
})


Cypress.Commands.add('verificaSaldo',(conta,valorSaldo) =>{
     cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA(`${conta}`)).should('contain', `${valorSaldo}`)   
})

Cypress.Commands.add('verificaSaldoInteraface',(conta,valorSaldo) =>{
    cy.wait(2000)
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA(`${conta}`)).should('contain', `${valorSaldo}`)   
})


Cypress.Commands.add('alterarStatusConta',(conta) =>{
    cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO(`${conta}`)).click()
    cy.wait(1000)
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
})







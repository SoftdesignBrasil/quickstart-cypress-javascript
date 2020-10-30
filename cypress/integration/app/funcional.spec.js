/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsTestesFuncionais/commandsContas'
import '../../support/commandsTestesFuncionais/commandsTransacao'

describe('Deve testar nivel funcional da aplicação', () => {

    before(() => {
        cy.login('ederson.ti@gmail.com','26022015')  
          
    })
    
    beforeEach(()=>{
        cy.acessarMenuHome()
        cy.resetApp()        

    })


    it('Deve inserir uma conta nova', ()   => {
        cy.acessarMenuContas()
        cy.inserirConta('Conta de Teste')
        cy.validaMsgRetorno('Conta inserida com sucesso')
    })

    it('Deve alterar conta existente',()=>{
        cy.acessarMenuContas()
        cy.selecionarContaParaAlterar('Conta para alterar')        
        cy.alterarContaPara('Conta para Alterar')  
        cy.clicarBotaoSalvar()    
        cy.validaMsgRetorno('Conta atualizada com sucesso!')
    })

    it('Não deve inserir conta ja existente',()=>{
        cy.acessarMenuContas()
        cy.inserirConta('Conta mesmo nome') 
        cy.validaMsgRetorno('code 400')  
    })

    it('Deve criar uma movimentação',()=>{
        cy.acessarMenuTransacao()
        cy.inserirMovimentacao('Desc','123','Pedro','Conta para movimentacoes') 
        cy.validaMsgRetorno('Movimentação inserida com sucesso')  
        cy.validacoesMovimentacaoCriada('Desc','123')
    })
    
    it('Deve pegar o saldo',()=>{   
        cy.verificaSaldo('Conta para saldo','534,00')         
        cy.acessarMenuExtrato()
        cy.alterarStatusConta('Movimentacao 1, calculo saldo')
        cy.validaMsgRetorno('sucesso')       
        cy.wait(1000)
        cy.acessarMenuHome()
        cy.verificaSaldo('Conta para saldo','4.034,00')  
    })  
})
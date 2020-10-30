/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsTestesFuncionais/commandsContas'
import '../../support/commandsTestesFuncionais/commandsTransacao'
import buildEnv from '../../support/commandsFrontend/buildEnv'
import buldEnv from '../../support/commandsFrontend/buildEnv'

describe('Deve testar nivel funcional da aplicação', () => {
    after(() =>{
        cy.clearLocalStorage()
    })
    beforeEach(()=>{
        buldEnv()
        cy.login('ederson.ti@gmail.com','2602211015')            
        cy.acessarMenuHome()
        cy.resetApp()        

    })


    it('Deve inserir uma conta nova', ()   => {
        

        cy.route({
            method:'POST',
            url:'/contas',
            response:{id:3,"nome":"conta 3","visivel":true,"usuario_id":11991}
        }).as('savarConta')

        cy.acessarMenuContas()

        cy.route({
            method:'GET',
            url:'/contas',
            response:
                [
                    {
                       id:1,
                       nome:"Carteira",
                       visivel:true,
                       usuario_id:11991
                    },
                    {
                       id:2,
                       nome:"Conta Banco",
                       visivel:true,
                       usuario_id:11991
                    },
                    {
                        id:3,
                        nome:"conta 3",
                        visivel:true,
                        usuario_id:11991
                     }
                ]                            
        }).as('contasSalvas')

        cy.inserirConta('Conta de Teste')
        cy.validaMsgRetorno('Conta inserida com sucesso')
    })

    it('Deve alterar conta existente',()=>{

        cy.route({
            method:'PUT',
            url:'/contas/**',
            response:{id:1,nome:"Conta alterada",visivel:true,usuario_id:11991}
        })

        cy.acessarMenuContas()
        cy.selecionarContaParaAlterar('Carteira')        
        cy.alterarContaPara('Conta para Alterar')  
        cy.clicarBotaoSalvar()    
        cy.validaMsgRetorno('Conta atualizada com sucesso!')
    })

    it('Não deve inserir conta ja existente',()=>{
        cy.route({
            method:'POST',
            url:'/contas',
            response:{"error":"Já existe uma conta com esse nome!"},
            status:400
        }).as('savarContaMesmoNome')

        cy.acessarMenuContas()
        cy.inserirConta('Conta mesmo nome') 
        cy.validaMsgRetorno('code 400')  
    })

    it('Deve criar uma movimentação',()=>{
        cy.route({
            method:'POST',
            url:'/transacoes',
            response:{"id":279107,"descricao":"teste mov ","envolvido":"yhu","observacao":null,"tipo":"REC","data_transacao":"2020-10-29T03:00:00.000Z","data_pagamento":"2020-10-29T03:00:00.000Z","valor":"123.00","status":false,"conta_id":308099,"usuario_id":11991,"transferencia_id":null,"parcelamento_id":null}
            
        })
        cy.route({
            method:'GET',
            url:'/extrato/**',
            response:'fixture:movimentacaoSalva'
            })

        cy.acessarMenuTransacao()
        cy.inserirMovimentacao('Desc','123','Pedro','Conta Banco') 
        cy.validaMsgRetorno('Movimentação inserida com sucesso')  
       
        cy.validacoesMovimentacaoCriada('Desc','123')
    })
    
    it('Deve pegar o saldo',()=>{ 
        
        cy.route({
            method:'GET',
            url:'/transacoes/**',
            response:
                {
                    "conta":"Conta para saldo",
                    "id":279110,
                    "descricao":"Movimentacao 1, calculo saldo",
                    "envolvido":"CCC",
                    "observacao":null,
                    "tipo":"REC",
                    "data_transacao":"2020-10-29T03:00:00.000Z",
                    "data_pagamento":"2020-10-29T03:00:00.000Z",
                    "valor":"3500.00",
                    "status":false,
                    "conta_id":308125,
                    "usuario_id":11991,
                    "transferencia_id":null,
                    "parcelamento_id":null
                 }
            
        })

        cy.route({
            method:'PUT',
            url:'/transacoes/**',
            response:
                {
                    "conta":"Conta para saldo",
                    "id":279110,
                    "descricao":"Movimentacao 1, calculo saldo",
                    "envolvido":"CCC",
                    "observacao":null,
                    "tipo":"REC",
                    "data_transacao":"2020-10-29T03:00:00.000Z",
                    "data_pagamento":"2020-10-29T03:00:00.000Z",
                    "valor":"3500.00",
                    "status":false,
                    "conta_id":308125,
                    "usuario_id":11991,
                    "transferencia_id":null,
                    "parcelamento_id":null
                 }
            
        })
        cy.acessarMenuHome()
        cy.verificaSaldo('Carteira','100,00')   
        cy.acessarMenuExtrato()
        cy.alterarStatusConta('Movimentacao 1, calculo saldo')
        cy.validaMsgRetorno('sucesso')  
        
        cy.route({
            method:'GET',
            url:'/saldo',
            response:[
                {
                    conta_id:308065,
                    conta:"Carteira",
                    saldo:"4034.00"
                },
                {
                   conta_id:308066,
                   conta:"Conta Banco",
                   saldo:"10534.00"
                }
             ]
        }).as('saldo')

        
        cy.wait(1000)
        cy.acessarMenuHome()
        cy.verificaSaldo('Carteira','4.034,00')  
    })

    it('Deve remover uma movimentação',()=>{
        cy.route({
            method:'DELETE',
            url:'/transacoes/**',
            response:{},
            status:204
        }).as('del')
        cy.acessarMenuExtrato()
        cy.removerMovimentacao('Movimentacao para exclusao') 
        cy.validaMsgRetorno('sucesso!')              
    })
})
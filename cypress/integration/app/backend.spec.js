/// <reference types="cypress"/>

import '../../support/commandBack/commandsBackend'

describe('Deve testar nivel backend da aplicação', () => {

    before(() => {
       cy.getToken('ederson.ti@gmail.com','26022015')          
    })
    
    beforeEach(()=>{
        cy.reserRest('ederson.ti@gmail.com','26022015')
    })


   it('Deve inserir uma conta nova', ()   => {
        cy.request({
                method:'POST',
                url:'/contas',
                body:{
                    nome:'Conta via Rest'
                }
        }).as('response')      

        cy.get('@response').then(res=>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome','Conta via Rest')
        })

    })

    it('Deve alterar conta existente',()=>{
        cy.getContaPorNome('ederson.ti@gmail.com','26022015','Conta para movimentacoes')
            .then(contaId => {
            cy.request({
                url:`/contas/${contaId}`,
                method:'PUT',
                body:{
                    nome:'Conta alterada via rest'
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal',200)       
    })

    it('Não deve inserir conta ja existente',()=>{
            cy.request({
                method:'POST',
                url:'/contas',
                body:{
                    nome:'Conta mesmo nome'
                },
                failOnStatusCode:false
        }).as('response')      

        cy.get('@response').then(res=>{
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
        
    })

    it('Deve criar uma movimentação',()=>{

        cy.getContaPorNome('ederson.ti@gmail.com','26022015','Conta para movimentacoes')
            .then(contaId => {
                cy.request({
                    url:'/transacoes',
                    method:'POST',
                    body:{
                        conta_id: contaId,
                        data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                        data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                        descricao: "Desc",
                        envolvido: "Joao Pedro",
                        status: true,
                        tipo: "REC",
                        valor: "123"
                    }
                }).as('response')   
             })

             cy.get('@response').its('status').should('be.equal',201)
             cy.get('@response').its('body.id').should('exist')
        
    })
    
    it('Deve pegar o saldo',()=>{   
        cy.request({
            url:'/saldo',
            method:'GET',
        }).then(res => {
            let saldoConta = null;
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo'){
                    saldoConta = c.saldo
                }
            })
            expect(saldoConta).to.be.equal('534.00')
        })
        
    })    

    it('Dever remover uma movimentação',()=>{       
        cy.request({
            url:'/transacoes/',
            method:'GET',
            qs:{descricao:'Movimentacao para exclusao'}
        }).then(res => {
            cy.request({
                url:`/transacoes/${res.body[0].id}`,
                method:'DELETE',
            }).its('status').should('be.equal',204)

        })           
                  
    })
})



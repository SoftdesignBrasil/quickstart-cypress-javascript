// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import loc from '../locators'

Cypress.Commands.add('login',(email, senha) =>{
    cy.visit('http://barrigareact.wcaquino.me')
    cy.get(loc.LOGIN.EMAIL).type(email)
    cy.get(loc.LOGIN.SENHA).type(senha)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MSG).should('contain','Bem vindo')
})

Cypress.Commands.add('acessarMenuTransacao',() =>{
    cy.get(loc.MENU.MOVIMENTACAO).click()
})

Cypress.Commands.add('acessarMenuExtrato',() =>{
    cy.get(loc.MENU.EXTRATO).click()
})

Cypress.Commands.add('acessarMenuHome',() =>{
    cy.get(loc.MENU.HOME).click()
})

Cypress.Commands.add('resetApp',()=>{
    cy.get(loc.MENU.OPCOES).click()
    cy.get(loc.MENU.RESET).click()
})

Cypress.Commands.add('validaMsgRetorno',(menssagem)=>{
    cy.get(loc.MSG).should('contain', `${menssagem}`,{timeout: 30000})
})

Cypress.Commands.add('validaMsgRetorno',(menssagem)=>{
    cy.get(loc.MSG).should('contain', `${menssagem}`,{timeout: 30000})
})





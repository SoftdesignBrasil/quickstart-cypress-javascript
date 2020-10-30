Cypress.Commands.add('getToken', (usuario, senha) =>{
    cy.request({
        method: 'POST',
        url:'/signin',
        body:{
            email: usuario,
            redirecionar: false,
            senha: senha                
        }            
    }).its('body.token')
        .should('not.be.empty')
        .then(token =>{
            Cypress.env('token',token)
            return token
        })
})

Cypress.Commands.add('reserRest', (usuario, senha) =>{
    cy.getToken(usuario,senha).then(token =>{
        cy.request({
            method: 'GET',
            url:'/reset',
            headers:{ Authorization:`JWT ${token}`},                      
        }).its('status').should('be.equal',200)
    })    
})


Cypress.Commands.add('getContaPorNome', (usuario,senha ,name) =>{
    cy.getToken(usuario,senha).then(token =>{
        cy.request({
            method:'GET',
            url:'/contas',
            headers:{ Authorization:`JWT ${token}`},
            qs:{
                nome:name
            }    
        }).then(res =>{
            return res.body[0].id
        })
    })    
})

Cypress.Commands.overwrite('request',(originalFn, ...options) =>{
    if(options.length ===1){
        if(Cypress.env('token')){
            options[0].headers = {
                Authorization : `JWT ${Cypress.env('token')}`
            }            
        }
    }

    return originalFn(...options)
})



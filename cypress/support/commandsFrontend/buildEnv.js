const buldEnv = () =>{
    cy.server()
        cy.route({
            method:'POST',
            url:'/signin',
            response: {                
                    id:10000,
                    nome:"usuario falso",
                    token:"uma string muito grande que nao pode ser aveita, mais na verdade vai"                 
            }
        }).as('signin')

        cy.route({
            method:'GET',
            url:'/saldo',
            response:[
                {
                    conta_id:308065,
                    conta:"Carteira",
                    saldo:"100.00"
                },
                {
                   conta_id:308066,
                   conta:"Conta Banco",
                   saldo:"10534.00"
                }
             ]
        }).as('saldo')

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
                    }
                ]                            
        }).as('contas')

        cy.route({
            method:'GET',
            url:'/extrato/**',
            response:[
                {"conta":"Conta para movimentacoes","id":279108,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2020-10-29T03:00:00.000Z","data_pagamento":"2020-10-29T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":308123,"usuario_id":11991,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta com movimentacao","id":279109,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2020-10-29T03:00:00.000Z","data_pagamento":"2020-10-29T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":308124,"usuario_id":11991,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":279110,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2020-10-29T03:00:00.000Z","data_pagamento":"2020-10-29T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":308125,"usuario_id":11991,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":279111,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2020-10-29T03:00:00.000Z","data_pagamento":"2020-10-29T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":308125,"usuario_id":11991,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":279112,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2020-10-29T03:00:00.000Z","data_pagamento":"2020-10-29T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":308125,"usuario_id":11991,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para extrato","id":279113,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2020-10-29T03:00:00.000Z","data_pagamento":"2020-10-29T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":308126,"usuario_id":11991,"transferencia_id":null,"parcelamento_id":null}]
        })

}

export default buldEnv
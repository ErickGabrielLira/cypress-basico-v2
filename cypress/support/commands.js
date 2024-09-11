Cypress.Commands.add('novoComando', function(nome,sobrenome,email,descricao) {
    cy.get('#firstName').type(nome)
    cy.get('#lastName').type(sobrenome)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(descricao)
    cy.get('.button').click()
})
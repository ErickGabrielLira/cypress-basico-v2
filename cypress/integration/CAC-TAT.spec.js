// <reference types="Cypress" />



beforeEach(() => {
    cy.visit('./src/index.html') // Visita o site localmente

});

describe('Central de Atendimento ao Cliente TAT - Modulo 3 (Type)', function () {

    const THREE_SECONDS_IN_MS = 3000

    it('verifica o título da aplicação', function () {
        // cy.title busca o título. ".should = deve(ser.igual)", ou seja, o titulo deve ser igual a ......
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {

        const textoLongo = Cypress._.repeat('Teste, ', 20)

        cy.clock()

        cy.get('#firstName').type('Erick')
        cy.get('#lastName').type('Lira')
        cy.get('#email').type('erick@hotmail.com')
        cy.get('#open-text-area').type(textoLongo, { delay: 0 }) // Tira todo o delay da escrita
        cy.get('.button').click()

        cy.get('.success') // Pega a mensagem de sucesso
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success')
            .should('not.be.visible')
    });


    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

        cy.clock()

        cy.get('#firstName').type('Erick')
        cy.get('#lastName').type('Lira')
        cy.get('#email').type('erick@hotmail,com')
        cy.get('#open-text-area').type('Olá!', { delay: 0 }) // Tira todo o delay da escrita
        cy.get('.button').click()

        cy.get('.error')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS) // Vai aguardar até acontecer o que está pedido abaixo.

        cy.get('.error')
            .should('not.be.visible')
    });


    it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.clock()

        cy.get('#firstName').type('Erick')
        cy.get('#lastName').type('Lira')
        cy.get('#email').type('erick@hotmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Olá!') // Tira todo o delay da escrita
        cy.get('.button').click()


        cy.get('.error')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error')
            .should('not.be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName') // Pegou o seletor
            .type('Erick') // Escreveu o nome
            .should('have.value', 'Erick') // Validou que está com o nome
            .clear() // Limpou
            .should('have.value', '') // Validou que limpou

        cy.get('#lastName')
            .type('Lira')
            .should('have.value', 'Lira')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('erick@hotmail.com')
            .should('have.value', 'erick@hotmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('999333444')
            .should('have.value', '999333444')
            .clear()
            .should('have.value', '')

    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

        cy.clock()

        cy.get('.button').click()

        cy.get('.error')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error')
            .should('not.be.visible')
    });

    Cypress._.times(8, () => {
        it('envia o formuário com sucesso usando um comando customizado', () => {

            cy.clock()

            cy.novoComando('Gabriel', 'Lira', 'gabriel@hotmail.com', 'Olarrr!')

            cy.get('.success') // Pega a mensagem de sucesso
                .should('be.visible')

            cy.tick(THREE_SECONDS_IN_MS)

            cy.get('.success')
                .should('not.be.visible')
        });
    })

    it('Teste com contains', () => {

        cy.get('#firstName').type('Erick')
        cy.get('#lastName').type('Lira')
        cy.get('#email').type('erick@hotmail.com')
        cy.get('#open-text-area').type('Teste')

        cy.contains('button', 'Enviar').click()
        // Pega o elemento do tipo botão que contém algo com "Enviar"


        cy.get('.success')
            .should('be.visible')
    });
})

describe('Central de Atendimento ao Cliente TAT - Modulo 4 (Select)', () => {
    const THREE_SECONDS_IN_MS = 3000
    it('seleciona um produto (YouTube) por seu texto', () => {

        /* cy.get('#product').select('blog') */ // Pegando pelo seletor do select

        /* cy.get('select').select('Blog') */ // Pegando pelo que tem no Texto

        /* cy.get('select').select('blog') */ // Pegando pelo que tem no value

        /* cy.get('select').select(2) */ // Pegando pelo indice


        cy.get('select').select('mentoria').should('have.value', 'mentoria')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {

        cy.get('select').select(1).should('have.value', 'blog')

    });


    it('seleciona um produto (YouTube) por seu texto', () => {

        cy.get('select').select('YouTube').should('have.value', 'youtube')

    });
});

describe('Central de Atendimento ao Cliente TAT - Modulo 5 (Check)', () => {
    const THREE_SECONDS_IN_MS = 3000
    it('marca o tipo de atendimento "Feedback"', () => {

        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')

    });

    it('marca cada tipo de atendimento', () => {

        cy.get('input[type="radio"]').check()
            .should('have.length', 3) // Confirma que tem 3 elementos
            .each(function ($radio) { // Cria função com argumento rádio, e faz os comandos para cada elemento
                cy.wrap($radio).check() // Marca o 1o.... depois o 2o... depois o 3o....
                cy.wrap($radio).should('be.checked') // Valida o check do 1o.... depois do 2o... depois do 3o...
            })
    });
});

describe('Central de Atendimento ao Cliente TAT - Modulo 6 (Marca e desmarca Checkbox)', () => {
    const THREE_SECONDS_IN_MS = 3000
    it('marca ambos checkboxes, depois desmarca o último', () => {

        cy.get('input[type="checkbox"]') // Pega todos os elementos checkbox
            .check() // Faz o check em todos
            .should('be.checked') // Valida que ambos foram marcados
            .last() // Pega apenas o último elemento
            .uncheck() // Desmarca
            .should('not.be.checked') // Valida que foi desmarcado

    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.get('#firstName').type('Erick')
        cy.get('#lastName').type('Lira')
        cy.get('#email').type('erick@hotmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Olá!') // Tira todo o delay da escrita
        cy.get('.button').click()


        cy.get('.error')
            .should('be.visible')

        cy.get('#phone-checkbox').uncheck() // Desmarquei o telefone
        cy.get('.button', { delay: 10 }).click() // Mandei aguardar 10seg para clicar no butão de enviar

        cy.get('.error',)
            .should('not.be.visible') // Verifiquei se ainda existe o erro.

    });
});

describe('Central de Atendimento ao Cliente TAT - Modulo 7 (SelectFile)', () => {
    const THREE_SECONDS_IN_MS = 3000
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload') // ou cy.get('#file-upload') ou cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(input => { // ou .then()
                expect(input[0].files[0].name).to.equal('example.json')
            })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]#file-upload') // ou cy.get('#file-upload') ou cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(input => { // ou .then()
                expect(input[0].files[0].name).to.equal('example.json')
            })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

        // Faz importação direta do fixture porque o cy.fixture já indica que está na pasta de fixture, logo não irá precisar colocar o caminho. E postoriormente podemos usar um alias para indicar o nome.
        cy.fixture('example.json').as('ficheiroParaUpload')

        cy.get('input[type="file"]#file-upload')
            .selectFile('@ficheiroParaUpload') // Sempre que usar o alias, é preciso chamar com "@"
            .should(input => { // ou .then()
                expect(input[0].files[0].name).to.equal('example.json')
            })

    });

});

describe('Central de Atendimento ao Cliente TAT - Modulo 86 (Remoção de link com abertura de nova aba)', () => {
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a') // Pega o selector que é privacy e que tenha algo com <a>
            .should('have.attr', 'target', '_blank')
        // Verifica que ao apertar neste selector, vai abrir uma nova aba, por causa do "target"
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target') // Remove o atributo "target", fazendo com que ao clicar, não vai abrir em outra aba. Vai permanecer na mesma aba
            .click() // Ao clicar, abre a politica de privacidade, porém, na mesma aba
        cy.contains('Talking About Testing').should('be.visible')
        // Ao abrir o link na mesma aba, irá procurar se contém o texto acima.

    });

    it('testa a página da política de privacidade de forma independente', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target') // Remove o atributo "target", fazendo com que ao clicar, não vai abrir em outra aba. Vai permanecer na mesma aba
            .click() // Ao clicar, abre a politica de privacidade, porém, na mesma aba

        cy.contains('Talking About Testing').should('be.visible')
        // Ao abrir o link na mesma aba, irá procurar se contém o texto acima.

    });

});

describe('Central de Atendimento ao Cliente TAT - Modulo 12 (Invoke e Request)', () => {
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success') // Pega o selector da mensagem de sucesso
            .should('not.be.visible') // Verifica que não tá visivel
            .invoke('show') // Força ficar visivel
            .should('be.visible') // Valida se ficou visivel
            .and('contain', 'Mensagem enviada com sucesso.') // Valida se a mensagem é aquela mesmo
            .invoke('hide') // Força esconder a mensagem
            .should('not.be.visible') // Valida se ficou invisivel

        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    });

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('Teste com Invoke, ', 7)

        cy.get('#open-text-area')
            .invoke('val', longText) // Invoca o valor da área de texto e seta o longText no val.
            .should('have.value', longText) // Valida se foi colocado

    });

    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            // Requisita a rede desse site, do tipo GET

            .should(function (resposta) { // Verifica a seguinte função
                const { status, statusText, body } = resposta // Desestrutura as variaveis
                expect(status).to.equal(200) // Verifica que o status do site = 200
                expect(statusText).to.equal('OK') // Verifica que o Texto do status é = OK
                expect(body).to.include('CAC TAT') // Verifica que body inclue o texto "CAT TAT"
            })

    });
});

describe.only('Central de Atendimento ao Cliente TAT - Desafio final', () => {
    it('Desafio final - Achar o gato', () => {
        cy.get('#white-background #cat') // Dentro do selector white-back... tem um span .cat, então fiz o get
            .invoke('show')
            .should('be.visible')

    });


    it.only('Alterar texto com Invoke', () => {
        cy.get('#title') 
            .invoke('text', 'CAT TAT')
            .should('be.visible')

        cy.get('#subtitle')
            .invoke('text', 'Happy happy happy"')
    });
});
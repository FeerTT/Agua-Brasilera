describe('Corroboración de funcionamiento de botones redireccionables.', () => {
    it('Corroboración de redirección de botones.', () => {
        //ingresa a localhost:3000
        cy.visit('localhost:3000');
        //despliega el menú de usuarios
        cy.get('.nav-list-link').eq(1).click();

        //ingresa hacia la primera opción del menú usuarios y redirije hacia /users/add
        cy.get('.submenu')
        cy.get('.submenu-link').eq(0).click();
        cy.url().should('eq', 'http://localhost:3000/users/add');

        //una vez en el primer link, probamos el boton de regreso
        cy.get('.regresarImg1').eq(1).click().url().should('eq', 'http://localhost:3000/');

        //probamos nuevamente con otro boton, en este caso el responsable de dirigir hacia /users/list
        cy.get('.nav-list-link').eq(1).click();
        cy.get('.submenu')
        cy.get('.submenu-link').eq(1).click();
        cy.url().should('eq', 'http://localhost:3000/users/list');

        //una vez en el link (/users/list) probamos el boton de regreso hacia el index
        cy.get('.regresarImg').click({ force: true }).url().should('eq', 'http://localhost:3000/');

        //Una vez en index, testeamos otro boton pero esta vez cubriendo los redireccionables para "Mediciones"
        cy.get('.nav-list-link').eq(2).click();
        cy.get('.submenu')
        cy.get('.submenu-link').eq(0).click();
        cy.url().should('eq', 'http://localhost:3000/mediciones/mostrarUsers');

        //Si todo sale bien, regresa hacia index
        cy.get('.regresarImg1').eq(0).click().url().should('eq', 'http://localhost:3000/');

        //Testeamos el último boton y adicional el botón de regreso.
        cy.get('.nav-list-link').eq(2).click();
        cy.get('.submenu')
        cy.get('.submenu-link').eq(1).click();
        cy.url().should('eq', 'http://localhost:3000/mediciones/listar');

        //una vez en el último endpoint por testear, incluímos el botón de regreso para corroborar su funcionamiento.

        cy.get('.regresarImg').click({force:true }).url().should('eq', 'http://localhost:3000/');
    })
})
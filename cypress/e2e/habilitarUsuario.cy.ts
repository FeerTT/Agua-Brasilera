
describe('Habilitar un usuario', () => {
    it('Debería habilitar un usuario al hacer clic en el botón correspondiente, Visualizar mediante la respuesta del método PATH, el ID del user seleccionado.', () => {

        cy.visit('localhost:3000/users/list');
        //Me redirijo al final del paginado debido a que ahí ordeno los deshabilitados. (Duda, no sé por qué inicia en el tercer elemento del páginado)
        cy.get('.pagination').last().click(); 

        //Obtengo la lista de deshabilitados
        cy.get('.disabled-user').should('exist');

        // Pruebo con el primer usuario deshabilitado de la lista (en el boton de habilitar)
        cy.get('.disabled-user').first().find('.logosUser').click();

        //Confirmo la habilitación del usuario
        cy.get('#botonHabilitarUsuario').should('exist').click();
        
    });
});
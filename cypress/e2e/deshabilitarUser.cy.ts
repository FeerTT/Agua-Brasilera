
describe('Deshabilitar un usuario', () => {
    it('Debería deshabilitar un usuario al hacer clic en el botón correspondiente, Visualizar mediante la respuesta del método PATH, el ID del user seleccionado.', () => {

        cy.visit('localhost:3000/users/list');

        // Encuentra un user para deshabilitar y clickeo para que se abra el modal.
        cy.get('#deshabilitarUser').click();

        // Espero que se abra el modal.
        cy.get('.deleteModal').should('be.visible');

        // Clickeo para que se deshabilite el usuario
        cy.get('.confirmButton').click();

        //Con esto verifico si se ocultó el modal
        cy.get('.deleteModal').should('not.exist');

        //Verifico si el boton de deshabilitar usuario sigue vigente (es decir, tengo las tablas).
        cy.get('#deshabilitarUser').should('exist');
    });
});
describe('FORM Modificar Usuarios', () => {
    it('Debería ingresar a localhost:3000/users/list y validar el funcionamiento de la modificación de usuarios.', () => {
    cy.visit('localhost:3000/users/list')
    //Seteo nombre y apellido para utilizarlo como variables
    const nombre='Amilcar';
    const apellido='Hernandez';
    //Ingreso al campo mediante #ID
    cy.get('#editarUsuarioListado').click();
    //Ingreso a los inputs del form e inicialmente los vacío para luego modificarlos
    cy.get('.inputField').eq(0).clear().type(nombre)
    cy.get('.inputField').eq(1).clear().type(apellido)
    //Presiono el boton de guardar
    cy.get('.saveButton').click();
    //Verifico si existe una tabla con el nuevo nombre y apellido para validar el cambio.
    cy.get('.rwd-table tbody tr').contains('td', nombre).parent('tr').should('contain', apellido);
    })
})

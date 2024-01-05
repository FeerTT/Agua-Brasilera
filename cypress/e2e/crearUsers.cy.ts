describe('FORM Usuarios test', () => {
  it('Debería ingresar a /users/add, testear los campos y crear un usuario. Finaliza con la correcta creación del mismo', () => {
    cy.visit('localhost:3000/users/add')

    const nombre = 'Fernando';
    const apellido = 'Trillo';
    //seteo los campos
    cy.get('#nombre').type(nombre, { force: true });
    cy.get('#apellido').type(apellido, {force: true});
    //envio los campos
    cy.get('.form-button').click()
    //abre el modal de confirmación
    cy.get('.create-confirmation-modal-container').should('be.visible');
    //confirma el modal
    cy.get('.button-confirmar-crear').click();
    //vacío los campos
    cy.get('#nombre').should('have.value', ''); 
    cy.get('#apellido').should('have.value', '');
    //me mantengo en la misma página
    cy.url().should('include', 'localhost:3000/users/add')
  })
})

describe('Corroborar Tablas-Mediciones', () => {
    it('Debería ingresar a /mediciones/mostrarUsers, ingresar valores, corroborar que sea igual para todos, renderizar tablas y botones.', () => {
        //ingresa a la url correspondiente
        cy.visit('localhost:3000/mediciones/mostrarUsers')
        //verifica que existe el campo para el valor fijo
        cy.get('#inputInicial').should('exist');
        //le da un valor al campo valorfijo
        cy.get('#inputInicial').type('1000');
        //verifica que existe el input excedente 
        cy.get('#inputExcedente').should('exist');
        //le da un valor al input excedente
        cy.get('#inputExcedente').type('100');
        //una vez que tenga valores en ambos inputs, debe aparecer la tabla de usuarios y el boton de crear medición.
        cy.get('.rwd-table').should('be.visible');
        //verifica que hayan valores en las tablas
        cy.get('.rwd-table tbody tr').should('have.length.greaterThan', 0);
        //verifica que exista el boton para crear las mediciones
        cy.get('#botonCrearMedicion').should('be.visible');

        //itero sobre las diferentes páginas para corroborar que la información sea para todos igual.
        cy.get('.page-item').each(($pageItem, index) => {
        cy.wrap($pageItem).click();

        //verifica que el valor ingresado en el input "valorFijo" sea exactamente igual para todos los usuarios de la tabla
        cy.get('.classValorFijo').then(($elements) => {
            const firstElementText = $elements.eq(0).text();
            $elements.each((index, element) => {
                expect(element.textContent).to.equal(firstElementText);
            });
        });
        //verifico que el valor ingresado en el input "tarifaExcedente" sea exactamente igual para todos los usuarios de la tabla
        cy.get('.classTarifaExcedente').then(($elements) => {
            const firstElementText = $elements.eq(0).text();
            $elements.each((index, element) => {
                expect(element.textContent).to.equal(firstElementText);
            });
        });
      })
    })
})

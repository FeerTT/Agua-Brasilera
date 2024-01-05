
describe('Comprobantes PDF', () => {
    it('Debería generar los comprobantes de las mediciones en formato PDF', () => {
        cy.visit('localhost:3000/mediciones/listar');
        
        cy.get('.fechaClick').click({force: true});
        cy.get('.close-listado').click({force:true});
        cy.get('#comprobanteTotal').click({force:true});
        //Puedo visualizar que se descarga, pero no puedo acceder a dicha descarga para retornar el should
        //creo que es debido a una configuración faltante en cypress.config.ts queda a revisión

        //(download)C:\Users\Fernando\Desktop\Proyectos\AguaPot\agua-potable-brasilera\cypress\downloads\Comprobantes.pdf
        
    });
});
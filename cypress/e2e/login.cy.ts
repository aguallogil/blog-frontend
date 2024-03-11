describe('Login Page Tests', () => {
    before(()=>{
        cy.logout();
    });
    beforeEach(() => {
        cy.visit('/');
    });
    it('muestra que se miren los componentes', () => {
        cy.get('h2').contains('LOGIN');
        cy.get('input#username').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('button[type="submit"]').contains('Login').should('be.visible');
    });

    it('muestra un error con credencales invalidas', () => {
        const username = 'wronguser';
        const password = 'wrongpassword';

        cy.get('input#username').type(username);
        cy.get('input#password').type(password);
        cy.get('button[type="submit"]').click();

        cy.get('.fixed.bottom-4.right-4').should('contain.text', 'Unauthorized access!');
    });
    it('inicia sesion con credenciales validas', () => {
        const username = 'admin';
        const password = '1234';

        cy.get('input#username').type(username);
        cy.get('input#password').type(password);
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/blog-entries');
    });
});
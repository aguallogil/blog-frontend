describe('Blog-Entries Page Tests', () => {
    const username:string='admin';
    const password:string='1234';
    const blogEntry={
        title:'Title Test',
        author:'Author Test',
        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    };
    before(()=>{
        cy.login(username,password);
    });
    beforeEach(() => {
        cy.visit('/blog-entries');
    });
    it('muestra que se miren los botones', () => {
        cy.get('#modal-button').should('be.visible');
        cy.get('#search').should('be.visible');
    });
    it('añadir nuevo registro', () => {
        cy.get('#modal-button').click({force:true});
        cy.get('.modal-container').should('be.visible');

        cy.get('input#title').type(blogEntry.title);
        cy.get('input#author').type(blogEntry.author);
        cy.get('textarea#content').type(blogEntry.content);
        cy.get('button[type="submit"]').click();

        cy.wait(2000);
        cy.contains('h2', blogEntry.title, { matchCase: false }).should('exist');
    });
});
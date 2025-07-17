describe('Favoritar raça offline', () => {
	it('marca e desmarca favoritos no localStorage', () => {
		cy.visit('/');
		cy.contains('husky').click();
		cy.get('button').contains('☆').click();
		cy.visit('/favorites').contains('husky');
		cy.get('button').contains('★').click();
		cy.contains('husky').should('not.exist');
	});
});

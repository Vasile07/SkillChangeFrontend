describe('Find Skills Test Cases', function () {

    beforeEach(function () {
        cy.fixture('login_success').as('validUserData');
    });

    describe('Filter skills via Search input', function () {
        it('filters skills by search input', function () {
            cy.visit('/LoginScreen');
            cy.get('[data-testid="email-field"]').type(this.validUserData.email);
            cy.get('[data-testid="password-field"]').type(this.validUserData.password);
            cy.get('[data-testid="login-button"]').click();
            cy.get('[data-testid="home-page"]').should('be.visible');

            cy.visit('/ExplorePage');
            cy.get('[data-testid="skill-list"]').should('be.visible');
            cy.get('[data-testid="skill-list"]').children().should('have.length.greaterThan', 0);

            cy.get('[data-testid="search-input"]').type("a");
            cy.wait(300);
            cy.get('[data-testid="skill-list"]').children().should('have.length.greaterThan', 0);
        });
    });
});


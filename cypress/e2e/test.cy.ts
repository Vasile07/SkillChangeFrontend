describe('Login Test Cases', function () {

    beforeEach(function () {
        cy.fixture('login_success').as('validUserData');
        cy.fixture('login_fail').as('invalidUserData');
    });

    describe('Successful Login', function () {
        it('logs in with valid credentials', function () {
            cy.visit('/LoginScreen');
            cy.get('[data-testid="email-field"]').type(this.validUserData.email);
            cy.get('[data-testid="password-field"]').type(this.validUserData.password);
            cy.get('[data-testid="login-button"]').click();
            cy.get('[data-testid="home-page"]').should('be.visible');
        });
    });

    describe('Failed Login', function () {
        it('fails to log in with invalid credentials', function () {
            cy.visit('/LoginScreen');
            cy.get('[data-testid="email-field"]').type(this.invalidUserData.email);
            cy.get('[data-testid="password-field"]').type(this.invalidUserData.password);
            cy.get('[data-testid="login-button"]').click();
            cy.get('[data-testid="login-page"]').should('be.visible');
        });
    });

});


describe('Schedule Meet Test Cases', function () {

    beforeEach(function () {
        cy.fixture('login_success').as('validUserData');
    });

    describe('Should schedule a meet', function () {
        it('schedule a meet', function () {
            cy.visit('/LoginScreen');
            cy.get('[data-testid="email-field"]').type(this.validUserData.email);
            cy.get('[data-testid="password-field"]').type(this.validUserData.password);
            cy.get('[data-testid="login-button"]').click();
            cy.get('[data-testid="home-page"]').should('be.visible');

            cy.visit('/SchedulePage');
            cy.get('[data-testid="schedule-page"]').should('be.visible');
            cy.get('[data-testid="add-meet-button"]').click();
            cy.get('[data-testid="scheduling-page"]').should('be.visible');
            cy.contains('Select option').click();
            cy.contains('Gardening').click();
            cy.contains('Pick Date').click();
            cy.contains('save').click();
            cy.contains('Pick Time').click();
            cy.contains('Ok').click();

            cy.contains('Done').click();
        });
    });
});


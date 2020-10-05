/** @format */

/// <reference types="cypress" />

context('Testing shenlong invocation', () => {
  before(() => {
    cy.visit('http://localhost:3000/dragon-ball-manager');
  });
  it('Should not invocate if user doesnt have 7 dragon balls', () => {
    cy.get('[data-testid="card-shenlong"]').should('exist');
    cy.get('[data-testid="invoke-button"]').click();
    cy.get('[data-testid="modaltext"]').should(
      'contain.text',
      'Você não tem todas as esferas para invocar o shenlong',
    );
    cy.get('[data-testid="back"]').click();
  });

  it('Should be able to invoke Shenlong with 7 dragon balls', () => {
    cy.get('[data-testid="btn-find-ball"]:first').click();
    cy.get('[data-testid="input-ball-code"]').type('2');
    cy.get('[data-testid="btn-validate"]').click();

    cy.get('[data-testid="btn-find-ball"]:first').click();
    cy.get('[data-testid="input-ball-code"]').type('3');
    cy.get('[data-testid="btn-validate"]').click();

    cy.get('[data-testid="btn-find-ball"]:first').click();
    cy.get('[data-testid="input-ball-code"]').type('4');
    cy.get('[data-testid="btn-validate"]').click();

    cy.get('[data-testid="invoke-button"]').click();
    cy.get('[data-testid="shenlong"]').should('exist');
  });
});

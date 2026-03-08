import lead from '../fixtures/lead.json';

describe('Página Site', () => {
  beforeEach(() => {
    cy.visit('/site');
  });

  it('exibe erro de email inválido apenas após o envio', () => {
    cy.fillLeadForm({
      nome: lead.validName,
      email: lead.invalidEmail,
      telefone: lead.validPhone,
    });

    cy.clickPrimarySubmit();
    cy.contains(/e-mail inválido/i).should('be.visible');
  });

  it('exibe erro de base legal mesmo após correção dos campos', () => {
    cy.fillLeadForm({
      nome: lead.validName,
      email: lead.validEmail,
      telefone: lead.validPhone,
    });

    cy.clickPrimarySubmit();
    cy.contains(/base legal/i).should('be.visible');
  });

  it('marca Nome e Email como obrigatórios, mas não faz o mesmo com Telefone', () => {
    cy.contains(/nome/i).should('contain.text', '*');
    cy.contains(/email/i).should('contain.text', '*');
    cy.contains(/telefone/i).should('not.contain.text', '*');
  });

  it('aceita nome com quantidade excessiva de caracteres', () => {
    cy.getFieldByLabel(/nome/i).clear().type(lead.longName, { delay: 0 }).should(($input) => {
      expect($input.val().length).to.be.greaterThan(60);
    });
  });
});

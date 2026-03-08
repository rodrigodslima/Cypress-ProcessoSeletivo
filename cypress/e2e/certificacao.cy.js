import lead from '../fixtures/lead.json';

describe('Página Certificação', () => {
  beforeEach(() => {
    cy.visit('/certificacao');
  });

  it('exibe erro de base legal ao submeter formulário com dados válidos', () => {
    cy.fillLeadForm({
      nome: lead.validName,
      email: lead.validEmail,
      telefone: lead.validPhone,
    });

    cy.clickPrimarySubmit();
    cy.contains(/base legal/i).should('be.visible');
  });

  it('aceita quantidade excessiva de caracteres nos campos do formulário', () => {
    cy.getFieldByLabel(/nome/i).clear().type(lead.longName, { delay: 0 }).should(($input) => {
      expect($input.val().length).to.be.greaterThan(60);
    });

    cy.getFieldByLabel(/email/i).clear().type(lead.longEmail, { delay: 0 }).should(($input) => {
      expect($input.val().length).to.be.greaterThan(60);
    });

    cy.getFieldByLabel(/telefone/i).clear().type(lead.longPhone, { delay: 0 }).should(($input) => {
      expect(String($input.val()).replace(/\D/g, '').length).to.be.greaterThan(11);
    });
  });

  it('mantém a mesma URL ao clicar em Saiba mais', () => {
    cy.location('href').then((beforeUrl) => {
      cy.contains('a, button', /saiba mais/i).click({ force: true });
      cy.location('href').should('eq', beforeUrl);
    });
  });

  it('mantém a mesma URL ao clicar em um card de Outros Cursos', () => {
    cy.location('href').then((beforeUrl) => {
      cy.contains(/outros cursos/i)
        .scrollIntoView()
        .parentsUntil('section')
        .parent()
        .find('a, button, article, img, [role="button"]')
        .first()
        .click({ force: true });

      cy.location('href').should('eq', beforeUrl);
    });
  });

  it('não sinaliza claramente obrigatoriedade em todos os campos', () => {
    cy.contains(/email/i).should('contain.text', '*');
    cy.contains(/nome/i).should('not.contain.text', '*');
    cy.contains(/telefone/i).should('not.contain.text', '*');
  });
});


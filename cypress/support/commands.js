Cypress.Commands.add('getFieldByLabel', (labelText) => {
  const matcher = labelText instanceof RegExp ? labelText : new RegExp(labelText, 'i');

  return cy.contains('label, p, span, div', matcher).then(($label) => {
    const forAttr = $label.attr('for');

    if (forAttr) {
      return cy.get(`#${forAttr}`);
    }

    const $container = $label.closest('div');
    const input = $container.find('input, textarea').first();

    if (input.length) {
      return cy.wrap(input);
    }

    return cy.contains(matcher)
      .parentsUntil('form')
      .parent()
      .find('input, textarea')
      .first();
  });
});

Cypress.Commands.add('fillLeadForm', ({ nome, email, telefone }) => {
  cy.getFieldByLabel(/nome/i).clear().type(nome, { delay: 0 });
  cy.getFieldByLabel(/email/i).clear().type(email, { delay: 0 });
  cy.getFieldByLabel(/telefone/i).clear().type(telefone, { delay: 0 });
});

Cypress.Commands.add('clickPrimarySubmit', () => {
  cy.contains('button', /avançar|concluir|quero me inscrever|enviar/i).click({ force: true });
});

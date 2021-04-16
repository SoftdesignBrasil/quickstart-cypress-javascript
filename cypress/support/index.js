import './commandsTestesFuncionais/commands'
require('cypress-xpath')

Cypress.SelectorPlayground.defaults({
  selectorPriority: ['data-wc', 'data-cy', 'data-test', 'id', 'class', 'attributes', 'data-testid', 'tag', 'nth-child']
})

// https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Excluding-and-Including-Tests

// eslint-disable-next-line no-undef
beforeEach(() => {
  // cy.viewport('iphone-5')
  // eslint-disable-next-line no-undef
  cy.visit('http://localhost:3000')
})

// eslint-disable-next-line no-undef
describe('', () => {
  // eslint-disable-next-line no-undef
  it('', () => {
    // eslint-disable-next-line no-undef
    cy.get('div').should('be.visible')
  })
})

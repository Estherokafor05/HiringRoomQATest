/// <reference types="cypress" />

describe('Test to-do app', () => {
  beforeEach(() => {

     // We'll store our item text in a variable so we can reuse it
  const newItem = 'clean my shoes'
  const Item2 = 'Pay my rent'
   
    cy.visit('https://todomvc.com/examples/react/#/')
    cy.get('.new-todo').type(`${newItem}{enter}`)
    cy.get('.new-todo').type(`${Item2}{enter}`)

  })
  
it('can add new todo items', () => {
    cy.get('.view > label')
      .should('have.length', 2)
  })

it('can check off an item as completed', () => {
    cy.contains('clean my shoes')
      .parent()
      .find('.toggle')
      .check()

    cy.contains('clean my shoes')
      .parents('li')
      .should('have.class', 'completed')
    })

it('can filter for uncompleted tasks', () => {   
    cy.contains('clean my shoes')
    .parent()
    .find('.toggle')
    .check()

    cy.contains('Completed').click()
    cy.wait(2000)

    cy.get('.view > label')
        .should('have.length', 1)
        .first()
        .should('have.text', 'clean my shoes')

    cy.contains('pay my rent').should('not.exist')
    })

it('can filter for completed tasks', () => {  
    cy.contains('clean my shoes')
    .parent()
    .find('.toggle')
    .check()
     
    cy.contains('Completed').click()

    cy.get('.view > label')
        .should('have.length', 1)
        .first()
        .should('have.text', 'clean my shoes')

    cy.contains('Pay my rent').should('not.exist')
    })

it('can delete all completed tasks', () => {
    cy.contains('clean my shoes')
    .parent()
    .find('.toggle')
    .check()
     
    cy.contains('Clear completed').click()

    cy.get('.view > label')
        .should('have.length', 1)
        .should('not.have.text', 'clean my shoes')

    // Finally, make sure that the clear button no longer exists.
    cy.contains('Clear completed').should('not.exist')
    })
  })

  
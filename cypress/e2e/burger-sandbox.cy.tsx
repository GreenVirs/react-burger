import * as Cypress from "cypress";

describe('<BurgerSandbox />', () => {
  beforeEach(() => {
    cy.viewport(1366, 700);

    cy.visit('http://localhost:3000', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        window.localStorage.setItem('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjhiMzFiOGE0YjYyMDAxYzgzYTY0MCIsImlhdCI6MTY5NDk2MDg0MSwiZXhwIjoxNjk0OTYyMDQxfQ.lOFFpXXlMvBqBcqWv_Y2C6I0L-giDdyC0S7ywZEqUhY');
        window.localStorage.setItem('refreshToken', '83148aa43831a396e6db1159af81a642ad89d327792e1b3ef0990dbe70785ce912714ecf5911d657');
      }
    })
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {  fixture: "user.json" }).as('getUser');
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders',{  fixture: 'order.json' } ).as('createOrder');
  })

  it('Должен открыть и закрыть модалку', () => {

    cy.fixture('ingredients.json').then((ingredientsAPI) => {
      cy.get(`[data-cy-ingredient="${ingredientsAPI.data[0]._id}"]`).click();
      cy.url().should('include', `/ingredients/${ingredientsAPI.data[0]._id}`);
      cy.contains('Детали ингредиента');
      cy.get('[data-cy-close-modal]').click()
      cy.url().should('include', `/`);
      cy.get('[data-cy-close-modal]').should('not.exist')
    })
  });

  it('Должен перекинуть ингредиенты и сделать заказ', () => {
    cy.fixture('ingredients.json').then((ingredientsAPI) => {
      const ingredientBun = ingredientsAPI.data.find((item) => item.type === 'bun');
      const ingredientSauce = ingredientsAPI.data.find((item) => item.type === 'sauce');
      const ingredientMain = ingredientsAPI.data.find((item) => item.type === 'main');
      cy.intercept('GET', 'https://norma.nomoreparties.space/auth/user', 'user.json')

      cy.get('[data-cy-create-order]').should('be.disabled')
      const dataTransfer = new DataTransfer();
      const container = cy.get('[data-cy-constructor]');
      cy.get(`[data-cy-ingredient="${ingredientBun._id}"]`).trigger('dragstart', {
        dataTransfer
      });

      cy.get('[data-cy-constructor]').trigger('drop', {
        dataTransfer
      })

      cy.get(`[data-cy-ingredient="${ingredientSauce._id}"]`).trigger('dragstart', {
        dataTransfer
      });

      cy.get('[data-cy-constructor]').trigger('drop', {
        dataTransfer
      })

      cy.get(`[data-cy-ingredient="${ingredientMain._id}"]`).trigger('dragstart', {
        dataTransfer
      });

      cy.get('[data-cy-constructor]').trigger('drop', {
        dataTransfer
      })

      cy.get('[data-cy-create-order]').should('not.be.disabled')
      cy.get('[data-cy-create-order]').click();
      cy.wait('@createOrder')
      cy.fixture('order.json').then((order) => {
        cy.get('[data-cy-order-info]').contains(order.order.number);
        cy.get('[data-cy-close-modal]').click()
        cy.get('[data-cy-order-info]').should('not.exist')
      })

    })
  });
});

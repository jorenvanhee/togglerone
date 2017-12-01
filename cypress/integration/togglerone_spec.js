describe('Togglerone', function () {
  context('when closed', function () {
    it('opens when clicking on the toggler', function () {
      // Arrange
      cy.visit('index.html')

      // Act
      cy.get('.js-btn2')
        .click()
      
      // Assert
      cy.get('.js-el2')
        .should('have.class', 'is-open')
      cy.get('.js-btn2')
        .should('have.class', 'is-active')
    })
  })

  context('when open', function () {
    beforeEach(function () {
      // Arrange
      cy.visit('index.html')

      cy.get('.js-btn').as('toggler')
      cy.get('.js-el').as('element')
    })

    it('closes when clicking on the toggler', function () {
      // Act
      cy.get('@toggler')
        .click()
      
      // Assert
      cy.get('@element')
        .should('not.have.class', 'is-open')
      cy.get('@toggler')
        .should('not.have.class', 'is-active')
    })

    it('closes when clicking on the document', function () {
      // Act
      cy.get('.js-nextTo')
        .click()
      
      // Assert
      cy.get('@element')
        .should('not.have.class', 'is-open')
      cy.get('@toggler')
        .should('not.have.class', 'is-active')
    })

    it('does not close when clicking on the element', function () {
      // Act
      cy.get('@element')
        .click()
      
      // Assert
      cy.get('@element')
        .should('have.class', 'is-open')
      cy.get('@toggler')
        .should('have.class', 'is-active')
    })

    it('closes when clicking on the other instance\'s toggler', function () {
      // Act
      cy.get('.js-btn2')
        .click()

      // Assert
      cy.get('.js-el')
        .should('not.have.class', 'is-open')
      cy.get('.js-btn')
        .should('not.have.class', 'is-active')
    })
  })

  context('when nested', function () {
    it('does not close the parent instance when clicking on the toggler', function () {
      // Arrange
      cy.visit('nested.html')

      // Act
      cy.get('.js-btn-nested')
        .click()

      // Assert
      cy.get('.js-el')
        .should('have.class', 'is-open')
      cy.get('.js-btn')
        .should('have.class', 'is-active')
    })
  })

  describe('when used via api', function () {
    it('can close an open instance', function () {
      // Arrange
      cy.visit('index.html')

      // Act
      cy.window({log: false}).then(function (win) {
        win.instance.close();
        cy.log('called instance.close()')
      })

      // Assert
      cy.get('.js-el')
        .should('not.have.class', 'is-open')
      cy.get('.js-btn')
        .should('not.have.class', 'is-active')
    })

    it('can close an already closed instance', function () {
      // Arrange
      cy.visit('index.html')

      // Act
      cy.window({log: false}).then(function (win) {
        win.instance2.close();
        cy.log('called instance.close()')
      })

      // Assert
      cy.get('.js-el2')
        .should('not.have.class', 'is-open')
      cy.get('.js-btn2')
        .should('not.have.class', 'is-active')
    })

    it('can close all instances', function () {
      // Arrange
      cy.visit('index.html')

      cy.window({log: false}).then(function (win) {
        cy.spy(win.instance, 'close')
        cy.spy(win.instance2, 'close')

        // Act
        win.Togglerone.closeAllInstances();
        cy.log('called Togglerone.closeAllInstances()')

        // Assert
        expect(win.instance.close).to.be.called
        expect(win.instance2.close).to.be.called
      })
    })

    it('can destroy an instance', function () {
      // Arrange
      cy.visit('index.html')

      // Act
      cy.window({log: false}).then(function (win) {
        win.instance.destroy();
        cy.log('called instance.destroy()')
      })

      cy.log('Try toggling it in different ways.')
      cy.get('.js-btn')
        .click()
      cy.get('.js-nextTo')
        .click()
      cy.get('.js-btn2')
        .click()

      // Assert
      cy.get('.js-btn')
        .should('have.class', 'is-active')
      cy.get('.js-el')
        .should('have.class', 'is-open')
      cy.window({log: false}).then(function (win) {
        cy.expect(win.Togglerone.instances.indexOf(win.instance))
          .equal(-1)
      })
    })

    it('can destroy all instances', function () {
      // Arrange
      cy.visit('index.html')

      cy.window({log: false}).then(function (win) {
        cy.spy(win.instance, 'destroy')
        cy.spy(win.instance2, 'destroy')

        // Act
        win.Togglerone.destroyAllInstances();
        cy.log('called Togglerone.destroyAllInstances()')

        // Assert
        expect(win.instance.destroy).to.be.called
        expect(win.instance2.destroy).to.be.called
      })
    })
  })
})

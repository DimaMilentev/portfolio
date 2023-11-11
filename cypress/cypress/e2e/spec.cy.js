describe("Search for vegetables and add to cart", () => {
  it("Search for cucumber vegetables", () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');

    cy.get('#root div.search > form > input').type("cucumber");
    cy.get('#root div.products-wrapper > div > div').should('have.length', 1);
    cy.get('#root div.products-wrapper > div > div > h4').contains('Cucumber - 1 Kg');

    cy.get('.quantity').clear();
    cy.get('.quantity').type('5');

    let price;
    let finalCost;

    cy.get('.products > .product > .product-price').invoke('text').then((basicPrice) => {
        price = parseFloat(basicPrice.replace('₹', '')); 
        finalCost = price * 5;
        cy.log('Initial Price:', price);
        cy.log('Final Price:', finalCost);
      });

    cy.get('.product-action > button').click();
    cy.get('.added').should('be.visible');

    cy.get(':nth-child(2) > :nth-child(3) > strong').invoke('text').then((finalPrice) => {
        cy.log('Displayed Total:', finalPrice);
        expect(parseFloat(finalPrice.replace('₹', ''))).to.equal(finalCost);
      });

    cy.get(':nth-child(1) > :nth-child(3) > strong').invoke('text').then((countItem) => {
    cy.log('Items:', countItem);
    expect(countItem.trim()).to.equal('1');
  });   
  });
});


describe('All cars', () => {
    it('Visits the all cars', () => {
        cy.visit('https://gotowedoodbioru.audi.pl/');

        cy.get("a.consent-give").eq(0).click();
        cy.get("img[src='./assets/img/minCars/Q5_291x125.png']").click({multiple: true});
        cy.contains('Sprawdź wyposażenie').eq(0).click()

    })
})

// https://www.audi.pl/pl/web/pl/wyszukiwarka-samochodow-nowych/details.sc_detail.UE9MMDEyMjAyMDIyMTAxNDI0=.html
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

const autos = [
    'https://www.audi.pl/pl/web/pl/wyszukiwarka-samochodow-nowych/details.sc_detail.UE9MMDA3MTAyMDIyMTAxNDA2=.html',
    'https://www.audi.pl/pl/web/pl/wyszukiwarka-samochodow-nowych/details.sc_detail.UE9MMDA3MTAyMDIyMTAxNDA5=.html'
];

describe('car', () => {
    it('Visits one car',  () => {
        const autoData = {};
        cy.visit('https://www.audi.pl/pl/web/pl/wyszukiwarka-samochodow-nowych/details.sc_detail.UE9MMDEyMjAyMDIyMTAxNDI0=.html');

        // cookie
        const cookies = [
            {name:'AUDI_ENSIGHTEN_PRIVACY_Do_Not_Track', value: 1},
            {name:'AUDI_ENSIGHTEN_PRIVACY_Functional', value: 0},
            {name:'AUDI_ENSIGHTEN_PRIVACY_MODAL_VIEWED', value: 1},
            {name:'AUDI_ENSIGHTEN_PRIVACY_Marketing', value: 0},
            {name:'AUDI_ENSIGHTEN_PRIVACY_Performance', value: 0},
            {name:'AUDI_ENSIGHTEN_PRIVACY_Social', value: 0},
            {name:'AUDI_ENSIGHTEN_PRIVACY_MODAL_LOADED', value: 1}
        ];
        cookies.forEach((obj) => {
            cy.setCookie(obj.name, String(obj.value), {
                domain: '.audi.pl',
                path: '/'
            })
        })


        cy.get("button#ensCancel").click({multiple: true, force: true});
        cy.get(".sc-detail-oe-showmore").click({force:true, multiple: true});
        cy.get(".sc-detail-se-showmore").click({force:true, multiple: true});
        // cy.get("img[src='./assets/img/minCars/Q5_291x125.png']").click({multiple: true});
        // cy.contains('Sprawdź wyposażenie').eq(0).click()


        // DODATK
        const elDodatk = []

        cy.get('.sc-detail-oe-label').each(el => {
            // el.text();
            elDodatk.push(el.text())
        }).then(() => {
            // eslint-disable-next-line no-console
            console.log(">>> elDodatk", elDodatk);
            autoData['elDodatk'] = elDodatk;
        })


        // STAND
        const elStand = []

        cy.get('.sc-detail-se-label').each(el => {
            // el.text();
            elStand.push(el.text())
        }).then(() => {
            // eslint-disable-next-line no-console
            console.log(">>> elStand", elStand);
            autoData['elStand'] = elStand;
        })


        // model

        // data-testid="modelCodeDescription"

        cy.get('[data-testid="modelCodeDescription"]').then(el => {
            // el.text();
            const model = el.text();
            // eslint-disable-next-line no-console
            console.log(">>> model", model);
            autoData['model'] = model;

            // eslint-disable-next-line no-console
            console.log(">>> autoData", autoData);
        })


        // detail highlight
        // $('.sc-detail-highlight-label span')
        const highlight = {};
        cy.get('.sc-detail-highlight').each(el => {
            // el.get('span')
            debugger;
        })
    })
})




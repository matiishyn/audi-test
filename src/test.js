Array.from($('.car')).map(el => {


    return {
        engine: el.querySelector('.engine-text').innerText,
        priceOld: parseInt(el.querySelectorAll('.priceColumn')[0].querySelectorAll('p')[1].innerHTML.replaceAll('&nbsp;','')),
        priceNew: parseInt(el.querySelectorAll('.priceColumn')[1].querySelectorAll('p')[1].innerHTML.replaceAll('&nbsp;','')),
        url: el.querySelector('.button-direct a').href,
        id: el.querySelector('.button-direct a').href.substring(79,104)

    }
})

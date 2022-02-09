const Nightmare = require('nightmare');	
let nightmare = Nightmare({ show: true });

nightmare.goto('https://omekb.bitrix24.ru')
    .wait('#login')
    .type('#login', 'bot@justural.ru')
    .wait(1000)
    .click('#authorize-layout > div > div:nth-child(3) > div > form > div > div.b24-network-auth-form-btn-block > button.ui-btn.ui-btn-md.ui-btn-success.ui-btn-round.b24-network-auth-form-btn')
    .wait('#password')
    .type('#password', 'justural2019')
    .wait(1000)
    .click('#authorize-layout > div > div:nth-child(3) > div > form > div > div.b24-network-auth-form-btn-block > button.ui-btn.ui-btn-md.ui-btn-success.ui-btn-round.b24-network-auth-form-btn')
    .wait('#bx_left_menu_menu_crm_favorite > a > span.menu-item-link-text')
    .click('#bx_left_menu_menu_crm_favorite > a > span.menu-item-link-text')
    .wait(1000)
    .evaluate( () => {
        let res = []
        let data = document.querySelectorAll("#CRM_LEAD_LIST_V12_table > tbody > tr:nth-child(n) > td:nth-child(3) > span")
        for(let i = 0, len = data.length; i < len; i++)
            res.push(data[i].innerText)
        return res
    })
    .end()
    .then(text => {
        console.log(text)
    })
    .catch(error => {
        console.error('Search failed:', error)
    })
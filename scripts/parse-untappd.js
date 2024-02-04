// https://untappd.com/user/potykion


[...document.querySelectorAll('.item > div.checkin')].map(item => {
    let img = item.querySelector('div.top > a > img')?.src;
    let checkinLink = item.querySelector('div.checkin > div.feedback > div.bottom > a:nth-child(2)').href
    return [img, checkinLink]
}).filter(([img, link]) => img && link)


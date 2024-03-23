// https://vkusvill.ru/goods/alkogol/?PAGEN_1=6

const alco = [
    ...document.querySelectorAll('[itemtype="http://schema.org/Product"]')
].map(
    item => ({
        // 'https://vkusvill.ru/goods/vino-monastrel-contrasena-b-a-krasnoe-sukhoe-750-ml-85067.html'
        url: item.querySelector('.ProductCard__link').href,
        // 'Вино «Monastrel Contrasena» б/а красное сухое, 750 мл'
        title: item.querySelector('.ProductCard__link').title,
        // '169.00'
        price: item.querySelector('[itemprop="price"]').content,
    })
)
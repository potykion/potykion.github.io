// https://bookmate.ru/books/FkblLAMF

let imageUrl = document.querySelector('.progressive-image.progressive-image_entered').src
imageUrl = new URL(imageUrl);
imageUrl.searchParams.delete('image_hash');
imageUrl = imageUrl.toString();

const book = {
    author: document.querySelector('.authors-list__author').innerText,
    title: document.querySelector('.heading.heading_1.heading_kazimir.content-header-info__name').innerText,
    url: window.location.href,
    img: imageUrl
}
console.log(book)



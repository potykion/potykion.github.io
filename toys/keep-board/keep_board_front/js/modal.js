export function setupModal(modalSelector) {
    const closeModal = () => document.querySelector(modalSelector).classList.remove('is-active');
    const openModal = () => document.querySelector(modalSelector).classList.add('is-active');

    document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button')
        .forEach(($close) => $close.addEventListener('click', () => closeModal()));
    document.addEventListener('keydown', (event) => {
        if ((event || window.event).keyCode === 27) closeModal();
    });

    return [openModal, closeModal]
}
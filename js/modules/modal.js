'use strict';

function closeModal(selectorModal) {
    let modalWindow = document.querySelector(selectorModal);
    modalWindow.classList.remove('tabBlock');
    document.body.style.overflow = '';
}

function openModal(selectorModal, modalTimerId) {
    let modalWindow = document.querySelector(selectorModal);
    modalWindow.classList.add('tabBlock');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) clearInterval(modalTimerId);
}

function modal(modals, selectorModal, modalTimerId) {
    let openModalWindow = document.querySelectorAll(modals),
        modalWindow = document.querySelector(selectorModal);

    openModalWindow.forEach(item => {
        item.addEventListener('click', () => openModal(selectorModal, modalTimerId));
    });

    modalWindow.addEventListener('click', (event) => {
        if (event.target == modalWindow || event.target.getAttribute('data-modal_close') == '') {
            closeModal(selectorModal);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape' && modalWindow.classList.contains('tabBlock')) {
            closeModal(selectorModal);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(selectorModal, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };
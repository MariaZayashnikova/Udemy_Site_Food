'use strict';

function closeModal (modalWindow) {
    modalWindow.classList.remove('tabBlock');
    document.body.style.overflow = '';
}

function openModal (modalWindow, modalTimerId) {
    modalWindow.classList.add('tabBlock');
    document.body.style.overflow = 'hidden';

    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal (modals, selectorModal, modalTimerId) {

    let openModalWindow = document.querySelectorAll(modals),
    modalWindow = document.querySelector(selectorModal);

    openModalWindow.forEach( item => {
        item.addEventListener('click', () => openModal(modalWindow, modalTimerId));
    });


    modalWindow.addEventListener('click', (event) => {
        if(event.target == modalWindow || event.target.getAttribute('data-modal_close') == '') {
            closeModal(modalWindow);
        }
    });

    document.addEventListener('keydown', (event) =>{
        if (event.code == 'Escape' && modalWindow.classList.contains('tabBlock')) {
            closeModal(modalWindow);
        }
    });

    function showModalByScroll () {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal(modalWindow, modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};
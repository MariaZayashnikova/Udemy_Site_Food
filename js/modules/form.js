import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

function form(selectorForms, modalTimerId) {
    let forms = document.querySelectorAll(selectorForms);
    let messages = {
        loading: 'img/modal/original.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => binPostData(item));

    function binPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let messageStatus = document.createElement('img');
            messageStatus.src = messages.loading;
            messageStatus.classList.add('image-loading');
            form.insertAdjacentElement('afterend', messageStatus);

            let formData = new FormData(form);
            let json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then((data) => showMessage(messages.success))
                .catch(() => showMessage(messages.failure))
                .finally(() => {
                    form.reset();
                    messageStatus.remove();
                });
        });
    }

    function showMessage(message) {
        let prevModal = document.querySelector('.modal__content');

        prevModal.classList.add('tabDisabled');
        openModal('.modal', modalTimerId);

        let messageText = document.createElement('div');
        messageText.classList.add('modal__content');
        messageText.innerHTML = `
        <div data-modal_close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
        `;

        document.querySelector('.modal__dialog').append(messageText);

        setTimeout(() => {
            messageText.remove();
            prevModal.classList.remove('tabDisabled');
            closeModal('.modal');
        }, 4000);
    }
}

export default form;
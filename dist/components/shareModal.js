import createModal from './modal.js';
import createButtonElement from './button.js';
import createElement from '../utils/createElement.js';
const createShareModal = (boardHash) => {
    const containerElement = document.querySelector('.container');
    const header = 'Copy Link';
    const modalElement = createModal(header);
    const modalBodyElement = modalElement.querySelector('.modal__body');
    const modalButtonsElement = document.createElement('div');
    modalButtonsElement.classList.add('modal__buttons');
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = window.location.href;
    modalBodyElement.appendChild(inputElement);
    const messageElement = createElement('p', 'modal__text', 'Copied!');
    messageElement.style.color = 'var(--color-white)';
    const copyButton = createButtonElement('Copy', () => {
        inputElement.select();
        document.execCommand('copy');
        messageElement.style.color = 'var(--color-dark)';
        setTimeout(() => {
            messageElement.style.color = 'var(--color-white)';
        }, 2000);
    });
    modalBodyElement.appendChild(inputElement);
    modalBodyElement.appendChild(copyButton);
    modalBodyElement.appendChild(messageElement);
    return modalElement;
};
export default createShareModal;

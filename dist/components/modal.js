import createButtonElement from './button.js';
import removeElement from '../utils/removeElement.js';
import createElement from '../utils/createElement.js';
const createModal = (header, text) => {
    const modalElement = createElement('div', 'modal', ...[,], (event) => {
        if (!event.target.closest('.modal__body')) {
            modalElement.remove();
        }
    });
    const modalBodyElement = document.createElement('div');
    modalBodyElement.classList.add('modal__body');
    const modalExitButton = createButtonElement('X', () => {
        removeElement('.modal');
    });
    modalExitButton.classList.add('modal__button--exit');
    modalExitButton.classList.add('modal__button');
    modalExitButton.textContent = 'X';
    modalBodyElement.appendChild(modalExitButton);
    const modalHeaderElement = document.createElement('h1');
    modalHeaderElement.classList.add('modal__header');
    modalHeaderElement.textContent = header;
    modalBodyElement.appendChild(modalHeaderElement);
    if (text) {
        const modalTextElement = document.createElement('p');
        modalTextElement.classList.add('modal__text');
        modalTextElement.innerHTML = text;
        modalBodyElement.appendChild(modalTextElement);
    }
    modalElement.appendChild(modalBodyElement);
    return modalElement;
};
export default createModal;

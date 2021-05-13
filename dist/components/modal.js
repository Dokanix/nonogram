import createButtonElement from './button.js';
import removeElement from '../utils/removeElement.js';
const createModal = (header, text) => {
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal');
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

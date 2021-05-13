import createModal from './modal.js';
import createButtonElement from './button.js';
import renderRandomLevel from '../renderers/randomLevel.js';
import renderMenu from '../renderers/menu.js';
const createWinModal = (timeElapsed) => {
    const containerElement = document.querySelector('.container');
    const header = 'Congratulations! 🎉';
    const text = `You have completed the level in <span class='modal__time'>${timeElapsed}</span> seconds.`;
    const modalElement = createModal(header, text);
    const modalBodyElement = modalElement.querySelector('.modal__body');
    const modalButtonsElement = document.createElement('div');
    modalButtonsElement.classList.add('modal__buttons');
    const modalSecondaryButton = createButtonElement('Reset', () => {
        renderRandomLevel(containerElement);
    });
    modalSecondaryButton.classList.add('modal__button');
    modalSecondaryButton.classList.add('modal__button--secondary');
    modalButtonsElement.appendChild(modalSecondaryButton);
    const modalPrimaryButton = createButtonElement('Back to Menu', renderMenu.bind(null, containerElement));
    modalPrimaryButton.classList.add('modal__button');
    modalPrimaryButton.classList.add('modal__button--primary');
    modalButtonsElement.appendChild(modalPrimaryButton);
    modalBodyElement.appendChild(modalButtonsElement);
    modalElement.appendChild(modalBodyElement);
    return modalElement;
};
export default createWinModal;

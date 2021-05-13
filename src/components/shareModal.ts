import createModal from './modal.js';
import createButtonElement from './button.js';
import renderRandomLevel from '../renderers/randomLevel.js';
import renderMenu from '../renderers/menu.js';
import createElement from '../utils/createElement.js';

const createShareModal = (boardHash: string): HTMLDivElement => {
  const containerElement = document.querySelector('.container') as HTMLElement;

  const header = 'Copy Link';

  const modalElement = createModal(header);
  const modalBodyElement = modalElement.querySelector(
    '.modal__body'
  ) as HTMLDivElement;

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

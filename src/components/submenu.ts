import renderMenu from '../renderers/menu.js';
import createElement from '../utils/createElement.js';
import createButtonElement from './button.js';
import createSaveButton from './saveButton.js';
import createShareModal from './shareModal.js';

const createSubmenu = (boardHash: string) => {
  const containerElement = document.querySelector('.container') as HTMLElement;

  const container = createElement('div', 'submenu');

  container.appendChild(
    createButtonElement('Menu', () => {
      renderMenu(containerElement);
    })
  );

  container.appendChild(
    createButtonElement('Share', () => {
      containerElement.appendChild(createShareModal(boardHash));
    })
  );

  container.appendChild(createSaveButton(boardHash));

  return container;
};

export default createSubmenu;

import createMenuButtonElement from './menuButton.js';
import renderRandomLevel from '../renderers/randomLevel.js';
import createPlayModal from './playModal.js';

const createMenuElement = (): HTMLDivElement => {
  const containerElement = document.querySelector('.container') as HTMLElement;

  const menuElement = document.createElement('div');
  menuElement.classList.add('menu');

  menuElement.appendChild(
    createMenuButtonElement('Random', () => {
      renderRandomLevel(containerElement);
    })
  );
  menuElement.appendChild(
    createMenuButtonElement('Custom', () => {
      menuElement.after(createPlayModal());
    })
  );
  menuElement.appendChild(createMenuButtonElement('Levels'));
  menuElement.appendChild(createMenuButtonElement('Editor'));

  return menuElement;
};

export default createMenuElement;

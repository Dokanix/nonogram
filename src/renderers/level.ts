import Nonogram from '../nonogram.js';
import renderMenu from './menu.js';
import createBackButtonElement from '../components/backButton.js';
import createGameElement from '../components/game.js';
import createSubmenu from '../components/submenu.js';

const renderLevel = (containerElement: HTMLElement, nono: Nonogram): void => {
  containerElement.innerHTML = '';
  containerElement.appendChild(createGameElement(nono));

  const submenu = createSubmenu(nono.encode());

  containerElement.appendChild(submenu);

  window.history.pushState(
    {},
    'Nonogram',
    `${window.location.pathname}?${nono.encode()}`
  );
};

export default renderLevel;

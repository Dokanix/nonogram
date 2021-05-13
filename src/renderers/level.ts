import Nonogram from '../nonogram.js';
import renderMenu from './menu.js';
import createBackButtonElement from '../components/backButton.js';
import createGameElement from '../components/game.js';

const renderLevel = (containerElement: HTMLElement, nono: Nonogram): void => {
  containerElement.innerHTML = '';
  containerElement.appendChild(
    createBackButtonElement(renderMenu.bind(null, containerElement))
  );
  containerElement.appendChild(createGameElement(nono));
};

export default renderLevel;

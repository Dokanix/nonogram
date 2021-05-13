import Nonogram from '../nonogram.js';
import createBackButtonElement from '../components/backButton.js';
import createGameElement from '../components/game.js';
import renderMenu from './menu.js';

const renderRandomLevel = (
  containerElement: HTMLElement,
  width?: number,
  height?: number
): void => {
  width = width ?? Math.floor(Math.random() * 8) + 2;
  height = height ?? Math.floor(Math.random() * 8) + 2;

  const nono = Nonogram.random(width, height);

  containerElement.innerHTML = '';
  containerElement.appendChild(
    createBackButtonElement(renderMenu.bind(null, containerElement))
  );
  containerElement.appendChild(createGameElement(nono));

  window.history.pushState(
    {},
    'Nonogram',
    `${window.location.pathname}?${nono.encode()}`
  );
};

export default renderRandomLevel;

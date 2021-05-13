import Nonogram from '../nonogram.js';
import renderMenu from './menu.js';
import saveLevel from '../utils/saveLevel.js';
import createButtonElement from '../components/button.js';
import createBackButtonElement from '../components/backButton.js';
import createGameElement from '../components/game.js';

const renderLevel = (containerElement: HTMLElement, nono: Nonogram): void => {
  containerElement.innerHTML = '';
  containerElement.appendChild(
    createBackButtonElement(renderMenu.bind(null, containerElement))
  );
  containerElement.appendChild(createGameElement(nono));
  const saveButton = createButtonElement('Save', () => {
    saveLevel(nono);
  });
  containerElement.appendChild(saveButton);

  window.history.pushState(
    {},
    'Nonogram',
    `${window.location.pathname}?${nono.encode()}`
  );
};

export default renderLevel;

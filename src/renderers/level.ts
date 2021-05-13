import Nonogram from '../nonogram.js';

const renderLevel = (containerElement: HTMLElement, nono: Nonogram): void => {
  containerElement.innerHTML = '';
  containerElement.appendChild(createBackButtonElement(renderMenu));
  containerElement.appendChild(createGameElement(nono));
};

export default renderLevel;

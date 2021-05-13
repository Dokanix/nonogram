import renderMenu from './menu.js';
import createBackButtonElement from '../components/backButton.js';
import createGameElement from '../components/game.js';
const renderLevel = (containerElement, nono) => {
    containerElement.innerHTML = '';
    containerElement.appendChild(createBackButtonElement(renderMenu.bind(null, containerElement)));
    containerElement.appendChild(createGameElement(nono));
};
export default renderLevel;

import Nonogram from '../nonogram.js';
import renderLevel from '../renderers/level.js';
import createElement from '../utils/createElement.js';
import deleteLevel from '../utils/deleteLevel.js';
import createButtonElement from './button.js';
const createLevelElement = (dimensions, bestTime, boardHash) => {
    const containerElement = document.querySelector('.container');
    const levelElement = createElement('div', 'level', ...[,], renderLevel.bind(null, containerElement, Nonogram.decode(boardHash)));
    levelElement.appendChild(createElement('div', 'level__dimensions', `${dimensions[0]} x ${dimensions[1]}`));
    levelElement.appendChild(createElement('div', 'level__bestTime', `${bestTime.toString()}s`));
    levelElement.appendChild(createButtonElement('DELETE', () => {
        deleteLevel(boardHash);
        levelElement.remove();
    }));
    return levelElement;
};
export default createLevelElement;

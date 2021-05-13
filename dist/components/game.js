import createHelperElement from './helper.js';
import createBoardElement from '../components/board.js';
const createGameElement = (nono) => {
    const gameElement = document.createElement('div');
    gameElement.classList.add('game');
    gameElement.appendChild(createHelperElement(nono, 'column'));
    gameElement.appendChild(createHelperElement(nono, 'row'));
    gameElement.appendChild(createBoardElement(nono));
    return gameElement;
};
export default createGameElement;

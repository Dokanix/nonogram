import Nonogram from '../nonogram.js';
import createModal from './modal.js';
import createButtonElement from './button.js';
import renderLevel from '../renderers/level.js';
const createLevelsModal = () => {
    const containerElement = document.querySelector('.container');
    const modalElement = createModal('Saved Levels');
    const modalBodyElement = modalElement.querySelector('.modal__body');
    const levelsString = localStorage.getItem('levels');
    if (levelsString) {
        const levels = JSON.parse(levelsString);
        console.log(levels);
        for (const level of levels) {
            const height = level.length;
            const width = level[0].length;
            const thumbnail = createButtonElement(`${height} x ${width}`, () => {
                const nono = new Nonogram(level);
                renderLevel(containerElement, nono);
            });
            modalBodyElement.appendChild(thumbnail);
        }
    }
    return modalElement;
};
export default createLevelsModal;

import Nonogram from '../nonogram.js';
import createModal from './modal.js';
import createBoardSelector from './boardSelector.js';
import createButtonElement from './button.js';
import renderRandomLevel from '../renderers/randomLevel.js';
const createPlayModal = () => {
    const containerElement = document.querySelector('.container');
    const dimensions = {
        width: 3,
        height: 3,
    };
    const modalElement = createModal('Choose Board Size');
    const modalBodyElement = modalElement.querySelector('.modal__body');
    const boardSelectorElement = document.createElement('div');
    boardSelectorElement.classList.add('boardSelector');
    let boardElement = createBoardSelector(dimensions);
    boardSelectorElement.appendChild(boardElement);
    const heightAdder = document.createElement('div');
    heightAdder.classList.add('boardSelector__adder');
    const heightAdderButton = createButtonElement('+', () => {
        dimensions.height = Math.min(dimensions.height + 1, Nonogram.maxSize);
        dimensions.width = Math.min(dimensions.width + 1, Nonogram.maxSize);
        const newBoardElement = createBoardSelector(dimensions);
        boardSelectorElement.replaceChild(newBoardElement, boardElement);
        boardElement = newBoardElement;
    });
    heightAdderButton.classList.add('boardSelector__button');
    const heightRemoverButton = createButtonElement('-', () => {
        dimensions.height = Math.max(dimensions.height - 1, Nonogram.minSize);
        dimensions.width = Math.max(dimensions.width - 1, Nonogram.minSize);
        const newBoardElement = createBoardSelector(dimensions);
        boardSelectorElement.replaceChild(newBoardElement, boardElement);
        boardElement = newBoardElement;
    });
    heightRemoverButton.classList.add('boardSelector__button');
    heightAdder.appendChild(heightRemoverButton);
    heightAdder.appendChild(heightAdderButton);
    boardSelectorElement.appendChild(heightAdder);
    modalBodyElement.appendChild(boardSelectorElement);
    const modalButtonsElement = document.createElement('div');
    modalButtonsElement.classList.add('modal__buttons');
    const modalPrimaryButton = createButtonElement('Play', () => {
        const width = Number(dimensions.width);
        const height = Number(dimensions.height);
        renderRandomLevel(containerElement, width, height);
    });
    modalPrimaryButton.classList.add('modal__button');
    modalPrimaryButton.classList.add('modal__button--primary');
    modalButtonsElement.appendChild(modalPrimaryButton);
    modalBodyElement.appendChild(modalButtonsElement);
    return modalElement;
};
export default createPlayModal;

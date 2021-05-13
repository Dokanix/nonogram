import renderMenu from '../renderers/menu.js';
import createElement from '../utils/createElement.js';
import createButtonElement from './button.js';
import createSaveButton from './saveButton.js';
const createSubmenu = (boardHash) => {
    const containerElement = document.querySelector('.container');
    const container = createElement('div', 'submenu');
    container.appendChild(createButtonElement('Menu', () => {
        renderMenu(containerElement);
    }));
    container.appendChild(createButtonElement('Share', () => {
        console.log('Sharing!');
    }));
    container.appendChild(createSaveButton(boardHash));
    return container;
};
export default createSubmenu;

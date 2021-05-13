import createButtonElement from './button.js';
const createMenuButtonElement = (text, callback) => {
    const button = createButtonElement(text, callback);
    button.classList.add('menu__button');
    return button;
};
export default createMenuButtonElement;

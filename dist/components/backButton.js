import createButtonElement from '../components/button.js';
const createBackButtonElement = (callback) => {
    const button = createButtonElement('Menu', callback);
    button.classList.add('back');
    return button;
};
export default createBackButtonElement;

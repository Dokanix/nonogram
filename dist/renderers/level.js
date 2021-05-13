import createGameElement from '../components/game.js';
import createSubmenu from '../components/submenu.js';
const renderLevel = (containerElement, nono) => {
    containerElement.innerHTML = '';
    containerElement.appendChild(createGameElement(nono));
    const submenu = createSubmenu(nono.encode());
    containerElement.appendChild(submenu);
    window.history.pushState({}, 'Nonogram', `${window.location.pathname}?${nono.encode()}`);
};
export default renderLevel;

import Nonogram from './nonogram.js';
import renderMenu from './renderers/menu.js';
import renderLevel from './renderers/level.js';
const containerElement = document.querySelector('.container');
if (window.location.search) {
    const levelHash = window.location.search.slice(1);
    const nono = Nonogram.decode(levelHash);
    renderLevel(containerElement, nono);
}
else {
    renderMenu(containerElement);
}

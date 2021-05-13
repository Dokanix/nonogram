import Nonogram from '../nonogram.js';
import renderLevel from './level.js';
const renderRandomLevel = (containerElement, width, height) => {
    width = width !== null && width !== void 0 ? width : Math.floor(Math.random() * 8) + 2;
    height = height !== null && height !== void 0 ? height : Math.floor(Math.random() * 8) + 2;
    const nono = Nonogram.random(width, height);
    renderLevel(containerElement, nono);
};
export default renderRandomLevel;

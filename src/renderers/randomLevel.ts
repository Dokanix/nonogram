import Nonogram from '../nonogram.js';
import renderLevel from './level.js';

const renderRandomLevel = (
  containerElement: HTMLElement,
  width?: number,
  height?: number
): void => {
  width = width ?? Math.floor(Math.random() * 8) + 2;
  height = height ?? Math.floor(Math.random() * 8) + 2;

  const nono = Nonogram.random(width, height);

  renderLevel(containerElement, nono);
};

export default renderRandomLevel;

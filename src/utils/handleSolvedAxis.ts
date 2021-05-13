import Axis from '../types/axis';
import player from '../AudioPlayer.js';

const handleSolvedAxis = (row: number, axis: Axis) => {
  player.play('axis');

  const rowElements = document.querySelectorAll(`[data-${axis}="${row}"`);

  rowElements.forEach((elem) => {
    elem.classList.add('solved');
    if (!elem.classList.contains('checked')) {
      elem.classList.add('unknown');
    }
  });
};

export default handleSolvedAxis;

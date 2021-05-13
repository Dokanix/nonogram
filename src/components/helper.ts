import Nonogram from '../nonogram.js';
import Axis from '../types/axis.js';

const createHelperElement = (nono: Nonogram, axis: Axis): HTMLDivElement => {
  const helpersElement = document.createElement('div');
  helpersElement.classList.add(`${axis}Helpers`);

  const width = nono.helpers[axis].length;

  for (let i = 0; i < width; i++) {
    const helperElement = document.createElement('div');
    helperElement.classList.add(`${axis}Helper`);

    const helper =
      axis === 'column' ? nono.helpers.column[i] : nono.helpers.row[i];

    for (let j = 0; j < helper.length; j++) {
      const numberElement = document.createElement('div');
      numberElement.classList.add('number');
      numberElement.textContent = String(helper[j]);

      helperElement.appendChild(numberElement);
    }

    helpersElement.appendChild(helperElement);
  }

  return helpersElement;
};

export default createHelperElement;

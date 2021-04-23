import Nonogram from './nonogram.js';

const randomLevelButton = document.querySelector(
  '#random'
) as HTMLButtonElement;

const bodyElement = document.querySelector('body')!;

const renderLevel = () => {
  const randomWidth = Math.floor(Math.random() * 8) + 2;
  const randomHeight = Math.floor(Math.random() * 8) + 2;

  const nono = Nonogram.random(randomWidth, randomHeight);
  console.log(nono.helpers.columnHelpers);
  console.log(nono.helpers.rowHelpers);
  nono.printBoard();
  console.log(nono.size);

  const gameElement = document.createElement('div');
  gameElement.classList.add('game');

  const columnHelpersElement = document.createElement('div');
  columnHelpersElement.classList.add('columnHelpers');

  for (let i = 0; i < randomWidth; i++) {
    const columnHelperElement = document.createElement('div');
    columnHelperElement.classList.add('columnHelper');

    const columnHelper = nono.helpers.columnHelpers[i];

    for (let j = 0; j < columnHelper.length; j++) {
      const numberElement = document.createElement('div');
      numberElement.classList.add('number');
      numberElement.textContent = String(columnHelper[j]);

      columnHelperElement.appendChild(numberElement);
    }

    columnHelpersElement.appendChild(columnHelperElement);
  }

  gameElement.appendChild(columnHelpersElement);

  const rowHelpersElement = document.createElement('div');
  rowHelpersElement.classList.add('rowHelpers');

  for (let i = 0; i < randomHeight; i++) {
    const rowHelperElement = document.createElement('div');
    rowHelperElement.classList.add('rowHelper');

    const rowHelper = nono.helpers.rowHelpers[i];

    for (let j = 0; j < rowHelper.length; j++) {
      const numberElement = document.createElement('div');
      numberElement.classList.add('number');
      numberElement.textContent = String(rowHelper[j]);

      rowHelperElement.appendChild(numberElement);
    }

    rowHelpersElement.appendChild(rowHelperElement);
  }

  gameElement.appendChild(rowHelpersElement);

  const boardElement = document.createElement('div');
  boardElement.classList.add('board');

  boardElement.style.gridTemplateColumns = `repeat(${randomWidth}, 1fr)`;

  for (let i = 0; i < randomHeight; i++) {
    for (let j = 0; j < randomWidth; j++) {
      const cellElement = document.createElement('div');

      cellElement.classList.add('cell');
      cellElement.dataset.column = String(j);
      cellElement.dataset.row = String(i);

      boardElement.appendChild(cellElement);
    }
  }

  gameElement.appendChild(boardElement);

  boardElement.addEventListener('click', (e) => {
    const element = e.target as HTMLElement;
    const column = Number(element.dataset.column);
    const row = Number(element.dataset.row);

    if (element.classList.contains('cell')) {
      element.classList.remove('unknown');
      element.classList.toggle('checked');

      nono.check(column, row);
    }

    nono.printBoard();
    if (nono.solved) {
      console.log('Congratulations!');
    }
  });

  boardElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    const element = e.target as HTMLElement;
    const column = Number(element.dataset.column);
    const row = Number(element.dataset.row);

    if (element.classList.contains('cell')) {
      element.classList.remove('checked');
      element.classList.toggle('unknown');

      nono.uncheck(column, row);
    }

    nono.printBoard();
  });

  bodyElement.innerHTML = '';
  bodyElement.appendChild(gameElement);
};

randomLevelButton.addEventListener('click', renderLevel);

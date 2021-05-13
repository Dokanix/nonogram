import Nonogram from '../nonogram.js';
import handleSolvedAxis from '../utils/handleSolvedAxis.js';
import player from '../AudioPlayer.js';
import getElementPosition from '../utils/getElementPosition.js';
import Action from '../types/actions.js';
import createCellElement from './cell.js';
import createWinModal from './winModal.js';

let mouseDown = false;

document.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    mouseDown = true;
  }
});

document.addEventListener('mouseup', (e) => {
  if (e.button === 0) {
    mouseDown = false;
  }
});

let currentScale = 1;

document.addEventListener('wheel', (e) => {
  const gameElement = document.querySelector('.game') as HTMLDivElement;

  if (gameElement) {
    currentScale = Math.max(
      Math.min(currentScale * (1 - e.deltaY * 0.001), 1.5),
      0.5
    );
    gameElement.style.transform = `scale(${Math.max(
      Math.min(currentScale, 1.5),
      0.5
    )}`;
  }
});

const createBoardElement = (nono: Nonogram): HTMLDivElement => {
  const startTime = new Date().getTime();

  const checkIfSolved = (column: number, row: number) => {
    if (nono.solvedRow(row)) {
      handleSolvedAxis(row, 'row');
    }

    if (nono.solvedColumn(column)) {
      handleSolvedAxis(column, 'column');
    }

    if (nono.solved) {
      const totalTime = Math.floor((new Date().getTime() - startTime) / 1000);
      player.play('win');
      const containerElement = document.querySelector('.container')!;
      containerElement.appendChild(createWinModal(totalTime));
      const focusTarget = document.querySelector(
        '.modal__button--secondary'
      ) as HTMLDivElement;
      focusTarget.focus();
    }
  };

  const check = (element: HTMLDivElement): void => {
    const [row, column] = getElementPosition(element);

    player.play('check');
    element.classList.remove('unknown');
    element.classList.toggle('checked');
    nono.check(column, row);
    nono.printBoard();
    checkIfSolved(column, row);
  };

  const toggle = (element: HTMLDivElement): void => {
    const [row, column] = getElementPosition(element);

    player.play('check');
    element.classList.remove('unknown');
    element.classList.toggle('checked');
    nono.toggle(column, row);
    nono.printBoard();
    checkIfSolved(column, row);
  };

  const mark = (element: HTMLDivElement): void => {
    const [row, column] = getElementPosition(element);

    player.play('mark');
    element.classList.remove('checked');
    element.classList.toggle('unknown');
    nono.uncheck(column, row);
    nono.printBoard();
    checkIfSolved(column, row);
  };

  const handleKey = (e: KeyboardEvent): void => {
    const element = document.activeElement;

    if (!(element instanceof HTMLDivElement)) {
      return;
    }

    let [row, column] = getElementPosition(element);

    switch (e.key) {
      case 'Enter':
        toggle(element);
        return;
      case 'ArrowUp':
        row--;
        break;
      case 'ArrowDown':
        row++;
        break;
      case 'ArrowLeft':
        column--;
        break;
      case 'ArrowRight':
        column++;
        break;
    }

    const nextFocusTarget = document.querySelector(
      `[data-row="${row}"][data-column="${column}"]`
    ) as HTMLDivElement;

    if (nextFocusTarget) {
      nextFocusTarget.focus();
    }
  };

  const handleHover = (event: MouseEvent): void => {
    if (!mouseDown) {
      return;
    }

    const element = event.target as HTMLDivElement;

    if (
      !element.classList.contains('cell') ||
      element.classList.contains('solved')
    ) {
      return;
    }

    const [row, column] = getElementPosition(element);

    if (!element.classList.contains('checked')) {
      check(element);
    }

    checkIfSolved(column, row);
  };

  const handleClick = (event: MouseEvent, action: Action): void => {
    event.preventDefault();

    const element = event.target as HTMLDivElement;

    if (
      !element.classList.contains('cell') ||
      element.classList.contains('solved')
    ) {
      return;
    }

    if (action === 'check') {
      toggle(element);
    } else {
      mark(element);
    }
  };

  const [width, height] = nono.size;

  const boardElement = document.createElement('div');
  boardElement.classList.add('board');
  boardElement.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      boardElement.appendChild(createCellElement(i, j));
    }
  }

  boardElement.addEventListener('mousedown', (e) => {
    if (e.button == 0) handleClick(e, 'check');
  });

  boardElement.addEventListener('contextmenu', (e) => {
    handleClick(e, 'mark');
  });

  boardElement.addEventListener('mouseover', (e) => {
    handleHover(e);
  });

  boardElement.addEventListener('keyup', (e) => {
    handleKey(e);
  });

  return boardElement;
};

export default createBoardElement;

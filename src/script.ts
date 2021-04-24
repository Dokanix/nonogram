import Nonogram from './nonogram.js';

type Axis = 'column' | 'row';
type Action = 'check' | 'mark';

const containerElement = document.querySelector('.container')!;

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

const getElementPosition = (element: HTMLDivElement): [number, number] => {
  return [Number(element.dataset.row), Number(element.dataset.column)];
};

const removeElement = (query: string): void => {
  const element = document.querySelector(query);

  if (element) {
    element.remove();
  }
};

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

const createModal = (header: string, text?: string): HTMLDivElement => {
  const modalElement = document.createElement('div');
  modalElement.classList.add('modal');

  const modalBodyElement = document.createElement('div');
  modalBodyElement.classList.add('modal__body');

  const modalExitButton = createButtonElement('X', () => {
    removeElement('.modal');
  });

  modalExitButton.classList.add('modal__button--exit');
  modalExitButton.classList.add('modal__button');
  modalExitButton.textContent = 'X';

  modalBodyElement.appendChild(modalExitButton);

  const modalHeaderElement = document.createElement('h1');
  modalHeaderElement.classList.add('modal__header');
  modalHeaderElement.textContent = header;

  modalBodyElement.appendChild(modalHeaderElement);

  if (text) {
    const modalTextElement = document.createElement('p');
    modalTextElement.classList.add('modal__text');
    modalTextElement.innerHTML = text;

    modalBodyElement.appendChild(modalTextElement);
  }

  modalElement.appendChild(modalBodyElement);

  return modalElement;
};

const createWinModal = (timeElapsed: number): HTMLDivElement => {
  const header = 'Congratulations! 🎉';
  const text = `You have completed the level in <span class='modal__time'>${timeElapsed}</span> seconds.`;

  const modalElement = createModal(header, text);
  const modalBodyElement = modalElement.querySelector(
    '.modal__body'
  ) as HTMLDivElement;

  const modalButtonsElement = document.createElement('div');
  modalButtonsElement.classList.add('modal__buttons');

  const modalSecondaryButton = createButtonElement('Reset', renderLevel);
  modalSecondaryButton.classList.add('modal__button');
  modalSecondaryButton.classList.add('modal__button--secondary');

  modalButtonsElement.appendChild(modalSecondaryButton);

  const modalPrimaryButton = createButtonElement('Back to Menu', renderMenu);
  modalPrimaryButton.classList.add('modal__button');
  modalPrimaryButton.classList.add('modal__button--primary');

  modalButtonsElement.appendChild(modalPrimaryButton);

  modalBodyElement.appendChild(modalButtonsElement);

  modalElement.appendChild(modalBodyElement);

  return modalElement;
};

const createNumberInput = (name: string): HTMLInputElement => {
  const element = document.createElement('input');
  element.classList.add('modal__input');
  element.type = 'number';
  element.placeholder = name;
  element.min = '2';
  element.max = '10';

  return element;
};

const createPlayModal = (): HTMLDivElement => {
  const modalElement = createModal('Level Settings');
  const modalBodyElement = modalElement.querySelector(
    '.modal__body'
  ) as HTMLDivElement;

  const widthInput = createNumberInput('Width');
  const heightInput = createNumberInput('Height');

  modalBodyElement.appendChild(widthInput);
  modalBodyElement.appendChild(heightInput);

  const modalButtonsElement = document.createElement('div');
  modalButtonsElement.classList.add('modal__buttons');

  const modalPrimaryButton = createButtonElement('Play', () => {
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);

    renderLevel(width, height);
  });
  modalPrimaryButton.classList.add('modal__button');
  modalPrimaryButton.classList.add('modal__button--primary');

  modalButtonsElement.appendChild(modalPrimaryButton);

  modalBodyElement.appendChild(modalButtonsElement);

  return modalElement;
};

const handleSolvedAxis = (row: number, axis: Axis) => {
  new Audio('static/axis.m4a').play();

  const rowElements = document.querySelectorAll(`[data-${axis}="${row}"`);

  rowElements.forEach((elem) => {
    elem.classList.add('solved');
    if (!elem.classList.contains('checked')) {
      elem.classList.add('unknown');
    }
  });
};

const createCellElement = (row: number, column: number): HTMLDivElement => {
  const cellElement = document.createElement('div');
  cellElement.classList.add('cell');
  cellElement.dataset.row = String(row);
  cellElement.dataset.column = String(column);
  cellElement.tabIndex = 0;

  return cellElement;
};

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
      new Audio('static/win.m4a').play();
      containerElement.appendChild(createWinModal(totalTime));
      const focusTarget = document.querySelector(
        '.modal__button--secondary'
      ) as HTMLDivElement;
      focusTarget.focus();
    }
  };

  const check = (element: HTMLDivElement): void => {
    const [row, column] = getElementPosition(element);

    new Audio('static/left.m4a').play();
    element.classList.remove('unknown');
    element.classList.toggle('checked');
    nono.check(column, row);
    nono.printBoard();
    checkIfSolved(column, row);
  };

  const toggle = (element: HTMLDivElement): void => {
    const [row, column] = getElementPosition(element);

    new Audio('static/left.m4a').play();
    element.classList.remove('unknown');
    element.classList.toggle('checked');
    nono.toggle(column, row);
    nono.printBoard();
    checkIfSolved(column, row);
  };

  const mark = (element: HTMLDivElement): void => {
    const [row, column] = getElementPosition(element);

    new Audio('static/right.m4a').play();
    element.classList.remove('checked');
    element.classList.add('unknown');
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

const createGameElement = (nono: Nonogram): HTMLDivElement => {
  const gameElement = document.createElement('div');
  gameElement.classList.add('game');

  gameElement.appendChild(createHelperElement(nono, 'column'));
  gameElement.appendChild(createHelperElement(nono, 'row'));
  gameElement.appendChild(createBoardElement(nono));

  return gameElement;
};

const createButtonElement = (
  text: string,
  callback?: () => void
): HTMLButtonElement => {
  const button = document.createElement('button');
  button.textContent = text;

  if (callback) {
    button.addEventListener('click', callback);
  }

  button.addEventListener('click', () => {
    new Audio('static/button.m4a').play();
  });

  return button;
};

const createBackButtonElement = (callback?: () => void): HTMLButtonElement => {
  const button = createButtonElement('Menu', callback);
  button.classList.add('back');

  return button;
};

const createMenuButtonElement = (
  text: string,
  callback?: () => void
): HTMLButtonElement => {
  const button = createButtonElement(text, callback);
  button.classList.add('menu__button');

  return button;
};

const createMenuElement = (): HTMLDivElement => {
  const menuElement = document.createElement('div');
  menuElement.classList.add('menu');

  menuElement.appendChild(
    createMenuButtonElement('Random', () => {
      renderLevel();
    })
  );
  menuElement.appendChild(
    createMenuButtonElement('Custom', () => {
      containerElement.appendChild(createPlayModal());
    })
  );
  menuElement.appendChild(createMenuButtonElement('Levels'));
  menuElement.appendChild(createMenuButtonElement('Editor'));

  return menuElement;
};

const renderLevel = (width?: number, height?: number) => {
  currentScale = 1;

  width = width ?? Math.floor(Math.random() * 8) + 2;
  height = height ?? Math.floor(Math.random() * 8) + 2;

  const nono = Nonogram.random(width, height);

  containerElement.innerHTML = '';
  containerElement.appendChild(createBackButtonElement(renderMenu));
  containerElement.appendChild(createGameElement(nono));
};

const renderMenu = () => {
  containerElement.innerHTML = '';
  containerElement.appendChild(createMenuElement());
};

renderMenu();

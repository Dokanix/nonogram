import Nonogram from './nonogram.js';
import AudioPlayer from './AudioPlayer.js';
const player = new AudioPlayer();
const containerElement = document.querySelector('.container');
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
    const gameElement = document.querySelector('.game');
    if (gameElement) {
        currentScale = Math.max(Math.min(currentScale * (1 - e.deltaY * 0.001), 1.5), 0.5);
        gameElement.style.transform = `scale(${Math.max(Math.min(currentScale, 1.5), 0.5)}`;
    }
});
const getElementPosition = (element) => {
    return [Number(element.dataset.row), Number(element.dataset.column)];
};
const removeElement = (query) => {
    const element = document.querySelector(query);
    if (element) {
        element.remove();
    }
};
const createHelperElement = (nono, axis) => {
    const helpersElement = document.createElement('div');
    helpersElement.classList.add(`${axis}Helpers`);
    const width = nono.helpers[axis].length;
    for (let i = 0; i < width; i++) {
        const helperElement = document.createElement('div');
        helperElement.classList.add(`${axis}Helper`);
        const helper = axis === 'column' ? nono.helpers.column[i] : nono.helpers.row[i];
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
const createModal = (header, text) => {
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
const createWinModal = (timeElapsed) => {
    const header = 'Congratulations! 🎉';
    const text = `You have completed the level in <span class='modal__time'>${timeElapsed}</span> seconds.`;
    const modalElement = createModal(header, text);
    const modalBodyElement = modalElement.querySelector('.modal__body');
    const modalButtonsElement = document.createElement('div');
    modalButtonsElement.classList.add('modal__buttons');
    const modalSecondaryButton = createButtonElement('Reset', () => {
        renderRandomLevel();
    });
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
const createBoardSelector = (dimensions) => {
    const boardElement = document.createElement('div');
    boardElement.classList.add('boardSelector__board');
    boardElement.style.gridTemplateColumns = `repeat(${dimensions.width}, 1fr)`;
    boardElement.style.gridTemplateRows = `repeat(${dimensions.height}, 1fr)`;
    for (let i = 0; i < dimensions.width * dimensions.height; i++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('boardSelector__cell');
        boardElement.appendChild(cellElement);
    }
    return boardElement;
};
const createPlayModal = () => {
    const dimensions = {
        width: 3,
        height: 3,
    };
    const modalElement = createModal('Level Settings');
    const modalBodyElement = modalElement.querySelector('.modal__body');
    const boardHeaderElement = document.createElement('h2');
    boardHeaderElement.textContent = 'Choose board size';
    modalBodyElement.appendChild(boardHeaderElement);
    const boardSelectorElement = document.createElement('div');
    boardSelectorElement.classList.add('boardSelector');
    let boardElement = createBoardSelector(dimensions);
    boardSelectorElement.appendChild(boardElement);
    const heightAdder = document.createElement('div');
    heightAdder.classList.add('boardSelector__adder');
    const heightAdderButton = createButtonElement('+', () => {
        dimensions.height = Math.min(dimensions.height + 1, Nonogram.maxSize);
        dimensions.width = Math.min(dimensions.width + 1, Nonogram.maxSize);
        const newBoardElement = createBoardSelector(dimensions);
        boardSelectorElement.replaceChild(newBoardElement, boardElement);
        boardElement = newBoardElement;
    });
    heightAdderButton.classList.add('boardSelector__button');
    const heightRemoverButton = createButtonElement('-', () => {
        dimensions.height = Math.max(dimensions.height - 1, Nonogram.minSize);
        dimensions.width = Math.max(dimensions.width - 1, Nonogram.minSize);
        const newBoardElement = createBoardSelector(dimensions);
        boardSelectorElement.replaceChild(newBoardElement, boardElement);
        boardElement = newBoardElement;
    });
    heightRemoverButton.classList.add('boardSelector__button');
    heightAdder.appendChild(heightRemoverButton);
    heightAdder.appendChild(heightAdderButton);
    boardSelectorElement.appendChild(heightAdder);
    modalBodyElement.appendChild(boardSelectorElement);
    const modalButtonsElement = document.createElement('div');
    modalButtonsElement.classList.add('modal__buttons');
    const modalPrimaryButton = createButtonElement('Play', () => {
        const width = Number(dimensions.width);
        const height = Number(dimensions.height);
        renderRandomLevel(width, height);
    });
    modalPrimaryButton.classList.add('modal__button');
    modalPrimaryButton.classList.add('modal__button--primary');
    modalButtonsElement.appendChild(modalPrimaryButton);
    modalBodyElement.appendChild(modalButtonsElement);
    return modalElement;
};
const handleSolvedAxis = (row, axis) => {
    player.play('axis');
    const rowElements = document.querySelectorAll(`[data-${axis}="${row}"`);
    rowElements.forEach((elem) => {
        elem.classList.add('solved');
        if (!elem.classList.contains('checked')) {
            elem.classList.add('unknown');
        }
    });
};
const createCellElement = (row, column) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.row = String(row);
    cellElement.dataset.column = String(column);
    cellElement.tabIndex = 0;
    return cellElement;
};
const createBoardElement = (nono) => {
    const startTime = new Date().getTime();
    const checkIfSolved = (column, row) => {
        if (nono.solvedRow(row)) {
            handleSolvedAxis(row, 'row');
        }
        if (nono.solvedColumn(column)) {
            handleSolvedAxis(column, 'column');
        }
        if (nono.solved) {
            const totalTime = Math.floor((new Date().getTime() - startTime) / 1000);
            player.play('win');
            containerElement.appendChild(createWinModal(totalTime));
            const focusTarget = document.querySelector('.modal__button--secondary');
            focusTarget.focus();
        }
    };
    const check = (element) => {
        const [row, column] = getElementPosition(element);
        player.play('check');
        element.classList.remove('unknown');
        element.classList.toggle('checked');
        nono.check(column, row);
        nono.printBoard();
        checkIfSolved(column, row);
    };
    const toggle = (element) => {
        const [row, column] = getElementPosition(element);
        player.play('check');
        element.classList.remove('unknown');
        element.classList.toggle('checked');
        nono.toggle(column, row);
        nono.printBoard();
        checkIfSolved(column, row);
    };
    const mark = (element) => {
        const [row, column] = getElementPosition(element);
        player.play('mark');
        element.classList.remove('checked');
        element.classList.toggle('unknown');
        nono.uncheck(column, row);
        nono.printBoard();
        checkIfSolved(column, row);
    };
    const handleKey = (e) => {
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
        const nextFocusTarget = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);
        if (nextFocusTarget) {
            nextFocusTarget.focus();
        }
    };
    const handleHover = (event) => {
        if (!mouseDown) {
            return;
        }
        const element = event.target;
        if (!element.classList.contains('cell') ||
            element.classList.contains('solved')) {
            return;
        }
        const [row, column] = getElementPosition(element);
        if (!element.classList.contains('checked')) {
            check(element);
        }
        checkIfSolved(column, row);
    };
    const handleClick = (event, action) => {
        event.preventDefault();
        const element = event.target;
        if (!element.classList.contains('cell') ||
            element.classList.contains('solved')) {
            return;
        }
        if (action === 'check') {
            toggle(element);
        }
        else {
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
        if (e.button == 0)
            handleClick(e, 'check');
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
const createGameElement = (nono) => {
    const gameElement = document.createElement('div');
    gameElement.classList.add('game');
    gameElement.appendChild(createHelperElement(nono, 'column'));
    gameElement.appendChild(createHelperElement(nono, 'row'));
    gameElement.appendChild(createBoardElement(nono));
    return gameElement;
};
const createButtonElement = (text, callback) => {
    const button = document.createElement('button');
    button.textContent = text;
    if (callback) {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            callback();
        });
    }
    button.addEventListener('click', () => {
        player.play('button');
    });
    return button;
};
const createBackButtonElement = (callback) => {
    const button = createButtonElement('Menu', callback);
    button.classList.add('back');
    return button;
};
const createMenuButtonElement = (text, callback) => {
    const button = createButtonElement(text, callback);
    button.classList.add('menu__button');
    return button;
};
const createMenuElement = () => {
    const menuElement = document.createElement('div');
    menuElement.classList.add('menu');
    menuElement.appendChild(createMenuButtonElement('Random', () => {
        renderRandomLevel();
    }));
    menuElement.appendChild(createMenuButtonElement('Custom', () => {
        containerElement.appendChild(createPlayModal());
    }));
    menuElement.appendChild(createMenuButtonElement('Levels'));
    menuElement.appendChild(createMenuButtonElement('Editor'));
    return menuElement;
};
const renderRandomLevel = (width, height) => {
    currentScale = 1;
    width = width !== null && width !== void 0 ? width : Math.floor(Math.random() * 8) + 2;
    height = height !== null && height !== void 0 ? height : Math.floor(Math.random() * 8) + 2;
    const nono = Nonogram.random(width, height);
    containerElement.innerHTML = '';
    containerElement.appendChild(createBackButtonElement(renderMenu));
    containerElement.appendChild(createGameElement(nono));
    window.location.search = nono.encode();
    nono.printSolution();
    console.log(nono.encode());
    Nonogram.decode(nono.encode()).printSolution();
};
const renderLevel = (nono) => {
    containerElement.innerHTML = '';
    containerElement.appendChild(createBackButtonElement(renderMenu));
    containerElement.appendChild(createGameElement(nono));
};
const renderMenu = () => {
    containerElement.innerHTML = '';
    containerElement.appendChild(createMenuElement());
};
if (window.location.search) {
    const levelMap = window.location.search.slice(1);
    const nono = Nonogram.decode(levelMap);
    renderLevel(nono);
}
else {
    renderMenu();
}

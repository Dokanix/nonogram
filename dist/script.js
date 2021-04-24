import Nonogram from './nonogram.js';
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
    console.log(currentScale);
    const gameElement = document.querySelector('.game');
    if (gameElement) {
        currentScale = Math.max(Math.min(currentScale * (1 - e.deltaY * 0.001), 1.5), 0.5);
        gameElement.style.transform = `scale(${Math.max(Math.min(currentScale, 1.5), 0.5)}`;
        console.log(currentScale);
    }
});
const getElementPosition = (element) => {
    return [Number(element.dataset.row), Number(element.dataset.column)];
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
const createModal = (timeElapsed) => {
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal');
    const modalBodyElement = document.createElement('div');
    modalBodyElement.classList.add('modal__body');
    const modalHeaderElement = document.createElement('h1');
    modalHeaderElement.textContent = 'Congratulations! 🎉';
    modalBodyElement.appendChild(modalHeaderElement);
    const modalTextElement = document.createElement('p');
    modalTextElement.classList.add('modal__text');
    modalTextElement.innerHTML = `You have completed the level in <span class="modal__time">${timeElapsed}</span> seconds.`;
    modalBodyElement.appendChild(modalTextElement);
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
const handleSolvedAxis = (row, axis) => {
    new Audio('static/axis.m4a').play();
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
    const handleHover = (event) => {
        var _a;
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
            new Audio('static/left.m4a').play();
            element.classList.remove('unknown');
            element.classList.add('checked');
            nono.check(column, row);
        }
        if (nono.solvedRow(row)) {
            handleSolvedAxis(row, 'row');
        }
        if (nono.solvedColumn(column)) {
            handleSolvedAxis(column, 'column');
        }
        if (nono.solved) {
            const totalTime = Math.floor((new Date().getTime() - startTime) / 1000);
            new Audio('static/win.m4a').play();
            containerElement.appendChild(createModal(totalTime));
            (_a = document.querySelector('.modal__body')) === null || _a === void 0 ? void 0 : _a.classList.add('visible');
            const focusTarget = document.querySelector('.modal__button--secondary');
            focusTarget.focus();
        }
    };
    const handleClick = (event, action) => {
        event.preventDefault();
        const element = event.target;
        if (!element.classList.contains('cell') ||
            element.classList.contains('solved')) {
            return;
        }
        const [row, column] = getElementPosition(element);
        if (action === 'check') {
            new Audio('static/left.m4a').play();
            element.classList.remove('unknown');
            element.classList.toggle('checked');
            nono.toggle(column, row);
        }
        else {
            new Audio('static/right.m4a').play();
            element.classList.remove('checked');
            element.classList.toggle('unknown');
            nono.uncheck(column, row);
        }
        if (nono.solvedRow(row)) {
            handleSolvedAxis(row, 'row');
        }
        if (nono.solvedColumn(column)) {
            handleSolvedAxis(column, 'column');
        }
        if (nono.solved) {
            const totalTime = Math.floor((new Date().getTime() - startTime) / 1000);
            new Audio('static/win.m4a').play();
            containerElement.appendChild(createModal(totalTime));
            const focusTarget = document.querySelector('.modal__button--secondary');
            focusTarget.focus();
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
        if (e.button === 0) {
            handleClick(e, 'check');
        }
    });
    boardElement.addEventListener('contextmenu', (e) => {
        handleClick(e, 'mark');
    });
    boardElement.addEventListener('mouseover', (e) => {
        handleHover(e);
    });
    boardElement.addEventListener('keyup', (e) => {
        const element = document.activeElement;
        if (!(element instanceof HTMLDivElement)) {
            return;
        }
        let [row, column] = getElementPosition(element);
        console.log(row, column);
        console.log(e.key);
        switch (e.key) {
            case 'Enter':
                element.click();
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
        button.addEventListener('click', callback);
    }
    button.addEventListener('click', () => {
        new Audio('static/button.m4a').play();
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
    menuElement.appendChild(createMenuButtonElement('Random', renderLevel));
    menuElement.appendChild(createMenuButtonElement('Levels'));
    menuElement.appendChild(createMenuButtonElement('Editor'));
    return menuElement;
};
const renderLevel = () => {
    currentScale = 1;
    const randomWidth = Math.floor(Math.random() * 8) + 2;
    const randomHeight = Math.floor(Math.random() * 8) + 2;
    const nono = Nonogram.random(randomWidth, randomHeight);
    containerElement.innerHTML = '';
    containerElement.appendChild(createBackButtonElement(renderMenu));
    containerElement.appendChild(createGameElement(nono));
};
const renderMenu = () => {
    containerElement.innerHTML = '';
    containerElement.appendChild(createMenuElement());
};
renderMenu();

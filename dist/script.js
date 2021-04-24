import Nonogram from './nonogram.js';
const containerElement = document.querySelector('.container');
const backElement = document.querySelector('.back');
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
const createCongratulationsElement = () => {
    const congratulationsElement = document.createElement('h1');
    congratulationsElement.innerText = 'Congratulations!';
    return congratulationsElement;
};
const createBoardElement = (nono) => {
    const handleClick = (event, state) => {
        event.preventDefault();
        const element = event.target;
        if (element.classList.contains('cell')) {
            const column = Number(element.dataset.column);
            const row = Number(element.dataset.row);
            if (state === 'check') {
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
                const rowElements = document.querySelectorAll(`[data-row="${row}"`);
                rowElements.forEach((elem) => {
                    if (!elem.classList.contains('checked')) {
                        elem.classList.add('unknown');
                    }
                });
            }
            if (nono.solvedColumn(column)) {
                const columnElements = document.querySelectorAll(`[data-column="${column}"]`);
                columnElements.forEach((elem) => {
                    if (!elem.classList.contains('checked')) {
                        elem.classList.add('unknown');
                    }
                });
            }
        }
        if (nono.solved) {
            new Audio('static/win.m4a').play();
            containerElement.appendChild(createCongratulationsElement());
        }
    };
    const [width, height] = nono.size;
    const boardElement = document.createElement('div');
    boardElement.classList.add('board');
    boardElement.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.column = String(j);
            cellElement.dataset.row = String(i);
            boardElement.appendChild(cellElement);
        }
    }
    boardElement.addEventListener('click', (e) => {
        handleClick(e, 'check');
    });
    boardElement.addEventListener('contextmenu', (e) => {
        handleClick(e, 'mark');
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
    button.classList.add('menu__button');
    button.textContent = text;
    if (callback) {
        button.addEventListener('click', callback);
    }
    return button;
};
const createMenuElement = () => {
    const menuElement = document.createElement('div');
    menuElement.classList.add('menu');
    menuElement.appendChild(createButtonElement('Losowy', renderLevel));
    menuElement.appendChild(createButtonElement('Poziomy'));
    menuElement.appendChild(createButtonElement('Edytor'));
    return menuElement;
};
const renderLevel = () => {
    const randomWidth = Math.floor(Math.random() * 8) + 2;
    const randomHeight = Math.floor(Math.random() * 8) + 2;
    const nono = Nonogram.random(randomWidth, randomHeight);
    containerElement.innerHTML = '';
    containerElement.appendChild(createGameElement(nono));
    backElement.classList.remove('hidden');
};
const renderMenu = () => {
    containerElement.innerHTML = '';
    containerElement.appendChild(createMenuElement());
    backElement.classList.add('hidden');
};
backElement.addEventListener('click', renderMenu);
renderMenu();

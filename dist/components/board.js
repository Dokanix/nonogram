import handleSolvedAxis from '../utils/handleSolvedAxis.js';
import player from '../AudioPlayer.js';
import getElementPosition from '../utils/getElementPosition.js';
import createCellElement from './cell.js';
import createWinModal from './winModal.js';
import updateLevel from '../utils/updateLevel.js';
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
const createBoardElement = (nono) => {
    currentScale = 1;
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
            updateLevel(nono.encode(), totalTime);
            player.play('win');
            const containerElement = document.querySelector('.container');
            if (!containerElement.querySelector('.modal')) {
                containerElement.appendChild(createWinModal(totalTime));
            }
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
    const cellSize = `min(calc(70vh/${height}), calc(70vw/${width}), 10rem)`;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            boardElement.appendChild(createCellElement(i, j, cellSize));
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
export default createBoardElement;

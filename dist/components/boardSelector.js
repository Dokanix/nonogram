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
export default createBoardSelector;

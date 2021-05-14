const createCellElement = (row, column, size) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.row = String(row);
    cellElement.dataset.column = String(column);
    cellElement.tabIndex = 0;
    cellElement.style.width = size;
    return cellElement;
};
export default createCellElement;

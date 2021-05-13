const createCellElement = (row, column) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.row = String(row);
    cellElement.dataset.column = String(column);
    cellElement.tabIndex = 0;
    return cellElement;
};
export default createCellElement;

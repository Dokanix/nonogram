const getElementPosition = (element) => {
    return [Number(element.dataset.row), Number(element.dataset.column)];
};
export default getElementPosition;

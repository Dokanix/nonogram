const getElementPosition = (element: HTMLDivElement): [number, number] => {
  return [Number(element.dataset.row), Number(element.dataset.column)];
};

export default getElementPosition;

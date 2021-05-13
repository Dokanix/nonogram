import createButtonElement from './button.js';

const createMenuButtonElement = (
  text: string,
  callback?: () => void
): HTMLButtonElement => {
  const button = createButtonElement(text, callback);
  button.classList.add('menu__button');

  return button;
};

export default createMenuButtonElement;

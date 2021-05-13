const createElement = (
  tagName: keyof HTMLElementTagNameMap,
  className: string,
  text?: string,
  callback?: () => void
): HTMLElement => {
  const element = document.createElement(tagName);
  element.classList.add(className);

  if (text) {
    element.textContent = text;
  }

  if (callback) {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      callback();
    });
  }

  return element;
};

export default createElement;

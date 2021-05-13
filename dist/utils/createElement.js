const createElement = (tagName, className, text, callback) => {
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

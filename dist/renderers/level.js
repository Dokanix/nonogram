const renderLevel = (containerElement, nono) => {
    containerElement.innerHTML = '';
    containerElement.appendChild(createBackButtonElement(renderMenu));
    containerElement.appendChild(createGameElement(nono));
};
export default renderLevel;

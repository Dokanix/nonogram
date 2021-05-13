const removeElement = (query) => {
    const element = document.querySelector(query);
    if (element) {
        element.remove();
    }
};
export default removeElement;

const removeElement = (query: string): void => {
  const element = document.querySelector(query);

  if (element) {
    element.remove();
  }
};

export default removeElement;

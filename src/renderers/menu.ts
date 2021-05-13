import createMenuElement from '../components/menu.js';

const renderMenu = (containerElement: HTMLElement) => {
  window.history.pushState({}, 'Nonogram', `${window.location.pathname}`);
  containerElement.innerHTML = '';
  containerElement.appendChild(createMenuElement());
};

export default renderMenu;

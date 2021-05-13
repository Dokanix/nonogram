import createModal from './modal.js';
import createLevelElement from './level.js';
import createElement from '../utils/createElement.js';

const createLevelsModal = (): HTMLDivElement => {
  const containerElement = document.querySelector('.container') as HTMLElement;

  const modalElement = createModal('Saved Levels');
  const modalBodyElement = modalElement.querySelector(
    '.modal__body'
  ) as HTMLDivElement;

  const levelsString = localStorage.getItem('levels');
  console.log(levelsString);

  if (levelsString) {
    const levels = JSON.parse(levelsString) as { [key: string]: number };
    console.log(levels);

    for (const level in levels) {
      const [width, height] = level.split('&');

      const levelElement = createLevelElement(
        [Number(width), Number(height)],
        levels[level],
        level
      );

      modalBodyElement.appendChild(levelElement);
    }
  } else {
    modalBodyElement.appendChild(
      createElement(
        'p',
        'modal__text',
        'Empty! If you save a level it will appear in here.'
      )
    );
  }

  return modalElement;
};

export default createLevelsModal;

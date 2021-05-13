import player from '../AudioPlayer.js';

const createButtonElement = (
  text: string,
  callback?: () => void
): HTMLButtonElement => {
  const button = document.createElement('button');
  button.textContent = text;

  if (callback) {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      callback();
    });
  }

  button.addEventListener('click', () => {
    player.play('button');
  });

  return button;
};

export default createButtonElement;

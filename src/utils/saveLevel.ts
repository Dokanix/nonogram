import Nonogram from '../nonogram';

type Level = boolean[][];

const saveLevel = (nono: Nonogram): void => {
  const levelsJSON = localStorage.getItem('levels');

  if (levelsJSON) {
    const levels = JSON.parse(levelsJSON) as Level[];
    levels.push(nono.cells);
    localStorage.setItem('levels', JSON.stringify(levels));
  } else {
    localStorage.setItem('levels', JSON.stringify([nono.cells]));
  }
};

export default saveLevel;

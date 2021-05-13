const deleteLevel = (boardHash: string): void => {
  const levelsJSON = localStorage.getItem('levels');

  if (!levelsJSON) {
    return;
  }
  const levels = JSON.parse(levelsJSON) as { [key: string]: number };

  if (levels[boardHash]) {
    delete levels[boardHash];
  }

  localStorage.setItem('levels', JSON.stringify(levels));
};

export default deleteLevel;

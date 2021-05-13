const updateLevel = (boardHash: string, bestTime: number): void => {
  const levelsJSON = localStorage.getItem('levels');

  if (!levelsJSON) {
    return;
  }

  const levels = JSON.parse(levelsJSON) as { [key: string]: number | null };

  if (levels[boardHash] !== undefined) {
    levels[boardHash] = bestTime;
  }

  localStorage.setItem('levels', JSON.stringify(levels));
};

export default updateLevel;

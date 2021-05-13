const saveLevel = (boardHash: string, bestTime: number): void => {
  const levelsJSON = localStorage.getItem('levels');

  if (levelsJSON) {
    const levels = JSON.parse(levelsJSON) as { [key: string]: number };

    if (levels[boardHash] !== undefined) {
      return;
    }

    levels[boardHash] = bestTime;
    localStorage.setItem('levels', JSON.stringify(levels));
  } else {
    localStorage.setItem('levels', JSON.stringify({ [boardHash]: bestTime }));
  }
};

export default saveLevel;

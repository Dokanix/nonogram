const existsLevel = (boardHash: string): boolean => {
  const levelsJSON = localStorage.getItem('levels');

  if (!levelsJSON) {
    return false;
  }
  const levels = JSON.parse(levelsJSON) as { [key: string]: number };

  if (levels[boardHash] !== undefined) {
    return true;
  }

  return false;
};

export default existsLevel;

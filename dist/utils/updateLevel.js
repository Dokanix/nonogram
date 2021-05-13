const updateLevel = (boardHash, bestTime) => {
    const levelsJSON = localStorage.getItem('levels');
    if (!levelsJSON) {
        return;
    }
    const levels = JSON.parse(levelsJSON);
    if (levels[boardHash]) {
        levels[boardHash] = bestTime;
    }
    localStorage.setItem('levels', JSON.stringify(levels));
};
export default updateLevel;

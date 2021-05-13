const saveLevel = (boardHash, bestTime) => {
    const levelsJSON = localStorage.getItem('levels');
    if (levelsJSON) {
        const levels = JSON.parse(levelsJSON);
        if (levels[boardHash]) {
            return;
        }
        levels[boardHash] = bestTime;
        localStorage.setItem('levels', JSON.stringify(levels));
    }
    else {
        localStorage.setItem('levels', JSON.stringify({ [boardHash]: bestTime }));
    }
};
export default saveLevel;

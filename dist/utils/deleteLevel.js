const deleteLevel = (boardHash) => {
    const levelsJSON = localStorage.getItem('levels');
    if (!levelsJSON) {
        return;
    }
    const levels = JSON.parse(levelsJSON);
    if (levels[boardHash]) {
        delete levels[boardHash];
    }
    localStorage.setItem('levels', JSON.stringify(levels));
};
export default deleteLevel;

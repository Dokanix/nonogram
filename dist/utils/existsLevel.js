const existsLevel = (boardHash) => {
    const levelsJSON = localStorage.getItem('levels');
    if (!levelsJSON) {
        return false;
    }
    const levels = JSON.parse(levelsJSON);
    if (levels[boardHash] !== undefined) {
        return true;
    }
    return false;
};
export default existsLevel;

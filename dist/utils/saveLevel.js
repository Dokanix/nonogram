const saveLevel = (nono) => {
    const levelsJSON = localStorage.getItem('levels');
    if (levelsJSON) {
        const levels = JSON.parse(levelsJSON);
        levels.push(nono.cells);
        localStorage.setItem('levels', JSON.stringify(levels));
    }
    else {
        localStorage.setItem('levels', JSON.stringify([nono.cells]));
    }
};
export default saveLevel;

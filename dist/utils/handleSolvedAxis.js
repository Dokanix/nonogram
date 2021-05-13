import player from '../AudioPlayer.js';
const handleSolvedAxis = (row, axis) => {
    player.play('axis');
    const rowElements = document.querySelectorAll(`[data-${axis}="${row}"`);
    rowElements.forEach((elem) => {
        elem.classList.add('solved');
        if (!elem.classList.contains('checked')) {
            elem.classList.add('unknown');
        }
    });
};
export default handleSolvedAxis;

import deleteLevel from '../utils/deleteLevel.js';
import existsLevel from '../utils/existsLevel.js';
import saveLevel from '../utils/saveLevel.js';
import createButtonElement from './button.js';
const createSaveButton = (boardHash) => {
    if (existsLevel(boardHash)) {
        const saveButton = createButtonElement('Unsave', () => {
            deleteLevel(boardHash);
        });
        saveButton.addEventListener('click', () => {
            saveButton.replaceWith(createSaveButton(boardHash));
        });
        return saveButton;
    }
    const saveButton = createButtonElement('Save', () => {
        saveLevel(boardHash, 0);
    });
    saveButton.addEventListener('click', () => {
        saveButton.replaceWith(createSaveButton(boardHash));
    });
    return saveButton;
};
export default createSaveButton;

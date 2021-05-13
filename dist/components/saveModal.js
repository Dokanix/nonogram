import createModal from './modal.js';
const createSaveModal = () => {
    const containerElement = document.querySelector('.container');
    const modalElement = createModal('Save Level');
    const modalBodyElement = modalElement.querySelector('.modal__body');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    const ;
    return modalElement;
};
export default createSaveModal;

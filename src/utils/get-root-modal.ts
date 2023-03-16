let rootModal = document.getElementById('root-modal');

if (rootModal === null) {
    rootModal = document.createElement('div');
    rootModal.setAttribute('id', 'root-modal');
    document.body.appendChild(rootModal);
}

export const getRootModal = () => {
    return { rootModal };
}
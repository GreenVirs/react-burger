let rootModal = null;

const getRoot = () => {
    rootModal = document.getElementById('modal-root');
}

export const useRootModal = () => {
    if (rootModal === null) {
        getRoot()
    }

    return rootModal;
}

export default useRootModal;
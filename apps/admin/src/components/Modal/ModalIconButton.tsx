const ModalIconButton = ({ openModal }: ModalIconButtonProps) => {
    return (
        <button
            onClick={openModal}
            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
            aria-label="Info"
        >
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v2m0 4h.01M12 18a9 9 0 110-18 9 9 0 010 18zm0-10a1 1 0 100-2 1 1 0 000 2z"
                ></path>
            </svg>
        </button>
    );
};

interface ModalIconButtonProps {
    openModal: () => void;
}

export default ModalIconButton;
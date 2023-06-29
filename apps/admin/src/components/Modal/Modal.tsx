import { useState } from "react";
import ModalIconButton from "@/components/Modal/ModalIconButton"
import ModalButton from "@/components/Modal/ModalButton"

const Modal = ({ children }: ModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div>
                <ModalIconButton openModal={openModal} />
            </div>
            {/* Modal backdrop. This is what you want to place close to the closing body tag */}
            {isModalOpen && (
                <div
                    className="fixed -inset-16 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
                    onClick={closeModal}
                >
                    {/* Modal */}
                    <div
                        className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
                        role="dialog"
                        id="modal"
                    >
                        {/* Remove header if you don't want a close icon. Use modal body to place modal title. */}
                        <header className="flex justify-end">
                            <button
                                className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover:text-gray-700"
                                aria-label="close"
                                onClick={closeModal}
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    role="img"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </header>
                        {/* Modal body */}
                        <div className="mt-4 mb-6">
                            {children}
                        </div>
                        <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800">
                            <ModalButton label="Close" onClick={closeModal} />
                        </footer>
                    </div>
                </div>
            )}
            {/* End of modal backdrop */}
        </>
    );
};

interface ModalProps {
    children: React.ReactNode;
}

export default Modal;
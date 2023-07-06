import React from "react";

const ModalFooter = ({ children }: ModalFooterProps) => {
    return (
        <>
            <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800">
                { children }
            </footer>
        </>
    );
}

interface ModalFooterProps {
    children: React.ReactNode;
}

export default ModalFooter;
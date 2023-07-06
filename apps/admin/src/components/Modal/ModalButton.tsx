const ModalButton = ({
    label,
    onClick,
    variant = 'close'
}: ModalButtonProps) => {
    const getButtonClasses = () => {
        let classes =
            'w-full px-5 py-3 text-sm font-medium leading-5 transition-colors duration-150 border rounded-lg sm:w-auto sm:px-4 sm:py-2 focus:outline-none';

        switch (variant) {
            case 'cancel':
                classes += ' text-gray-700 border-gray-300 dark:text-gray-400 hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:shadow-outline-gray';
                break;
            case 'accept':
            case 'close':
                classes += ' text-white bg-purple-600 border-transparent hover:bg-purple-700 active:bg-purple-600 focus:shadow-outline-purple';
                break;
        }

        return classes;
    };

    return (
        <button className={getButtonClasses()} onClick={onClick}>
            {label}
        </button>
    );
};

export interface ModalButtonProps {
    label: string;
    onClick?: () => void;
    variant?: 'cancel' | 'accept' | 'close';
}

export default ModalButton;
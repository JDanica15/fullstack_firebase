import React, { Fragment, useRef, useEffect } from 'react';
import { XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const Modal = ({ isOpen, onCancel, onConfirm }) => {
    const modalRef = useRef(null);
    const closeBtnRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Set focus on the close button when modal opens
            closeBtnRef.current.focus();

            // Trap focus inside the modal
            const handleFocusTrap = (event) => {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    closeBtnRef.current.focus();
                }
            };
            document.addEventListener('focusin', handleFocusTrap);

            // Close modal when clicking outside
            const handleOutsideClick = (event) => {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    onCancel();
                }
            };
            document.addEventListener('mousedown', handleOutsideClick);

            return () => {
                document.removeEventListener('focusin', handleFocusTrap);
                document.removeEventListener('mousedown', handleOutsideClick);
            };
        }
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <Fragment>
            <div className="fixed inset-0 bg-gray-900 opacity-50 z-50" aria-hidden="true"></div>

            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-md dark:bg-gray-800 sm:p-5"
                ref={modalRef}
                tabIndex="-1"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalTitle"
                aria-describedby="modalDescription"
            >

                <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={onCancel}
                    className="absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white focus:outline-none p-1.5 focus:ring focus:ring-blue-500"
                    aria-label="Close modal"
                >
                    <XCircleIcon aria-hidden="true" className="w-5 h-5" fill="currentColor" />
                </button>

                <div className="p-4 text-center">
                    <ExclamationTriangleIcon className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto fill-orange-600" />
                    <h2 id="modalTitle" className="text-lg font-medium text-gray-900 dark:text-white">
                        Delete Item
                    </h2>
                    <p id="modalDescription" className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                        Are you sure you want to delete this item?
                    </p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button
                            onClick={onCancel}
                            type="button"
                            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            No, cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                            Yes, I'm sure
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Modal;

import React, {Fragment} from 'react'
import { XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'

const Modal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;
    const backdropClassName = isOpen ? 'fixed inset-0 bg-gray-900 opacity-50 z-33' : 'hidden';
    return (
        <Fragment>
            <div className={backdropClassName}></div>
            <div tabIndex="-1" aria-hidden="true" className={`${isOpen ? 'block' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}>
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
                    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                            <XCircleIcon aria-hidden="true" className="w-5 h-5" fill="currentColor" />
                            <span className="sr-only">Close modal</span>
                        </button>
                        <ExclamationTriangleIcon className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" fill='fill-orange-600' />
                        <p className="text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                        <p className="mb-4 text-gray-500 dark:text-gray-300">You cannot retrieve it once confirm.</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button data-modal-toggle="deleteModal" onClick={onCancel} type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                No, cancel
                            </button>
                            <button type="submit" onClick={onConfirm} className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Modal
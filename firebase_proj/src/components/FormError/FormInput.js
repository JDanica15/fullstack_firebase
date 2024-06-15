import React from "react";

const FormInput = ({ fieldName, label, type, value, error, onChange, onBlur, placeholder }) => {
    const getFieldClass = () => {
        return error
            ? 'border-rose-600 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-rose-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-rose-600'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
    };

    return (
        <div>
            <label
                htmlFor={fieldName}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input
                className={`${getFieldClass()} bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                type={type}
                name={fieldName}
                id={fieldName}
                aria-describedby={`${fieldName}-error`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={!!error}
            />
            {error && (
                <p id={`${fieldName}-error`} className="text-red-500 text-xs italic" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormInput;

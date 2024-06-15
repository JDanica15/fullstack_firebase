import React, { Fragment, useState } from "react";
import { createItem } from "../../config/utils/FireStoreServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../FormError/FormInput";

const Create = () => {
    const navigate = useNavigate();

    const [newItem, setNewItem] = useState({
        name: "",
        category: "",
        price: "",
        cost: "",
        quantity: "",
        option: [],
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!newItem.name) newErrors.name = "Name is required";
        if (!newItem.category) newErrors.category = "Category is required";
        if (!newItem.price) newErrors.price = "Price is required";
        if (!newItem.cost) newErrors.cost = "Cost is required";
        if (!newItem.quantity) newErrors.quantity = "Stock is required";

        if (!/^\d*\.?\d*$/.test(newItem.price)) newErrors.price = "Price must be a valid number";
        if (!/^\d*\.?\d*$/.test(newItem.cost)) newErrors.cost = "Cost must be a valid number";
        if (!/^\d*\.?\d*$/.test(newItem.quantity)) newErrors.quantity = "Stock must be a valid number";

        return newErrors;
    };

    const handleAddItem = async () => {
        try {
            const validationErrors = validateForm();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                toast.error('Please fill in all required fields.');
            } else {
                const parseItem = {
                    name: newItem.name,
                    category: newItem.category,
                    price: parseFloat(newItem.price),
                    cost: parseFloat(newItem.cost),
                    quantity: parseFloat(newItem.quantity),
                    option: newItem.option ? newItem.option.filter(opt => opt.trim() !== '') : newItem.option
                }
                await createItem(parseItem);
                toast.success('Data has been saved. Thank you!');
                navigate("/app/menu");
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = newItem.option.map((option, i) =>
            i === index ? value : option
        );
        setNewItem((prev) => ({
            ...prev,
            option: updatedOptions,
        }));
    };

    const addOptionInput = (index) => {
        const updatedOptions = [
            ...newItem.option.slice(0, index + 1),
            "",
            ...newItem.option.slice(index + 1),
        ];
        setNewItem((prev) => ({
            ...prev,
            option: updatedOptions,
        }));
    };

    const removeOptionInput = (index) => {
        const updatedOptions = newItem.option.filter((_, i) => i !== index);
        setNewItem((prev) => ({
            ...prev,
            option: updatedOptions,
        }));
    };

    return (
        <Fragment>
            <h2>Add New Item</h2>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <FormInput
                    fieldName="category"
                    label="Category"
                    type="text"
                    value={newItem.category}
                    error={errors.category}
                    onChange={handleChange}
                    placeholder="Category"
                />
                <FormInput
                    fieldName="name"
                    label="Name"
                    type="text"
                    value={newItem.name}
                    error={errors.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <div>
                    <label
                        htmlFor="option"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Option
                    </label>
                    {newItem.option.map((option, index) => (
                        <Fragment key={index}>
                            <div className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={option}
                                    name={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    placeholder="Option"
                                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mr-2"
                                />
                                <div className="flex mb-2 mr-1">
                                    {newItem.option.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeOptionInput(index)}
                                            className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Fragment>
                    ))}
                    <div className="flex mb-2 mr-1">
                        <button
                            type="button"
                            onClick={() => addOptionInput(newItem.option.length)}
                            className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                        >
                            Add Option
                        </button>
                    </div>
                </div>
                <FormInput
                    fieldName="price"
                    label="Price"
                    type="text"
                    value={newItem.price}
                    error={errors.price}
                    onChange={handleChange}
                    placeholder="Price"
                />
                <FormInput
                    fieldName="quantity"
                    label="Stock"
                    type="text"
                    value={newItem.quantity}
                    error={errors.quantity}
                    onChange={handleChange}
                    placeholder="Stock"
                />
                <FormInput
                    fieldName="cost"
                    label="Cost"
                    type="text"
                    value={newItem.cost}
                    error={errors.cost}
                    onChange={handleChange}
                    placeholder="Cost"
                />
            </div>
            <button
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={handleAddItem}
            >
                Add Item
            </button>
        </Fragment>
    );
};

export default Create;

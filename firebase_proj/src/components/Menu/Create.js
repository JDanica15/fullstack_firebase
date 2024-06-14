import React, { Fragment, useState } from "react";
import { createItem } from "../../config/utils/FireStoreServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
    const navigate = useNavigate();

    const [showOption, setShowOption] = useState(false);
    const [newItem, setNewItem] = useState({
        name: "",
        category: "",
        price: 0,
        cost: 0,
        quantity: 0,
        option: "",
    });
    const [errors, setErrors] = useState({});

    // VALIDATE DATA IF FIELD IS EMPTY
    const validateForm = () => {
        const newErrors = {};
        if (!newItem.name) newErrors.name = `Name is required ${toast.error('Name is required')}`;
        if (!newItem.category) newErrors.category = `Category is required ${toast.error('Category is required')}`;
        if (!newItem.price) newErrors.price = `Price is required ${toast.error('Price is required')}`;
        if (!newItem.cost) newErrors.cost = `Cost is required ${toast.error('Cost is required')}`;
        if (!newItem.quantity) newErrors.quantity = `Stock is required ${toast.error('Stock is required')}`;

        // CHECK PRICE COST QUANTITY
        if (!/^\d*\.?\d*$/.test(newItem.price)) newErrors.price = `Price must be valid number ${toast.error('Price must be valid number')}`;
        if (!/^\d*\.?\d*$/.test(newItem.cost)) newErrors.price = `Price must be valid number ${toast.error('Price must be valid number')}`;
        if (!/^\d*\.?\d*$/.test(newItem.quantity)) newErrors.price = `Price must be valid number ${toast.error('Price must be valid number')}`;
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
                    option: newItem.option
                }
                await createItem(parseItem);
                toast.success('Data has been saved thanks!')
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

    // OPTIONS
    const handleOptionChange = (e) => {
        setNewItem({ ...newItem, option: e.target.value });
    };

    // FOR ERROR IF FIELD IS EMPTY
    const getFieldClass = (fieldName) => {
        return errors[fieldName] ?
            'border-rose-600 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-rose-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-rose-600'
            :
            'border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
    };

    return (
        <Fragment>
            <h2>Add New Item</h2>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Category
                    </label>
                    <input
                        className={`${getFieldClass('category')} bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={newItem.category}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Name
                    </label>
                    <input
                        className={`${getFieldClass('name')} bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newItem.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label
                        htmlFor="option"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Option
                    </label>
                    {showOption ? (
                        <input
                            className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="option"
                            value={newItem.option}
                            onChange={(e) => handleOptionChange(e)}
                        />
                    ) : (
                        ""
                    )}
                    <button
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        type="button"
                        onClick={() => setShowOption(!showOption)}
                    >
                        Add Option
                    </button>
                </div>
                <div>
                    <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Price
                    </label>
                    <input
                        className={`${getFieldClass('price')} bg-gray-50 border text-gray-900 text-sm rounded-lg block w-80 p-2.5`}
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor="quantity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Stock
                    </label>
                    <input
                        className={`${getFieldClass('quantity')} bg-gray-50 border text-gray-900 text-sm rounded-lg block w-80 p-2.5`}
                        type="text"
                        name="quantity"
                        placeholder="Stock"
                        value={newItem.quantity}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor="Cost"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Cost
                    </label>
                    <input
                        className={`${getFieldClass('cost')} bg-gray-50 border text-gray-900 text-sm rounded-lg block w-80 p-2.5`}
                        type="text"
                        name="cost"
                        placeholder="Cost"
                        value={newItem.cost}
                        onChange={handleChange}
                    />
                </div>
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

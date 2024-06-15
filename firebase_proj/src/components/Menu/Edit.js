import React, { Fragment, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getSpecificItem, updateItem } from "../../config/utils/FireStoreServices";
import FormInput from "../FormError/FormInput";

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [errors, setErrors] = useState({});
    const [item, setItem] = useState(null);
    const [newItem, setNewItem] = useState({
        name: "",
        category: "",
        price: "",
        cost: "",
        stock: "",
        option: [],
    });

    const handleFetchError = useCallback((message, error) => {
        console.error(message, error);
        toast.error(message);
        navigate("/app/menu");
    }, [navigate]);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case "name":
                return value ? "" : "Name is required";
            case "category":
                return value ? "" : "Category is required";
            case "price":
                return /^\d*\.?\d*$/.test(value) ? value ? "" : "Price is required" : "Price must be a valid number";
            case "cost":
                return /^\d*\.?\d*$/.test(value) ? value ? "" : "Cost is required" : "Cost must be a valid number";
            case "stock":
                return /^\d*\.?\d*$/.test(value) ? value ? "" : "Stock is required" : "Stock must be a valid number";
            default:
                return "";
        }
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const fetchedItem = await getSpecificItem(id);
                if (fetchedItem) {
                    setItem(fetchedItem);
                    setNewItem({
                        name: fetchedItem.name,
                        category: fetchedItem.category,
                        price: fetchedItem.price.toString(),
                        cost: fetchedItem.cost.toString(),
                        stock: fetchedItem.stock.toString(),
                        option: fetchedItem.option || [],
                    });
                } else {
                    handleFetchError("Item not found.");
                }
            } catch (error) {
                handleFetchError("Failed to fetch item.", error);
            }
        };

        fetchItem();
    }, [id, handleFetchError]);

    const validateForm = () => {
        const newErrors = {};
        if (!newItem.name) newErrors.name = "Name is required";
        if (!newItem.category) newErrors.category = "Category is required";
        if (!newItem.price) newErrors.price = "Price is required";
        if (!newItem.cost) newErrors.cost = "Cost is required";
        if (!newItem.stock) newErrors.stock = "Stock is required";

        // Validate price, cost, and stock as numbers
        if (!/^\d*\.?\d*$/.test(newItem.price))
            newErrors.price = "Price must be a valid number";
        if (!/^\d*\.?\d*$/.test(newItem.cost))
            newErrors.cost = "Cost must be a valid number";
        if (!/^\d*\.?\d*$/.test(newItem.stock))
            newErrors.stock = "Stock must be a valid number";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleEditSave = async () => {
        try {
            if (validateForm()) {
                const parsedItem = {
                    name: newItem.name,
                    category: newItem.category,
                    price: parseFloat(newItem.price),
                    cost: parseFloat(newItem.cost),
                    stock: parseFloat(newItem.stock),
                    option: newItem.option.filter(opt => opt.trim() !== ""),
                };
                await updateItem(id, parsedItem);
                toast.success("Item updated successfully.");
                navigate("/app/menu");
            } else {
                toast.error("Please fix the form errors.");
            }
        } catch (error) {
            console.error("Error updating item: ", error);
            toast.error("Failed to update item.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevItem => ({
            ...prevItem,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    const handleBlur = (fieldName) => {
        setErrors((prev) => ({
            ...prev,
            [fieldName]: validateField(fieldName, newItem[fieldName])
        }));
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newItem.option];
        updatedOptions[index] = value;
        setNewItem(prevItem => ({
            ...prevItem,
            option: updatedOptions,
        }));
    };

    const addOptionInput = () => {
        setNewItem(prevItem => ({
            ...prevItem,
            option: [...prevItem.option, ""],
        }));
    };

    const removeOptionInput = (index) => {
        const updatedOptions = newItem.option.filter((_, i) => i !== index);
        setNewItem(prevItem => ({
            ...prevItem,
            option: updatedOptions,
        }));
    };

    if (!item) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <h2>Edit Item</h2>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <FormInput
                    fieldName="category"
                    label="Category"
                    type="text"
                    value={newItem.category}
                    error={errors.category}
                    onChange={handleChange}
                    onBlur={() => handleBlur("category")}
                    placeholder="Category"
                />
                <FormInput
                    fieldName="name"
                    label="Name"
                    type="text"
                    value={newItem.name}
                    error={errors.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
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
                        <div className="flex items-center mb-2" key={index}>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder="Option"
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mr-2"
                            />
                            <button
                                type="button"
                                onClick={() => removeOptionInput(index)}
                                className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="flex mb-2 mr-1">
                        <button
                            type="button"
                            onClick={addOptionInput}
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
                    onBlur={() => handleBlur("price")}
                    placeholder="Price"
                />
                <FormInput
                    fieldName="stock"
                    label="Stock"
                    type="text"
                    value={newItem.stock}
                    error={errors.stock}
                    onChange={handleChange}
                    onBlur={() => handleBlur("stock")}
                    placeholder="Stock"
                />
                <FormInput
                    fieldName="cost"
                    label="Cost"
                    type="text"
                    value={newItem.cost}
                    error={errors.cost}
                    onChange={handleChange}
                    onBlur={() => handleBlur("cost")}
                    placeholder="Cost"
                />
            </div>
            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleEditSave}>
                Save Changes
            </button>
            <Link to="/app/menu" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Cancel
            </Link>
        </Fragment>
    );
};

export default Edit;

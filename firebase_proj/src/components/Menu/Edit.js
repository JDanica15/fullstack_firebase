import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Edit = ({ item, onSave, onCancel }) => {
    // const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const [newItem, setNewItem] = useState({
        name: "",
        category: "",
        price: 0,
        cost: 0,
        quantity: 0,
        option: "",
    });

    useEffect(() => {
        if (item) {
            setNewItem(item);
        }
    }, [item]);

    const handleEditSave = async () => {
        try {
            await onSave(newItem);
        } catch (error) {
            console.log(error);
        }
    };

    // OPTIONS
    const handleOptionChange = (e) => {
        setNewItem({ ...newItem, option: e.target.value });
    };


    console.log(item, 'option edit')

    return (
        <Fragment>
            <h2>Edit Item</h2>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Category
                    </label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        placeholder="Category"
                        name="category"
                        value={newItem.category}
                        onChange={(e) =>
                            setNewItem({ ...newItem, category: e.target.value })
                        }
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                </div>
                <div>
                    <label
                        htmlFor="options"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Option
                    </label>
                    {item.option !== "" ? (
                        <input
                            className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="option"
                            value={newItem.option}
                            onChange={(e) => handleOptionChange(e)}
                        />
                    ) : (
                        <Fragment>
                            {
                                showOption ?
                                <input
                                className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                name="option"
                                value={newItem.option}
                                onChange={(e) => handleOptionChange(e)}
                            /> : ''
                            }
                            <button
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                type="button"
                                onClick={() => setShowOption(!showOption)}
                            >
                                Add Option
                            </button>
                        </Fragment>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Price
                    </label>
                    <input
                        className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="number"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
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
                        className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="number"
                        placeholder="Stock"
                        value={newItem.quantity}
                        onChange={(e) =>
                            setNewItem({ ...newItem, quantity: e.target.value })
                        }
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
                        className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="number"
                        placeholder="Cost"
                        value={newItem.cost}
                        onChange={(e) => setNewItem({ ...newItem, cost: e.target.value })}
                    />
                </div>
            </div>

            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleEditSave}>Save</button>
            <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" type="button" onClick={onCancel}>Cancel</button>
        </Fragment>
    );
};

export default Edit;

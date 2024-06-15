import React, { Fragment, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Table = ({ handleEdit, handleDelete, menuItems, loading, ...props }) => {
  const [searchItem, setSearchItem] = useState('');

  // Function for filtering data based on search input
  const filteredData = menuItems.filter(item =>
    item.category.toLowerCase().includes(searchItem.toLowerCase()) ||
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  // Display filtered data when loaded
  const displayData = loading ? [{ id: 'loading', name: 'Fetching data...', category: '', price: '', cost: '', quantity: '', option: [], action: [] }] : filteredData;

  return (
    <div className="relative">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative w-80 mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          value={searchItem}
          onChange={e => setSearchItem(e.target.value)}
          id="default-search"
          className="block w-80 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
        />
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Cost</th>
              <th scope="col" className="px-6 py-3">Stock</th>
              <th scope="col" className="px-6 py-3">Options</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((item, index) => (
              <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${item.id === 'loading' ? 'animate-pulse' : ''}`}>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">{item.cost}</td>
                <td className="px-6 py-4">{item.quantity}</td>

                <Fragment>
                  {item.action && item.action.length === 0 ?
                    <Fragment>
                      <td className="px-6 py-4">{item.option}</td>
                      <td className="px-6 py-4 text-left">
                        {item.action}
                      </td>
                    </Fragment>
                    :
                    <Fragment>
                      <td className="px-6 py-4">{Array.isArray(item.option) && item.option.length > 0 ? item.option.join(', ') : "None"}</td>
                      <td className="px-6 py-4 text-left">
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline m-2" onClick={() => handleEdit(item)}>
                          Edit
                        </button>
                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </td>
                    </Fragment>
                  }
                </Fragment>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Table = ({ handleEdit, handleDelete, menuItems, loading, ...props }) => {
  const [searchItem, setSearchItem] = useState('');

  // FUNC FOR SEARCH
  const filteredData = menuItems.filter(item =>
    item.category.toLowerCase().includes(searchItem.toLowerCase()) ||
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  // PASS THE DATA AFTER SEARCH
  const currentData = filteredData.slice();
  return (
    <div className="relative">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative w-80 mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input type="search" value={searchItem} onChange={e => setSearchItem(e.target.value)} id="default-search" className="block w-80 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />

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
            {
              loading ? <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">Fetching data...</td>
              </tr> :
                currentData.map((i, e) => {
                  return (
                    <tr key={e} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-6 py-4">{i.name}</td>
                      <td className="px-6 py-4">{i.category}</td>
                      <td className="px-6 py-4">{i.price}</td>
                      <td className="px-6 py-4">{i.cost}</td>
                      <td className="px-6 py-4">{i.quantity}</td>
                      <td className="px-6 py-4">
                        {i.option !== "" ? i.option : "None"}
                      </td>
                      <td className="px-6 py-4 text-left">
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline m-2" onClick={() => handleEdit(i)}>
                          Edit
                        </button>
                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => handleDelete(i.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

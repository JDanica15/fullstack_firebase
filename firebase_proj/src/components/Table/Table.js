import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Table = ({ handleEdit, handleDelete, menuItems, loading }) => {
  const [searchItem, setSearchItem] = useState("");

  // Function for searching and filtering data
  const filteredData = menuItems.filter(
    (item) =>
      item.category.toLowerCase().includes(searchItem.toLowerCase()) ||
      item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  // Display loading message while fetching data
  const displayData = loading
    ? [{ id: "loading", name: "Fetching data...", category: "", price: "", cost: "", stock: "", option: [] }]
    : filteredData;


  const noData = !loading && filteredData.length === 0;

  return (
    <div className="relative">
      <label htmlFor="default-search" className="sr-only">
        Search
      </label>
      <div className="relative w-80 mb-5">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
        />
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" aria-label="Menu Items">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Cost
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Options
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {noData ?
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td colSpan="7" className="px-6 py-4">
                  No data to display...
                </td>
              </tr> :
              displayData.map((item, index) =>
                item.id === "loading" ? (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td colSpan="7" className="px-6 py-4">
                      {item.name}
                    </td>
                  </tr>
                ) : (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">{item.cost}</td>
                    <td className="px-6 py-4">{item.stock}</td>
                    <td className="px-6 py-4">{Array.isArray(item.option) && item.option.length > 0 ? item.option.join(", ") : "None"}</td>
                    <td className="px-6 py-4 text-left">
                      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline m-2" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

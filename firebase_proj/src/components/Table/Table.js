import React from "react";

const Table = ({handleEdit, handleDelete, menuItems, loading, ...props}) => {

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
          menuItems.map((i, e) => {
            return (
              <tr key={i.key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
  );
};

export default Table;

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Table = ({ handleEdit, handleDelete, menuItems, loading }) => {
	const [searchItem, setSearchItem] = useState("");
	const [itemsPerPage, setItemsPerPage] = useState(5);

	// Function for searching and filtering data
	const filteredData = menuItems.filter(
		(item) =>
			item.category.toLowerCase().includes(searchItem.toLowerCase()) ||
			item.name.toLowerCase().includes(searchItem.toLowerCase())
	);

	// Pagination
	const startIndex = 0;
	const endIndex = startIndex + itemsPerPage;
	const displayedData = filteredData.slice(startIndex, endIndex);

	// Fetching data
	const displayData = loading
		? [{ id: "loading", name: "Fetching data...", category: "", price: "", cost: "", stock: "", option: [] }]
		: displayedData;

	const noData = !loading && filteredData.length === 0;

	// Generate options for items per page based on filteredData length then options should be [5,10,15] etc...
	const options = Array.from(
		{ length: Math.ceil(filteredData.length / 5) },
		(_, index) => (index + 1) * 5
	);

	// Function to format currency as PHP
	const formatCurrencyPHP = (amount) => {
		return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
	};

	return (
		<div className="relative">
			<div className="flex items-center mb-4">
				<label htmlFor="default-search" className="sr-only">
					Search
				</label>
				<div className="relative w-80">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<MagnifyingGlassIcon
							aria-hidden="true"
							className="w-4 h-4 text-gray-500 dark:text-gray-400"
						/>
					</div>
					<input
						type="search"
						value={searchItem}
						onChange={(e) => setSearchItem(e.target.value)}
						id="default-search"
						className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Search"
					/>
				</div>
				<div className="ml-auto">
					<label htmlFor="itemsPerPage" className="mr-2">
						Items per page:
					</label>
					<select
						id="itemsPerPage"
						value={itemsPerPage}
						onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
						className="p-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
					>
						{options.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="overflow-x-auto shadow-md sm:rounded-lg">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50 dark:bg-gray-700">
						<tr>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Name
							</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Category
							</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Price
							</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Cost
							</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Stock
							</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Options
							</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{noData ? (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<td colSpan="7" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									No data to display...
								</td>
							</tr>
						) : (
							displayData.map((item, index) =>
								item.id === "loading" ? (
									<tr key={index} className="animate-pulse">
										<td colSpan="7" className="px-6 py-4 whitespace-nowrap">
											<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
										</td>
									</tr>
								) : (
									<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											{item.name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{item.category}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{formatCurrencyPHP(item.price)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{formatCurrencyPHP(item.cost)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{item.stock}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{Array.isArray(item.option) && item.option.length > 0 ? item.option.join(", ") : "None"}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<button className="text-blue-600 dark:text-blue-400 hover:underline" onClick={() => handleEdit(item)}>
												Edit
											</button>
											<button className="text-red-600 dark:text-red-400 hover:underline ml-2" onClick={() => handleDelete(item.id)}>
												Delete
											</button>
										</td>
									</tr>
								)
							)
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;

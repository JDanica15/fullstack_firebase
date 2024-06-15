// components/Dashboard/Dashboard.js

import React, { useEffect, useState } from "react";
import { readItems } from "../../config/utils/FireStoreServices";
import { ShoppingBagIcon, WalletIcon, ServerIcon } from "@heroicons/react/24/outline";
import Card from "../Card/Card";
import CategoryChart from "../Chart/CategoryChart";
import MonthChart from "../Chart/MonthChart";

const Dashboard = () => {
	const [menuItem, setMenuItem] = useState([]);
	const [itemsByMonth, setItemsByMonth] = useState({});

	useEffect(() => {
		const fetchItems = async () => {
			const items = await readItems();
			setMenuItem(items);
			groupItemsByMonth(items);
		};
		fetchItems();
	}, []);


	const groupItemsByMonth = (items) => {
		const grouped = items.reduce((acc, item) => {
			const date = new Date(item.createdAt);
			const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });

			if (!acc[month]) {
				acc[month] = 0;
			}
			acc[month]++;
			return acc;
		}, {});
		setItemsByMonth(grouped);
	};

	const totalStock = menuItem.reduce((acc, item) => acc + parseFloat(item.stock), 0);
	const overAllPrice = menuItem.reduce((acc, item) => acc + parseFloat(item.price), 0);
	const dataCount = menuItem.length;

	// Transform the data for the category chart
	const categoryCount = menuItem.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = { price: 0, stock: 0 };
		}
		acc[item.category].price += parseFloat(item.price);
		acc[item.category].stock += parseFloat(item.stock);
		return acc;
	}, {});

	const categories = Object.keys(categoryCount);
	const priceData = categories.map(category => categoryCount[category].price);
	const stockData = categories.map(category => categoryCount[category].stock);

	const categoryChartData = {
		labels: categories,
		datasets: [
			{
				label: 'Price',
				data: priceData,
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
			},
			{
				label: 'Stock',
				data: stockData,
				backgroundColor: 'rgba(153, 102, 255, 0.2)',
				borderColor: 'rgba(153, 102, 255, 1)',
				borderWidth: 1,
			},
		],
	};

	// Prepare data for items created per month bar chart
	const months = Object.keys(itemsByMonth);
	const itemsCreatedData = months.map(month => itemsByMonth[month]);

	const MonthChartData = {
		labels: months,
		datasets: [
			{
				label: 'Items Created',
				data: itemsCreatedData,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
				<Card IconComponent={<ShoppingBagIcon />} total={totalStock} title="Overall Stock" />
				<Card IconComponent={<WalletIcon />} total={overAllPrice} title="Expected Sales" />
				<Card IconComponent={<ServerIcon />} total={dataCount} title="Total Data Count" />
			</div>
			<div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
				<div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
					<CategoryChart data={categoryChartData} />
				</div>
				<div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
					<MonthChart data={MonthChartData} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

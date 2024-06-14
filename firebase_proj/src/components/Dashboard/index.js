import React, { useEffect, useState } from "react";
import { readItems } from "../../config/utils/FireStoreServices";
import { ShoppingBagIcon, WalletIcon } from "@heroicons/react/24/outline";
import Card from "../Card/Card"

const Dashboard = () => {
	const [menuItem, setMenuItem] = useState([]);

	useEffect(() => {
		fetchItems();
	}, []);

	const fetchItems = async () => {
		const items = await readItems();
		setMenuItem(items);
	};
	const totalStock = menuItem.reduce((acc, item) => acc + parseFloat(item.quantity), 0)
	const overAllPrice = menuItem.reduce((acc, item) => acc + parseFloat(item.price), 0)

	return (
		<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
				<Card IconComponent={<ShoppingBagIcon />} total={totalStock} title="Overall Stock" />
				<Card IconComponent={<WalletIcon />} total={overAllPrice} title="Expected Sales" />
			</div>
		</div>
	);
};

export default Dashboard;

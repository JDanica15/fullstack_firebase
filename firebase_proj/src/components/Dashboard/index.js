import React, { useEffect, useState } from "react";
import { readItems } from "../../config/utils/FireStoreServices";

const Dashboard = () => {
	const [menuItem, setMenuItem] = useState([]);

	useEffect(() => {
		fetchItems();
	  }, []);
	
	  const fetchItems = async () => {
		const items = await readItems();
		setMenuItem(items);
	  };
	
console.log(menuItem, 'dashboard')
	return (
		<div>
			Dashboard
		</div>
	);
};

export default Dashboard;

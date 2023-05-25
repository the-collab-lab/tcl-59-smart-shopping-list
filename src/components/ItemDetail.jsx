//import React from 'react';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getItem } from '../api/firebase';

const ItemDetail = ({ listToken }) => {
	const { id } = useParams();
	const [details, setDetails] = useState(null);

	useEffect(() => {
		const fetchItem = async () => {
			const item = await getItem(listToken, id);
			setDetails(item);
		};

		fetchItem();
	}, [listToken, id]);

	if (!details) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<img
				src="https://app.ineedtobuy.xyz/img/groceries.svg"
				alt="Placeholder"
				className="w-64 h-64 mb-4"
			/>
			<h1 className="text-4xl font-bold capitalize mb-4">{details.name}</h1>
			<ul className="list-disc text-2x1 text-left">
				<li>Total Purchases: {details.totalPurchases}</li>
				<li>
					Date Last Purchased:{' '}
					{details.dateLastPurchased
						? details.dateLastPurchased.toDate().toLocaleDateString()
						: 'N/A'}
				</li>
				<li>
					Date Next Purchased:{' '}
					{details.dateNextPurchased
						? details.dateNextPurchased.toDate().toLocaleDateString()
						: 'N/A'}
				</li>
			</ul>
			<Link to="/list" className="mt-4 text-blue-500">
				Back to List
			</Link>
		</div>
	);
};

export default ItemDetail;

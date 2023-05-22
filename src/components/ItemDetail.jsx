import React from 'react';

const ItemDetail = ({ details }) => {
	console.log(details);
	return (
		<div>
			<h1>{details.name}</h1>
			<span>Total Purchase: {details.totalPurchases}</span>
		</div>
	);
};

export default ItemDetail;

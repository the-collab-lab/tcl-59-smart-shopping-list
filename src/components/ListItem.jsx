import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api';

export function ListItem({ item, listToken }) {
	const [counter, setCounter] = useState(0);

	const handleUpdate = async (isChecked) => {
		let day = new Date();
		let purchaseCounter = item.totalPurchases + counter;
		let status = isChecked;
		const newData = { day, purchaseCounter, status };
		try {
			if (isChecked) {
				await updateItem(listToken, item.id, newData);
				console.log('success');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<li className="ListItem">
			<label htmlFor={item.id}>
				<input
					type="checkbox"
					id={item.id}
					defaultChecked={item.purchased}
					onChange={(e) => {
						handleUpdate(e.target.checked);
						let updateCount = counter + 1;

						setCounter(updateCount);
					}}
				/>
				{item.name}
			</label>
		</li>
	);
}

import './ListItem.css';
import { updateItem } from '../api';
import { sub } from 'date-fns';

export function ListItem({ item, listToken }) {
	const handleUpdate = async (isChecked) => {
		let day = Date.now();
		let purchaseCounter = item.totalPurchases + 1;

		try {
			if (isChecked) {
				const newData = { day, purchaseCounter };
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
					defaultChecked={sub(new Date(), { days: 1 }) < item.dateLastPurchased}
					disabled={sub(new Date(), { days: 1 }) < item.dateLastPurchased}
					onChange={(e) => {
						handleUpdate(e.target.checked);
					}}
				/>
				{item.name}
			</label>
		</li>
	);
}

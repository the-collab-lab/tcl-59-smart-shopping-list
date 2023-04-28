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

	const isRecentlyPurchased =
		sub(new Date(), { days: 1 }) < item.dateLastPurchased;

	return (
		<li
			className="ListItem"
			title={isRecentlyPurchased && 'You recently purchased this item'}
		>
			<label htmlFor={item.id}>
				<input
					type="checkbox"
					id={item.id}
					defaultChecked={isRecentlyPurchased}
					disabled={isRecentlyPurchased}
					onChange={(e) => {
						handleUpdate(e.target.checked);
					}}
					title={isRecentlyPurchased && 'You recently purchased this item'}
				/>
				{item.name}
			</label>
		</li>
	);
}

import './ListItem.css';
import { updateItem } from '../api';
import { sub } from 'date-fns';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

export function ListItem({ item, listToken }) {
	const handleUpdate = async (isChecked) => {
		let day = Date.now();
		let purchaseCounter = item.totalPurchases + 1;
		let nextDay = calculateEstimate(item.dateNextPurchased);
		console.log(nextDay);
		try {
			if (isChecked) {
				const newData = { day, purchaseCounter, nextDay };
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
			title={
				isRecentlyPurchased ? 'You recently purchased this item' : undefined
			}
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
				/>
				{item.name}
			</label>
		</li>
	);
}

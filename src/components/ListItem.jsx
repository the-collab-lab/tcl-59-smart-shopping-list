import './ListItem.css';
import { updateItem } from '../api';
import { sub } from 'date-fns';
import { getFutureDate } from '../utils';
import { getDaysBetweenDates } from '../utils/dates';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

export function ListItem({ item, listToken }) {
	const handleUpdate = async (isChecked) => {
		let day = new Date();
		let purchaseCounter = item.totalPurchases + 1;
		const dateLastPurchaseToDate = item.dateLastPurchased
			? item.dateLastPurchased.toDate()
			: item.dateCreated.toDate();
		const dateNextPurchasedToDate = item.dateNextPurchased.toDate();
		try {
			if (isChecked) {
				const previousEstimate = getDaysBetweenDates(
					dateNextPurchasedToDate,
					dateLastPurchaseToDate,
				);
				const daysSinceLastPurchase = getDaysBetweenDates(
					dateLastPurchaseToDate,
					new Date(),
				);
				const nextEstimate = calculateEstimate(
					previousEstimate,
					daysSinceLastPurchase,
					purchaseCounter,
				);
				const newData = {
					day,
					purchaseCounter,
					dateNextPurchased: getFutureDate(nextEstimate),
				};

				await updateItem(listToken, item.id, newData);
				console.log('success');
			}
		} catch (error) {
			console.error(error);
		}
	};
	const milliseconds = item.dateLastPurchased
		? new Date(item.dateLastPurchased.toDate()).getTime()
		: sub(new Date(), { days: 1 });

	const isRecentlyPurchased = sub(new Date(), { days: 1 }) < milliseconds;

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

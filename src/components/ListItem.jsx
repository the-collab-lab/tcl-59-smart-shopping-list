import './ListItem.css';
import { updateItem } from '../api';
import { sub } from 'date-fns';
import { getFutureDate } from '../utils';
import { getDaysBetweenDates } from '../utils/dates';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { differenceInDays } from 'date-fns';

export function ListItem({ item, listToken }) {
	const howSoonToBuy = () => {
		const urgency = differenceInDays(
			item.dateNextPurchased.toDate(),
			Date.now(),
		);

		const inactive = differenceInDays(
			Date.now(),
			item.dateLastPurchased.toDate(),
		);

		if (urgency <= 7 && inactive < 60) {
			return <div className="soon">Soon</div>;
		} else if (urgency > 7 && urgency < 30 && inactive < 60) {
			return <div className="kindof">Kind of soon</div>;
		} else if (urgency >= 30 && urgency < 60 && inactive < 60) {
			return <div className="notsoon">Not soon</div>;
		} else if (urgency <= 0 && inactive < 60) {
			return <div className="overdue">Purchase overdue</div>;
		} else if (inactive >= 60) {
			return <div className="inactive">Inactive</div>;
		}
	};

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
			{howSoonToBuy()}
		</li>
	);
}

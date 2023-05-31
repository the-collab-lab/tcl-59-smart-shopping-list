import './ListItem.css';
import { deleteItem, updateItem } from '../api';
import { sub } from 'date-fns';
import { getFutureDate } from '../utils';
import { getDaysBetweenDates } from '../utils/dates';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdInformationCircleOutline } from 'react-icons/io';

export function ListItem({ item, listToken, onSelected, openModal }) {
	const overdueItems = getDaysBetweenDates(
		item.dateNextPurchased.toDate(),
		new Date().setHours(0, 0, 0, 0),
	);

	const getProgressBarStat = () => {
		const dateLastPurchaseToDate = item.dateLastPurchased
			? item.dateLastPurchased.toDate()
			: item.dateCreated.toDate();

		const daysTillPurchase = getDaysBetweenDates(
			item.dateNextPurchased.toDate(),
			new Date().setHours(0, 0, 0, 0),
		);

		const dateSinceLastPurchase = getDaysBetweenDates(
			new Date().setHours(0, 0, 0, 0),
			dateLastPurchaseToDate,
		);

		if (dateSinceLastPurchase >= 60) {
			return 'progress_inactive';
		}

		if (dateSinceLastPurchase < 60 && overdueItems < 0) {
			return 'progress_overdue';
		}

		if (daysTillPurchase <= 7) {
			return 'progress_soon';
		}

		if (daysTillPurchase > 7 && daysTillPurchase < 30) {
			return 'progress_kind_of_soon';
		}

		if (daysTillPurchase >= 30 && daysTillPurchase < 60) {
			return 'progress_not_soon';
		}
	};

	const getProgressBarText = () => {
		const overdueItems = getDaysBetweenDates(
			item.dateNextPurchased.toDate(),
			new Date().setHours(0, 0, 0, 0),
		);
		const dateLastPurchaseToDate = item.dateLastPurchased
			? item.dateLastPurchased.toDate()
			: item.dateCreated.toDate();
		const daysTillPurchase = getDaysBetweenDates(
			item.dateNextPurchased.toDate(),
			new Date().setHours(0, 0, 0, 0),
		);

		const dateSinceLastPurchase = getDaysBetweenDates(
			new Date().setHours(0, 0, 0, 0),
			dateLastPurchaseToDate,
		);

		if (dateSinceLastPurchase >= 60) {
			return 'Inactive';
		}

		if (dateSinceLastPurchase < 60 && overdueItems < 0) {
			return 'Overdue';
		}

		if (daysTillPurchase <= 7) {
			return 'Soon';
		}

		if (daysTillPurchase > 7 && daysTillPurchase < 30) {
			return 'Kind of soon';
		}

		if (daysTillPurchase >= 30 && daysTillPurchase < 60) {
			return 'Not soon';
		}
	};

	const addTitle = () => {
		if (getProgressBarText() === 'Soon') {
			return 'You may need to buy this item within 7 days';
		}
		if (getProgressBarText() === 'Kind of soon') {
			return 'You may need to buy this item within 30 days';
		}
		if (getProgressBarText() === 'Not soon') {
			return 'You may need to buy this item within 60 days';
		}
		if (getProgressBarText() === 'Inactive') {
			return "It's over 60 days since you last purchased this item";
		}
		if (getProgressBarText() === 'Overdue') {
			return 'This item is due for purchase!';
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
					new Date(),
					dateLastPurchaseToDate,
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

	const handleDelete = async () => {
		if (window.confirm('Are you sure you want to delete this item?')) {
			await deleteItem(listToken, item.id);
		}
	};

	const handleSelectedItem = (item) => {
		onSelected(item);

		openModal();
	};

	return (
		<li
			className="ListItem"
			title={
				isRecentlyPurchased ? 'You recently purchased this item' : undefined
			}
		>
			<div className="flex items-center justify-between w-full">
				<label htmlFor={item.id} className="custom-checkbox">
					<div className="checkbox">
						<input
							className="checkbox-input"
							type="checkbox"
							id={item.id}
							defaultChecked={isRecentlyPurchased}
							disabled={isRecentlyPurchased}
							onChange={(e) => {
								handleUpdate(e.target.checked);
							}}
						/>
						<span className="checkmark"></span>
					</div>

					{item.name}
				</label>
				<IoMdInformationCircleOutline
					onClick={() => handleSelectedItem(item)}
					tabIndex={0}
					role="button"
					title="more details"
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							handleSelectedItem(item);
						}
					}}
				/>

				<aside className="progress-bar" title={addTitle()}>
					<div className={getProgressBarStat()}>
						<small className="text-white">{getProgressBarText()}</small>
					</div>
				</aside>
			</div>

			<div className="pl-4">
				<RiDeleteBin6Line onClick={handleDelete} className="cursor-pointer" />
			</div>
		</li>
	);
}

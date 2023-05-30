import React, { useEffect } from 'react';
import logo from '../assets/one.jpg';
import { format } from 'date-fns';

const ItemDisplay = ({ closeModal, details }) => {
	useEffect(() => {
		const mainRef = document.getElementById('modal');

		window.addEventListener('click', function (e) {
			if (e.target === mainRef) {
				closeModal();
			}
		});
	}, [closeModal]);

	const dateLastPurchased =
		details.dateLastPurchased === null
			? details.dateCreated
			: details.dateLastPurchased;

	const convertToDate = (timestamp) => {
		let dateValue = timestamp.toDate();
		let date = dateValue.getDate();
		let monthName = format(new Date(2023, dateValue.getMonth()), 'MMMM');
		return [date, ' ', monthName];
	};

	return (
		<main
			id="modal"
			className="fixed z-[1] py-[100px]  left-0 top-0 w-full h-full overflow-auto bg-[rgba(0,0,0,0.4)]"
		>
			<div className="bg-[#fefefe] m-auto p-5 border-[1px solid #888] min-[1300px]:w-2/5 min-[320px]:w-[60%] transition-all">
				<span
					onClick={() => closeModal()}
					className="text-[#aaaaaa] float-right text-6xl font-bold cursor-pointer"
					tabIndex={0}
					role="button"
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							closeModal();
						}
					}}
				>
					&times;
				</span>

				<div className="m-auto w-full text-black">
					<section className="flex flex-col items-center justify-center">
						<img src={logo} alt="" className="w-40 h-48 object-contain" />
						<p className="text-4xl">{details.name}</p>
					</section>
					<section className="mt-16 bg-0 p-4 rounded-lg bg-bgHome">
						<p>Number of Purchases: {details.totalPurchases}</p>
						<p>Last Purchased: {convertToDate(dateLastPurchased)}</p>
						<p>Next Purchase: {convertToDate(details.dateNextPurchased)}</p>
					</section>
				</div>
			</div>
		</main>
	);
};

export default ItemDisplay;

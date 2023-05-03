import './AddItem.css';
import React, { useState } from 'react';
import { addItem } from '../api';

export function AddItem({ listToken, data }) {
	const [itemData, setItemData] = useState({
		itemName: '',
		daysUntilNextPurchase: '7',
	});
	const [success, setSuccess] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [isAdded, setIsAdded] = useState(false);

	function handleChange(event) {
		const { name, value } = event.target;
		// if statement for duplicate entries here

		setItemData((prevFormData) => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	}

	const hideAlert = () => {
		setTimeout(() => {
			setSuccess('');
			setErrorMsg('');
		}, 3000);
	};

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			if (e.target.name === '') {
				setErrorMsg("Please add item's name");
			} else await addItem(listToken, itemData);
			setIsAdded(true);
			setSuccess('Data added successfully');
		} catch (error) {
			setIsAdded(false);
			setErrorMsg('Adding data failed');
			console.log(error);
		}

		setItemData({
			itemName: '',
			daysUntilNextPurchase: '7',
		});

		hideAlert();
	}

	return (
		<>
			<h1 style={{ backgroundColor: 'red', color: 'white' }}>{errorMsg}</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor="itemName">Item name:</label>
				<br />
				<input
					type="text"
					id="itemName"
					name="itemName"
					value={itemData.itemName}
					onChange={handleChange}
				/>

				<fieldset>
					<legend>How soon will you buy this again</legend>
					<label htmlFor="soon">
						<input
							type="radio"
							id="soon"
							name="daysUntilNextPurchase"
							value={7}
							checked={itemData.daysUntilNextPurchase === '7'}
							onChange={handleChange}
						/>
						Soon
					</label>
					<br />

					<label htmlFor="kind-of-soon">
						<input
							type="radio"
							id="kind-of-soon"
							name="daysUntilNextPurchase"
							value={14}
							checked={itemData.daysUntilNextPurchase === '14'}
							onChange={handleChange}
						/>
						kind of Soon
					</label>
					<br />

					<label htmlFor="not-soon">
						<input
							type="radio"
							id="not-soon"
							name="daysUntilNextPurchase"
							value={30}
							checked={itemData.daysUntilNextPurchase === '30'}
							onChange={handleChange}
						/>
						Not Soon
					</label>
				</fieldset>

				<br />
				<div>
					<button>Add Item</button>
				</div>
				<span>{isAdded ? success : errorMsg}</span>
			</form>
		</>
	);
}

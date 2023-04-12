import React, { useState } from 'react';

export function AddItem() {
	const [formData, setFormData] = useState({
		itemData: '',
		dateNextPurchased: ' ',
	});
	function handleChange(event) {
		const { name, value, checked, type } = event.target;
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	}
	function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<form method="post" onSubmit={handleSubmit}>
			<label>
				Item name:
				<br />
				<input
					type="text"
					placeholder=""
					name="itemData"
					value={formData.itemName}
					onChange={handleChange}
				/>
			</label>
			<br />

			<p> How soon will you buy this again? </p>

			<label>
				<input
					type="radio"
					id="soon"
					name="dateNextPurchased"
					value="7"
					checked={formData.dateNextPurchased === '7'}
					onChange={handleChange}
				/>
				Soon
			</label>
			<br />

			<label>
				<input
					type="radio"
					id="kind-of-soon"
					name="dateNextPurchased"
					value={14}
					checked={formData.dateNextPurchased === '14'}
					onChange={handleChange}
				/>
				kind of Soon
			</label>
			<br />

			<label>
				<input
					type="radio"
					id="not-soon"
					name="dateNextPurchased"
					value={30}
					checked={formData.dateNextPurchased === '30'}
					onChange={handleChange}
				/>
				Not Soon
			</label>
			<br />
			<div>
				<button>Add Item</button>
			</div>
		</form>
	);
}

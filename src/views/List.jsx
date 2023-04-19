import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data, listToken }) {
	const [filteredList, setFilteredList] = useState(data);

	console.log(data, listToken);

	const filterSearch = (e) => {
		const query = e.target.value;
		let updatedList = [...data];
		updatedList = updatedList.filter((item) => {
			return item.toLowerCase().includes(query);
		});

		setFilteredList(updatedList);
	};

	return (
		<>
			<label htmlFor="search">Filter items</label>
			<br />
			<input
				placeholder="Type search here"
				onChange={filterSearch}
				id="search"
				type="search"
			/>

			<div>
				{
					<ul>
						{filteredList.map((item) => (
							<ListItem key={item.id} name={item.name} />
						))}
					</ul>
				}
			</div>
		</>
	);
}

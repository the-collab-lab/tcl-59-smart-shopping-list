import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchQuery, setSearchQuery] = useState('');

	const filterList = () => {
		const filteredData = data.filter((item) =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);
		return filteredData;
	};
	return (
		<>
			<div>
				<label htmlFor="filter">Filter Items</label>
				<br />
				<input
					type="search"
					name="filter"
					id="filter"
					placeholder="Start typing here"
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			<ul>
				{filterList().map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}

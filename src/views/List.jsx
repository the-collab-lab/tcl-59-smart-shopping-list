import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data, listToken }) {
	const [searchQuery, setSearchQuery] = useState('');

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

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
				{filteredData.map((item) => (
					<ListItem listToken={listToken} key={item.id} item={item} />
				))}
			</ul>
		</>
	);
}

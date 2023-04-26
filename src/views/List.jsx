import { useState, useEffect } from 'react';
import { ListItem } from '../components';
import { Link } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';

export function List({ data, isLoading }) {
	console.log(data);
	const [searchQuery, setSearchQuery] = useState('');

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);
	if (isLoading) {
		return <BeatLoader color="black" loading={isLoading} size={15} />;
	}
	return (
		<>
			{data.length === 0 ? (
				<>
					<p>There are no items in your list!</p>
					<Link to="/add-item">
						<button>Get started</button>
					</Link>
				</>
			) : (
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
					<ul>
						{filteredData.map((item) => (
							<ListItem key={item.id} name={item.name} />
						))}
					</ul>
				</div>
			)}
		</>
	);
}

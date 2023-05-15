import { useState } from 'react';
import { ListItem } from '../components';
import { Link } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { comparePurchaseUrgency } from '../api';

export function List({ data, isLoading, listToken }) {
	const [searchQuery, setSearchQuery] = useState('');

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const sortedList = filteredData.sort(comparePurchaseUrgency);
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
					<label htmlFor="filter">Filter items</label>
					<br />
					<input
						type="search"
						name="filter"
						id="filter"
						placeholder="Start typing here"
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<ul>
						{sortedList.map((item) => (
							<ListItem listToken={listToken} key={item.id} item={item} />
						))}
					</ul>
				</div>
			)}
		</>
	);
}

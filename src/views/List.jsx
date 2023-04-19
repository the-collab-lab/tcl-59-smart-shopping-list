import { ListItem } from '../components';

export function List({ data, setSearchQuery }) {
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
				{data.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}

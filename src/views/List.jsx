import { useState } from 'react';
import { ListItem } from '../components';
import { Link } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { comparePurchaseUrgency } from '../api';
import { MdOutlineFilterList } from 'react-icons/md';

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
				<div className="">
					<div className="flex w-full mb-12">
						<label htmlFor="filter" className="text-black text-[2.5rem] ">
							<MdOutlineFilterList className="h-[40px]" />
						</label>

						<input
							type="search"
							name="filter"
							id="filter"
							className="w-full bg-inherit border-2 rounded-2xl border-black h-[40px] text-black px-4"
							placeholder="Filter list"
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
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

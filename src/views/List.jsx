import { useState } from 'react';
import { ListItem } from '../components';
import { Link } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { comparePurchaseUrgency } from '../api';
import { MdOutlineFilterList } from 'react-icons/md';
import { IoCreate } from 'react-icons/io5';
import ItemDisplay from '../components/ItemDisplay';

export function List({ data, isLoading, listToken }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [details, setDetails] = useState(null);

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const sortedList = filteredData.sort(comparePurchaseUrgency);
	if (isLoading) {
		return <BeatLoader color="black" loading={isLoading} size={15} />;
	}

	const handleModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};
	return (
		<>
			{data.length === 0 ? (
				<div className="text-black text-5xl">
					<p className="mb-16">There are no items in your list!</p>
					<Link to="/add-item">
						<div className="flex items-center max-w-[30rem] w-[23rem] bg-bgHome hover:bg-[#fc7b68] text-white py-3 px-4 rounded-md">
							<button className="mr-2">Get started</button>
							<IoCreate />
						</div>
					</Link>
				</div>
			) : (
				<>
					<div>
						<div className="flex items-center mb-12 border-2 rounded-2xl border-black h-[35px] text-black absolute top-[10rem] widthStyle">
							<MdOutlineFilterList className="text-[3rem]" />

							<input
								type="search"
								name="filter"
								id="filter"
								className="w-full bg-inherit focus:outline-none"
								placeholder="Filter list"
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<ul>
							{sortedList.map((item) => (
								<ListItem
									listToken={listToken}
									key={item.id}
									item={item}
									setDetails={setDetails}
									handleModal={handleModal}
								/>
							))}
						</ul>
					</div>
					{showModal && (
						<ItemDisplay
							details={details}
							closeModal={closeModal}
							setShowModal={setShowModal}
						/>
					)}
				</>
			)}
		</>
	);
}

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import basket from '../assets/basket1.png';
import { FaListUl } from 'react-icons/fa';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';

export function Home({ handleCreateList, handleJoinList, errorMsg }) {
	const [token, setToken] = useState('');
	const [showJoinForm, setShowJoinForm] = useState(false);
	const navigate = useNavigate();
	const [screenSize, setScreenSize] = useState(window.innerWidth);

	useEffect(() => {
		const handleScreenSize = () => {
			setScreenSize(window.innerWidth);
		};
		window.addEventListener('resize', handleScreenSize);

		return () => {
			window.removeEventListener('resize', handleScreenSize);
		};
	}, [screenSize]);

	function handleSubmit(e) {
		e.preventDefault();
		handleJoinList(token);
		navigate('/list');
	}

	const handleShowForm = () => {
		setShowJoinForm(true);
	};

	return (
		<main className="flex flex-col justify-between bg-bgHome">
			<header className="flex pl-4 mt-4">
				<img src={basket} alt="" width={50} height={40} />
				<h1 className="font-bold text-[4rem] text-black font-logo ml-4">
					SmartBasket
				</h1>
			</header>
			<div className="w-96 h-96 m-auto flex flex-col items-center">
				<img src={basket} alt="" />
				<span className="h-10 w-52 boxShadow mt-[-30px]"></span>
			</div>

			<section
				className={`text-black bg-white rounded-tl-[10rem] flex flex-col items-center  min-h-[25rem] px-4 ${
					screenSize <= 500 ? 'py-[5.5rem]' : 'py-8'
				}`}
			>
				<h2
					className={`font-bold mb-8 ${
						screenSize <= 500 ? 'pl-4 text-[2.2rem]' : 'pl-0 text-4xl'
					}`}
				>
					Welcome to your smart shopping list!
				</h2>
				<div
					onClick={() => console.log('Creating new lists is disabled')}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							console.log('Creating new lists is disabled');
						}
					}}
					role="button"
					tabIndex={0}
					className="flex items-center justify-center max-w-[30rem] w-[23rem] bg-bgHome hover:bg-[#fc7b68] text-white py-3 px-4 rounded-md"
				>
					<button className="mr-4 text-4xl">Create list</button>
					<FaListUl className="text-4xl" />
				</div>

				<article>
					<button
						onClick={handleShowForm}
						className={`text-2xl ${
							showJoinForm ? 'mt-8' : 'mt-20'
						} cursor-pointer hover:underline hover:text-blue-400`}
						tabIndex={0}
					>
						Click to join an existing shopping list by entering a three word
						token
					</button>
					{showJoinForm && (
						<form onSubmit={handleSubmit} className="text-center flex flex-col">
							<input
								className="bg-inherit text-4xl border-0 mt-8 focus:outline-none text-center"
								id="listToken"
								type="text"
								name="listToken"
								placeholder="Share token"
								onChange={(e) => setToken(e.target.value)}
								value={token.listToken}
							/>
							<span className="border inline-block mb-4"></span>
							<div>
								<button className="bg-bgHome hover:bg-[#fc7b68] py-2 px-4 rounded-lg text-white">
									Join an existing List
								</button>
							</div>
						</form>
					)}
				</article>
				<p className="text-red-500">{errorMsg}</p>
			</section>
			<ArchivalNoticeModal />
		</main>
	);
}

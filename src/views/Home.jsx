import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import basket from '../assets/basket1.png';

export function Home({ handleCreateList, handleJoinList, errorMsg }) {
	const [token, setToken] = useState('');
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		handleJoinList(token);
		navigate('/list');
	}

	return (
		<main className="flex flex-col justify-between">
			<header>
				<h1 className="font-bold text-[3rem]">SmartBasket</h1>
			</header>
			<div className="w-96 h-96 m-auto flex flex-col items-center">
				<img src={basket} alt="" />
				<span className="h-10 w-52 boxShadow mt-[-30px]"></span>
			</div>

			<section className="text-black bg-white h-64 rounded-tl-[10rem] flex flex-col items-center">
				<button onClick={handleCreateList}>Create List</button>

				<article className="">
					<p>Join an existing shopping list by entering a three word token</p>
					<form onSubmit={handleSubmit}>
						<label htmlFor="listToken">Enter List Token:</label>
						<br />
						<input
							id="listToken"
							type="text"
							name="listToken"
							onChange={(e) => setToken(e.target.value)}
							value={token.listToken}
							placeholder="three word token"
						/>
						<br />
						<button>Join an existing List</button>
					</form>
					<span>{errorMsg}</span>
				</article>
			</section>
		</main>
	);
}

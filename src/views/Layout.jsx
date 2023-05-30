import React, { useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaListUl } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';
import basket from '../assets/basket1.png';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	const [screenSize, setScreenSize] = useState(window.innerWidth);
	const [showToken, setShowToken] = useState(false);

	useEffect(() => {
		const handleScreenSize = () => {
			setScreenSize(window.innerWidth);
		};
		window.addEventListener('resize', handleScreenSize);

		return () => {
			window.removeEventListener('resize', handleScreenSize);
		};
	}, [screenSize]);
	return (
		<div className="layout">
			<header className="flex px-4 w-full justify-between items-center">
				<div className="flex items-center">
					<img src={basket} alt="" width={50} height={40} />
					<h1
						className={`font-bold ${
							screenSize < 450 ? 'text-[2rem]' : 'text-[4rem]'
						} text-black ml-4 font-logo`}
					>
						SmartBasket
					</h1>
				</div>
				{screenSize > 800 ? (
					<div
						className={`text-black flex ${
							screenSize < 450 ? 'flex-col' : 'flex-row'
						}`}
					>
						<p
							className="bg-bgHome rounded-lg px-2 ml-4"
							title="Copy your token Address:"
						>
							{localStorage.getItem('tcl-shopping-list-token')}
						</p>
					</div>
				) : (
					<div
						className={`text-black flex ${
							screenSize < 450 ? 'flex-col' : 'flex-row'
						}`}
					>
						<div>
							{showToken ? (
								<p className="bg-bgHome rounded-lg px-2 ml-4">
									{localStorage.getItem('tcl-shopping-list-token')}
								</p>
							) : (
								<div
									onClick={() => setShowToken(true)}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											setShowToken(true);
										}
									}}
									role="button"
									tabIndex={0}
								>
									Copy your token
								</div>
							)}
						</div>
					</div>
				)}
			</header>
			<main className="Layout-main">
				<Outlet />
			</main>
			<nav className="Nav">
				{/* <NavLink to="/" className="Nav-link">
						Home
					</NavLink> */}
				<NavLink to="/list" className="Nav-link">
					<FaListUl />
				</NavLink>
				<NavLink to="/add-item" className="Nav-link">
					<MdAddBox className="text-4xl" />
				</NavLink>
			</nav>
		</div>
	);
}

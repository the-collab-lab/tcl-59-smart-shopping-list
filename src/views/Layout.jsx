import { Outlet, NavLink } from 'react-router-dom';
import { FaListUl } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import basket from '../assets/basket1.png';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	return (
		<>
			<div className="layout">
				<header className="flex">
					<img src={basket} alt="" width={50} height={40} />
					<h1 className="font-bold text-[3rem] text-black">SmartBasket</h1>
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
						<IoMdAdd className="text-3xl" />
					</NavLink>
				</nav>
			</div>
		</>
	);
}

import { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import { AddItem, Home, Layout, List } from './views';

import { getItemData, streamListItems } from './api';
import { useStateWithStorage } from './utils';

import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function App() {
	const [data, setData] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	/**
	 * Here, we're using a custom hook to create `listToken` and a function
	 * that can be used to update `listToken` later.
	 *
	 * `listToken` is `my test list` by default so you can see the list
	 * of items that was prepopulated for this project.
	 * You'll later set it to `null` by default (since new users do not
	 * have tokens), and use `setListToken` when you allow a user
	 * to create and join a new list.
	 */
	const [listToken, setListToken] = useStateWithStorage(
		null,
		'tcl-shopping-list-token',
	);

	useEffect(() => {
		setIsLoading(true);
		if (!listToken) return;

		/**
		 * streamListItems` takes a `listToken` so it can commuinicate
		 * with our database, then calls a callback function with
		 * a `snapshot` from the database.
		 *
		 * Refer to `api/firebase.js`.
		 */
		return streamListItems(listToken, (snapshot) => {
			/**
			 * Here, we read the documents in the snapshot and do some work
			 * on them, so we can save them in our React state.
			 *
			 * Refer to `api/firebase.js`
			 */

			const nextData = getItemData(snapshot);

			/** Finally, we update our React state. */
			setData(nextData);
			setIsLoading(false);
		});
	}, [listToken]);

	const handleCreateList = () => {
		if (listToken) return;
		setListToken(generateToken());
	};
	const handleJoinList = (token) => {
		streamListItems(token, (snapshot) => {
			const nextData = getItemData(snapshot);
			if (nextData.length === 0) {
				setErrorMsg('List does not exist!');
			} else {
				setData(nextData);
				setListToken(token);
			}
		});
	};
	useEffect(() => {
		if (errorMsg) {
			setTimeout(() => {
				setErrorMsg('');
			}, 3000);
		}
	}, [errorMsg]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							listToken ? (
								<Navigate to="/list" />
							) : (
								<Home
									handleCreateList={handleCreateList}
									handleJoinList={handleJoinList}
									errorMsg={errorMsg}
								/>
							)
						}
					/>
					<Route
						path="/list"
						element={
							listToken ? (
								<List listToken={listToken} data={data} isLoading={isLoading} />
							) : (
								<Navigate to="/" />
							)
						}
					/>
					<Route
						path="/add-item"
						element={
							listToken ? (
								<AddItem listToken={listToken} />
							) : (
								<Navigate to="/" />
							)
						}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

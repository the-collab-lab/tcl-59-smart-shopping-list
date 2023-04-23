import './Home.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export function Home({ handleCreateList, handleJoinList, errorMsg }) {
	const [token, setToken] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		handleJoinList(token);
	}
	return (
		<div className="Home">
			<Link to="/list">
				<button onClick={handleCreateList}>Create List</button>
			</Link>
			<div className="container">
				<p>Join an existing shopping list by entering a three word token.</p>
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
				<span> {errorMsg}</span>
			</div>
		</div>
	);
}

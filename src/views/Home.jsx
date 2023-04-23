import './Home.css';
import { Link } from 'react-router-dom';

export function Home({ handleCreateList, handleJoinList }) {
	return (
		<div className="Home">
			<form onSubmit={handleJoinList}>
				<label htmlFor="listToken">Enter List Token:</label>
				<br />
				<input id="listToken" type="text" name="listToken" />
				<button type="submit">Join List</button>
			</form>
			<Link to="/list">
				<button onClick={handleCreateList}>Create List</button>
			</Link>
		</div>
	);
}

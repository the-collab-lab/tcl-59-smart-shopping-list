import './Home.css';
import { Link } from 'react-router-dom';

export function Home({ handleCreateList }) {
	return (
		<div className="Home">
			<Link to="/list">
				<button onClick={handleCreateList}>Create List</button>
			</Link>
		</div>
	);
}

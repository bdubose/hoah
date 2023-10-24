import styles from './Home.module.css';
import { Link } from 'react-router-dom';
export const Home = () => (
	<div className={styles.actionsContainer}>
		<Link to="/Payments/New">
			<button className={styles.action}>Add a Payment</button>
		</Link>
		<Link to="/Liens/New">
			<button className={styles.action}>Add a Lien</button>
		</Link>
		<button className={styles.action}>Add a Closing</button>
		<button className={styles.action}>Add a Newsletter</button>
	</div>
);

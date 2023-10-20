import { Grid } from '../../components/Grid';
import { Link } from 'react-router-dom';
import styles from './HomeownersList.module.css';
import { useAllHomeowners } from '../../api/HomeownersApi';

export const HomeownersList = () => {
	const { data: homeowners } = useAllHomeowners();

	return (
		<>
			<div className={styles.titleBar}>
				<h1>Homeowners</h1>
				<Link to="/Homeowners/New" className="button">
					Add Homeowner
				</Link>
			</div>
			<Grid
				entities={homeowners ?? []}
				config={[
					{ title: 'Id', value: ho => ho.id },
					{ title: 'Property', value: ho => ho.property },
					{ title: 'Name', value: ho => ho.fullName },
					{ title: 'Email', value: ho => ho.email },
					{
						title: '',
						value: ho => (
							<>
								<Link to={`/Homeowners/${ho.id}`}>Edit</Link>
								<Link to={`/Homeowners/Details/${ho.id}`}>Details</Link>
							</>
						),
					},
				]}
			/>
		</>
	);
};

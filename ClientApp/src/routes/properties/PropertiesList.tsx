import { useAllProperties } from '../../api/PropertiesApi';
import { Grid } from '../../components/Grid';
import styles from './PropertiesList.module.css';
import { Link } from 'react-router-dom';
export const PropertiesList = () => {
	const { data: properties } = useAllProperties();

	return (
		<>
			<div className={styles.titleBar}>
				<h1>Properties</h1>
				<Link to="/Properties/New" className="button">
					Add Property
				</Link>
			</div>
			<Grid
				entities={properties ?? []}
				config={[
					{ title: 'Id', value: prop => prop.id },
					{ title: 'Street Number', value: prop => prop.streetNumber },
					{ title: 'Street', value: prop => prop.street },
					{ title: 'Homeowner', value: prop => prop.homeowner },
					{
						title: '',
						value: prop => (
							<>
								<Link to={`/Properties/${prop.id}`}>Edit</Link>
							</>
						),
					},
				]}
			/>
		</>
	);
};

import { Grid } from '../../components/Grid';
import { Link } from 'react-router-dom';
import { useAllHomeowners } from '../../api/HomeownersApi';
import { TitleBar } from '../../components/TitleBar';

export const HomeownersList = () => {
	const { data: homeowners } = useAllHomeowners();

	return (
		<>
			<TitleBar>
				<h1>Homeowners</h1>
				<Link to="/Homeowners/New" className="button">
					Add Homeowner
				</Link>
			</TitleBar>
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

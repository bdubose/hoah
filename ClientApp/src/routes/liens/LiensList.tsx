import { Link } from 'react-router-dom';
import { useAllLiens } from '../../api/LiensApi';
import { Grid } from '../../components/Grid';
import { TitleBar } from '../../components/TitleBar';

export const LiensList = () => {
	const { data: liens } = useAllLiens();

	return (
		<>
			<TitleBar>
				<h1>Liens</h1>
				<Link to="/Liens/New" className="button">
					Add Lien
				</Link>
			</TitleBar>
			<Grid
				entities={liens ?? []}
				config={[
					{ title: 'Id', value: lien => lien.id },
					{ title: 'Property Owner Id', value: lien => lien.homeownerId },
					{ title: 'Amount', value: lien => lien.amount },
					{ title: 'Year', value: lien => lien.lienYear },
					{ title: 'Status', value: lien => lien.lienStatus },
				]}
			/>
		</>
	);
};

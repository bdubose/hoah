import { useAllLiens } from '../../api/LiensApi';
import { Grid } from '../../components/Grid';

export const LiensList = () => {
	const { data: liens } = useAllLiens();

	return (
		<>
			<h1>Liens</h1>
			<Grid
				entities={liens ?? []}
				config={[
					{ title: 'Id', value: lien => lien.lienId },
					{ title: 'Property Owner Id', value: lien => lien.propertyOwnerId },
					{ title: 'Amount', value: lien => lien.amount },
					{ title: 'Year', value: lien => lien.lienYear },
					{ title: 'Is Paid?', value: lien => (lien.isPaid ? 'Yes' : 'No') },
				]}
			/>
		</>
	);
};

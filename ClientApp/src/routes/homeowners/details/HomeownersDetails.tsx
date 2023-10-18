import { useParams } from 'react-router';
import { useHomeownerDetails } from '../../../api/HomeownersApi';

export const HomeownersDetails = () => {
	const { id } = useParams();
	const numId = Number.parseInt(id!);

	const { data: ho, isLoading } = useHomeownerDetails(numId);
	if (isLoading) {
		return <h3>Loading...</h3>;
	} else if (!ho) {
		return <h3>Homeowner with id {id} not found!</h3>;
	}

	return (
		<>
			<h1>{ho.fullName}</h1>
			<h3>
				<a href={`mailto:${ho.email}`}>{ho.email}</a>
			</h3>
			<h2>
				{ho.property.streetNumber} {ho.property.street}
			</h2>
			<h3>Move In: {new Date(ho.moveInDate).toLocaleDateString()}</h3>
			{ho.moveOutDate && (
				<h3>Move Out: {new Date(ho.moveOutDate).toLocaleDateString()}</h3>
			)}
		</>
	);
};

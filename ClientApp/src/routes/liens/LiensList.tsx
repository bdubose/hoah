import { Link } from 'react-router-dom';
import {
	queryKey,
	useAllLiens,
	useGetLienStatuses,
	useUpdateLienStatus,
} from '../../api/LiensApi';
import { Grid } from '../../components/Grid';
import { TitleBar } from '../../components/TitleBar';
import { Lien } from '../../models/Lien';
import { useQueryClient } from '@tanstack/react-query';

export const LiensList = () => {
	const queryClient = useQueryClient();
	const { data: liens } = useAllLiens();
	const { data: statuses } = useGetLienStatuses();
	const { mutateAsync } = useUpdateLienStatus();

	const updateStatus = async (lienId: number, lienStatusId: number) => {
		await mutateAsync({ lienId, lienStatusId });
		queryClient.invalidateQueries({ queryKey: [queryKey] });
	};

	const getStatusSelector = (lien: Lien) => (
		<select
			key={lien.id}
			value={lien.lienStatusId}
			onChange={e => updateStatus(lien.id, Number.parseInt(e.target.value))}
		>
			{statuses?.map(s => (
				<option key={s.id} value={s.id}>
					{s.name}
				</option>
			))}
		</select>
	);

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
					{ title: 'Owner', value: lien => lien.ownerAndProperty },
					{ title: 'Amount', value: lien => lien.amount },
					{ title: 'Year', value: lien => lien.lienYear },
					{ title: 'Status', value: lien => getStatusSelector(lien) },
				]}
			/>
		</>
	);
};

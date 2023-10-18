import { useQuery } from '@tanstack/react-query';
import { Lien } from '../models/Lien';
import { apiClient } from './apiUtils';

const queryKey = 'Liens';

export const useAllLiens = () =>
	useQuery({
		queryKey: [queryKey],
		queryFn: async () => (await apiClient.get<Lien[]>('/Liens')).data,
	});

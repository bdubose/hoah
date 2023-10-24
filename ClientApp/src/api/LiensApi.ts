import { useMutation, useQuery } from '@tanstack/react-query';
import { Lien, LienStatus } from '../models/Lien';
import { apiClient } from './apiUtils';

export const queryKey = 'Liens';

export const useAllLiens = () =>
	useQuery({
		queryKey: [queryKey],
		queryFn: async () => (await apiClient.get<Lien[]>('/Liens')).data,
	});

export const useAddLien = () =>
	useMutation({
		mutationFn: async (lien: Lien) => await apiClient.post('/Liens', lien),
	});

export const useUpdateLienStatus = () =>
	useMutation({
		mutationFn: async (body: { lienId: number; lienStatusId: number }) =>
			await apiClient.post('/Liens/Status', body),
	});

export const useGetLienStatuses = () =>
	useQuery({
		queryKey: [queryKey, 'statuses'],
		queryFn: async () =>
			(await apiClient.get<LienStatus[]>('/Liens/Statuses')).data,
	});

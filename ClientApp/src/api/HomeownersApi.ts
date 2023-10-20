import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from './apiUtils';
import { Homeowner, HomeownerDetails } from '../models/Homeowner';

const queryKey = 'Homeowners';

export const useAllHomeowners = () =>
	useQuery({
		queryKey: [queryKey],
		queryFn: async () => (await apiClient.get<Homeowner[]>('/Homeowners')).data,
	});

export const useHomeowner = (id: number) =>
	useQuery({
		queryKey: [queryKey, id],
		enabled: !!id,
		queryFn: async () =>
			(await apiClient.get<Homeowner>(`/Homeowners/${id}`)).data,
	});

export const useHomeownerDetails = (id: number) =>
	useQuery({
		queryKey: [queryKey, 'details', id],
		enabled: !!id,
		queryFn: async () =>
			(await apiClient.get<HomeownerDetails>(`/Homeowners/Details/${id}`)).data,
	});

export const useUpdateHomeowner = (ho: Homeowner) =>
	useMutation({
		mutationFn: async () =>
			(await apiClient.post<number>('/Homeowners', ho)).data,
	});

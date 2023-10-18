import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from './apiUtils';
import { Property } from '../models/Property';

const queryKey = 'Properties';

export const useAllProperties = () =>
	useQuery({
		queryKey: [queryKey],
		queryFn: async () => (await apiClient.get<Property[]>('/Properties')).data,
	});

export const useProperty = (id: number) =>
	useQuery({
		queryKey: [queryKey, id],
		queryFn: async () =>
			(await apiClient.get<Property>(`/Properties/${id}`)).data,
	});

export const useUpdateProperty = (prop: Property) =>
	useMutation({
		mutationFn: async () => await apiClient.post('/Properties', prop),
	});

import { useMutation } from '@tanstack/react-query';
import { Payment } from '../models/Payment';
import { apiClient } from './apiUtils';

export const useAddPayment = (payment: Payment) =>
	useMutation({
		mutationFn: async () => await apiClient.post('/Payments', payment),
	});

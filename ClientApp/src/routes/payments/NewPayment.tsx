﻿import { FormEvent } from 'react';
import { useObjectState } from '../../hooks';
import { isoDate } from '../../utils';
import { Payment } from '../../models/Payment';
import { useNavigate } from 'react-router';
import { useAllHomeowners } from '../../api/HomeownersApi';
import { useAddPayment } from '../../api/PaymentsApi';

const initialState = {
	id: 0,
	homeownerId: 0,
	amount: 150,
	datePaid: isoDate(new Date()),
	reference: 'Paypal',

	homeowner: '',
} as const as Payment;

export const NewPayment = () => {
	const navigate = useNavigate();

	const { data: homeowners } = useAllHomeowners();
	// const [addPayment] = useAddPaymentMutation();

	const [payment, setPayment, setState] = useObjectState(initialState);
	const homeowner = homeowners?.find(
		h => `${h.property} - ${h.fullName}` === payment.homeowner
	);

	const { mutateAsync: addPayment } = useAddPayment({
		...payment,
		homeownerId: homeowner?.id ?? -1,
	});

	const save = async (e?: FormEvent, goToProperty: boolean = true) => {
		e?.preventDefault();
		if (!homeowner) {
			alert('Homeowner not found!');
			return;
		}

		await addPayment();

		if (goToProperty) {
			navigate(`/Homeowners/Details/${homeowner.id}`);
		} else {
			setState(initialState);
		}
	};

	return (
		<>
			<h1>New Payment</h1>

			<form onSubmit={e => save(e)}>
				<label>
					Property / Homeowner
					<input
						type="text"
						list="homeowners"
						value={payment.homeowner}
						onChange={e => setPayment('homeowner', e.target.value)}
					/>
					<datalist id="homeowners">
						{homeowners?.map(h => (
							<option key={h.id}>
								{h.property} - {h.fullName}
							</option>
						))}
					</datalist>
				</label>

				<label>
					Amount
					<input
						type="number"
						value={payment.amount}
						onChange={e =>
							setPayment('amount', Number.parseFloat(e.target.value))
						}
					/>
				</label>

				<label>
					Date Paid
					<input
						type="date"
						value={payment.datePaid}
						onChange={e => setPayment('datePaid', e.target.value)}
					/>
				</label>

				<label>
					Reference
					<input
						type="text"
						value={payment.reference}
						onChange={e => setPayment('reference', e.target.value)}
					/>
				</label>
				<button type="button" onClick={() => save()}>
					Save and Go to Homeowner
				</button>
				<button type="button" onClick={() => save(undefined, false)}>
					Save and Add Another
				</button>
			</form>
		</>
	);
};

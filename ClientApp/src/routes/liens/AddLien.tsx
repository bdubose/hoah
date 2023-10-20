import { useNavigate } from 'react-router';
import { useAllHomeowners } from '../../api/HomeownersApi';
import { Lien } from '../../models/Lien';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddLien } from '../../api/LiensApi';

export const AddLien = () => {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<Lien>();
	const { mutateAsync: addLien } = useAddLien();

	const { data: homeowners } = useAllHomeowners();

	const save: SubmitHandler<Lien> = async lien => {
		try {
			await addLien(lien);
		} catch (e) {
			window.alert('Error saving lien: ' + e);
		}
		navigate('/Liens');
	};

	return (
		<>
			<h1>New Lien</h1>
			<form onSubmit={handleSubmit(save)}>
				<label>
					Homeowner
					<input
						{...register('homeownerId', {
							required: true,
							setValueAs: input =>
								homeowners?.find(h => input === `${h.fullName} - ${h.property}`)
									?.id,
						})}
						list="homeowners"
					/>
					<datalist id="homeowners">
						{homeowners?.map(h => (
							<option key={h.id}>
								{h.fullName} - {h.property}
							</option>
						))}
					</datalist>
				</label>

				<label>
					Amount
					<input {...register('amount', { required: true, min: 1 })} />
				</label>

				<label>
					Year
					<input
						{...register('lienYear', {
							value: new Date().getFullYear(),
						})}
					/>
				</label>

				<button>Save</button>
			</form>
		</>
	);
};

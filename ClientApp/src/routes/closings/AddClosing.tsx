import { SubmitHandler, useForm } from 'react-hook-form';
import { useAllProperties } from '../../api/PropertiesApi';

interface Closing {
	attention: string;
	titleCompany: TitleCompany;
	presentOwner: string;
	purchaser: string;
	propertyId: number;
}

interface TitleCompany {
	name: string;
	street: string;
	city: string;
	state: string;
	zip: string;
}

export const AddClosing = () => {
	const { register, handleSubmit } = useForm<Closing>();

	const { data: properties } = useAllProperties();

	const save: SubmitHandler<Closing> = async closing => {
		console.log(closing);
		// todo
	};

	return (
		<>
			<h1>New Closing</h1>
			<form onSubmit={handleSubmit(save)}>
				<label>
					Attention
					<input {...register('attention', { required: true })} />
				</label>

				<label>
					Title Company
					<input {...register('titleCompany.name', { required: true })} />
				</label>

				<label>
					Title Company Street
					<input {...register('titleCompany.street', { required: true })} />
				</label>

				<label>
					Title Company City
					<input {...register('titleCompany.city', { required: true })} />
				</label>

				<label>
					Title Company State
					<input {...register('titleCompany.state', { required: true })} />
				</label>

				<label>
					Title Company Zip
					<input {...register('titleCompany.zip', { required: true })} />
				</label>

				<label>
					Property
					<input
						{...register('propertyId', {
							required: true,
							setValueAs: input =>
								properties?.find(p => input === `${p.streetNumber} ${p.street}`)
									?.id,
						})}
						list="properties"
					/>
					<datalist id="properties">
						{properties?.map(p => (
							<option key={p.id}>
								{p.streetNumber} {p.street}
							</option>
						))}
					</datalist>
				</label>

				<label>
					Present Owner(s)
					<input {...register('presentOwner', { required: true })} />
				</label>

				<label>
					Purchasers
					<input {...register('purchaser', { required: true })} />
				</label>

				<button>Save</button>
			</form>
		</>
	);
};

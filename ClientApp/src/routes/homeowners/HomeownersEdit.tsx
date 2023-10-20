import { useNavigate, useParams } from 'react-router';
import { useObjectState } from '../../hooks';
import { Homeowner } from '../../models/Homeowner';
import { FormEvent, useEffect } from 'react';
import { isoDate } from '../../utils';
import { useAllProperties } from '../../api/PropertiesApi';
import { useHomeowner, useUpdateHomeowner } from '../../api/HomeownersApi';

export const HomeownersEdit = () => {
	const navigate = useNavigate();
	const { action } = useParams();
	const id = Number.parseInt(action!);

	const { data: properties } = useAllProperties();
	const { data: currentHo } = useHomeowner(id);

	const [editHo, setEditHo, setState] = useObjectState(
		currentHo ??
			({
				id: 0,
				property: '',
				fullName: '',
				email: '',
				moveInDate: '',
				moveOutDate: '',
			} as Homeowner)
	);

	const property = properties?.find(
		p => `${p.streetNumber} ${p.street}` === editHo.property
	);
	const { mutateAsync: addHomeowner } = useUpdateHomeowner({
		...editHo,
		propertyId: property?.id ?? -1,
	});

	useEffect(() => {
		if (currentHo) {
			let cho = { ...currentHo };
			cho.moveInDate = isoDate(new Date(cho.moveInDate));
			cho.moveOutDate = cho.moveOutDate
				? isoDate(new Date(cho.moveOutDate))
				: '';
			setState(cho);
		}
	}, [currentHo, setState]);

	const save = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const property = properties?.find(
			p => `${p.streetNumber} ${p.street}` === editHo.property
		);
		if (!property) {
			window.alert("Couldn't find property! Try again.");
			return;
		}

		const id = await addHomeowner();
		navigate(`/Homeowners/${id}`);
	};

	return (
		<>
			<h1>{currentHo?.fullName ?? 'New Homeowner'}</h1>

			<form onSubmit={e => save(e)}>
				<label>
					Name
					<input
						type="text"
						value={editHo.fullName}
						onChange={e => setEditHo('fullName', e.target.value)}
					/>
				</label>

				<label>
					Email
					<input
						type="email"
						value={editHo.email}
						onChange={e => setEditHo('email', e.target.value)}
					/>
				</label>

				<label>
					Property
					<input
						type="text"
						list="properties"
						value={editHo.property}
						onChange={e => setEditHo('property', e.target.value)}
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
					Move In Date
					<input
						type="date"
						value={editHo.moveInDate}
						onChange={e => setEditHo('moveInDate', e.target.value)}
					/>
				</label>

				<label>
					Move Out Date
					<input
						type="date"
						value={editHo.moveOutDate}
						onChange={e => setEditHo('moveOutDate', e.target.value)}
					/>
				</label>

				<button>Save</button>
			</form>
		</>
	);
};

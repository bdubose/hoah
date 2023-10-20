import { useNavigate, useParams } from 'react-router';
import { useObjectState } from '../../hooks';
import { Property } from '../../models/Property';
import { FormEvent, useEffect } from 'react';
import { useProperty, useUpdateProperty } from '../../api/PropertiesApi';

const streets = [
	'Fieldstone Drive',
	'Fieldstone Circle',
	'MacQueen Circle',
	'Stonecroft Circle',
	'Stonecroft Drive',
	'Stoneridge Drive',
	'Stoneridge Circle',
	'Stonewood Road',
	'Marlstone Drive',
	'Marlstone Court',
] as const;

export const PropertiesEdit = () => {
	const navigate = useNavigate();
	const { action } = useParams();
	const id = Number.parseInt(action!);

	const { data: currentProp } = useProperty(id);

	const [editProp, setEditProp, setState] = useObjectState(
		currentProp ?? {
			id: 0,
			streetNumber: 0,
			street: '',
		}
	);
	const { mutateAsync: updateProperty } = useUpdateProperty(editProp);

	useEffect(() => {
		if (currentProp) {
			setState(currentProp);
		}
	}, [currentProp, setState]);

	const save = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const id = await updateProperty();
		navigate(`/Properties/${id}`);
	};

	const propToString = (property: Property) =>
		`${property.streetNumber} ${property.street}`;

	return (
		<>
			<h1>{currentProp ? propToString(currentProp) : 'New Property'}</h1>

			<form onSubmit={e => save(e)}>
				<label>
					Street Number
					<input
						type="text"
						value={editProp.streetNumber}
						onChange={e => setEditProp('streetNumber', e.target.value)}
					/>
				</label>

				<label>
					Street
					<input
						type="text"
						list="streets"
						value={editProp.street}
						onChange={e => setEditProp('street', e.target.value)}
					/>
					<datalist id="streets">
						{streets?.map(s => (
							<option key={s}>{s}</option>
						))}
					</datalist>
				</label>

				<button>Save</button>
			</form>
		</>
	);
};

import { useNavigate, useParams } from "react-router";
import { useGetPropertyQuery, useUpdatePropertyMutation } from "../api.ts";
import { skipToken } from "@reduxjs/toolkit/query";
import { useObjectState } from "../hooks.ts";
import { Property } from "../models/Property.ts";
import { FormEvent } from "react";

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
  'Marlstone Court'
] as const;

export const PropertiesEdit = () => {
  const navigate = useNavigate();
  const { action } = useParams();
  const id = Number.parseInt(action!);

  const { data: currentProp } = useGetPropertyQuery(isNaN(id) ? skipToken : id);
  const [ updateProperty ] = useUpdatePropertyMutation();
  
  const [ editProp, setEditProp ] = useObjectState(currentProp ?? {
    propertyId: 0,
    streetNumber: 0,
    street: '',
  });

  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = await updateProperty(editProp).unwrap();
    navigate(`/Properties/${id}`);
  };

  const propToString = (property: Property) =>
      `${property.streetNumber} ${property.street}`;

  return <>
    <h1>{currentProp ? propToString(currentProp) : 'New Property'}</h1>

    <form onSubmit={e => save(e)}>
      <label>
        Street Number
        <input type="text" value={editProp.streetNumber} onChange={e => setEditProp('streetNumber', e.target.value)}/>
      </label>

      <label>
        Street
        <input type="text" list='streets' value={editProp.street}
               onChange={e => setEditProp('street', e.target.value)}/>
        <datalist id='streets'>
          {streets?.map(s => <option key={s}>{s}</option>)}
        </datalist>
      </label>
      
      <button>Save</button>
    </form>
  </>
}
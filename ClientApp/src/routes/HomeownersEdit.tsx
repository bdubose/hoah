import { useNavigate, useParams } from "react-router";
import { useGetAllPropertiesQuery, useGetHomeownerQuery, useUpdateHomeownerMutation } from "../api.ts";
import { skipToken } from "@reduxjs/toolkit/query";
import { useObjectState } from "../hooks.ts";
import { Homeowner } from "../models/Homeowner.ts";
import { FormEvent } from "react";

export const HomeownersEdit = () => {
  const navigate = useNavigate();
  const { action } = useParams();
  const id = Number.parseInt(action!);

  const { data: properties } = useGetAllPropertiesQuery();
  const { data: currentHo } = useGetHomeownerQuery(isNaN(id) ? skipToken : id);
  const [ updateHomeowner ] = useUpdateHomeownerMutation();

  const [ editHo, setEditHo ] = useObjectState(currentHo ?? {
    homeownerId: 0,
    property: '',
    fullName: '',
    email: '',
    moveInDate: '',
    moveOutDate: '',
  } as Homeowner);

  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const property = properties?.find(p => `${p.streetNumber} ${p.street}` === editHo.property);
    if (!property) {
      window.alert("Couldn't find property! Try again.");
      return;
    }
    const id = await updateHomeowner({
      ...editHo,
      propertyId: property.propertyId
    }).unwrap();
    navigate(`/Homeowners/${id}`);
  }

  return <>
    <h1>{currentHo?.fullName ?? 'New Homeowner'}</h1>

    <form onSubmit={e => save(e)}>
      <label>
        Name
        <input type="text" value={editHo.fullName} onChange={e => setEditHo('fullName', e.target.value)}/>
      </label>

      <label>
        Email
        <input type="email" value={editHo.email} onChange={e => setEditHo('email', e.target.value)}/>
      </label>

      <label>
        Property
        <input type="text" list='properties' value={editHo.property}
               onChange={e => setEditHo('property', e.target.value)}/>
        <datalist id='properties'>
          {properties?.map(p => <option key={p.propertyId}>{p.streetNumber} {p.street}</option>)}
        </datalist>
      </label>

      <label>
        Move In Date
        <input type="date" value={editHo.moveInDate} onChange={e => setEditHo('moveInDate', e.target.value)}/>
      </label>

      <label>
        Move Out Date
        <input type="date" value={editHo.moveOutDate} onChange={e => setEditHo('moveOutDate', e.target.value)}/>
      </label>

      <button>Save</button>
    </form>
  </>;
}
import { useAddPaymentMutation, useGetAllHomeownersQuery } from "../../api.ts";
import { FormEvent } from "react";
import { useObjectState } from "../../hooks.ts";
import { isoDate } from "../../utils.ts";
import { Payment } from "../../models/Payment.ts";
import { useNavigate } from "react-router";

const initialState = {
  paymentId: 0,
  homeownerId: 0,
  amount: 150,
  datePaid: isoDate(new Date()),
  reference: 'Paypal',

  homeowner: '',
} as const as Payment;

export const NewPayment = () => {
  const navigate = useNavigate();
  
  const { data: homeowners } = useGetAllHomeownersQuery();
  const [ addPayment ] = useAddPaymentMutation();
  
  const [ payment, setPayment, setState ] = useObjectState(initialState);
  
  const save = async (e?: FormEvent, goToProperty: boolean = true) => {
    e?.preventDefault();
    const homeowner = homeowners?.find(h => `${h.property} - ${h.fullName}` === payment.homeowner);
    if (!homeowner) {
      alert('Homeowner not found!');
      return;
    }
    
    await addPayment({
      ...payment,
      homeownerId: homeowner.homeownerId
    }).unwrap();
    
    if (goToProperty) {
      navigate(`/Properties/${homeowner.propertyId}`);
    } else {
      setState(initialState);
    }
  }
  
  return <>
    <h1>New Payment</h1>
    
    <form onSubmit={e => save(e)}>
      <label>
        Property / Homeowner
        <input type="text" list='homeowners' value={payment.homeowner} onChange={e => setPayment('homeowner', e.target.value)}/>
        <datalist id="homeowners">
          { homeowners?.map(h => <option key={h.homeownerId}>{h.property} - {h.fullName}</option>)}
        </datalist>
      </label>

      <label>
        Amount
        <input type="number" value={payment.amount} onChange={e => setPayment('amount', Number.parseFloat(e.target.value))}/>
      </label>

      <label>
        Date Paid
        <input type="date" value={payment.datePaid} onChange={e => setPayment('datePaid', e.target.value)}/>
      </label>

      <label>
        Reference
        <input type="text" value={payment.reference} onChange={e => setPayment('reference', e.target.value)}/>
      </label>
      <button type='button' onClick={() => save()}>Save and Go to Property</button>
      <button type='button' onClick={() => save(undefined, false)}>Save and Add Another</button>
    </form>
  </>
}
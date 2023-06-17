import { Property } from "./Property.ts";
import { Payment } from "./Payment.ts";
import { Lien } from "./Lien.ts";
import { Fee } from "./Fee.ts";
import { Note } from "./Note.ts";

export interface Homeowner {
  homeownerId: number;
  propertyId: number;
  fullName: string;
  email: string;
  moveInDate: string;
  moveOutDate?: string;
  
  // virtual fields
  property: string;
}

export interface HomeownerDetails {
  // can't inherit bc type of property changes
  homeownerId: number;
  propertyId: number;
  fullName: string;
  email: string;
  moveInDate: string;
  moveOutDate?: string;
  
  property: Property;
  fees: Fee[];
  payments: Payment[];
  liens: Lien[];
  propertyNotes: Note[];
}
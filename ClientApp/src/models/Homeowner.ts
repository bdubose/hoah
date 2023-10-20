import { Property } from './Property';
import { Payment } from './Payment';
import { Lien } from './Lien';
import { Fee } from './Fee';
import { Note } from './Note';

export interface Homeowner {
	id: number;
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
	id: number;
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

﻿export interface Payment {
	id: number;
	homeownerId: number;
	amount: number;
	datePaid: string;
	reference?: string;
	depositDate?: string;

	// virtual fields
	homeowner: string;
}

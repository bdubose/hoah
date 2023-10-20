﻿export interface Lien {
	id: number;
	homeownerId: number;
	amount: number;
	lienYear: number;
	lienStatusId: number;

	// virtual fields
	lienStatus?: string;
	ownerAndProperty?: string;
}

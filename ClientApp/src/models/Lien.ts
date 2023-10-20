export interface Lien {
	id: number;
	homeownerId: number;
	amount: number;
	lienYear: number;
	lienStatusId: number;

	// virtual fields
	homeowner?: string;
	lienStatus?: string;
}

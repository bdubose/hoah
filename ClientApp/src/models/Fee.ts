export interface Fee {
	id: number;
	feeTypeId: number;
	homeownerId: number;
	amount: number;
	feeYear: number;

	// virtual fields
	feeTypeName: string;
}

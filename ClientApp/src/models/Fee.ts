export interface Fee {
  feeId: number;
  feeTypeId: number;
  homeownerId: number;
  amount: number;
  feeYear: number;
  
  // virtual fields
  feeTypeName: string;
}
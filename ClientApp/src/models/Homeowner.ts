
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
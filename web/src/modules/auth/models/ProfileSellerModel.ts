export interface IUser {
  email: string;
  role: string;
}

export interface IAddress {
  id: number;
  country: string;
  state: string;
  city: string;
  locality: string;
  colony: string;
  street: string;
  zipCode: number;
  externalNumber: string;
  internalNumber: string;
  referenceNear: string;
  addressType: string;
}

export interface ISellerProfile {
  id: number;
  sellerNumber: string;
  name: string;
  fistLastName: string;
  secondLastName: string;
  bussinessName: string;
  description: string;
  wallet: string;
  createdAt: string;
  updatedAt: string | null;
  user: IUser;
  address: IAddress;
  products: any[]; // Cambia `any[]` a un tipo más específico si tienes el modelo de producto.
}

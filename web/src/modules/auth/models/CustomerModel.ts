export interface IAddress {
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

export interface Iuser {
  email:string,
  role:string
}

export interface ICustomer {
  id: number;
  name: string;
  firstLastName: string;
  secondLastName: string;
  address: IAddress;
}


export interface ICustomerProfile {
  id: number;
  name: string;
  firstLastName: string;
  secondLastName: string;
  address: IAddress;
  user:Iuser
}
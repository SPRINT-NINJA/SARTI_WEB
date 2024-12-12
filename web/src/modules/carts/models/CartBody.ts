export interface CartBody {
  id:           number;
  total:        number;
  customer:     Customer;
  seller:       Seller;
  cartProducts: CartProduct[];
}

export interface CartProduct {
  id:          number;
  productInfo: string;
  amount:      number;
  total:       number;
  status:      boolean;
  product:     Product;
}

export interface Product {
  id:          number;
  name:        string;
  description: string;
  mainImage:   string;
  price:       number;
  stock:       number;
  rating:      number;
  status:      boolean;
}

export interface Customer {
  id:             number;
  customerNumber: string;
  name:           string;
  fistLastName:   string;
  secondLastName: string;
  address:        null;
}

export interface Seller {
  id:             number;
  sellerNumber:   string;
  name:           string;
  fistLastName:   string;
  secondLastName: string;
  bussinessName:  string;
  description:    string;
  wallet:         string;
  address:        Address;
}

export interface Address {
  id:             number;
  country:        string;
  state:          string;
  city:           string;
  locality:       string;
  colony:         string;
  street:         string;
  zipCode:        number;
  externalNumber: string;
  internalNumber: string;
  referenceNear:  string;
  addressType:    string;
}
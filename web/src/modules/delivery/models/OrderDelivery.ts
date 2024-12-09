export type DeliveryOrder = {
  id?:                number;
  orderNumber?:       string;
  paypalOrderId:      string;
  orderDeliveryType:  string;
  orderDeliveryStep?: string;
  fee:                number;
  status?:            boolean;
  createdAt?:         Date;
  updatedAt?:         null;
  sartiOrder:         SartiOrder;
  deliveryMan?:       null;
  address:            Address;
}

export type Address = {
  id?:             number;
  country:         string;
  state:           string;
  city:            string;
  locality?:       string;
  colony:          string;
  street:          string;
  zipCode:         number;
  externalNumber:  string;
  internalNumber?: string;
  referenceNear?:  string;
  addressType?:    string;
  createdAt?:      Date;
  updatedAt?:      null;
}

export type SartiOrder = {
  id?:            number;
  total:          number;
  createdAt?:     Date;
  updatedAt?:     null;
  customer:       Customer;
  seller?:        Seller;
  orderProducts:  OrderProduct[];
}

export type Customer = {
  id:             number;
  customerNumber?: string;
  name?:          string;
  fistLastName?:  string;
  secondLastName?: string;
  createdAt?:     Date;
  updatedAt?:     null;
}

export type OrderProduct = {
  id?:          number;
  productInfo?: null;
  amount:       number;
  total:        number;
  status?:      boolean;
  product:      Product;
  rate?:        null;
}

export type Product = {
  id:             number;
  name:           string;
  description?:   string;
  mainImage?:     string;
  price?:         number;
  stock?:         number;
  rating?:        number;
  status?:        boolean;
  createdAt?:     Date;
  updatedAt?:     null;
  rates?:         any[];
  productImages?: ProductImage[];
}

export type ProductImage = {
  id:       number;
  image:    string;
  position: number;
}

export type Seller = {
  id?:             number;
  sellerNumber?:   string;
  name?:           string;
  fistLastName?:   string;
  secondLastName?: string;
  bussinessName?:  string;
  description?:    string;
  wallet?:         string;
  createdAt?:      Date;
  updatedAt?:      null;
  products?:       Product[];
}

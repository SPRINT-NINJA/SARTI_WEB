export type DeliveryOrder = {
  paypalOrderId:     string;
  orderDeliveryType: string;
  fee:               number;
  keepAddress:       boolean;
  sartiOrder:        SartiOrder;
  address:           Address;
}

export type Address = {
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

export type SartiOrder = {
  total:         number;
  seller:        Customer;
  customer:      Customer;
  orderProducts: OrderProduct[];
}

export type Customer = {
  id: number;
}

export type OrderProduct = {
  amount:  number;
  total:   number;
  product: Customer;
}
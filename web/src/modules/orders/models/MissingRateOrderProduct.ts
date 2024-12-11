export type MissingRateOrderProduct = {
  id: number;
  productInfo: string;
  amount: number;
  total: number;
  status: boolean;
  product: Product;
  rate: null;
}

export type Product = {
  id: number;
  name: string;
  description: string;
  mainImage: string;
  price: number;
  stock: number;
  rating: number;
  status: boolean;
  createdAt: Date;
  updatedAt: null;
  rates: any[];
}
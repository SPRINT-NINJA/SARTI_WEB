export interface IProductCart {
  id: number;
  name: string;
  description: string;
  mainImage: string;
  price: number;
  stock: number;
  status: boolean;
}



 export interface ICartProduct {
  id: number;
  productInfo: string; // JSON string, puede ser parseado si es necesario
  amount: number;
  total: number;
  status: boolean;
  product: IProductCart;
}



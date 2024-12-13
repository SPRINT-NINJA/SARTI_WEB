export interface CreateRateCustomer{
    comment:string,
    rate:number,
    image:string,
}

export interface productRate{
        name:string,
        mainImage:string,
        description:string
}
export type IcreateRate = {
    rate:number;
    comment: string;
    image:string;
    productId:number;
    orderProductId:number
  }
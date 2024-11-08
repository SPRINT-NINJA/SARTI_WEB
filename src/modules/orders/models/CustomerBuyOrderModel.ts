export interface BuyOrder{
    orderDeliveryType:string,
    fee:number,
    listProduct:[
        {
            name:string,
            stock:number,
            amount:number,
            status:string,
            price:number
        }
    ],
}
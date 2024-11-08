export interface CustomerOrderDetail{
     orderNumber:number,
     orderDeliveryType:string,
     total:number,
     status:string, 
     product:{
        name:string,
        price:number,
        amount:number,
     },
     cardPay:{
        typeCard:string,
        dateByPay:string,
        statusPay:string
     }
}
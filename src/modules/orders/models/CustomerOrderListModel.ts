export interface CustomerOrderList{
    order:{
        status:string,
        amount:string, 
        product: {
            name:string,
            price:number,
            mainImage:string
        }   
    }
}
import { defineComponent } from "vue";

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

const TestdetailOrder: CustomerOrderDetail [] = [
    {
        "orderNumber": 12345,
        "orderDeliveryType": "Domicilio",
        "total": 150.00,
        "status": "En proceso",
        "product": {
          "name": "Pastel de Chocolate",
          "price": 50.00,
          "amount": 3
        },
        "cardPay": {
          "typeCard": "Visa",
          "dateByPay": "2024-11-01",
          "statusPay": "Pagado"
        }
      }
]

      


export default defineComponent ({
    data(){
        return{
            deatilOrder: [] as CustomerOrderDetail[],
            goToRating:false,
        }
    },
    methods:{
        getDetailOrder(){
            this.deatilOrder = TestdetailOrder;
        }

    },
    mounted(){
        this.getDetailOrder();

    }
})
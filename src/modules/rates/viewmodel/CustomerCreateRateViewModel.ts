import { defineComponent } from "vue";

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



export default defineComponent({
    data(){
        return{
            getProduct:{} as productRate,
            review:{
                comment:"",
                rate:0,
                image:""
            }
        }
    },
    methods:{

    },
    mounted(){

    }
});
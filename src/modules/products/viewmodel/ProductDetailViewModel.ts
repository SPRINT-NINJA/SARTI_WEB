import { defineComponent } from "vue";

export default defineComponent({
    data(){
       return {
        product:{
            name:"Los pollitos de lana",
            price:"50.00",
            description:"Los pollitos de lana son hechos a mano durante por 3 horas estos no son articulados pero son muy bonitos",
            stock:21,
            mainImage:"",
            rating:8.9,
            images:[ "https://picsum.photos/1000/1000", "https://picsum.photos/1000/1000", "https://picsum.photos/1000/1000"]
        },
        progress1: 0, 
        timeCharging:false,
        count:1
       }
    },
    methods:{
        increment() {
            this.count++;
          },
          decrement() {
            if (this.count > 0) {
              this.count--;
            }
          },
    }
})
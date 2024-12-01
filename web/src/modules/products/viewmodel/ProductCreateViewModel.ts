import { defineComponent } from "vue";

export default defineComponent({
    data(){
       return {
        product:{
            name:"",
            price:"",
            description:"",
            stock:"",
            mainImage:"",
            images:[]
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
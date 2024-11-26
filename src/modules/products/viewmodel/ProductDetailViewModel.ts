import { defineComponent } from "vue";
import { encryptParamsId } from "@/kernel/utils/cryptojs";

export default defineComponent({
    data(){
       return {
        product:{
            id:2,
            name:"Los pollitos de lana",
            price:"50.00",
            description:"Los pollitos de lana son hechos a mano durante por 3 horas estos no son articulados pero son muy bonitos",
            stock:21,
            mainImage:"https://picsum.photos/1000/1000",
            rating:8.9,
            images:[
                {
                    largeURL:"https://picsum.photos/1000/1000",
                    thumbnailURL:"https://picsum.photos/1000/1000",
                    width: 200,
                    height: 200,
                },
                {
                    largeURL:"https://picsum.photos/1000/1000",
                    thumbnailURL:"https://picsum.photos/1000/1000",
                    width: 200,
                    height: 200,
                },
                {
                    largeURL:"https://picsum.photos/1000/1000",
                    thumbnailURL:"https://picsum.photos/1000/1000",
                    width: 200,
                    height: 200,
                },
                {
                    largeURL:"https://picsum.photos/1000/1000",
                    thumbnailURL:"https://picsum.photos/1000/1000",
                    width: 200,
                    height: 200,
                }
            ]
        },
        progress1: 0, 
        timeCharging:false,
        count:1
       }
    },
    methods:{
        async getUpdateProduct(item: any) {
            try {
              const encryptParam = encryptParamsId(item.toString());
              await this.$router.push({ name: "update-product", params: { id: encryptParam} });
            } catch (error) {
              console.error(error);
            }
          },
          async listRateProduct(item: any) {
            try {
              const encryptParam = encryptParamsId(item.toString());
              await this.$router.push({ name: "rate-list", params: { id: encryptParam} });
            } catch (error) {
              console.error(error);
            }
          },
    }
})
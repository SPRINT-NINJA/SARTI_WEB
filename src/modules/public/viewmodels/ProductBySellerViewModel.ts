import { decryptParamsId } from "@/kernel/utils/cryptojs";
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Product 1",
          price: 100,
          image: "https://picsum.photos/1000/1000",
          rating: 4,
        },
        {
          id: 2,
          name: "Product 2",
          price: 200,
          image: "https://picsum.photos/1000/1000",
          rating: 6,
        },
        {
          id: 3,
          name: "Product 3",
          price: 300,
          image: "https://picsum.photos/1000/1000",
          rating: 9,
        },
        {
          id: 4,
          name: "Product 4",
          price: 400,
          image: "https://picsum.photos/1000/1000",
          rating: 8.5,
        }, {
          id: 5,
          name: "Product 5",
          price: 400,
          image: "https://picsum.photos/1000/1000",
          rating: 8.5,
        },
        {
          id: 6,
          name: "Product 6",
          price: 400,
          image: "https://picsum.photos/1000/1000",
          rating: 8.5,
        },
        {
          id: 7,
          name: "Product 7",
          price: 400,
          image: "https://picsum.photos/1000/1000",
          rating: 8.5,
        },
        {
          id: 8,
          name: "Product 8",
          price: 400,
          image: "https://picsum.photos/1000/1000",
          rating: 8.5,
        }
      ],
      seller: {
        id: 1,
        mainImage:"https://picsum.photos/1000/1000",
        name:"TIENDA 1",
        description:"¡Dale un toque único a tu fiesta! Pintamos y elaboramos cerámica personalizada para que cada detalle sea especial."
      }, 
      sellerSelected: {} as { id: "" },
      topRated:false,
      recentlyProduct:false
    };
  },
  created() {
    try {
      this.sellerSelected = decryptParamsId(
        this.$route.params.id.toString()
      ) as { id: "" };
    } catch (e) {
      console.log(e);
    }
  },
  mounted() {
  },
  methods: {
    changeSelectTopRated(){
      if(this.recentlyProduct)
        this.topRated=false;
    },
    changeRecently(){
      if(this.topRated)
        this.recentlyProduct=false;
    }
  },
});

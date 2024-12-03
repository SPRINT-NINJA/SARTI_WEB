import { encryptParamsId } from "@/kernel/utils/cryptojs";
import { defineComponent } from "vue";
import  axios  from "./../../../config/axios.ts";


export default defineComponent({
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("/product");
        this.products = response.data.data.content;
        
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    },

    async getProductPerDetails(item: any) {
      try {
        const { id } = item;
        const encryptParam = encryptParamsId(id.toString());
        await this.$router.push({ name: "product-details", params: { id: encryptParam} });
      } catch (error) {
        console.error(error);
      }
    },
    async getTopRatedProduct(){
      try {
        await this.$router.push({name:"top-rated"})
      } catch (error) {
        console.error(error);
      }
    },
    async goToSellers() {
      try {
        await this.$router.push({ name: "seller-list" });
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.fetchProducts();
  },
});

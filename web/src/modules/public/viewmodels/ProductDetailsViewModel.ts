import { decryptParamsId } from "@/kernel/utils/cryptojs";
import { IProduct } from "@/modules/products/models/ProductModel";
import ProductService from "@/modules/products/services/ProductService";
import { defineComponent, defineAsyncComponent } from "vue";
import PublicService from "./../service/PublicService";

export default defineComponent({
  data() {
    return {
      productSelected: {} as IProduct,
      selectedProduct: {} as { id: "" },
      resumeRating: [] as any,
      ratingList: [] as any,
      quantity: 1,
      isLoading: false,
    };
  },
  created() {
    try {
      this.selectedProduct = decryptParamsId(
        this.$route.params.id.toString()
      ) as { id: "" };
    } catch (e) {
      console.log(e);
    }
  },
  mounted() {
    this.getDeatilproduct();
    this.getResumeRating();
    this.getListRating();
  },
  methods: {
    async getDeatilproduct() {
      try {
        this.isLoading = true;
        const resp = await ProductService.getDetailProduct(
          this.selectedProduct
        );
        this.productSelected = resp.data;
        console.log(this.productSelected, "Producto seleccionado2");
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getResumeRating() {
      try {
        this.isLoading = true;
        console.log("Rsume id", this.productSelected.id);
        const resp = await PublicService.getResumeRateByProduct(
          this.selectedProduct
        );
        console.log(resp, "Producto rate");
        this.resumeRating = resp.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getListRating() {
      try {
        this.isLoading = true;
        console.log("list", this.productSelected.id);
        const resp = await PublicService.getRateListByProduct(
          this.selectedProduct
        );
        console.log(resp, "listado Rate");
        this.ratingList = resp.data.content;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    increment() {
      if (this.quantity < 10) {
        this.quantity++;
      }
    },
    decrement() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    },
  },
});

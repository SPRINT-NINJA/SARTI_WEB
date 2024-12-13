import { decryptParamsId } from "@/kernel/utils/cryptojs";
import { IProduct } from "@/modules/products/models/ProductModel";
import ProductService from "@/modules/products/services/ProductService";
import { defineComponent, defineAsyncComponent } from "vue";
import PublicService from "./../service/PublicService";
import { ICart } from "../models/AddCartModel";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { CustomerReview, RatingObject } from "../models/RateModel";



export default defineComponent({
  data() {
    return {
      productSelected: {} as IProduct,
      selectedProduct: {} as { id: "" },
      resumeRating: {} as RatingObject,
      ratingList: [] as CustomerReview[],
      images: [] as Array<{
        largeURL: string;
        thumbnailURL: string;
        width: number;
        height: number;
      }>,
      quantity: 1,
      isLoading: false,
      addCart: {} as ICart
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
    filterGallery() {
      if (
        Array.isArray(this.productSelected.productImages) &&
        this.productSelected.productImages.length > 0
      ) {
        this.images = this.productSelected.productImages.map((img: any) => ({
          largeURL: img.image,
          thumbnailURL: img.image,
          width: 800,
          height: 600,
        }));
      } else {
        this.images = []; // Limpia las imágenes si no hay datos válidos
      }
    },
    async getDeatilproduct() {
      try {
        this.isLoading = true;
        const resp = await ProductService.getDetailProduct(
          this.selectedProduct
        );
        this.productSelected = resp.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.filterGallery();
        this.isLoading = false;
      }
    },
    async getResumeRating() {
      try {
        this.isLoading = true;
        const resp = await PublicService.getResumeRateByProduct(
          this.selectedProduct
        );
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
        const resp = await PublicService.getRateListByProduct(
          this.selectedProduct
        );
        this.ratingList = resp.data.content;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async addToProductIntoCart() {
      try {
        this.isLoading = true;
        this.addCart.productId = this.productSelected.id;
        this.addCart.quantity = this.quantity;
        const resp = await PublicService.addProductIntoCart(this.addCart);
        if(!resp.error){
          SweetAlertCustom.successMessage(
            "¡Producto añadido al carrito!",
            "Revisa tu carrito para confirmar tu pedido."
          );
        }
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

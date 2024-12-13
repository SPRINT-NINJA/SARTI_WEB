import { decryptParamsId } from "@/kernel/utils/cryptojs";
import { IProduct } from "@/modules/products/models/ProductModel";
import ProductService from "@/modules/products/services/ProductService";
import { defineComponent, defineAsyncComponent } from "vue";
import PublicService from "@/modules/public/service/PublicService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";

import { ICart } from "@/modules/public/models/AddCartModel";
import { CustomerReview, RatingObject } from "@/modules/public/models/RateModel";



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
   async goBack() {
        try {
          await this.$router.push({ name: "product-list"});
        } catch (error) {
          console.error(error);
        }
    },
  },
});

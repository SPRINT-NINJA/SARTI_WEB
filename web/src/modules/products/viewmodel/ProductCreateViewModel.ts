import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, decimal, minValue } from "@vuelidate/validators";
import { enterOnlyDecimalNumbers } from "@/kernel/funcions";
import ProductService from "../services/ProductService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";

export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      product: {
        name: "",
        price: "",
        description: "",
        stock: 1,
        mainImage: "",
        images: [],
        position: [],
      },
      progress1: 0,
      productImages: [] as any,
      timeCharging: false,
      count: 1,
      isLoading: false,
    };
  },
  methods: {
    enterOnlyDecimalNumbers,
    validateStock() {
      // Asegura que el valor del stock no sea negativo
      if (this.product.stock < 0) {
        this.product.stock = 0;
      }
    },
    increaseStock() {
      this.product.stock++;
    },
    decreaseStock() {
      if (this.product.stock > 0) {
        this.product.stock--;
      }
    },
    organizePhotos(newImage: any) {
      if (newImage.length < 1) {
        return undefined;
      } else {
        const newArray = newImage.slice(1);
        return newArray.map((item: any) => item.target);
      }
    },
    getMainImage(newImage: any) {
      if (newImage.length < 1) {
        return undefined;
      } else {
        const newArray = newImage.slice(1);
        return newArray[0].target;
      }
    },
    async saveProduct() {
      try {
        SweetAlertCustom.questionMessage().then(async (result: any) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            const organizedImages = this.organizePhotos(this.productImages);
            this.product.mainImage = this.getMainImage(this.productImages);
            this.product.images = organizedImages
              ? organizedImages.map((image: any, index: number) => ({
                  imageFile: image, // Archivo de la imagen
                  position: index + 1, // Posición basada en el índice
                }))
              : [];
            const resp = await ProductService.saveProduct(this.product);
            const { error } = resp;
            if (!error) {
              SweetAlertCustom.successMessage();
              this.isLoading = false;
              this.$router.push({ name: "product-list" });
            }
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  validations() {
    return {
      product: {
        stock: {
          required: helpers.withMessage("Campo obligatorio", required),
        } as any,
        name: {
          required: helpers.withMessage("Campo obligatorio", required),
        } as any,
        price: {
          required: helpers.withMessage("Campo obligatorio", required),
          valid: helpers.withMessage(
            "Campo inválido, solo se aceptan decimales",
            decimal
          ),
          minValue: helpers.withMessage(
            " El precio debe ser mayor a 0",
            minValue(0.01)
          ),
          minDecimalLenth: helpers.withMessage(
            " Máximo 2 decimales",
            (value: number) => {
              if (!value) return true;
              return /^\d+(\.\d{1,2})?$/.test(value.toString());
            }
          ),
        } as any,
        description: {
          required: helpers.withMessage("Campo obligatorio", required),
        } as any,
      } as any,
    };
  },
});

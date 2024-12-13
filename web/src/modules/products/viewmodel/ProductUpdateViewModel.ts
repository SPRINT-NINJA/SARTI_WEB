import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, decimal, minValue } from "@vuelidate/validators";
import { enterOnlyDecimalNumbers } from "@/kernel/funcions";
import ProductService from "../services/ProductService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { decryptParamsId } from "@/kernel/utils/cryptojs";

export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      product: {
        id:"",
        name: "",
        price: "",
        description: "",
        stock: 1,
        mainImage: "",
        images: [],
        position: [],
      } as any,
      selectedProduct: {} as { id: "" },
      progress1: 0,
      productImages: [] as any,
      timeCharging: false,
      count: 1,
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
    this.getDeatilproduct().then(() => {
      this.touchAllFields();
    });
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
        const newArray = newImage.slice(1); // Si quieres dejar fuera la primera imagen (como en tu ejemplo)
        return newArray.map((item: any, index: number) => ({
          imageFile: item.target,  // Archivo de la imagen
          position: item.position,  // Asume que la propiedad "position" está disponible
          id: this.product.productImages[index]?.id,  // Accede correctamente al id de la imagen
        }));
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
    touchAllFields() {
      const touchIfNotEmpty = (field:any) => {
        if (field.$model !== null && field.$model !== "") {
          field.$touch();
        }
      };
    
    
      touchIfNotEmpty(this.v$.product.name);
      touchIfNotEmpty(this.v$.product.description);
      touchIfNotEmpty(this.v$.product.price);
    
    },
    async getDeatilproduct() {
      try {
        this.isLoading = true;
        const resp = await ProductService.getDetailProduct(
          this.selectedProduct
        );
        console.log(resp.data);
        this.product = resp.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateProduct() {
      try {
        SweetAlertCustom.questionMessage().then(async (result: any) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            this.product.id = this.selectedProduct.id;
            
            // Organiza las imágenes, incluidas las antiguas con sus ids
            const organizedImages = this.organizePhotos(this.productImages);
            
            // Configura la imagen principal
            this.product.mainImage = this.getMainImage(this.productImages);
            
            // Si las imágenes organizadas existen, mapea también sus ids y posiciones
            this.product.images = organizedImages
              ? organizedImages.map((image: any, index: number) => ({
                  imageFile: image.imageFile, // Archivo de la imagen
                  position: index + 1, // Posición incrementada
                  id: image.id, // ID de la imagen (antigua o nueva)
                }))
              : [];
            
            const resp = await ProductService.updateProduct(this.product);
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
    }    
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

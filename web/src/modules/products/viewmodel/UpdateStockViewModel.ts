import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import ProductService from "../services/ProductService";
export default defineComponent({
  props: {
    updateStockProp: {
      type: Object as () => any,
      required: true,
    },
  },
  watch: {
    updateStockProp() {
      console.log("prop", this.updateStockProp);
      this.updateStockPayload = { ...this.updateStockProp } as any;
    },
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      updateStockPayload: {} as any,
      isLoading: false,
      errorMessagges: {
        required: "Campo obligatorio",
        invalidEmail: "Correo inválido",
        minLength: "Mínimo 6 caracteres",
        maxLength: "Máximo 45 caracteres",
        noneScripts: "Campo inválido no se aceptan scripts",
        valid: "Campos inválido - caracteres inválidos",
        password: {
          valid:
            "La contraseña debe tener mínimo una mayúscula, un caracter especial (# . _) y un número (longitud de 3 a 16 car.)",
        },
      },
    };
  },
  methods: {
    async updateStock() {
      try {
        SweetAlertCustom.questionMessage().then(async (result: any) => {
          if (result.isConfirmed) {
            const resp = await ProductService.updateStock(
              this.updateStockPayload
            );
            const { error } = resp;
            if (!error) {
              SweetAlertCustom.successMessage();
              this.$emit("reloadProducts");
              this.closeModal();
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    closeModal() {
      this.v$.$reset();
      this.$bvModal.hide("update-stock");
    },
    increaseStock() {
      this.updateStockPayload.stock++;
    },
    decreaseStock() {
      if (this.updateStockPayload.stock > 0) {
        this.updateStockPayload.stock--;
      }
    },
    validateStock() {
      // Asegura que el valor del stock no sea negativo
      if (this.updateStockPayload.stock < 0) {
        this.updateStockPayload.stock = 0;
      }
    },
  },
  validations() {
    return {
      updateStockPayload: {
        stock: {
          required: helpers.withMessage(this.errorMessagges.required, required),
        } as any,
        productId: {} as any,
      } as any,
    };
  },
});

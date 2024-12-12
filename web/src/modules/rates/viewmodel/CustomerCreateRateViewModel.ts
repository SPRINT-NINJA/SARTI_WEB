import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  maxLength,
  minLength,
  email,
  helpers,
} from "@vuelidate/validators";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { decryptParamsId } from "@/kernel/utils/cryptojs";
import { IcreateRate } from "../models/CustomerCreateRateModel";
import RateService from "../service/RateService";

export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  props: {
    productId: {
      type: Number,
      default: 0,
    },
    orderProductId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isLoading: false,
      toggle: false,
      review: {
        rate: 0,
        image: "",
        comment:""
      } as IcreateRate,
      imagesUpload: {},
      showConfirmImage: false,
      errorMessagges: {
        required: "Campo obligatorio",
        minLengthreferenceNear: "Mínimo 10 caracteres",
        maxLengthreferenceNear: "Máximo 50 caracteres",
        invalidTextWithNumber: "No se aceptan caracteres especiales",
      },
      comment:"",
      fillForm: true,
      evidenceImage: [] as any,
      progressImages: 0,
      timeChargingImages: false,
    };
  },
  computed:{

  },
  methods: {
    openForm() {
      this.toggle = !this.toggle;
    },
    async createRate(){
      try {
        this.isLoading = true;
        this.review.image = this.evidenceImage[0].target;
        this.review.productId = this.productId;
        this.review.comment = this.comment;
        this.review.orderProductId = this.orderProductId;
        const resp = await RateService.createRate(this.review);
        if (!resp.error) {
          SweetAlertCustom.successMessage(
            "Se ha enviado tu reseña correctamente",
            "Muchas gracias por realizar la reseña"
          );
          location.reload();
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  },
  validations() {
    return {
        comment: {
          required: helpers.withMessage(
            this.errorMessagges.required,
            required
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLengthreferenceNear,
            maxLength(50)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLengthreferenceNear,
            minLength(10)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidTextWithNumber,
            (value: string) => {
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9.,:\-\(\)\s]+$/.test(value);
            }
          ),
        } as any,
    };
  },
});

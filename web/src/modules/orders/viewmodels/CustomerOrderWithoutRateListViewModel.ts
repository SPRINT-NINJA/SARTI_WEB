import { defineComponent } from "vue";
import { encryptParamsId } from "@/kernel/utils/cryptojs";
import { MissingRateOrderProduct } from "../models/MissingRateOrderProduct";
import CustomerOrderProductService from "../services/CustomerOrderProductService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { GetMissingRateOrderProductDto } from "../models/GetMissingRateOrderProductDto";
import {
  required,
  maxLength,
  minLength,
  email,
  helpers,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      orderProducts: [] as Array<MissingRateOrderProduct>,
      isLoading: false,
      pagination: {
        page: 1,
        size: 5,
        sort: "id",
        direction: "DESC",
        searchValue: "",
      },
      totalRows: 0,
      toggle: false,
      review: {
        comment: "",
        rate: 0,
        image: "",
      },
      evidenceImage:[] as any,
      progressImages: 0,
      timeChargingImages:false,
      errorMessagges: {
        required: "Por favor llena el formulario",
        invalidText: "No se aceptan caracteres especiales",
        minLengthText: "Se aceptan solo el minímo de 10 caracteres",
        maxLengthText: "Solo máximo 100 caracteres",
      },
      fillForm: true,
    };
  },
  watch:{
   
  },
  methods: {
    openForm(status:boolean){
      status = !status
    },
    async fetchOrderProductsMissingRates() {
      try {
        this.isLoading = true;
        const response =
          await CustomerOrderProductService.getOrderProductMissingRate(
            this.pagination as GetMissingRateOrderProductDto
          );
        this.orderProducts = response.data
          .content as Array<MissingRateOrderProduct>;
        this.totalRows = response.data.totalElements;
      } catch (error) {
        console.error(error);
        SweetAlertCustom.errorMessage(
          "Error",
          "Ocurrió un error al obtener los productos sin reseña"
        );
      } finally {
        this.isLoading = false;
      }
    },
    parseDateByRead(dateString: string) {
      const months = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];

      const [year, month, day] = dateString.split("-").map(Number);
      return `${day} de ${months[month - 1]} del ${year}`;
    },
    async goToOrderCreateRate(item: any) {
      try {
        console.log(item);
        const encryptParam = encryptParamsId(item.toString());
        await this.$router.push({
          name: "create-rate",
          params: { id: encryptParam },
        });
      } catch (error) {
        console.error(error);
      }
    },
    async handlePageChange(page: number) {
      this.pagination.page = page;
      await this.fetchOrderProductsMissingRates();
    },
    async handleResetPage() {
      this.pagination.page = 1;
      await this.fetchOrderProductsMissingRates();
    },
    fillFormAprove() {
      if (
        this.review.comment != null &&
        this.review.image != null &&
        this.review.rate > 0
      )
        return true;
    },
  },
  mounted() {
    this.fetchOrderProductsMissingRates();
  },
  validations() {
    return {
      review: {
        comment: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLengthText,
            maxLength(100)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLengthText,
            minLength(10)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidText,
            (value: string) => {
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
            }
          ),
        } as any,
      },
    };
  },
});

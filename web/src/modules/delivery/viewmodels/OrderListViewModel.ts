import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import OrderDeliveryService from "../services/OrderDeliveryService";
import { GetOrderDeliveriesDto } from "../models/GetOrderDeliveriesDto";
export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      ordersToTake: [] as any,
      isLoading: false,
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        direction: "DESC",
        searchValue: ""
      },
      totalRows: 0,
    };
  },

  methods: {
    async fetchOrderDeliveriesToTake() {
      try {
        this.isLoading = true;
        const response = await OrderDeliveryService.getOrderDeliveriesToTake(this.pagination as GetOrderDeliveriesDto);
        console.log(response);
        this.ordersToTake = response.data.content as Array<any>;
        this.totalRows = response.data.totalElements;
      } catch (e: any) {
        console.error(e);
        SweetAlertCustom.errorMessage(
          "Error",
          "Ocurrió un error al obtener los pedidos disponibles."
        );
        this.ordersToTake = [];
        this.pagination.page = 1;
      } finally {
        this.isLoading = false;
      }
    },

    async handlePageChange(page: number) {
      this.pagination.page = page;
      await this.fetchOrderDeliveriesToTake();
    },

    async handleResetPage() {
      this.pagination.page = 1;
      await this.fetchOrderDeliveriesToTake();
    },
  },
  mounted() {
    this.fetchOrderDeliveriesToTake();
  }
});

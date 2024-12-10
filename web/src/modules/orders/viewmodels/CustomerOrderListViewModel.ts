import { defineComponent } from "vue";
import { encryptParamsId } from "@/kernel/utils/cryptojs";
import OrderDeliveryService from "@/modules/delivery/services/OrderDeliveryService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { GetOrderDeliveriesDto } from "@/modules/delivery/models/GetOrderDeliveriesDto";
import { MissingRateOrderProduct } from "../models/MissingRateOrderProduct";
import CustomerOrderProductService from "../services/CustomerOrderProductService";
import { GetMissingRateOrderProductDto } from "../models/GetMissingRateOrderProductDto";

export default defineComponent({
  data() {
    return {
      orderProducts: [] as Array<MissingRateOrderProduct>,
      orderDeliveries: [] as any,
      isLoading: false,
      pagination: {
        page: 1,
        size: 3,
        sort: "id",
        direction: "DESC",
        searchValue: ""
      },
      totalRows: 0,
      totalMissingRate: "",
    };
  },
  methods: {
    async fetchOrderDeliveries() {
      try {
        this.isLoading = true;
        const response = await OrderDeliveryService.getOrderDeliveriesHistory(this.pagination as GetOrderDeliveriesDto);
        this.orderDeliveries = response.data.content as Array<any>;
        
        this.orderDeliveries = this.orderDeliveries.map((el: any) => ({
          ...el,
          sartiOrder: {
            ...el.sartiOrder,
            orderProducts: el.sartiOrder.orderProducts.map((orderProduct: any) => ({
              ...orderProduct,
              productInfo: JSON.parse(orderProduct.productInfo),
            })),
          },
        }));

        this.totalRows = response.data.totalElements;
      } catch (error) {
        console.error(error);
        SweetAlertCustom.errorMessage(
          "Error",
          "Ocurrió un error al obtener los pedidos"
        );
        this.orderDeliveries = [];
        this.pagination.page = 1;
      } finally {
        this.isLoading = false
      }
    },

    async fetchOrderProductsMissingRatesCount() {
      try {
        this.isLoading = true;
        const response = await CustomerOrderProductService.getOrderProductMissingRate(this.pagination as GetMissingRateOrderProductDto);
        this.totalMissingRate = String(response.data.totalElements);
      } catch (error) {
        console.error(error);
        SweetAlertCustom.errorMessage(
          "Error",
          "Ocurrió un error al obtener los pedidos"
        );
      } finally {
        this.isLoading = false
      }
    },

    async goToOrderDetails(item: string) {
      try {
        console.log(item)
        const encryptParam = encryptParamsId(item.toString());
        await this.$router.push({ name: "order-detail", params: { id: encryptParam } });
      } catch (error) {
        console.error(error);
      }
    },

    async goToOrderWithoutRate() {
      await this.$router.push({ name: "order-without-rate" });
    },

    async initView() {
      await this.fetchOrderDeliveries();
      await this.fetchOrderProductsMissingRatesCount();
    },

    async handlePageChange(page: number) {
      this.pagination.page = page;
      await this.fetchOrderDeliveries();
    },

    async handleResetPage() {
      this.pagination.page = 1;
      await this.fetchOrderDeliveries();
    },
  },
  mounted() {
    this.initView();
  }
});

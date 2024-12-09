import { defineComponent } from "vue";
import SellerOrderService from "../services/SellerOrderService";
import { StepOrder, TypeOrder, StepOrderStatus } from "@/kernel/types";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { encryptParamsId } from "@/kernel/utils/cryptojs";
export default defineComponent({
  data() {
    return {
      StepOrderStatus,
      transProps: { name: "flip-list" },
      isBusy: false,
      fields: [
        { key: "id", label: "#", sortable: false },
        { key: "orderNumber", label: "Número de pedido", sortable: true },
        {
          key: "deliveryMan",
          label: "Número de rapartidor",
          sortable: true,
        },
        { key: "orderDeliveryType", label: "Tipo de venta", sortable: true },
        { key: "address", label: "Dirección de reparto", sortable: true },
        { key: "status", label: "Estado", sortable: true },
        { key: "actions", label: "Acciones", sortable: false },
      ],
      orders: [] as any[],
      pagination: {
        page: 1,
        size: 5,
        sort: "id",
        direction: "DESC",
        name: "",
        totalRows: 0,
        data: {
          name: "",
        },
      },
      isLoading: false,
      optionsFieldToPage: [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "20", value: 20 },
        { text: "50", value: 50 },
        { text: "100", value: 100 },
      ],
      pagedPayload: {
        page: 1,
        size: 5,
        sort: "DESC",
        step: StepOrder.PENDIENTE_DE_REPARTIDOR,
        type: TypeOrder.ENVIO,
        searchValue: "",
      },
    };
  },
  methods: {
    async getAllOrders() {
      try {
        this.isLoading = true;
        this.pagedPayload.page = this.pagination.page;
        this.pagedPayload.size = this.pagination.size;
        this.pagedPayload.sort = this.pagination.direction;
        const resp = await SellerOrderService.getAllOrders(this.pagedPayload);
        const { error } = resp;
        if (!error) {
          this.orders = resp.data.content;
          this.pagination.totalRows = resp.data.totalElements;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async handleChangeStep(order: any) {
      try {
        let newStatus = "";
        if (order.orderDeliveryStep === StepOrderStatus.PENDIENTE_DE_ENVIO)
          newStatus = StepOrder.ENVIADO;
        if (
          order.orderDeliveryStep === StepOrderStatus.PENDIENTE_DE_RECOLECCION
        )
          newStatus = StepOrder.ENTREGADO;
        SweetAlertCustom.questionMessage(
          `Cambiar el estado a ${newStatus}`
        ).then(async (result: any) => {
          if (result.isConfirmed) {
            const resp = await SellerOrderService.changeStep({
              orderId: order.id,
              step: newStatus,
            });
            const { error } = resp;
            if (!error) {
              SweetAlertCustom.successMessage();
              this.getAllOrders();
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getOrderPerDetails(item: any) {
        try {
          const { id } = item;
          const encryptParam = encryptParamsId(id.toString());
          await this.$router.push({ name: "seller-order-details", params: { id: encryptParam} });
        } catch (error) {
          console.error(error);
        }
      },
  },
  created() {
    this.getAllOrders();
  },
});

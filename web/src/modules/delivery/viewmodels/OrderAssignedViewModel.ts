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
            orderDeliveriesHistory: [] as any,
            takenOrderDelivery: null as any,
            isLoading: false,
            isShowProducts: {} as any,
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
        async fetchOrderDeliveriesHistory() {
            try {
                const response = await OrderDeliveryService.getOrderDeliveriesHistory(this.pagination as GetOrderDeliveriesDto);
                console.log(response);

                this.orderDeliveriesHistory = response.data.content as Array<any>;

                this.orderDeliveriesHistory = this.orderDeliveriesHistory.map((el: any) => ({
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
                this.orderDeliveriesHistory = [];
                this.pagination.page = 1;
            }
        },

        async fetchTakenOrderDelivery() {
            try {
                const response = await OrderDeliveryService.getTakenOrderDeliveries();
                console.log(response);

                if (!response.data[0]) {
                    this.takenOrderDelivery = null;
                    return;
                }

                this.takenOrderDelivery = response.data[0]
                this.takenOrderDelivery.sartiOrder = {
                    ...this.takenOrderDelivery.sartiOrder,
                    orderProducts: this.takenOrderDelivery.sartiOrder.orderProducts.map((orderProduct: any) => ({
                        ...orderProduct,
                        productInfo: JSON.parse(orderProduct.productInfo),
                    })),
                }
            } catch (error) {
                console.error(error);
                SweetAlertCustom.errorMessage(
                    "Error",
                    "Ocurrió un error al obtener el pedido asignado"
                );
            }
        },

        async initView() {
            this.isLoading = true;
            await this.fetchOrderDeliveriesHistory();
            await this.fetchTakenOrderDelivery();
            this.isLoading = false;
        },

        async handleChangeStep(order: any) {
            try {
                let newStatus = "";
                if (order.orderDeliveryStep === "Pendiente de envío")
                    newStatus = 'ENVIADO';
                if (
                    order.orderDeliveryStep === "Enviado"
                )
                    newStatus = "ENTREGADO";
                SweetAlertCustom.questionMessage(
                    `Cambiar el estado a ${newStatus}`
                ).then(async (result: any) => {
                    if (result.isConfirmed) {
                        const resp = await OrderDeliveryService.changeOrderDeliveryStep({
                            orderId: order.id,
                            step: newStatus,
                        });
                        const { error } = resp;
                        if (!error) {
                            SweetAlertCustom.successMessage();
                            await this.initView();
                        }
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },

        async handlePageChange(page: number) {
            this.pagination.page = page;
            await this.fetchOrderDeliveriesHistory();
        },

        async handleResetPage() {
            this.pagination.page = 1;
            await this.fetchOrderDeliveriesHistory();
        },
    },
    mounted() {
        this.initView();
    }
});

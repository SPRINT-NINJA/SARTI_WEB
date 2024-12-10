import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email, helpers } from "@vuelidate/validators";
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
        toggleProducts(index: any) {
            // Alterna el estado del índice específico
            this.$set(this.isShowProducts, index, !this.isShowProducts[index]);
        },
        async fetchOrderDeliveriesHistory() {
            try {
                this.isLoading = true;
                const response = await OrderDeliveryService.getOrderDeliveriesHistory(this.pagination as GetOrderDeliveriesDto);
                this.orderDeliveriesHistory = response.data.content as Array<any>;
                this.totalRows = response.data.totalElements;
            } catch (error) {
                console.error(error);
                SweetAlertCustom.errorMessage(
                    "Error",
                    "Ocurrió un error al obtener los pedidos"
                );
                this.orderDeliveriesHistory = [];
                this.pagination.page = 1;
            } finally {
                this.isLoading = false
            }
        },

        async fetchTakenOrderDelivery() {
            try {
                this.isLoading = true
                const response = await OrderDeliveryService.getTakenOrderDeliveries();
                console.log(response);
                this.takenOrderDelivery = response.data[0]
            } catch (error) {
                console.error(error);
                SweetAlertCustom.errorMessage(
                    "Error",
                    "Ocurrió un error al obtener el pedido asignado"
                );
            } finally {
                this.isLoading = false
            }
        },

        async initView() {
            this.fetchOrderDeliveriesHistory();
            this.fetchTakenOrderDelivery();
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
                            this.initView();
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

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
            isLoading: false,
            isShowProducts: false,
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
                this.isLoading = true;
                const response = await OrderDeliveryService.getOrderDeliveriesHistory(this.pagination as GetOrderDeliveriesDto);
                console.log(response);
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
                this.isLoading = false;
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
        this.fetchOrderDeliveriesHistory();
    }
});

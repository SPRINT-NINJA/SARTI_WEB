import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email, helpers } from "@vuelidate/validators";
export default defineComponent({
    setup() {
        const v$ = useVuelidate();
        return { v$ };
    },
    data() {
        return {
        };
    },

    methods: {
        getOrders() {
            console.log("Aqui seran los pedidos");
        },

        acceptOrder() {
            console.log("Pedido aceptado");
        },

        declineOrder() {
            console.log("Pedido rechazado");
        },
    },

});

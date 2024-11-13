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
      currentPage: 1, 
      itemsPerPage: 4, 
      selectedOrder: null as any,
      orders: [
        {
          id: 1,
          name: "Producto 1",
          price: 100,
          description: "Este es el Producto 1",
          userInfo: { name: "Alan Matthew Esteban", address: "Calle 1" },
          image:
            "https://png.pngtree.com/png-clipart/20231116/original/pngtree-coca-cola-bottled-drink-isolated-photo-png-image_13575918.png",
        },
        {
          id: 2,
          name: "Producto 2",
          price: 200,
          description: "Este es el Producto 2",
          userInfo: { name: "María Pérez", address: "Avenida 45" },
          image:
            "https://png.pngtree.com/png-vector/20231018/ourmid/pngtree-pepsi-cola-bottles-isolated-on-white-with-reflection-png-image_10292878.png",
        },
        {
          id: 3,
          name: "Producto 3",
          price: 150,
          description: "Este es el Producto 3",
          userInfo: { name: "Juan García", address: "Calle 12" },
          image:
            "https://www.sampieri.com.mx/wp-content/uploads/2020/04/SPRITE-600-ml.jpg",
        },
        {
          id: 4,
          name: "Producto 4",
          price: 300,
          description: "Este es el Producto 4",
          userInfo: { name: "Lucía Sánchez", address: "Colonia Centro" },
          image:
            "https://grupoelvalor.com/wp-content/uploads/2018/12/red-cola-600ml.png",
        },
        {
          id: 5,
          name: "Producto 5",
          price: 400,
          description: "Este es el Producto 5",
          userInfo: { name: "Carlos López", address: "Calle Falsa 123" },
          image: "https://via.placeholder.com/150",
        },
        {
          id: 6,
          name: "Producto 6",
          price: 250,
          description: "Este es el Producto 6",
          userInfo: { name: "Elena Ruiz", address: "Callejón del Triunfo" },
          image: "https://via.placeholder.com/150",
        },
      ],
    };
  },

  methods: {
    getOrders() {
      console.log("Aqui seran los pedidos");
    },
    
    acceptOrder() {
      console.log("Pedido aceptado")
    },

    declineOrder() {
      console.log("Pedido rechazado")
    },
    
    openOrderModal(orderId: any) {
      this.selectedOrder = this.orders.find(order => order.id === orderId);
      this.$bvModal.show("order-modal");
    },
  },
  computed: {
    paginatedOrders() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.orders.slice(start, end);
    },
},
});

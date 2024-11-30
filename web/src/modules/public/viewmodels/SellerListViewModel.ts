import { defineComponent } from "vue";
import { encryptParamsId } from "@/kernel/utils/cryptojs";

export default defineComponent({
  data() {
    return {
      sellers: [
        {
          id: 1,
          mainImage:"https://picsum.photos/1000/1000",
          name:"TIENDA 1",
          description:"¡Dale un toque único a tu fiesta! Pintamos y elaboramos cerámica personalizada para que cada detalle sea especial."
        },{
            id: 2,
            mainImage:"https://picsum.photos/1000/1000",
            name:"TIENDA 2",
            description:"¡Dale un toque único a tu fiesta! Pintamos y elaboramos cerámica personalizada para que cada detalle sea especial."
          },
          {
            id: 3,
            mainImage:"https://picsum.photos/1000/1000",
            name:"TIENDA 3",
            description:"¡Dale un toque único a tu fiesta! Pintamos y elaboramos cerámica personalizada para que cada detalle sea especial."
          },
          {
            id: 4,
            mainImage:"https://picsum.photos/1000/1000",
            name:"TIENDA 4",
            description:"¡Dale un toque único a tu fiesta! Pintamos y elaboramos cerámica personalizada para que cada detalle sea especial."
          },
          {
            id: 5,
            mainImage:"https://picsum.photos/1000/1000",
            name:"TIENDA 5",
            description:"¡Dale un toque único a tu fiesta! Pintamos y elaboramos cerámica personalizada para que cada detalle sea especial."
          },
          {
            id: 6,
            mainImage:"https://picsum.photos/1000/1000",
            name:"TIENDA 6",
            description:"¡Dale un toque único a tu fiesta! Pintamos y elaboramos cerámica personalizada para que cada detalle sea especial."
          },
       
      ],
      currentPage: 1, // Página actual
      pageSize: 3, // Número de elementos por página
      totalRows: 6, // Total de elementos
      paginatedOrders: [] as any, // Pedidos a mostrar en la página actual
    };
  },
  methods: {
    updatePaginatedOrders() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedOrders = this.sellers.slice(start, end);
    },
    async getsellerProduct(item: any) {
      try {
        const encryptParam = encryptParamsId(item.toString());
        await this.$router.push({ name: "seller-products", params: { id: encryptParam} });
      } catch (error) {
        console.error(error);
      }
    },
    
  },
  mounted() {
    this.updatePaginatedOrders();
  },
});

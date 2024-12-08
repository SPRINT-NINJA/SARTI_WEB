import { defineComponent } from "vue";
import { encryptParamsId } from "@/kernel/utils/cryptojs";
import PublicService from "../service/PublicService";

export default defineComponent({
  data() {
    return {
      sellers: [] as Array<any>, // Inicializamos vacío, ya no es estático
      isLoading: false,
      currentPage: 1, // Página actual
      pageSize: 3, // Número de elementos por página
      totalRows: 0, // Total de elementos, ahora dinámico
      paginatedOrders: [] as Array<any>, // Pedidos a mostrar en la página actual
    };
  },
  methods: {
    async fetchSellers() {
      try {
        this.isLoading = true;
        // Consumimos los datos desde el servicio
        const response = await PublicService.getSellers(null);
        this.sellers = response.data; // Suponiendo que `data` contiene la lista de vendedores
        this.totalRows = this.sellers.length; // Total dinámico basado en los datos obtenidos
        this.updatePaginatedOrders(); // Actualizamos la paginación
      } catch (error) {
        console.error("Error al cargar los vendedores:", error);
      } finally {
        this.isLoading = false;
      }
    },
    updatePaginatedOrders() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedOrders = this.sellers.slice(start, end);
    },
    async getsellerProduct(item: any) {
      try {
        const encryptParam = encryptParamsId(item.toString());
        await this.$router.push({ name: "seller-products", params: { id: encryptParam } });
      } catch (error) {
        console.error(error);
      }
    },
    handlePageChange(newPage: number) {
      this.currentPage = newPage;
      this.updatePaginatedOrders(); // Cambiamos los elementos de la página actual
    },
  },
  async mounted() {
    await this.fetchSellers(); // Cargar datos al montar el componente
  },
});

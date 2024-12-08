import { defineComponent } from "vue";
import { encryptParamsId } from "@/kernel/utils/cryptojs";
import PublicService from "../service/PublicService";
import { SellerListDto } from "../models/SellerListDto";
import { SellerListModel } from "../models/SellerListModel";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";

export default defineComponent({
  data() {
    return {
      sellers: [] as Array<SellerListModel>, // Inicializamos vacío, ya no es estático
      isLoading: false,
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        direction: "DESC",
        businessName: ""
      },
      totalRows: 0,
    };
  },
  methods: {
    async fetchSellers() {
      try {
        this.isLoading = true;
        const response = await PublicService.getSellers(this.pagination as SellerListDto);
        this.sellers = response.data.content as Array<SellerListModel>; // Suponiendo que `data` contiene la lista de vendedores
        this.totalRows = response.data.totalElements; // Total dinámico basado en los datos obtenidos
      } catch (error) {
        console.error("Error al cargar los vendedores:", error);
        SweetAlertCustom.errorMessage(
          "Error",
          "Ocurrió un error al obtener los vendedores"
        );
        this.sellers = [];
        this.pagination.page = 1;
      } finally {
        this.isLoading = false;
      }
    },
    async getsellerProduct(item: any) {
      try {
        const encryptParam = encryptParamsId(item.toString());
        await this.$router.push({ name: "seller-products", params: { id: encryptParam } });
      } catch (error) {
        console.error(error);
      }
    },
    async handlePageChange(page: number) {
      this.pagination.page = page;
      await this.fetchSellers();
    },
    async handleResetPage() {
      this.pagination.page = 1;
      await this.fetchSellers();
    },
  },
  async mounted() {
    await this.fetchSellers();
  },
});

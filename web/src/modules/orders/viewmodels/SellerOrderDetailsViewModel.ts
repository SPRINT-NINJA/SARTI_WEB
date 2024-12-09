import { decryptParamsId } from "@/kernel/utils/cryptojs";
import { defineComponent } from "vue";
import SellerOrderService from "../services/SellerOrderService";

export default defineComponent({
  data() {
    return {
      order: {} as any,
      selectedOrder: {} as any,
      isLoading: false,
    };
  },
  methods: {
    getIdFromUrl() {
      try {
        this.selectedOrder = decryptParamsId(
          this.$route.params.id.toString()
        ) as { id: "" };
      } catch (e) {
        console.log(e);
      }
    },
    async getOrderDetails() {
      try {
        this.isLoading = true;
        this.getIdFromUrl();
        console.log(this.selectedOrder);
        const resp = await SellerOrderService.getOrderDetails({
          id: this.selectedOrder.id,
        });
        const { error } = resp;
        if (!error) {
          this.order = resp.data;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.getOrderDetails();
  },
});

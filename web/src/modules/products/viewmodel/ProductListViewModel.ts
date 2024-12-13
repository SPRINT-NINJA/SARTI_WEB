import CustomOverlay from "@/modules/public/components/CustomOverlay.vue";
import { defineComponent } from "vue";
import { IProduct } from "@/modules/products/models/ProductModel";
import ProductService from "../services/ProductService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { decryptParamsId, encryptParamsId } from "@/kernel/utils/cryptojs";

export default defineComponent({
  data() {
    return {
      optionsFieldToPage: [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "20", value: 20 },
        { text: "50", value: 50 },
        { text: "100", value: 100 },
      ],
      products: [] as IProduct[],
      pagedPayload: {
        productName: "",
        sellerId: "",
        page: 1,
        size: 5,
        sort: "DESC",
      },
      isLoading: false,
      pagination: {
        page: 1,
        sort: "id",
        size: 5,
        direction: "DESC",
        totalRows: 0,
        data: {
          name: "",
          hotelId: 0,
        },
      },
      updateStockProp: {} as any,
    };
  },
  methods: {
    handleCreateProduct() {
      try {
        this.isLoading = true;
        this.$router.push({ name: "create-product" });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateDetails(item: any) {
      try {
        const { id } = item;
        const encryptParam = encryptParamsId(id.toString());
        await this.$router.push({
          name: "update-product",
          params: { id: encryptParam },
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getProductPerDetails(item: any) {
      try {
        const { id } = item;
        const encryptParam = encryptParamsId(id.toString());
        await this.$router.push({ name: "detail-product-seller", params: { id: encryptParam} });
      } catch (error) {
        console.error(error);
      }
    },
    async getAllProducts() {
      try {
        this.isLoading = true;
        this.pagedPayload.page = this.pagination.page;
        this.pagedPayload.size = this.pagination.size;
        this.pagedPayload.sort = this.pagination.direction;
        const resp = await ProductService.getAllProducts(this.pagedPayload);
        const { error } = resp;
        if (!error) {
          this.products = resp.data.content;
          this.pagination.totalRows = resp.data.totalElements;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async handlePageChange(page: number) {
      this.pagination.page = page;
      await this.getAllProducts();
    },
    async handleResetPage() {
      this.pagination.page = 1;
      await this.getAllProducts();
    },
    handleUpdateStock(item: any) {
      console.log("item", item);
      this.updateStockProp = { ...item };
      this.$bvModal.show("update-stock");
    },
    async changeStatus(item: any) {
      try {
        SweetAlertCustom.questionMessage().then(async (result: any) => {
          if (result.isConfirmed) {
            const resp = await ProductService.changeStatus(item);
            const { error } = resp;
            if (!error) {
              this.getAllProducts();
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct(item: any) {
      try {
        SweetAlertCustom.questionMessage().then(async (result: any) => {
          if (result.isConfirmed) {
            const resp = await ProductService.deteleProduct(item);
            const { error } = resp;
            if (!error) {
              this.getAllProducts();
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getAllProducts();
  },
});

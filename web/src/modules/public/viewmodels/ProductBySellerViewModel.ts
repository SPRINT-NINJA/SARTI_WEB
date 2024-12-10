import { decryptParamsId, encryptParamsId } from "@/kernel/utils/cryptojs";
import { IProduct } from "@/modules/products/models/ProductModel";
import ProductService from "@/modules/products/services/ProductService";
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Product 1",
          price: 100,
          image: "https://picsum.photos/1000/1000",
          rating: 4,
        },
        {
          id: 2,
          name: "Product 2",
          price: 200,
          image: "https://picsum.photos/1000/1000",
          rating: 6,
        },
        {
          id: 3,
          name: "Product 3",
          price: 300,
          image: "https://picsum.photos/1000/1000",
          rating: 9,
        },
        {
          id: 4,
          name: "Product 4",
          price: 400,
          image: "https://picsum.photos/1000/1000",
          rating: 8.5,
        }, {
          id: 5,
          name: "Product 5",
          price: 400,
          image: "https://picsum.photos/1000/1000",
          rating: 8.5,
        },
        {
          id: 6,
          name: "Product 6",
          price: 400,
          image: "https://picsum.photos/1000/1000",
          rating: 8.5,
        },
        {
          id: 7,
          name: "Product 7",
          price: 400,
          image: "https://picsum.photos/1000/1000",
          rating: 8.5,
        },
        {
          id: 8,
          name: "Product 8",
          price: 400,
          image: "https://picsum.photos/1000/1000",
          rating: 8.5,
        }
      ],
      seller: {
        id: 1,
        mainImage:"https://picsum.photos/1000/1000",
        name:"TIENDA 1",
        description:"¡Dale un toque único a tu fiesta! Pintamos y elaboramos cerámica personalizada para que cada detalle sea especial."
      }, 
      sellerSelected: {} as { id: "" },
      topRated:false,
      recentlyProduct:false,
      optionsFieldToPage: [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "20", value: 20 },
        { text: "50", value: 50 },
        { text: "100", value: 100 },
      ],
      productsSeller: [
       {
        seller:{
          bussinessName : "",
          description:""
        }
       }
      ] as IProduct[],
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
    };
  },
  created() {
    try {
      this.sellerSelected = decryptParamsId(
        this.$route.params.id.toString()
      ) as { id: "" };
    } catch (e) {
      console.log(e);
    }
  },
  mounted() {
    this.getAllProducts();
  },
  methods: {
    async getProductPerDetails(item: any) {
      try {
        const { id } = item;
        const encryptParam = encryptParamsId(id.toString());
        await this.$router.push({ name: "product-details", params: { id: encryptParam} });
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
        this.pagedPayload.sellerId = this.sellerSelected.id;
        const resp = await ProductService.getAllProducts(this.pagedPayload);
        const { error } = resp;
        if (!error) {
          this.productsSeller = resp.data.content;
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
    changeSelectTopRated(){
      if(this.recentlyProduct){
        this.pagination.direction = "ASC";
        this.getAllProducts();
        this.topRated=false;
      }else{
        this.pagination.direction = "DESC";
        this.getAllProducts();
      }
    },
    changeRecently(){
      if(this.topRated){
        this.pagination.sort = "rating";
        this.pagination.direction = "ASC";
        this.getAllProducts();
        this.recentlyProduct=false;
      }else{
        this.pagination.direction = "DESC";
        this.getAllProducts();
      }
    }
  },
});

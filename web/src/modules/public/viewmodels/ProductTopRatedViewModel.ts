import { decryptParamsId, encryptParamsId } from "@/kernel/utils/cryptojs";
import { IProduct } from "@/modules/products/models/ProductModel";
import ProductService from "@/modules/products/services/ProductService";
import { defineComponent } from "vue";

export interface product{
  id:number,
  name:string,
  price:number,
  image:string,
  rating:number
}

export default defineComponent({
  data() {
    return {
      productPart1: [
        {
          id: 0,
          name: "",
          description: "",
          mainImage: "",
          price: 0,
        },
      ] as IProduct[],      
      productPart2:[
        {
          id: 0,
          name: "",
          description: "",
          mainImage: "",
          price: 0,
        },

      ] as IProduct[

      ],
      productPart3:[
        {
          id: 0,
          name: "",
          description: "",
          mainImage: "",
          price: 0,
        },

      ] as IProduct[],
      ratingTaste:9,
      optionsFieldToPage: [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "20", value: 20 },
        { text: "50", value: 50 },
        { text: "100", value: 100 },
      ],
      products: [
        {
          id: 0,
          name: "",
          description: "",
          mainImage: "",
          price: 0,
        },
      ] as IProduct[],
      pagedPayload: {
        productName: "",
        sellerId: "",
        page: 1,
        size: 10  ,
        sort: "ASC",
      },
      isLoading: false,
      pagination: {
        page: 1,
        sort: "rating",
        size: 10,
        direction: "ASC",
        totalRows: 0,
        data: {
          name: "",
          hotelId: 0,
        },
      },
    };
  },
  methods: {
    getProdcutRated(){
      if(this.products.length >= 7 && this.products.length <=10){
        this.productPart1 =  this.products.slice(0, 4);
        this.productPart2 = this.products.slice(4,6);
        this.productPart3 = this.products.slice(6,10);
      }

      if(this.products.length === 6){
        this.productPart1 =  this.products.slice(0, 4);
        this.productPart2 = this.products.slice(4,6);
      }      

      if(this.products.length <= 5){
        this.productPart1 = this.products;
      }
      console.log(this.productPart1.length, "Holi 1")
      console.log(this.productPart2.length,"Holi 2")
      console.log(this.productPart3.length,"Holi 3")
    },
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
        const resp = await ProductService.getAllProducts(this.pagedPayload);
        const { error } = resp;
        if (!error) {
          this.products = resp.data.content;
          this.getProdcutRated();
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
   
  },
  mounted() {
    this.getAllProducts();
  },
});

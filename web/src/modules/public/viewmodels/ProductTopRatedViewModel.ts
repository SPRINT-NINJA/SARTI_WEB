import { defineComponent } from "vue";
import PublicService from "../service/PublicService";

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
      isLoading: false,
      productos: [] as product[],
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
        },
        {
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
        },{
          id: 9,
          name: "Product 9",
          price: 400,
          image: "https://picsum.photos/1000/1000",
          rating: 8.5,
        },{
          id: 10,
          name: "Product 10",
          price: 400,
          image: "https://picsum.photos/1000/1000",
          rating: 8.5,
        },
      ] as product [],
      productPart1:[] as product[],
      productPart2:[] as product[],
      productPart3:[] as product[],
      ratingTaste:9,
      imageUrl: "https://0.soompi.io/wp-content/uploads/sites/8/2024/08/02212515/20240803010318_Jimin.jpg"
    };
  },
  methods: {

    async getAllProducts() {
      try {
        this.isLoading = true;
        const payload = {
          productName: "",
          sellerId: "",
          page: 1,
          size: 10, // Cambia si necesitas otro tamaño de página
          sort: "DESC",
        };
    
        const response = await PublicService.getAllProducts(payload);
        console.log("Response:", response);
    
        if (response && response.data && response.data.content) {
          // Mapear los productos para que coincidan con el template
          this.productos = response.data.content.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            image: product.mainImage,
            price: product.price,
            rating: product.rating,
          }));
          this.getProdcutRated(); // Divide los productos según la lógica
        } else {
          console.error("No se encontraron productos.");
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        this.isLoading = false;
      }
    },
    getProdcutRated(){
      if(this.products.length === 10){
        this.productPart1 =  this.products.slice(0, 4);
        this.productPart2 = this.products.slice(4,6);
        this.productPart3 = this.products.slice(6,10);
      }
    }
   
  },
  mounted() {
    this.getProdcutRated();
  },
});

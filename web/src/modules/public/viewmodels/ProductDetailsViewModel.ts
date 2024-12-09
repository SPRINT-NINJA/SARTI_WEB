import { decryptParamsId } from "@/kernel/utils/cryptojs";
import { defineComponent, defineAsyncComponent } from "vue";
import axios from "./../../../config/axios.ts";

export default defineComponent({
  data() {
    return {
      producto: {} as any,
      productSelected: {} as any,
      selectedProduct: {} as { id: "" },
      quantity: 1,
    };
  },
  created() {
    try {
      this.selectedProduct = decryptParamsId(
        this.$route.params.id.toString()
      ) as { id: "" };
    } catch (e) {
      console.log(e);
    }
  },
  mounted() {
    this.productSelected = {
      id: this.selectedProduct.id,
      name: "Product 1",
      price: 100.0,
      image: "",
      rating: 5,
      ratingResume: {
        stars: [1, 2, 3, 4, 5],
        totalQualifications: 10,
        rate: 5,
      },
      status: "Available",
      photos: [],
      comments: [
        {
          username: "Cristian",
          rating: 5.5,
          comment: "Es un producto grandioso digno de cualquier calificación.",
          images: [],
        },
        {
          username: "Cristian",
          rating: 5.5,
          comment: "Es un producto grandioso digno de cualquier calificación.",
          images: [],
        },
      ],
      stock: 10,
      description:
        "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original.",
    };

    this.getProductPerDetails();
  },
  methods: {
    increment() {
      if (this.quantity < 10) {
        this.quantity++;
      }
    },
    decrement() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    },
    async getProductPerDetails() {
      try {
        const response = await axios.get(`/product/${this.selectedProduct.id}`);
        console.log(response.data.data);

        // Asignar datos dinámicos al producto seleccionado
        const data = response.data.data;
        this.productSelected = {
          id: data.id,
          name: data.name,
          price: data.price,
          image: data.mainImage,
          rating: data.rating,
          ratingResume: {
            stars: [1, 2, 3, 4, 5], // Puedes ajustar esto según tus necesidades
            totalQualifications: data.rates.length,
            rate: data.rating,
          },
          status: data.status ? "Available" : "Unavailable",
          photos: data.productImages.map((img) => ({ url: img.image })),
          comments: data.comments || [], // Si la API no devuelve comentarios, usar un array vacío
          stock: data.stock,
          description: data.description,
        };
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    },
  },
});

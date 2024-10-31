import { defineComponent } from "vue";

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
        },
      ],
    };
  },
});

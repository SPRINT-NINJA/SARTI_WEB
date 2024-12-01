import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      deatilOrder: {
        id:1,
        orderNumber: 12345,
        orderDeliveryType: "Domicilio",
        total: 150.0,
        status: "En proceso",
        product: {
          mainImage:
            "https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp",
          name: "Pastel de Chocolate",
          price: 50.0,
          amount: 3,
          imagesProduct:[
            {
                largeURL:"https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp",
                thumbnailURL:"https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp",
                width: 200,
                height: 200,
            },
            {
                largeURL:"https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp",
                thumbnailURL:"https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp",
                width: 200,
                height: 200,
            },
            {
                largeURL:"https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp",
                thumbnailURL:"https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp",
                width: 200,
                height: 200,
            }
          ],
        },
        cardPay: {
          typeCard: "Visa",
          dateByPay: "2024-11-01",
          statusPay: "Pagado",
        },
      } as any,
      goToRating: false,
    };
  },
  methods: {
    getDetailOrder() {
      console.log(this.deatilOrder);
    },
    assignColorBystatus(status:string){
        switch(status){
            case 'Entregado':
                return 'success';
            case 'Pendiente de Envío':
                return 'warning';
            case 'Recolección':
                return 'warning';
            default:
                return 'brown-chocolate';
        }
    }
  },
  mounted() {
    this.getDetailOrder();
  },
});

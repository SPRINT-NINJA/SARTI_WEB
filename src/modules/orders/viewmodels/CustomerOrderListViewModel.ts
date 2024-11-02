import { defineComponent } from "vue";

export interface CustomerOrderList {
  order: {
    status: string;
    amount: string;
    dateForArrive:string,
    product: {
      name: string;
      price: number;
      mainImage: string;
    };
  };
}

const testCustomerOrderList: CustomerOrderList[] = [
  {
    order: {
      status: "Entregado",
      amount: "150.00",
      dateForArrive:"2024-09-12",
      product: {
        name: "Paquete de Stitch peluche edición especial",
        price: 150.0,
        mainImage:
          "https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp",
      },
    },
  },
  {
    order: {
      status: "Pendiente de Envío",
      amount: "80.00",
      dateForArrive:"2024-09-12",
      product: {
        name: "Taza personalizada de Stitch",
        price: 80.0,
        mainImage:
          "data:image/jpeg;base64,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",
      },
    },
  },
  {
    order: {
      status: "Recolección",
      amount: "120.00",
      dateForArrive:"2024-09-12",
      product: {
        name: "Cojín Stitch edición limitada",
        price: 120.0,
        mainImage:
          "data:image/jpeg;base64,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",
      },
    },
  },
];

export default defineComponent({
  data() {
    return {
      ordersList: [] as CustomerOrderList[],
      viewOrder: false,
      shopAgain: false,
    };
  },
  methods: {
    getlistOrder() {
      this.ordersList = testCustomerOrderList;
    },
    parseDateByRead(dateString:string){
        const months = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
          ];
        
          const [year, month, day] = dateString.split("-").map(Number);
          return `${day} de ${months[month - 1]} del ${year}`;
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
  mounted(){
    this.getlistOrder();
  }
});

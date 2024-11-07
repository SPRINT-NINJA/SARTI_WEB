import { defineComponent } from "vue";

export  interface ICartCustomerProductList {
    mainImage: string;
    name: string;
    price: number;
    status: string;
    stock: number;
    amount:number;
  }


const test_cartProductList: ICartCustomerProductList[] = [
{
  mainImage:"https://http2.mlstatic.com/D_NQ_NP_629338-CBT75289036791_032024-O.webp",
  name: "Chocolate Cake",
  price: 25.5,
  status: "Disponible",
  stock: 10,
  amount: 2
},
{
  mainImage: "https://http2.mlstatic.com/D_NQ_NP_629338-CBT75289036791_032024-O.webp",
  name: "Vanilla Cupcake",
  price: 590.0,
  status: "Disponible",
  stock: 20,
  amount: 3
},
{
  mainImage: "https://http2.mlstatic.com/D_NQ_NP_629338-CBT75289036791_032024-O.webp",
  name: "Vanilla Cupcake",
  price: 590.0,
  status: "Disponible",
  stock: 20,
  amount: 3
},
{
  mainImage: "https://http2.mlstatic.com/D_NQ_NP_629338-CBT75289036791_032024-O.webp",
  name: "Strawberry Cheesecake",
  price: 40.0,
  status: "No disponible",
  stock: 0,
  amount: 0
}
];

export default defineComponent ({
    data(){
        return{
          cartCustomerProductList:[] as ICartCustomerProductList[],
          total:0.0,
          options: [
              { value: null, text: 'Please select an option' },
              { value: 'a', text: 'This is First option' },
              { value: 'b', text: 'Selected Option' },
              { value: { C: '3PO' }, text: 'This is an option with object value' },
              { value: 'd', text: 'This one is disabled', disabled: true }
            ],
            takeinTheshop:false,
            sendByAddress:false,
            quantity:1
        }
    },
    methods:{
      CountTotal(): void {
        this.total = this.cartCustomerProductList.reduce((acc: number, product: ICartCustomerProductList) => {
          // Verifica si amount es un número y mayor que 0
          const amount = product.amount || 0;
          return acc + (amount > 0 ? product.price * amount : 0);
        }, 0)
      },
      quantityOptions(stock: number) {
          const options = [{ text: "Elegir...", value: 0 }];
          for (let i = 1; i <= stock; i++) {
            options.push({ text: `${i} Unidad${i > 1 ? 'es' : ''}`, value: i });
          }
          return options;
        },
        RemoveProductByCart(value:{amount:number,name:string}): void {
          this.$swal.fire({
            title: "¿Seguro?",
            text: "Se eliminara el producto de tu carrito.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ffa446",
            cancelButtonColor: "#e35b5d",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              this.$swal.fire({
                title: "Se ha eliminado correctamente",
                text: "Tu artículo ha sido eliminado de tu carrito. Si deseas recuperarlo, vuelve a añadirlo.",
                icon: "success",
              });
              this.cartCustomerProductList = this.cartCustomerProductList.filter(
                product => product.name !== value.name
              );
              this.CountTotal();
            } else{
             value.amount = 1;
             this.CountTotal();
            }
          });
          
        },
        getCarCustomerProductList(): void {
          this.cartCustomerProductList = test_cartProductList;
          this.CountTotal();
        },
        increment(value:{amount:number,stock:number}) {
          if (value.amount < value.stock) {
            value.amount++;
          }
          this.CountTotal(); 
        },
        decrement(value:{amount:number,stock:number,name:string}) {
          if (value.amount > 0) {
            value.amount--;
            this.CountTotal(); 
          }
          if(value.amount === 0){
            this.RemoveProductByCart(value);
          }
        },
        changeSelectOrder(){
          if(this.takeinTheshop){
            this.sendByAddress = false;
          }
        },
        changeSelectOrderAddress(){
          if(this.sendByAddress){
            this.takeinTheshop = false;
          }
        }

    },
    mounted() {
        this.getCarCustomerProductList();
    },

})

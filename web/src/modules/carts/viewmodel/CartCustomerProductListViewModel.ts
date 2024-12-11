import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { defineComponent } from "vue";
import CartService from "../service/CartService";
import { ICartProduct } from "../models/CartCustomerProductListModel";

export default defineComponent({
  data() {
    return {
      total: 0.0,
      takeinTheshop: false,
      sendByAddress: true,
      quantity: 1,
      isLoading: false,
      productList: [] as ICartProduct[], // Lista inicial vacía
    };
  },
  methods: {
    checkAmount(product: ICartProduct) {
      console.log(product.amount)
      if (product.amount === 0) {
        SweetAlertCustom.questionMessage("¿Está seguro de eliminar el producto?", "Se eliminará del carrito el producto")
          .then((result) => {
            if (result.isConfirmed) {
              this.RemoveProductByCart(product); // Llama al método de eliminación
            } else {
              // Si el usuario cancela, restauramos la cantidad a 1 (o al valor original si lo prefieres)
              product.amount = 1;
            }
          });
      }
      this.CountTotal(); // Aseguramos que el total siempre esté actualizado
    },
    CountTotal(): void {
      this.total = this.productList.reduce(
        (acc, product) => acc + (product.amount * product.product.price || 0),
        0
      );
    },
    RemoveProductByCart(product:ICartProduct) {
      SweetAlertCustom.questionMessage("¿Está seguro de eliminar el producto?","Se eliminará del carrito el producto").then(async (result)=>{
        console.log(result,"Confirm")
        if(result.isConfirmed){
          try {
            const resp = await CartService.removeProductCart(product);
            if(!resp.error){
              product.amount = 1;
              this.CountTotal();
              SweetAlertCustom.successMessage("Se ha eliminado correctamente","Tu producto ha sido eliminado del carrito.")
              location.reload(); 
            }
          } catch (error) {
            console.error(error)
          }
        }else{
          product.amount = 1;
        }
      })
    },
    async updateCart(product:ICartProduct){
      try {
        this.isLoading = true;
        const resp = await CartService.updateProductCart(product);
        if (!resp.error) {
          SweetAlertCustom.successMessage(
            "Se ha actualizado correctamente"
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    increment(product: ICartProduct) {
      if (product.amount < product.product.stock) {
        product.amount++;
      }
      this.CountTotal();
      this.updateCart(product);
    },
    decrement(product: ICartProduct) {
      if (product.amount > 0) {
        product.amount--;
        this.CountTotal();
        this.updateCart(product);
      }
      
      // Si la cantidad es 0, se elimina el producto del carrito
      if (product.amount === 0) {
        this.RemoveProductByCart(product);
      }
    },    
    async addToProductIntoCart() {
      try {
        this.isLoading = true;
        const resp = await CartService.getCart();
        if (!resp.error) {
          this.productList = resp.data.cartProducts;
        }
        this.CountTotal(); // Actualiza el total después de obtener los productos
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async cleanCart() {
      try {
        this.isLoading = true;
        const resp = await CartService.cleanCart();
        if (!resp.error) {
          SweetAlertCustom.successMessage(
            "El carrito se vacío",
            "Tu carrito  ha sido vaciado"
          );
          location.reload(); 
        }
        this.CountTotal(); // Actualiza el total después de obtener los productos
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.addToProductIntoCart(); // Obtén los productos al cargar el componente
  },
});

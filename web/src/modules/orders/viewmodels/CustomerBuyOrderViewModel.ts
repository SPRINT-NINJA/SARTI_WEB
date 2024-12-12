import { CartBody } from "@/modules/carts/models/CartBody";
import { PaypalOrderInit } from "@/modules/carts/models/PaypalOrderInit";
import CartService from "@/modules/carts/service/CartService";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      total: 0.0,
      totalFinal: 0.0,
      totalFee: 0.0,

      isTakeinTheshop: true,
      isDelivered: false,
      isKeepAddress: false,
      isLoading: false,

      paypalOrderId: "",
      cartBody: {} as CartBody,
      paypalOrderInitBody: {} as PaypalOrderInit
    }
  },
  methods: {
    setIsTakenInShop() {
      this.isTakeinTheshop = true
      this.isDelivered = false
      this.countTotalWithDelivery();
    },

    setIsDelivered() {
      this.isTakeinTheshop = false
      this.isDelivered = true
      this.countTotalWithDelivery();
    },

    getFormattedAddress(address: any) {
      return `${address?.street}, ${address?.colony}, ${address?.city}, ${address?.state}, ${address?.country}, C.P. ${address?.zipCode}`;
    },

    countTotalWithDelivery(): void {
      if (this.isDelivered) {
        this.totalFee = 30.0;
        this.totalFinal = this.totalFee + this.total;
      } else {
        this.totalFee = 0.0;
        this.totalFinal = this.total;
      }
    },

    async fetchCart() {
      try {
        this.isLoading = true;
        const resp = await CartService.getCart();
        if (!resp.error) {
          this.cartBody = resp.data as CartBody;
          this.paypalOrderInitBody = this.createPaypalOrderInitBody();
          console.log(this.paypalOrderInitBody);
        }
        this.totalFee = 0.0;
        this.total = this.cartBody.total
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    createPaypalOrderInitBody() {
      return {
        amount: this.cartBody.total,
        currency: 'USD',
        paymentMethod: 'paypal',
        description: 'Compra en aplicación SARTI',
        intent: 'CAPTURE',
        sellerWallet: this.cartBody.seller.wallet,
      } as PaypalOrderInit
    },

    mapCartToOrder() {
      // Procesar los productos del carrito
      const orderProducts = this.cartBody.cartProducts.map((cartProduct) => {
        return {
          amount: cartProduct.amount,
          total: cartProduct.total,
          product: {
            id: cartProduct.product.id,
          },
        };
      });

      // Crear el objeto sartiOrder
      const sartiOrder = {
        total: this.cartBody.total,
        seller: {
          id: this.cartBody.seller.id,
        },
        customer: {
          id: this.cartBody.customer.id,
        },
        orderProducts: orderProducts,
      };

      // Crear el objeto address (si está disponible en el carrito)
      const address = this.cartBody.seller.address
        ? {
          country: this.cartBody.seller.address.country,
          state: this.cartBody.seller.address.state,
          city: this.cartBody.seller.address.city,
          locality: this.cartBody.seller.address.locality,
          colony: this.cartBody.seller.address.colony,
          street: this.cartBody.seller.address.street,
          zipCode: this.cartBody.seller.address.zipCode,
          externalNumber: this.cartBody.seller.address.externalNumber,
          internalNumber: this.cartBody.seller.address.internalNumber,
          referenceNear: this.cartBody.seller.address.referenceNear,
          addressType: this.cartBody.seller.address.addressType,
        }
        : null;

      // Construir el objeto final orderBody
      const orderBody = {
        paypalOrderId: this.paypalOrderId, // Valor inicial vacío (puedes asignarlo más tarde si aplica)
        orderDeliveryType: this.isTakeinTheshop ? "Recolección" : "Envío", // Valor por defecto (puedes modificarlo si es necesario)
        fee: this.totalFee, // Comisión fija
        keepAddress: this.isKeepAddress, // Valor por defecto (puedes modificarlo si es necesario)
        sartiOrder: sartiOrder,
        address: address,
      };

      return orderBody;
    },

    async confirmOrder() {
      const orderBodyMapped = this.mapCartToOrder();
      console.log(orderBodyMapped);
    }
  },
  mounted() {
    this.fetchCart();
  },
})

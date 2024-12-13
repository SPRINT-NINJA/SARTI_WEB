import { CartBody } from "@/modules/carts/models/CartBody";
import { PaypalOrderInit } from "@/modules/carts/models/PaypalOrderInit";
import CartService from "@/modules/carts/service/CartService";
import { defineComponent } from "vue";
import CustomerDeliveryOrderService from "../services/CustomerDeliveryOrderService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { VerifyAvailabilityDto } from "@/modules/products/models/VerifyAvailabilityDto";
import ProductService from "@/modules/products/services/ProductService";

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
      paypalOrderInitBody: {} as PaypalOrderInit,
      address: {} as any
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
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

    async procedToPayment() {
      const res = await this.verifyAvailability();

      if (res) {
        this.loadPayPalScript()
          .then(() => {
            this.renderPayPalButton();
          })
          .catch((error) => {
            console.error("Error loading PayPal SDK:", error);
          });
      }
    },

    async verifyAvailability() {
      try {
        this.isLoading = true
        if (this.cartBody.cartProducts.find((el: any) => el.product == null)) {
          SweetAlertCustom.errorMessage(
            "Error",
            "Uno o varios productos de tu lista dejaron de estar disponibles"
          );
          return null;
        }

        const payload = this.cartBody.cartProducts.map((el: any) => ({
          productId: el.product.id,
          quantity: el.amount
        })) as Array<VerifyAvailabilityDto>;

        const response = await ProductService.verifyAvailability(payload);

        const verification = response.data;

        if (verification!.unavailableProducts.length || verification!.inactiveProducts.length || verification!.notFoundProducts.length) {
          SweetAlertCustom.errorMessage(
            "Error",
            "Uno o varios productos de tu lista dejaron de estar disponibles o no tiene suficiente stock"
          );
          return null;
        }

        console.log(verification);
        return verification;
      } catch (error) {
        console.error(error);
        SweetAlertCustom.errorMessage(
          "Error",
          "Ocurrió un error al verificar la disponibilidad de los productos"
        );
        return null;
      } finally {
        this.isLoading = false
      }
    },

    async fetchCart() {
      try {
        this.isLoading = true;
        const resp = await CartService.getCart();
        if (!resp.error) {
          this.cartBody = resp.data as CartBody;
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
        amount: this.cartBody.total + this.totalFee,
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

    loadPayPalScript(): Promise<void> {
      return new Promise((resolve, reject) => {
        // Verifica si el SDK de PayPal ya está cargado
        if ((window as any).paypal) {
          resolve();
          return;
        }

        // Crear el elemento de script del SDK de PayPal
        const script = document.createElement("script");
        script.src =
          "https://www.paypal.com/sdk/js?client-id=ASC8dW4mLaFqWkKBWUWtzbXr7cEC0kZuW61MfT4fYz1gxZjC9GD84R-clJH3KkwWfV30BDLtAmbBe4iv&buyer-country=MX&components=buttons&enable-funding=venmo,paylater,card";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("No se pudo cargar el SDK de PayPal."));
        document.head.appendChild(script);
      });
    },

    async renderPayPalButton(): Promise<void> {
      // Verifica si el objeto PayPal existe en la ventana global
      const paypal = (window as any).paypal;
      if (paypal) {
        paypal
          .Buttons({
            createOrder: async (): Promise<string> => {
              const response = await this.getOrderApi() as any;
              if (!response?.data?.links) {
                SweetAlertCustom.errorMessage(
                  "Error",
                  "Ocurrió un error al obtener los enlaces de la orde."
                );
              }
              // Encuentra el token de aprobación
              const approveLink = response.data.links.find(
                (link: { rel: string }) => link.rel === "approve"
              );

              if (!approveLink?.href) {
                SweetAlertCustom.errorMessage(
                  "Error",
                  "El enlace de aprobación no está disponible"
                );
              }

              const approveToken = approveLink.href.split("?token=")[1];
              if (!approveToken) {
                SweetAlertCustom.errorMessage(
                  "Error",
                  "Ocurrió un error al obtener el token de aprobación"
                );
              }

              return approveToken;
            },
            onApprove: async (data: { orderID: string }): Promise<void> => {
              if (!data.orderID) {
                SweetAlertCustom.errorMessage(
                  "Error",
                  "El id de la orden no está disponible"
                );
              }
              this.paypalOrderId = data.orderID;
              await this.onApproveOrder();
            },
            onError: (err: any): void => {
              console.error("Error con PayPal:", err);
              SweetAlertCustom.errorMessage(
                "Error",
                "Ocurrió un error al momento de procesar el pago."
              );
            },
          })
          .render("#paypal-button-container");
      } else {
        SweetAlertCustom.errorMessage(
          "Error",
          "Ocurrió un error al cargar al SDK de postman"
        );
      }
    },

    async getOrderApi() {
      try {
        const orderDelivery = this.createPaypalOrderInitBody();
        console.log(orderDelivery);
        const response = await CustomerDeliveryOrderService.createDeliveryOrder(orderDelivery);
        return response;
      } catch (error) {
        console.error(error);
        SweetAlertCustom.errorMessage(
          "Error",
          "Ocurrió un error al iniciar la transacción"
        );
      }
    },

    async onApproveOrder() {
      try {
        this.isLoading = true;
        const deliveryOrder = this.mapCartToOrder();
        const response = await CustomerDeliveryOrderService.captureDeliveryOrder(deliveryOrder);
        if (!response.error) {
          SweetAlertCustom.successMessage(
            "Pago realizado",
            "El pago se ha realizado con éxito"
          )
        }
      } catch (error: any) {
        console.error(error);
        SweetAlertCustom.errorMessage(
          "Error",
          "Ocurrió un error al completar el pago"
        );
      } finally {
        this.isLoading = false;
      }
    },
  },

  mounted() {
    this.fetchCart();
  },
})

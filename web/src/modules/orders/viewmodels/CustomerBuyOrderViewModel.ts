import { CartBody } from "@/modules/carts/models/CartBody";
import { PaypalOrderInit } from "@/modules/carts/models/PaypalOrderInit";
import CartService from "@/modules/carts/service/CartService";
import { defineComponent } from "vue";
import CustomerDeliveryOrderService from "../services/CustomerDeliveryOrderService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { VerifyAvailabilityDto } from "@/modules/products/models/VerifyAvailabilityDto";
import ProductService from "@/modules/products/services/ProductService";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";

export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      total: 0.0,
      totalFinal: 0.0,
      totalFee: 0.0,

      isTakenInShop: true,
      isDelivered: false,
      isKeepAddress: false,
      isLoading: false,

      formattedAddress: "",
      paypalOrderId: "",
      cartBody: {} as CartBody,
      paypalOrderInitBody: {} as PaypalOrderInit,
      address: {
        country: '',
        state: '',
        city: '',
        locality: '',
        colony: '',
        street: '',
        zipCode: 0,
        externalNumber: '',
        internalNumber: '',
        referenceNear: '',
        addressType: '',
      } as any,

      options: [
        { value: null, text: "--Seleccione--" },
        { value: "DOMICILIO", text: "Domicilio" },
        { value: "TRABAJO", text: "Trabajo" },
        { value: "NEGOCIO", text: "Negocio" },
        { value: "OTRO", text: "Otro" },
      ],
      errorMessagges: {
        required: "Campo obligatorio",
        invalidEmail: "Correo inválido",
        invalidTextWithNumber: "No se aceptan caracteres especiales",
        invalidText: "No se aceptan números",
        minLengthreferenceNear: "Mínimo 20 caracteres",
        maxLengthreferenceNear: "Máximo 100 caracteres",
        minLength: "Mínimo 4 caracteres",
        maxLength: "Máximo 45 caracteres",
        minLengthNumber: "Mínimo 2 caracteres",
        maxLengthNumber: "Máximo 5 caracteres",
        minLengthTextarea: "Mínimo 45 caracteres",
        maxLengthTextarea: "Máximos 255 caracteres",
        minLengthPassword: "Tiene que contener al menos 8 caracteres",
        noneScripts: "Campo inválido no se aceptan scripts",
        valid: "Campos inválido - caracteres inválidos",
        passwordWrong: "La contraseña no coincide, intentá de nuevo",
        password: {
          valid:
            "La contraseña debe tener mínimo una mayúscula, un caracter especial (# . _) y un número (longitud de 3 a 16 car.)",
        },
      },
    }
  },
  watch: {
    address: {
      handler() {
        this.formattedAddress = this.getFormattedAddress();
      },
      deep: true, // Permite detectar cambios en las propiedades internas del objeto
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    touchAllFields() {
      this.v$?.address.$touch()
    },

    cloneAddress(address: any) {
      return {
        country: address.country,
        state: address.state,
        city: address.city,
        locality: address.locality,
        colony: address.colony,
        street: address.street,
        zipCode: address.zipCode,
        externalNumber: address.externalNumber,
        internalNumber: address.internalNumber,
        referenceNear: address.referenceNear,
        addressType: address.addressType,
      }
    },

    getEmptyAddress() {
      return {
        country: '',
        state: '',
        city: '',
        locality: '',
        colony: '',
        street: '',
        zipCode: 0,
        externalNumber: '',
        internalNumber: '',
        referenceNear: '',
        addressType: null,
      }
    },

    setIsTakenInShop() {
      this.isTakenInShop = true
      this.isDelivered = false
      this.isKeepAddress = false;
      this.countTotalWithDelivery();
      this.address = this.cartBody.seller.address
        ? this.cloneAddress(this.cartBody.seller.address)
        : this.getEmptyAddress();
      this.$v.address.$reset;
    },

    setIsDelivered() {
      this.isTakenInShop = false
      this.isDelivered = true
      this.countTotalWithDelivery();
      this.address = this.cartBody.customer.address != null
        ? this.cloneAddress(this.cartBody.customer.address)
        : this.getEmptyAddress();
      this.$v.address.$reset;
    },

    async cleanCart() {
      try {
        this.isLoading = true;
        const resp = await CartService.cleanCart();
        if (!resp.error) {
          await this.$router.push({
            name: "order-list-customer",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    getFormattedAddress() {
      return this.address.country.length ? `${this.address.street} ${this.address.internalNumber} ${this.address.externalNumber} - ${this.address.colony}, ${this.address.city}, ${this.address.state}, ${this.address.country}, C.P. ${this.address.zipCode}` : "Direccion no proporcionada";
    },

    countTotalWithDelivery() {
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
          this.address = this.cartBody.seller.address
            ? this.cloneAddress(this.cartBody.seller.address)
            : this.getEmptyAddress();
        }
        this.formattedAddress = this.getFormattedAddress();
        this.totalFee = 0.0;
        this.total = this.cartBody.total
        this.totalFinal = this.cartBody.total
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

      // Construir el objeto final orderBody
      const orderBody = {
        paypalOrderId: this.paypalOrderId, // Valor inicial vacío (puedes asignarlo más tarde si aplica)
        orderDeliveryType: this.isTakenInShop ? "Recolección" : "Envío", // Valor por defecto (puedes modificarlo si es necesario)
        fee: this.totalFee, // Comisión fija
        keepAddress: this.isKeepAddress, // Valor por defecto (puedes modificarlo si es necesario)
        sartiOrder: sartiOrder,
        address: this.address,
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
          await this.cleanCart();
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
    this.fetchCart().then(()=>{
      this.touchAllFields();
    })
  },
  validations() {
    return {
      address: {
        country: {
          required: helpers.withMessage(
            this.errorMessagges.required,
            required
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidTextWithNumber,
            (value: string) => {
              return /^(?!.*\s{2})[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/g.test(value);
            }
          ),
        } as any,
        state: {
          required: helpers.withMessage(
            this.errorMessagges.required,
            required
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidTextWithNumber,
            (value: string) => {
              return /^(?!.*\s{2})[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/g.test(value);
            }
          ),
        } as any,
        city: {
          required: helpers.withMessage(
            this.errorMessagges.required,
            required
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidTextWithNumber,
            (value: string) => {
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
            }
          ),
        } as any,
        locality: {
          required: helpers.withMessage(
            this.errorMessagges.required,
            required
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidTextWithNumber,
            (value: string) => {
              return /^(?!.*\s{2})[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/g.test(value);
            }
          ),
        } as any,
        colony: {
          required: helpers.withMessage(
            this.errorMessagges.required,
            required
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLengthNumber,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLengthNumber,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidTextWithNumber,
            (value: string) => {
              return /^(?!.*\s{2})[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/g.test(value);
            }
          ),
        } as any,
        street: {
          required: helpers.withMessage(
            this.errorMessagges.required,
            required
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidTextWithNumber,
            (value: string) => {
              return /^(?!.*\s{2})[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/g.test(value);
            }
          ),
        } as any,
        zipCode: {
          required: helpers.withMessage(
            this.errorMessagges.required,
            required
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLengthNumber,
            maxLength(5)
          ),
          isPositive: helpers.withMessage(
            "No se aceptan negativos",
            (value: string) => /^\d+$/.test(value) && parseInt(value, 10) >= 0
          ),
        } as any,
        externalNumber: {
          required: helpers.withMessage(
            this.errorMessagges.required,
            required
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLengthNumber,
            maxLength(3)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLengthNumber,
            minLength(1)
          ),
          isPositive: helpers.withMessage(
            "No se aceptan negativos",
            (value: string) => /^\d+$/.test(value) && parseInt(value, 10) >= 0
          ),
        } as any,
        internalNumber: {
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLengthNumber,
            maxLength(3)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLengthNumber,
            minLength(1)
          ),
          isPositive: helpers.withMessage(
            "No se aceptan negativos",
            (value: string) => /^\d+$/.test(value) && parseInt(value, 10) >= 0
          ),
        } as any,
        referenceNear: {
          required: helpers.withMessage(
            this.errorMessagges.required,
            required
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLengthreferenceNear,
            maxLength(100)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLengthreferenceNear,
            minLength(20)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidTextWithNumber,
            (value: string) => {
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9.,:\-\(\)\s]+$/.test(value);
            }
          ),
        } as any,
        addressType: {
          required: helpers.withMessage(
            this.errorMessagges.required,
            required
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidTextWithNumber,
            (value: string) => {
              return /^(?!.*\s{2})[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/g.test(value);
            }
          ),
        } as any,
      },
    };
  },
})

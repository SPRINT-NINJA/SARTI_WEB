import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import AuthService from "./../services/AuthService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import {
  required,
  maxLength,
  minLength,
  email,
  helpers,
} from "@vuelidate/validators";
import { jwtDecode } from "jwt-decode";
import { ERoles } from "@/kernel/types";

interface CustomJwtPayload {
  role: { authority: string }[];
}

export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      customer: {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        firstLastName: "",
        secondLastName: "",
        address: {
          country: "", //ciudad
          state: "",
          city: "",
          locality: "",
          colony: "",
          street: "",
          zipCode: "", // codigo postal,
          externalNumber: "",
          internalNumber: "",
          referenceNear: "", // referencia del lugar
          addressType: "DOMICILIO",
        },
      },
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
      currentStep: 1,
      options: [
        { value: null, text: "--Seleccione--" },
        { value: "DOMICILIO", text: "Domicilio" },
        { value: "TRABAJO", text: "Trabajo" },
        { value: "NEGOCIO", text: "Negocio" },
        { value: "OTRO", text: "Otro" },
      ],
      createLoading: false,
      goTocreate: false,
      addAdress: false,
      steps: ["Datos personales", "Dirección"],
      passwordVisible: false,
      passwordVisibleConfirm: false,
    };
  },
  computed: {
    isStepValid(): boolean {
      if (this.steps[this.currentStep - 1] === "Datos personales") {
        return (
          !this.v$.customer.email.$error &&
          !this.v$.customer.password.$error &&
          !this.v$.customer.confirmPassword.$error &&
          !this.v$.customer.name.$error &&
          !this.v$.customer.firstLastName.$error &&
          this.v$.customer.email.$dirty &&
          this.v$.customer.password.$dirty &&
          this.v$.customer.confirmPassword.$dirty &&
          this.v$.customer.name.$dirty &&
          this.v$.customer.firstLastName.$dirty
        );
      }
      if (this.steps[this.currentStep - 1] === "Dirección" && this.goTocreate) {
        return (
          !this.v$.customer.address.city.$error &&
          !this.v$.customer.address.country.$error &&
          !this.v$.customer.address.state.$error &&
          !this.v$.customer.address.street.$error &&
          !this.v$.customer.address.colony.$error &&
          !this.v$.customer.address.zipCode.$error &&
          !this.v$.customer.address.externalNumber.$error &&
          !this.v$.customer.address.internalNumber.$error &&
          !this.v$.customer.address.referenceNear.$error &&
          !this.v$.customer.address.addressType.$error &&
          !this.v$.customer.address.locality.$error &&
          this.v$.customer.address.city.$dirty &&
          this.v$.customer.address.country.$dirty &&
          this.v$.customer.address.state.$dirty &&
          this.v$.customer.address.street.$dirty &&
          this.v$.customer.address.colony.$dirty &&
          this.v$.customer.address.zipCode.$dirty &&
          this.v$.customer.address.externalNumber.$dirty &&
          this.v$.customer.address.internalNumber.$dirty &&
          this.v$.customer.address.referenceNear.$dirty &&
          this.v$.customer.address.addressType.$dirty &&
          this.v$.customer.address.locality.$dirty
        );
      }
      return true;
    },
  },
  methods: {
    async submitAccountForm() {
      try {
        this.createLoading = true;
        let payload = {};
        if (this.customer.address.country != "") {
          payload = {
            address: {
              country: this.customer.address.country,
              state: this.customer.address.state,
              city: this.customer.address.city,
              locality: this.customer.address.locality,
              colony: this.customer.address.colony,
              street: this.customer.address.street,
              zipCode:
                this.customer.address.zipCode === "0"
                  ? "N/A"
                  : this.customer.address.zipCode,
              externalNumber: this.customer.address.externalNumber,
              internalNumber: this.customer.address.internalNumber,
              referenceNear: this.customer.address.referenceNear,
              addressType: this.customer.address.addressType,
            },
          };
        }
        SweetAlertCustom.loading("Cargando","Espera estamos en proceso de tu información",6000)
        const resp = await AuthService.createAccountCustomer({
          email: this.customer.email,
          password: this.customer.password,
          name: this.customer.name,
          firstLastName: this.customer.firstLastName,
          secondLastName: this.customer.secondLastName,
          ...payload,
        });
        if (!resp.error) {
          this.createLoading = false;
          localStorage.setItem("token", JSON.stringify(resp));
          if (await this.checkNextRedirect()) SweetAlertCustom.successMessage();
        }
      } catch (error) {
        console.log(error);
      }
    },
    AddAdressConfirm() {},
    async checkNextRedirect() {
      if (localStorage.token) {
        if (
          jwtDecode<CustomJwtPayload>(localStorage.token).role[0].authority ===
          ERoles.SELLER
        ) {
          await this.$router.replace("/customer");
          return true;
        } else if (
          jwtDecode<CustomJwtPayload>(localStorage.token).role[0].authority ===
          ERoles.CUSTOMER
        ) {
          await this.$router.replace("/customer");
          return true;
        } else if (
          jwtDecode<CustomJwtPayload>(localStorage.token).role[0].authority ===
          ERoles.DELIVERYMAN
        ) {
          await this.$router.replace("/delivery");
          return true;
        }
      }
    },
    nextStep() {
      if (this.currentStep < this.steps.length) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    togglePasswordVisibilityConfirm() {
      this.passwordVisibleConfirm = !this.passwordVisibleConfirm;
    },
  },
  validations() {
    return {
      customer: {
        email: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          email: helpers.withMessage(this.errorMessagges.invalidEmail, email),
        } as any,
        password: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          minLength: helpers.withMessage(
            this.errorMessagges.minLengthPassword,
            minLength(8)
          ),
          validText: helpers.withMessage(
            "No se aceptan espacios,debe contener al menos un número, mayúscula o minúscula",
            (value: string) =>
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/.test(value)
          ),
        } as any,
        confirmPassword: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          minLength: helpers.withMessage(
            this.errorMessagges.minLengthPassword,
            minLength(8)
          ),
          validText: helpers.withMessage(
            "No se aceptan espacios,debe contener al menos un número, mayúscula o minúscula",
            (value: string) =>
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/.test(value)
          ),
          matchesPassword: helpers.withMessage(
            this.errorMessagges.passwordWrong,
            () => this.customer.password === this.customer.confirmPassword
          ),
        } as any,
        name: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidText,
            (value: string) => {
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
            }
          ),
        } as any,
        firstLastName: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidText,
            (value: string) => {
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
            }
          ),
        } as any,
        secondLastName: {
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidText,
            (value: string) => {
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
            }
          ),
        } as any,
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
      },
    };
  },
});

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
      seller: {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        firstLastName: "",
        secondLastName: "",
        bussinessName: "",
        description: "",
        wallet: "",
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
      createLoading:false,
      steps: ["Datos personales", "Dirección", "Descripción del negocio"],
      passwordVisible: false,
      passwordVisibleConfirm: false,
    };
  },
  computed: {
    isStepValid(): boolean {
      if (this.steps[this.currentStep - 1] === "Datos personales") {
        return (
          !this.v$.seller.email.$error &&
          !this.v$.seller.password.$error &&
          !this.v$.seller.confirmPassword.$error &&
          !this.v$.seller.name.$error &&
          !this.v$.seller.firstLastName.$error &&
          this.v$.seller.email.$dirty &&
          this.v$.seller.password.$dirty &&
          this.v$.seller.confirmPassword.$dirty &&
          this.v$.seller.name.$dirty &&
          this.v$.seller.firstLastName.$dirty
        );
      }
      if (this.steps[this.currentStep - 1] === "Dirección") {
        return (
          !this.v$.seller.address.city.$error &&
          !this.v$.seller.address.country.$error &&
          !this.v$.seller.address.state.$error &&
          !this.v$.seller.address.street.$error &&
          !this.v$.seller.address.colony.$error &&
          !this.v$.seller.address.zipCode.$error &&
          !this.v$.seller.address.externalNumber.$error &&
          !this.v$.seller.address.internalNumber.$error &&
          !this.v$.seller.address.referenceNear.$error &&
          !this.v$.seller.address.addressType.$error &&
          !this.v$.seller.address.locality.$error &&
          this.v$.seller.address.city.$dirty &&
          this.v$.seller.address.country.$dirty &&
          this.v$.seller.address.state.$dirty &&
          this.v$.seller.address.street.$dirty &&
          this.v$.seller.address.colony.$dirty &&
          this.v$.seller.address.zipCode.$dirty &&
          this.v$.seller.address.externalNumber.$dirty &&
          this.v$.seller.address.internalNumber.$dirty &&
          this.v$.seller.address.referenceNear.$dirty &&
          this.v$.seller.address.addressType.$dirty &&
          this.v$.seller.address.locality.$dirty
        );
      }
      if (this.steps[this.currentStep - 1] === "Descripción del negocio") {
        return (
          !this.v$.seller.wallet.$error &&
          !this.v$.seller.bussinessName.$error &&
          !this.v$.seller.description.$error &&
          this.v$.seller.wallet.$dirty &&
          this.v$.seller.bussinessName.$dirty &&
          this.v$.seller.description.$dirty
        );
      }
      return true;
    },
  },
  methods: {
    async submitAccountForm() {
      try {
        this.createLoading = true;
        SweetAlertCustom.loading("Cargando","Espera estamos en proceso de tu información",6000);
        const resp = await AuthService.createAccountSeller({
          email: this.seller.email,
          password: this.seller.password,
          name: this.seller.name,
          firstLastName: this.seller.firstLastName,
          secondLastName: this.seller.secondLastName,
          bussinessName: this.seller.bussinessName,
          description: this.seller.description,
          wallet: this.seller.wallet,
          address: {
            country: this.seller.address.country,
            state: this.seller.address.state,
            city: this.seller.address.city,
            locality: this.seller.address.locality,
            colony: this.seller.address.colony,
            street: this.seller.address.street,
            zipCode: this.seller.address.zipCode === "0" ? "N/A":this.seller.address.zipCode,
            externalNumber: this.seller.address.externalNumber,
            internalNumber: this.seller.address.internalNumber,
            referenceNear: this.seller.address.referenceNear,
            addressType: this.seller.address.addressType,
          },
        });
       
        if (!resp.error) {
          this.createLoading = false;
          localStorage.setItem('token', JSON.stringify(resp));
          if (await this.checkNextRedirect())
          SweetAlertCustom.successMessage();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async checkNextRedirect() {
      if (localStorage.token) {
        if (jwtDecode<CustomJwtPayload>(localStorage.token).role[0].authority === ERoles.SELLER) {
          await this.$router.replace("/seller");
          return true;
        } else if (
          jwtDecode<CustomJwtPayload>(localStorage.token).role[0].authority === ERoles.CUSTOMER
        ) {
          await this.$router.replace("/customer");
          return true;
        } else if (
          jwtDecode<CustomJwtPayload>(localStorage.token).role[0].authority === ERoles.DELIVERYMAN
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
      seller: {
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
            () => this.seller.password === this.seller.confirmPassword
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
        description: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLengthTextarea,
            maxLength(255)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLengthTextarea,
            minLength(45)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidTextWithNumber,
            (value: string) => {
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9.,:\-\(\)\s]+$/.test(value);
            }
          ),
        } as any,
        bussinessName: {
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
        wallet: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          email: helpers.withMessage(this.errorMessagges.invalidEmail, email),
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

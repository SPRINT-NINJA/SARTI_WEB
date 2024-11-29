import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  maxLength,
  minLength,
  email,
  helpers,
} from "@vuelidate/validators";

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
          internal_number: "",
          referenceNear: "", // referencia del lugar
          addressType: "",
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
        noneScripts: "Campo inválido no se aceptan scripts",
        valid: "Campos inválido - caracteres inválidos",
        password: {
          valid:
            "La contraseña debe tener mínimo una mayúscula, un caracter especial (# . _) y un número (longitud de 3 a 16 car.)",
        },
      },
      currentStep: 1,
      steps: ["Datos personales", "Dirección", "Descripción del negocio"],
      password: "",
      passwordVisible: false,
      passwordVisibleConfirm: false,
    };
  },
  methods: {
    submitAccountForm() {
      alert("Formulario enviado");
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
          valid: helpers.withMessage(
            this.errorMessagges.password.valid,
            (value: string) => {
              return /^(?=.*[A-Z]+)(?=.*[._#]+)(?=.*[0-9]+)[a-zA-Z0-9._#]{3,16}$/g.test(
                value
              );
            }
          ),
          notScript: helpers.withMessage(
            this.errorMessagges.noneScripts,
            (value: string) => {
              return !/<.*?script.*\/?>/gi.test(value);
            }
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
              return /^[a-zA-Z0-9 .\-\(\)]+$/g.test(value);
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
              this.errorMessagges.maxLength,
              maxLength(5)
            ),
            minLength: helpers.withMessage(
              this.errorMessagges.minLength,
              minLength(1)
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
          } as any,

          referenceNear: {
            required: helpers.withMessage(
              this.errorMessagges.required,
              required
            ),
            maxLength: helpers.withMessage(
              this.errorMessagges.maxLengthreferenceNear,
              maxLength(45)
            ),
            minLength: helpers.withMessage(
              this.errorMessagges.minLengthreferenceNear,
              minLength(4)
            ),
            valid: helpers.withMessage(
              this.errorMessagges.invalidTextWithNumber,
              (value: string) => {
                return /^[a-zA-Z0-9 .\-\(\)]+$/g.test(value);
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

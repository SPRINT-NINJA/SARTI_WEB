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




export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
        editedProfile: {
            id: 0,
            name: "",
            firstLastName: "",
            fistLastName:"",
            secondLastName: "",
            bussinessName: "",
            description: "",
            wallet: "",
            address: {
              country: "",
              state: "",
              city: "",
              locality: "",
              colony: "",
              street: "",
              zipCode: 0,
              externalNumber: "",
              internalNumber: "",
              referenceNear: "",
              addressType: "",
            },
    } as IUpdateSeller,          
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
      isLoading: false,
    };
  },
  methods: {
    async getUpdateSeller() {
      try {
        this.isLoading = true;
        const resp = await AuthService.getProfileSeller();
        if (!resp.error) {
          // Si address es null, asignar una dirección vacía
          this.editedProfile = resp;
        }
      } catch (error) {
        console.log(error);
      }finally{
        this.isLoading = false;
      }
    },
    async updateProfile() {
      try {
        this.isLoading = true;
        this.editedProfile.firstLastName = this.editedProfile.fistLastName;
        const resp = await AuthService.updateProfileSeller(this.editedProfile);
        if (!resp.error) {
          SweetAlertCustom.successMessage(
            "Tus datos se han actualizado correctamente",
            "Tus datos ingresados han sido actualizados"
          );
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }finally{
        this.isLoading = false;
      }
    },
    touchAllFields() {
      this.v$.editedProfile.$touch();
    },
  },
  mounted() {
    this.getUpdateSeller();
    this.touchAllFields();
  },
  computed: {
    isStepValid() {
      const fieldsToValidate = [
        this.v$.editedProfile.name,
        this.v$.editedProfile.fistLastName,
        this.v$.editedProfile.wallet,
        this.v$.editedProfile.bussinessName,
        this.v$.editedProfile.description,
        this.v$.editedProfile.address.city,
        this.v$.editedProfile.address.colony,
        this.v$.editedProfile.address.street,
        this.v$.editedProfile.address.state,
        this.v$.editedProfile.address.country,
        this.v$.editedProfile.address.locality,
        this.v$.editedProfile.address.externalNumber,
        this.v$.editedProfile.address.zipCode,
        this.v$.editedProfile.address.addressType,
        this.v$.editedProfile.address.referenceNear,
      ] as any;
    
      // Validar que todos los campos estén "tocados" y sin errores
      return fieldsToValidate.every((field: { $dirty: boolean; $error: boolean }) => field.$dirty && !field.$error);
    },
    
  },
  validations() {
    return {
      editedProfile: {
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
        fistLastName: {
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
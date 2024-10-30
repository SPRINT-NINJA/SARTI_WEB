import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required,maxLength, minLength, email, helpers } from "@vuelidate/validators";


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
        first_last_name: "",
        second_last_name: "",
        description: "",
        wallet: "",
        address: {
          city: "",
          colony: "",
          external_number: "",
          internal_number: "",
          locality: "",
          reference_near: "", // referencia del lugar
          state: "",
          street: "",
          zip_code: "", // codigo postal,
          address_type: "",
        },
      },
      errorMessagges: {
        required: "Campo obligatorio",
        invalidEmail: "Correo inválido",
        invalidTextWithNumber:"No se aceptan caracteres especiales",
        invalidText:"No se aceptan números",
        minLengthReference_near:"Mínimo 20 caracteres",
        maxLengthReference_near:"Máximo 100 caracteres",
        minLength: "Mínimo 4 caracteres",
        maxLength: "Máximo 45 caracteres",
        minLengthNumber: "Mínimo 2 caracteres",
        maxLengthNumber: "Máximo 5 caracteres",
        minLengthTextarea:"Mínimo 45 caracteres",
        maxLengthTextarea:"Máximos 255 caracteres",
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
  validations(){
    return {
      seller:{
        email: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          email: helpers.withMessage(this.errorMessagges.invalidEmail, email),
        },
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
        },
        name:{
          required: helpers.withMessage(this.errorMessagges.required, required),
          maxLength: helpers.withMessage(this.errorMessagges.maxLength,maxLength(45)),
          minLength: helpers.withMessage(this.errorMessagges.minLength,minLength(4)),
          valid: helpers.withMessage(
            this.errorMessagges.invalidText,
            (value:string)=>{
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
            }
          )
        },
        first_last_name:{
          required: helpers.withMessage(this.errorMessagges.required, required),
          maxLength: helpers.withMessage(this.errorMessagges.maxLength,maxLength(45)),
          minLength: helpers.withMessage(this.errorMessagges.minLength,minLength(4)),
          valid: helpers.withMessage(
            this.errorMessagges.invalidText,
            (value:string)=>{
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
            }
          )
        },
        second_last_name:{
          maxLength: helpers.withMessage(this.errorMessagges.maxLength,maxLength(45)),
          minLength: helpers.withMessage(this.errorMessagges.minLength,minLength(4)),
          valid: helpers.withMessage(
            this.errorMessagges.invalidText,
            (value:string)=>{
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
            }
          )
        },
        description:{
          required: helpers.withMessage(this.errorMessagges.required, required),
          maxLength: helpers.withMessage(this.errorMessagges.maxLengthTextarea,maxLength(255)),
          minLength: helpers.withMessage(this.errorMessagges.minLengthTextarea,minLength(45)),
          valid: helpers.withMessage(
            this.errorMessagges.invalidTextWithNumber,
            (value:string)=>{
              return /^[a-zA-Z0-9 .\-\(\)]+$/g.test(value);
            }
          )
        },
        address:{
          city: {
            required: helpers.withMessage(this.errorMessagges.required, required),
            maxLength: helpers.withMessage(this.errorMessagges.maxLength,maxLength(45)),
            minLength: helpers.withMessage(this.errorMessagges.minLength,minLength(4)),
            valid: helpers.withMessage(
              this.errorMessagges.invalidTextWithNumber,
              (value:string)=>{
                return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
              }
            )
          },
          colony: {
            required: helpers.withMessage(this.errorMessagges.required, required),
            maxLength: helpers.withMessage(this.errorMessagges.maxLengthNumber,maxLength(45)),
            minLength: helpers.withMessage(this.errorMessagges.minLengthNumber,minLength(4)),
            valid: helpers.withMessage(
              this.errorMessagges.invalidTextWithNumber,
              (value:string)=>{
                return /^(?!.*\s{2})[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/g.test(value);
              }
            )
          },
          external_number: {
            required: helpers.withMessage(this.errorMessagges.required, required),
            maxLength: helpers.withMessage(this.errorMessagges.maxLengthNumber,maxLength(3)),
            minLength: helpers.withMessage(this.errorMessagges.minLengthNumber,minLength(1))
          },
          internal_number: {
            maxLength: helpers.withMessage(this.errorMessagges.maxLengthNumber,maxLength(3)),
            minLength: helpers.withMessage(this.errorMessagges.minLengthNumber,minLength(1))
          },
          locality: {
            required: helpers.withMessage(this.errorMessagges.required, required),
            maxLength: helpers.withMessage(this.errorMessagges.maxLength,maxLength(45)),
            minLength: helpers.withMessage(this.errorMessagges.minLength,minLength(4)),
            valid: helpers.withMessage(
              this.errorMessagges.invalidTextWithNumber,
              (value:string)=>{
                return /^(?!.*\s{2})[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/g.test(value);
              }
            )
          },
          reference_near: {
            required: helpers.withMessage(this.errorMessagges.required, required),
            maxLength: helpers.withMessage(this.errorMessagges.maxLengthReference_near,maxLength(45)),
            minLength: helpers.withMessage(this.errorMessagges.minLengthReference_near,minLength(4)),
            valid: helpers.withMessage(
              this.errorMessagges.invalidTextWithNumber,
              (value:string)=>{
                return /^[a-zA-Z0-9 .\-\(\)]+$/g.test(value);
              }
            )
          },
          state: {
            required: helpers.withMessage(this.errorMessagges.required, required),
            maxLength: helpers.withMessage(this.errorMessagges.maxLength,maxLength(45)),
            minLength: helpers.withMessage(this.errorMessagges.minLength,minLength(4)),
            valid: helpers.withMessage(
              this.errorMessagges.invalidTextWithNumber,
              (value:string)=>{
                return /^(?!.*\s{2})[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/g.test(value);
              }
            )
          },
          street: {
            required: helpers.withMessage(this.errorMessagges.required, required),
            maxLength: helpers.withMessage(this.errorMessagges.maxLength,maxLength(45)),
            minLength: helpers.withMessage(this.errorMessagges.minLength,minLength(4)),
            valid: helpers.withMessage(
              this.errorMessagges.invalidTextWithNumber,
              (value:string)=>{
                return /^(?!.*\s{2})[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/g.test(value);
              }
            )
          },
          zip_code: {
            required: helpers.withMessage(this.errorMessagges.required, required),
            maxLength: helpers.withMessage(this.errorMessagges.maxLength,maxLength(5)),
            minLength: helpers.withMessage(this.errorMessagges.minLength,minLength(1))
          },
          address_type: {
            required: helpers.withMessage(this.errorMessagges.required, required),
          maxLength: helpers.withMessage(this.errorMessagges.maxLength,maxLength(45)),
          minLength: helpers.withMessage(this.errorMessagges.minLength,minLength(4))

          },
        }

      }
    }
  }
});

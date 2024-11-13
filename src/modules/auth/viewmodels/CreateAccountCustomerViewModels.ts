import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required,maxLength, minLength, email, helpers } from "@vuelidate/validators";


export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
    data(){
        return {
            customer:{
                email:"",
                password:"",
                name:"",
                first_last_name:"",
                second_last_name:"",
                address:{
                    city:"",
                    colony:"",
                    external_number:"",
                    internal_number:"",
                    locality:"",
                    reference_near:"",// referencia del lugar
                    state:"",
                    street:"",
                    zip_code:"",// codigo postal,
                    address_type:"",
                }
            },
          currentStep: 1,
          steps: ["Datos personales", "Dirección"],
          password: "",
          passwordVisible: false,
          passwordVisibleConfirm: false,
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
})
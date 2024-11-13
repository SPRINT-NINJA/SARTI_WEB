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
      delivery_man: {
        email: "",
        password: "",
        name: "",
        first_last_name: "",
        second_last_name: "",
        face_photo: "",
        front_identification_photo: "",
        back_identification_photo: "",
      },
      currentStep: 1,
      steps: [
        "Datos personales",
        "Identificación oficial (Frontal)",
        "Identificación oficial (Trasera)",
        "Foto Facial",
      ],
      password: "",
      passwordVisible: false,
      passwordVisibleConfirm: false,
      progress1: 0, 
      progress2: 0, 
      progress3: 0,
      timeCharging:false,
      timeCharging2:false,
      timeCharging3:false,
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
});

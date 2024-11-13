import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email, helpers } from "@vuelidate/validators";
export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      email: "",
      recoveryPassword: {
        code: "",
        password: "",
      },
      isVerifiedAccount: false,
      errorMessagges: {
        required: "Campo obligatorio",
        invalidEmail: "Correo inválido",
        minLength: "Mínimo 6 caracteres",
        maxLength: "Máximo 45 caracteres",
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
    verifyEmail() {
      this.isVerifiedAccount = !this.isVerifiedAccount;
    },
  },
 
});

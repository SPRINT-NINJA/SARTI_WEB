import Vue from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
export default Vue.extend({
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
    };
  },
  methods: {
    verifyEmail() {
      this.isVerifiedAccount = !this.isVerifiedAccount;
    },
  },
  validations(){
    return {
        email: { required, email }, // Valida que el email esté presente y sea válido
        recoveryPassword: {
          code: { required }, // Valida que el código esté presente
          password: { required, minLength: minLength(8) }, // Valida que la contraseña tenga al menos 8 caracteres
        },
    }
  }
});

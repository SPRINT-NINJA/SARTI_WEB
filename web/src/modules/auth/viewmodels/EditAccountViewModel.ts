import { defineComponent } from "vue";
import AuthService from "../services/AuthService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  maxLength,
  minLength,
  email,
  helpers,
} from "@vuelidate/validators";
import { jwtDecode } from "jwt-decode";

export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newEmail: this.email,
      modalShow: false,
      confirmPassword: "",
      changePassword: {
        oldPassword: "",
        newPassword: "",
      },
      validateEmail: {
        email: "",
        code: "",
      },
      codeArray: ["", "", "", "", ""],
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
    async sendCode(sendemail: any) {
      try {
        this.isLoading = true;
        const resp = await AuthService.senCode({
          email: sendemail,
        });
        if (!resp.error) {
          this.codeArray = ["", "", "", "", ""];
          this.modalShow = !this.modalShow;
        }
      } catch (error) {
        console.log(error);
      }finally{
        this.isLoading = false;
      }
    },
    async confirmAccount() {
      try {
        const fullCode = this.codeArray.join("");
        if (fullCode.length < 5) {
          return SweetAlertCustom.warningMessage(
            "¡Advertencia!",
            "Verifica el código aun faltan números"
          );
        }
        this.validateEmail.email = this.newEmail;
        this.validateEmail.code = fullCode;
        this.isLoading = true;
        const resp = await AuthService.confirmAccount(this.validateEmail);
        if (!resp.error) {
          this.codeArray = ["", "", "", "", ""];
          this.modalShow = false;
          SweetAlertCustom.successMessage(
            "Cuenta activada",
            "Tu cuenta ha sido activada correctamente"
          );
        }
      } catch (error) {
        console.log(error);
      }finally{
        this.isLoading = false;
      }
    },
    async changePasswordAccount() {
      try {
        this.isLoading = true; 
        const resp = await AuthService.changePassword(this.changePassword);
        if (!resp.error) {
          SweetAlertCustom.successMessage(
            "Se ha cambiado de contraseña",
            "La contraseña ha sido modificada"
          );
        }
      } catch (error) {
        console.log(error);
      }finally{
        this.isLoading = false;
      }
    },
  },
  validations() {
    return {
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
          () => this.changePassword.newPassword === this.confirmPassword
        ),
      } as any,
      changePassword: {
        oldPassword: {
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
        newPassword: {
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
        
      },
    };
  },
});

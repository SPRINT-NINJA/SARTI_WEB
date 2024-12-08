import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email, helpers } from "@vuelidate/validators";
import {
  IRecoveryPassword,
  IVerifyEmail,
} from "../models/RecoveryPasswordModel";
import AuthService from "../services/AuthService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { enterOnlyNumbers } from "@/kernel/funcions";

export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      isLoading: false,
      verifiedEmail: {
        email: "",
      } as IVerifyEmail,
      recoveryPasswordPayload: {
        email: "",
        code: "",
        password: "",
      } as IRecoveryPassword,
      isVerifiedAccount: false,
      errorMessages: {
        required: "Campo obligatorio",
        invalidEmail: "Correo inválido",
        allowedLength: "Mínimo 5 - Máximo 5 caracteres",
        noneScripts: "Campo inválido no se aceptan scripts",
        valid: "Campos inválido - Solo se permiten números del 0 al 9",
        password: {
          valid:
            "La contraseña debe tener mínimo una mayúscula, un caracter especial (# . _) y un número (longitud de 3 a 16 car.)",
        },
      },
    };
  },
  methods: {
    enterOnlyNumbers,
    async sendCode() {
      try {
        this.isLoading = true;
        const resp = await AuthService.sendCode(this.verifiedEmail);
        const { error } = resp;
        if (!error) {
          this.isVerifiedAccount = true;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async recoveryPassword() {
      try {
        SweetAlertCustom.questionMessage().then(async (result: any) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            this.recoveryPasswordPayload.email = this.verifiedEmail.email;
            const resp = await AuthService.recoveryPassword(
              this.recoveryPasswordPayload
            );
            const { error } = resp;
            if (!error) {
              this.isVerifiedAccount = false;
              SweetAlertCustom.successMessage();
              this.$router.push({ name: "login" });
            }
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  validations() {
    return {
      recoveryPasswordPayload: {
        code: {
          required: helpers.withMessage(this.errorMessages.required, required),
          valid: helpers.withMessage(
            this.errorMessages.valid,
            (value: string) => /^[0-9]*$/.test(value)
          ),
          allowedLength: helpers.withMessage(
            this.errorMessages.allowedLength,
            (value: string) => {
              if (!value) return true;
              return value.length >= 1 && value.length == 5;
            }
          ),
          notScript: helpers.withMessage(
            this.errorMessages.noneScripts,
            (value: string) => {
              return !/<.*?script.*\/?>/gi.test(value);
            }
          ),
        } as any,
        password: {
          required: helpers.withMessage(this.errorMessages.required, required),
          valid: helpers.withMessage(
            this.errorMessages.password.valid,
            (value: string) => {
              if (!value) return true;
              return /^(?=.*[A-Z]+)(?=.*[._#]+)(?=.*[0-9]+)[a-zA-Z0-9._#]{3,16}$/g.test(
                value
              );
            }
          ),
          notScript: helpers.withMessage(
            this.errorMessages.noneScripts,
            (value: string) => {
              if (!value) return true;
              return !/<.*?script.*\/?>/gi.test(value);
            }
          ),
        } as any,
      } as any,
      verifiedEmail: {
        email: {
          required: helpers.withMessage(this.errorMessages.required, required),
          email: helpers.withMessage(this.errorMessages.invalidEmail, email),
        } as any,
      } as any,
    };
  },
});

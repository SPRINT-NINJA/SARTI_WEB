import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email, helpers } from "@vuelidate/validators";
import AuthService from "../services/AuthService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
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
      userData: {} as any,
      isLoading: false,
      email: "",
      verifiedEmail: "",
      password: "",
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
    async verifyEmail() {
      try {
        this.isLoading = true;
        const resp = await AuthService.getUser({ email: this.email });
        const { error } = resp;
        if (!error) {
          // guardar en el storage si es verificado
          localStorage.setItem("verifiedEmail", this.email);
          this.verifiedEmail = this.email;
          this.isVerifiedAccount = !this.isVerifiedAccount;
        }
        this.userData = resp;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async sigin() {
      try {
        this.isLoading = true;
        const resp = await AuthService.sigin({
          email: this.verifiedEmail,
          password: this.password,
        });
        console.log("response login", resp);
        if (!resp.error) {
          localStorage.setItem("token", resp);
          localStorage.removeItem("verifiedEmail");
          if (await this.checkNextRedirect()) SweetAlertCustom.welcomeMessage();
        }
      } catch (error) {
        console.log(error);
      }finally{
        this.isLoading = false;
      }
    },
    async checkNextRedirect() {
      if (localStorage.token) {
        if (
          jwtDecode<CustomJwtPayload>(localStorage.token).role[0].authority ===
          ERoles.SELLER
        ) {
          await this.$router.replace("/seller");
          return true;
        } else if (
          jwtDecode<CustomJwtPayload>(localStorage.token).role[0].authority ===
          ERoles.CUSTOMER
        ) {
          await this.$router.replace("/customer");
          return true;
        } else if (
          jwtDecode<CustomJwtPayload>(localStorage.token).role[0].authority ===
          ERoles.DELIVERYMAN
        ) {
          await this.$router.replace("/delivery");
          return true;
        }
      }
    },
    checkVerifiedEmail() {
      const state = localStorage.getItem("verifiedEmail");
      console.log("state", state);
      if (state) {
        this.email = state;
        this.verifyEmail();
      }
    },
  },
  created() {
    this.checkVerifiedEmail();
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage(this.errorMessagges.required, required),
        email: helpers.withMessage(this.errorMessagges.invalidEmail, email),
      } as any,
      password: {
        required: helpers.withMessage(this.errorMessagges.required, required),
        // valid: helpers.withMessage(
        //   this.errorMessagges.password.valid,
        //   (value: string) => {
        //     return /^(?=.*[A-Z]+)(?=.*[._#]+)(?=.*[0-9]+)[a-zA-Z0-9._#]{3,16}$/g.test(
        //       value
        //     );
        //   }
        // ),
        notScript: helpers.withMessage(
          this.errorMessagges.noneScripts,
          (value: string) => {
            return !/<.*?script.*\/?>/gi.test(value);
          }
        ),
      } as any,
    };
  },
});

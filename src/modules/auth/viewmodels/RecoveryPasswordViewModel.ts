import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email, helpers } from "@vuelidate/validators";
import Swal from "sweetalert2";
import axios from "./../../../config/axios";

export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      email: "",
      verifiedEmail: "",
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
    async verifyEmail() {
      this.verifiedEmail = this.email;
      try {
        this.loading = true;

        const response = await axios.post("/auth/send-recovery-code", {
          email: this.email,
        });
        console.log(response.data);

        Swal.fire({
          title: "¡Código enviado!",
          text: "Hemos enviado un código de verificación a tu correo electrónico.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        // Manejo de errores mejorado
        if (error.response) {
          console.error("Error en la respuesta:", error.response.data);
          Swal.fire({
            title: "Error de recuperación",
            text:
              error.response.data.message ||
              "Ocurrió un problema al enviar el código de verificación.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        } else if (error.request) {
          console.error("Error en la solicitud:", error.request);
          Swal.fire({
            title: "Error de conexión",
            text: "No se pudo conectar al servidor. Inténtalo de nuevo más tarde.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        } else {
          console.error("Error:", error.message);
          Swal.fire({
            title: "Error inesperado",
            text: "Ocurrió un error inesperado. Por favor, intenta nuevamente.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      } finally {
        this.loading = false; // Ocultar la pantalla de carga
      }

      this.isVerifiedAccount = !this.isVerifiedAccount;
    },

    async changePassword() {
      const recoveryData = {
        email: this.verifiedEmail,
        code: this.recoveryPassword.code,
        password: this.recoveryPassword.password,
      };

      try {
        this.loading = true;

        const response = await axios.post(
          "/auth/change-password",
          recoveryData
        );

        console.log(response.data);

        Swal.fire({
          title: "¡Se cambió la contraseña!",
          text: "La contraseña de cambió correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        this.$router.push("/login");
      } catch (error) {
        // Manejo de errores mejorado
        if (error.response) {
          console.error("Error en la respuesta:", error.response.data);
          Swal.fire({
            title: "Error de recuperación",
            text:
              error.response.data.message ||
              "Ocurrió un problema al cambiar la contraseña.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        } else if (error.request) {
          console.error("Error en la solicitud:", error.request);
          Swal.fire({
            title: "Error de conexión",
            text: "No se pudo conectar al servidor. Inténtalo de nuevo más tarde.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        } else {
          console.error("Error:", error.message);
          Swal.fire({
            title: "Error inesperado",
            text: "Ocurrió un error inesperado. Por favor, intenta nuevamente.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      } finally {
        this.loading = false; 
      }
    },
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage(this.errorMessagges.required, required),
        email: helpers.withMessage(this.errorMessagges.invalidEmail, email),
      },
      recoveryPassword: {
        code: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(5)
          ),
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
      },
    };
  },
});

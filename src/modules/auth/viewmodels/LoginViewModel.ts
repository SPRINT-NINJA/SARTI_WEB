import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email, helpers } from "@vuelidate/validators";

import axios from "./../../../config/axios";
import Swal from 'sweetalert2';

export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      loading: false,
      email: "",
      verifiedEmail: "",
      password: "",
      recoveryPassword: {
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
      console.log(this.email);
      this.verifiedEmail = this.email;
      this.isVerifiedAccount = !this.isVerifiedAccount;
    },
    async Login() {
      const loginData = {
        email: this.verifiedEmail,
        password: this.recoveryPassword.password,
      };

      try {
        this.loading = true;
        const response = await axios.post("/auth/sign-in", loginData);

        localStorage.setItem('token', JSON.stringify(response.data.data));

        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Iniciaste sesión correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });

        this.$router.push("/delivery/order-list"); 
      } catch (error) {
        // Manejo de error
        if (error.response) {
          // Error con respuesta del servidor
          console.error("Error en la respuesta:", error.response.data);

          alert("Error de login: " + error.response.data.message);
        } else if (error.request) {
          // No hubo respuesta del servidor
          console.error("Error en la solicitud:", error.request);
          Swal.fire({
            title: '¡Error!',
            text: 'Error al concectarse al servidor.',
            icon: 'alert',
            confirmButtonText: 'Aceptar',
          });
        } else {
          // Otro error
          console.error("Error:", error.message);
          alert("Ocurrió un error inesperado.");
        }
      } finally {
        this.loading = false; // Ocultar la pantalla de carga
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

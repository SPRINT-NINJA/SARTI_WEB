import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  maxLength,
  minLength,
  email,
  helpers,
} from "@vuelidate/validators";
import AuthService from "./../services/AuthService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { jwtDecode } from "jwt-decode";
import { ERoles } from "@/kernel/types";
import  placeholderImage from "../../../assets/ine.png";

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
      delivery_man: {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        firstLastName: "",
        secondLastName: "",
        profilePicture: null,
        frontIdentification: null,
        backIdentification: null,
      },
      profilePhoto:[

      ],
      identifiactionPhoto: [
      ],
      currentStep: 1,
      steps: ["Datos personales", "Identificación oficial", "Foto Facial"],
      password: "",
      passwordVisible: false,
      passwordVisibleConfirm: false,
      progress1: 0,
      progress3: 0,
      timeCharging: false,
      timeCharging3: false,
      placeholderImage: placeholderImage,
      errorMessagges: {
        required: "Campo obligatorio",
        invalidEmail: "Correo inválido",
        invalidTextWithNumber: "No se aceptan caracteres especiales",
        invalidText: "No se aceptan números",
        minLengthReference_near: "Mínimo 20 caracteres",
        maxLengthReference_near: "Máximo 100 caracteres",
        minLength: "Mínimo 4 caracteres",
        maxLength: "Máximo 45 caracteres",
        minLengthNumber: "Mínimo 2 caracteres",
        maxLengthNumber: "Máximo 5 caracteres",
        minLengthTextarea: "Mínimo 45 caracteres",
        maxLengthTextarea: "Máximos 255 caracteres",
        noneScripts: "Campo inválido no se aceptan scripts",
        valid: "Campos inválido - caracteres inválidos",
        passwordWrong: "La contraseña no coincide, intentá de nuevo",
        minLengthPassword: "Tiene que contener al menos 8 caracteres",
        password: {
          valid:
            "La contraseña debe tener mínimo una mayúscula, un caracter especial (# . _) y un número (longitud de 3 a 16 car.)",
        },
      },
    };
  },
  computed: {
    isStepValid(): boolean {
      if (this.steps[this.currentStep - 1] === "Datos personales") {
        return (
          !this.v$.delivery_man.email.$error &&
          !this.v$.delivery_man.password.$error &&
          !this.v$.delivery_man.confirmPassword.$error &&
          !this.v$.delivery_man.name.$error &&
          !this.v$.delivery_man.firstLastName.$error &&
          this.v$.delivery_man.email.$dirty &&
          this.v$.delivery_man.password.$dirty &&
          this.v$.delivery_man.confirmPassword.$dirty &&
          this.v$.delivery_man.name.$dirty &&
          this.v$.delivery_man.firstLastName.$dirty
        );
      }
    
      if(this.steps[this.currentStep - 1] === "Identificación oficial"){
        return(
          this.timeCharging
        )
      }

      if(this.steps[this.currentStep - 1] === "Foto Facial"){
        return(
          this.timeCharging3
        )
      }

      return true;
    },
  },
  methods: {
    async submitAccountForm() {
      //Acomoda las fotos de las credenciales
      try {
        if (this.identifiactionPhoto.length > 0 && this.profilePhoto.length  >0 ) {
          this.delivery_man.frontIdentification =
            this.identifiactionPhoto[0].target;
          this.delivery_man.backIdentification =
            this.identifiactionPhoto[1].target;
          this.delivery_man.profilePicture =
          this.profilePhoto[0].target
        }
        SweetAlertCustom.loading("Cargando","Espera estamos en proceso de tu información",6000)
        const resp = await AuthService.createAccountDeliveryMan(this.delivery_man)
        if (!resp.error) {
          localStorage.setItem('token', JSON.stringify(resp));
          if (await this.checkNextRedirect())
          SweetAlertCustom.successMessage();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async checkNextRedirect() {
      if (localStorage.token) {
        if (
          jwtDecode<CustomJwtPayload>(localStorage.token).role[0].authority ===
          ERoles.delivery_man
        ) {
          await this.$router.replace("/delivery_man");
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
    identifiactionPhotoCredential() {
      console.log(this.delivery_man.frontIdentification);
    },
  },
  validations() {
    return {
      delivery_man: {
        email: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          email: helpers.withMessage(this.errorMessagges.invalidEmail, email),
        } as any,
        password: {
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
            () =>
              this.delivery_man.password === this.delivery_man.confirmPassword
          ),
        } as any,
        name: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidText,
            (value: string) => {
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
            }
          ),
        } as any,
        firstLastName: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidText,
            (value: string) => {
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
            }
          ),
        } as any,
        secondLastName: {
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            maxLength(45)
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            minLength(4)
          ),
          valid: helpers.withMessage(
            this.errorMessagges.invalidText,
            (value: string) => {
              return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
            }
          ),
        } as any,
      },
    };
  },
  mounted() {
    this.identifiactionPhotoCredential();
  },
});

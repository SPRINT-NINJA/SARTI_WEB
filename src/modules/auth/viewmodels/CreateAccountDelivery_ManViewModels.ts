import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    // se declara el vuevalidate
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
        address: {
          city: "",
          colony: "",
          external_number: "",
          internal_number: "",
          locality: "",
          reference_near: "", // referencia del lugar
          state: "",
          street: "",
          zip_code: "", // codigo postal,
          address_type: "",
        },
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

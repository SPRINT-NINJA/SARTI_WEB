import { defineComponent } from "vue";

export default defineComponent({
    setup(){
        // se declara el vuevalidate
    },
    data(){
        return {
            seller:{
                email:"",
                password:"",
                name:"",
                first_last_name:"",
                second_last_name:"",
                description:"",
                wallet:"",
                address:{
                    city:"",
                    colony:"",
                    external_number:"",
                    internal_number:"",
                    locality:"",
                    reference_near:"",// referencia del lugar
                    state:"",
                    street:"",
                    zip_code:"",// codigo postal,
                    address_type:"",
                }
            },
          currentStep: 1,
          steps: ["Datos personales", "Dirección", "Descripción del negocio"],
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
})
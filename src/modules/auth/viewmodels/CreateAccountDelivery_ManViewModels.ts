import Vue from "vue";


export default Vue.extend({
    setup(){
        // se declara el vuevalidate
    },
    data(){
        return {
            delivery_man:{
                email:"",
                passwod:"",
                name:"",
                first_last_name:"",
                second_last_name:"",
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
          steps: ["Datos personales", "Identificación oficial (Frontal)","Identificación oficial Parte (Trasera)","Foto Facial"],
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
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
          showUploadImage:false,
          showTakePicture:false,
          takePhoto:false,
          stream: null as MediaStream | null, 
        };
      },
      methods: {
        stopCamera() {
          if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then((stream: MediaStream) => {
                this.stream = stream;
                this.stream.getTracks().forEach(track => track.stop());
              })
              .catch((error) => {
                console.error("Error accessing the camera: ", error);
              });
          } else {
            console.warn("Camera not supported by the browser");
          }
        },
        takePicture() {
          const ratio = (window.innerHeight > window.innerWidth) ? 16/ 9:9 /16;
          const picture = document.querySelector(
            "canvas"
          ) as HTMLCanvasElement | null;
          const video = document.querySelector("video") as HTMLVideoElement | null;
    
          if (picture && video) {
            const ctx = picture.getContext("2d");
            picture.width = (window.innerWidth < 400) ? window.innerWidth : 400;
            picture.height = window.innerHeight / ratio;
    
            if (ctx) {
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = "high";
              ctx.drawImage(video, 0, 0, picture.width, picture.height);
              console.log(
                ctx.drawImage(video, 0, 0, picture.width, picture.height)
              );
            }
            this.takePhoto = !this.takePhoto;
          } else {
            console.warn("Canvas or video element not found.");
          }
        },
        showCameraOption(){
          this.showTakePicture = !this.showTakePicture;
          if(this.showUploadImage){
            this.showUploadImage= false;
          }
      },
      showUploadOption(){
          this.showUploadImage = !this.showUploadImage;
          if(this.showTakePicture){
            this.showTakePicture = false;
          }
        },
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
        }
       
      },
})
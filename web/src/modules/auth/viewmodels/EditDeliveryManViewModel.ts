import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import AuthService from "./../services/AuthService";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import {
  required,
  maxLength,
  minLength,
  email,
  helpers,
} from "@vuelidate/validators";

export default defineComponent({
    setup() {
        const v$ = useVuelidate();
        return { v$ };
      },
    data() {
      return {
        editedProfile: { id: 0,
            name: "",
            fistLastName: "",
            secondLastName: "",
            facePhoto: "",
            frontIdentificationPhoto: "",
            backIdentificationPhoto: "",
            user: {
              email: "",
              role: "",
            }
        } as IDeliveryManUpdate,
        editCredentialFront: false,
        editCredentialBack: false,
        newfrontIdentificationPhoto:[] as any,
        newBackIdentificationPhoto:[] as any,
        newPhotoProfile:[] as any,
        editProfile: false,
        timeCharging:false,
        timeCharging2:false,
        timeCharging3:false,
        progress1: 0,
        progress2: 0,
        progress3: 0, 
        isLoading: false,
        errorMessagges: {
            required: "Campo obligatorio",
            invalidTextWithNumber: "No se aceptan caracteres especiales",
            invalidText: "No se aceptan números", //
            minLength: "Mínimo 4 caracteres",//
            maxLength: "Máximo 45 caracteres",//
            noneScripts: "Campo inválido no se aceptan scripts",
            valid: "Campos inválido - caracteres inválidos"
          },
      };
    },
    computed: {
        isStepValid() {
          const fieldsToValidate = [
            this.v$.editedProfile.name,
            this.v$.editedProfile.fistLastName,
          ] as any;
        
          // Validar que todos los campos estén "tocados" y sin errores
          return fieldsToValidate.every((field: { $dirty: boolean; $error: boolean }) => field.$dirty && !field.$error);
        },
        
      },
    methods: {
      async getProfileSeller() {
        try {
            this.isLoading = true;
            const resp = await AuthService.getProfileDeliveryMan();
            this.editedProfile = resp;
        } catch (error) {
            console.log(error)
        }finally{
            this.isLoading = false;
        }
      },
      editFront() {
        this.editCredentialFront = !this.editCredentialFront;
      },
      editBack() {
        this.editCredentialBack = !this.editCredentialBack;
      },
      organizePhotos(newImage:any){
        if(newImage.length < 1){
            return  undefined;
        }else{
            return newImage[0].target;
        }
      },
      async updateDeliveryMan(){
        try {
            this.isLoading = true;
            this.editedProfile.backIdentificationPhoto = this.organizePhotos(this.newBackIdentificationPhoto);
            this.editedProfile.frontIdentificationPhoto = this.organizePhotos(this.newfrontIdentificationPhoto);
            this.editedProfile.facePhoto = this.organizePhotos(this.newPhotoProfile);
            console.log(this.editedProfile)
            const resp = await AuthService.updateProfileDeliveryMan(this.editedProfile);
            if(!resp.error){
                SweetAlertCustom.successMessage(
                    "Tus datos se han actualizado correctamente",
                    "Tus datos ingresados han sido actualizados"
                  );
                  window.location.reload();
            }
            
        } catch (error) {
            console.log(error)
        }finally{
            this.isLoading = false
        }
      },
      touchAllFields() {
        const touchIfNotEmpty = (field:any) => {
          if (field.$model !== null && field.$model !== "") {
            field.$touch();
          }
        };
      
        touchIfNotEmpty(this.v$.editedProfile.name);
        touchIfNotEmpty(this.v$.editedProfile.fistLastName);
        touchIfNotEmpty(this.v$.editedProfile.secondLastName);
      

      },
    },
    mounted() {
      this.getProfileSeller().then(()=>{
        this.touchAllFields();
      })
    },
    validations() {
        return {
          editedProfile: {
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
            fistLastName: {
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
            } as any
          },
        };
      },
  });
  
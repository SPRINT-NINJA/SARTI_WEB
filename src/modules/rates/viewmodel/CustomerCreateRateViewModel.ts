import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required,maxLength, minLength, email, helpers } from "@vuelidate/validators";

export interface CreateRateCustomer{
    comment:string,
    rate:number,
    image:string,
}

export interface productRate {
    name: string;
    mainImage: string;
    description: string;
}

const testProduct: productRate = 
    {
        name: "Cupcake de Vainilla",
        mainImage: "https://images.mrcook.app/recipe-image/01910ce6-c8b7-7aa2-be62-0fc6ad02194b",
        description: "Delicioso cupcake de vainilla con glaseado de crema de mantequilla, decorado con chispas de colores."
    }
;




export default defineComponent({
    setup(){
        const v$ = useVuelidate();
        return { v$ };
    },
    data(){
        return{
            getProduct:{} as productRate,
            review:{
                comment:"",
                rate:0,
                image:{}
            },
            imagesUpload: {},
            showConfirmImage: false,
            errorMessagges:{
                required:"Por favor llena el formulario",
                invalidText:"No se aceptan caracteres especiales",
                minLengthText:"Se aceptan solo el minímo de 10 caracteres",
                maxLengthText:"Solo máximo 100 caracteres"
            },
            fillForm:true
        }
    },
    methods:{
        getProductByRate(){
            this.getProduct = testProduct;
        },
        updateImagesUpload(images: { name: string; url: string }[]) {
            this.imagesUpload = images;
        },
        SendReview(){
            console.log(this.review)
            this.$swal.fire({
                title: "¿Estás Seguro?",
                text: "Se enviara la reseña de este producto, muchas gracias por realizarla",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ffa446",
                cancelButtonColor: "#e35b5d",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$swal.fire({
                    title: "Se ha enviado correctamente",
                    text: "Tu reseña ha sido enviada",
                    icon: "success",
                  });
                }
              });
        },
        confirmImages(){
            this.$swal.fire({
                title: "¿Estás Seguro?",
                text: "Se alamacenaran las fotos y no se podrán cambiar",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ffa446",
                cancelButtonColor: "#e35b5d",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                    this.review.image = this.imagesUpload;
                    this.showConfirmImage = true;
                }
              });
        },
        fillFormAprove(){
            if(this.review.comment != null  && this.review.image.length > 0 && this.review.rate > 0 ) 
                return true;
        }
    },
    mounted(){
        this.getProductByRate();
    },
    validations(){
        return{
            review:{
                comment:{
                    required: helpers.withMessage(this.errorMessagges.required, required),
                    maxLength: helpers.withMessage(this.errorMessagges.maxLengthText,maxLength(100)),
                    minLength: helpers.withMessage(this.errorMessagges.minLengthText,minLength(10)),
                    valid: helpers.withMessage(
                      this.errorMessagges.invalidText,
                      (value:string)=>{
                        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/g.test(value);
                      }
                    )
                }
            }
        }
    }
});
import { defineComponent } from "vue";

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
    data(){
        return{
            getProduct:{} as productRate,
            review:{
                comment:"",
                rate:0,
                image:""
            },
            imagesUpload: {},
            showConfirmImage: false
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
                    this.showConfirmImage = true
                }
              });
        }

    },
    mounted(){
        this.getProductByRate();
    }
});
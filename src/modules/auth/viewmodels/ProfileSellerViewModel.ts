import { defineComponent } from "vue";

export default defineComponent({
    data(){
        return{
            profile:{
                name:"Juan",
                firstLastName: "Carlos",
                secondName: "Bodoque",
                email:"juan123@gmail.com",
                address:{
                    city:"México",
                    colony:"Las rosas",
                    externalNumber:"8",
                    internalNumber:"N/A",
                    locality:"Emiliano Zapata",
                    referenceNear:"Casa verde",
                    state:"Morelos",
                    street:"las rosas 2",
                    zipCode:"63902",
                    addressType:"Local"
                },
                store:{
                    name:"Las cazuelas",
                    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
                }
                
            },
            profileEdit:false
        }
    },
    methods:{
        editProfile(){
            if(this.profileEdit){
                this.profileEdit = false;
            }else{
                this.profileEdit = true;
            }
        }
    }
})

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

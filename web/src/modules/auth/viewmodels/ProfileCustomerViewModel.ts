import { defineComponent } from "vue";
import AuthService from "../services/AuthService";

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
        async getProfile(){
            try {
                const resp = await AuthService.getProfileCustomer();
                console.log(resp)
            } catch (error) {
                console.log(error)
            }

        },
        editProfile(){
            if(this.profileEdit){
                this.profileEdit = false;
            }else{
                this.profileEdit = true;
            }
        }
    },
    mounted(){
        this.getProfile();
    }
})

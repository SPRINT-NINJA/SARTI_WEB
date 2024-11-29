import { defineComponent } from "vue";
import credential from "../../../assets/ine.png";

export default defineComponent({
    data(){
        return{
            profile:{
                name:"Juan",
                firstLastName: "Carlos",
                secondName: "Bodoque",
                email:"juan123@gmail.com",
                facePhoto: "https://thispersondoesnotexist.com/",
                frontIdentificationPhoto: credential,
                backIdentificationPhoto: credential,    
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

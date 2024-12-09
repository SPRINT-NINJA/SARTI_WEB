import { defineComponent } from "vue";
import credential from "../../../assets/ine.png";
import AuthService from "../services/AuthService";


export default defineComponent({
    data(){
        return{
            profile:{
                id: 0,
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
            profileEdit:false
        }
    },
    methods:{
        async getProfile(){
            try {
                const resp = await AuthService.getProfileDeliveryMan();
                this.profile = resp;
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

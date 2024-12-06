import { defineComponent } from "vue";
import AuthService from "../services/AuthService";

export default defineComponent({
    data(){
        return{
            profile:{} as any,
            profileEdit:false
        }
    },
    methods:{
        async getProfile(){
            try {
                const resp = await AuthService.getProfileCustomer();
                if(!resp.error){
                    this.profile = resp;
                }
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

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
        editProfile(){
            if(this.profileEdit){
                this.profileEdit = false;
            }else{
                this.profileEdit = true;
            }
        },     
        async getProfile(){
            try {
                const resp = await AuthService.getProfileSeller();
                console.log(resp)
                this.profile = resp;
            } catch (error) {
                console.log(error)
            }
        }
        
    },
    mounted(){
        this.getProfile();
    }
})

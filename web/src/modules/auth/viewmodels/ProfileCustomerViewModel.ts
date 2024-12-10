import { defineComponent } from "vue";
import AuthService from "../services/AuthService";
import { ICustomerProfile } from "../models/CustomerModel";

export default defineComponent({
  data() {
    return {
      profile: {
        id: 0,
        name: "",
        firstLastName: "",
        secondLastName: "",
        address: {
          country: "",
          state: "",
          city: "",
          locality: "",
          colony: "",
          street: "",
          zipCode: 0,
          externalNumber: "",
          internalNumber: "",
          referenceNear: "",
          addressType: "",
        },
        user:{
            email:"",
            role:""
        }
      } as any,
      profileEdit: false,
      isLoading: false
    };
  },
  methods: {
    async getProfile() {
      try {
        this.isLoading = true;
        const resp = await AuthService.getProfileCustomer();
        if (!resp.error) {
          this.profile = resp;
          this.isLoading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    editProfile() {
      this.profileEdit =  !this.profileEdit;
    },
  },
  mounted() {
    this.getProfile();
  },
});

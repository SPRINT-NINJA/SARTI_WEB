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
      },
      profileEdit: false,
    };
  },
  methods: {
    async getProfile() {
      try {
        const resp = await AuthService.getProfileCustomer();
        if (!resp.error) {
          this.profile = resp;
        }
      } catch (error) {
        console.log(error);
      }
    },
    editProfile() {
      if (this.profileEdit) {
        this.profileEdit = false;
      } else {
        this.profileEdit = true;
      }
    },
  },
  mounted() {
    this.getProfile();
  },
});

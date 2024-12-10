import { defineComponent } from "vue";
import AuthService from "../services/AuthService";
import { ISellerProfile } from "../models/ProfileSellerModel";

export default defineComponent({
  data() {
    return {
      profile: {
        id: 0,
        sellerNumber: "",
        name: "",
        fistLastName: "",
        secondLastName: "",
        bussinessName: "",
        description: "",
        wallet: "",
        createdAt: "",
        updatedAt: null,
        address: {
          id: 0,
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
        user: {
          email: "",
          role: "",
        },
        products: [],
      } as ISellerProfile,

      profileEdit: false,
    };
  },
  methods: {
    async getProfile() {
      try {
        const resp = await AuthService.getProfileSeller();
        console.log(resp);
        this.profile = resp;
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

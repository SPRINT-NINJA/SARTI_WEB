import { defineComponent } from "vue";

export default defineComponent({
  name: "EditAccountSeller",
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // Puedes copiar el perfil aquí si necesitas editarlo localmente
      editedProfile: { ...this.profile },
    };
  },
  methods: {
    getProfileSeller() {
      console.log(this.profile);
    },
  },
  mounted() {
    this.getProfileSeller();
  },
});
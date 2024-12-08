<template>
  <div>
    <b-container class="my-3">
      <section>
        <h5>Información personal</h5>
        <b-row>
          <b-col>
            <b-form-group label="Nombre" label-for="input-name">
              <b-form-input
                id="input-name"
                type="text"
                v-model="profile.name"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Apellido Materno"
              label-for="input-firstLastName"
            >
              <b-form-input
                id="input-firstLastName"
                type="text"
                v-model="profile.firstLastName"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Apellido Paterno" label-for="input-secondName">
              <b-form-input
                id="input-secondName"
                type="text"
                v-model="profile.secondName"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
      <hr />
      <section>
        <h5>Dirección</h5>
        <b-row>
          <b-col cols="12" md="4">
            <b-form-group label="Ciudad" label-for="input-1">
              <b-form-input
                id="input-1"
                type="text"
                v-model="profile.address.city"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group label="Colonia" label-for="input-1">
              <b-form-input
                type="text"
                v-model="profile.address.colony"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group label="Calle" label-for="input-1">
              <b-form-input
                type="text"
                v-model="profile.address.street"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group label="Estado" label-for="input-1">
              <b-form-input
                type="text"
                v-model="profile.address.state"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group label="Localidad" label-for="input-1">
              <b-form-input
                type="text"
                v-model="profile.address.locality"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group label="Tipo residencia" label-for="input-1">
              <b-form-input
                type="text"
                v-model="profile.address.addressType"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group label="N.Exterior" label-for="input-1">
              <b-form-input
                type="text"
                v-model="profile.address.externalNumber"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group label="N.Interior" label-for="input-1">
              <b-form-input
                type="text"
                v-model="profile.address.internalNumber"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group label="Código postal" label-for="input-1">
              <b-form-input
                type="text"
                v-model="profile.address.zipCode"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="12">
            <b-form-group label="Referencia" label-for="input-1">
              <b-form-textarea
                type="text"
                v-model="profile.address.referenceNear"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
      <div class="d-flex justify-content-end align-items-center mx-2 my-2">
        <b-button variant="red-palete">
          Editar
          <b-icon icon="pencil"></b-icon>
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
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
</script>

<style scoped>
hr {
  background-color: var(--orange-primary);
  height: 0.3px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in versions below Vue 2.1.8 */ {
  opacity: 0;
}
</style>

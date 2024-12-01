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
        <h5>Credencial</h5>
        <div class="d-flex justify-content-center align-items-between my-2">
          <b-button
            @click="editCredentialFront = !editCredentialFront"
            variant="orange-secundary"
            >Parte frontal</b-button
          >
          <b-button @click="editBack" variant="orange-secundary" class="mx-4"
            >Parte trasera</b-button
          >
          <b-button @click="editProfile = !editProfile"
            >Foto de perfil</b-button
          >
        </div>
        <Transition name="bounce">
          <b-card class="my-2" v-if="editCredentialFront">
            <b-card-title> Credencial Parte Delantera </b-card-title>
            <b-row>
              <b-col cols="12" md="6" v-show="!timeCharging"> 
                <OptionsUploadImage 
                :image="newfrontIdentificationPhoto"
                  @update:image="
                  newfrontIdentificationPhoto = $event
                  "
                  :limitImages="1"
                  :progress-value="progress1" @charge-image-upload="timeCharging = $event"
                />
              </b-col>
              <b-col class="text-center" v-if="timeCharging" cols="12" md="12">
                <img
                  class="img-credential"
                  :src="newfrontIdentificationPhoto"
                  alt=""
                />
              </b-col>
              <b-col  v-if="!timeCharging" cols="12" md="6">
                <img
                  class="img-credential"
                  :src="editedProfile.frontIdentificationPhoto"
                  alt=""
                />
              </b-col>
            </b-row>
          </b-card>
        </Transition>
        <Transition name="bounce">
          <b-card class="my-2" v-if="editCredentialBack">
            <b-card-title>Credencial Parte Trasera</b-card-title>
            <b-row>
              <b-col cols="12" md="6" v-show="!timeCharging2"> 
                <OptionsUploadImage 
                :image="newBackIdentificationPhoto"
                  @update:image="
                  newBackIdentificationPhoto = $event
                  "
                  :limitImages="1"
                  :progress-value="progress2" @charge-image-upload="timeCharging2 = $event"
                />
              </b-col>
              <b-col class="text-center" v-if="timeCharging2" cols="12" md="12">
                <img
                  class="img-credential"
                  :src="newBackIdentificationPhoto"
                  alt=""
                />
              </b-col>
              <b-col  v-if="!timeCharging2" cols="12" md="6">
                <img
                  class="img-credential"
                  :src="editedProfile.backIdentificationPhoto"
                  alt=""
                />
              </b-col>
            </b-row>
          </b-card>
        </Transition>
        <Transition name="bounce">
            <b-card class="my-2" v-if="editProfile">
                <b-card-title>Foto de perfil</b-card-title>
          <b-row >
            <b-col cols="12" md="6" v-show="!timeCharging3"> 
                <OptionsUploadImage 
                :image="newPhotoProfile"
                  @update:image="
                  newPhotoProfile = $event
                  "
                  :limitImages="1"
                  :progress-value="progress3" @charge-image-upload="timeCharging3 = $event"
                />
              </b-col>
              <b-col class="text-center" v-if="timeCharging3" cols="12" md="12">
                <img
                  class="img-credential"
                  :src="newPhotoProfile"
                  alt=""
                />
              </b-col>
              <b-col  v-if="!timeCharging3" cols="12" md="6">
              <img
                class="img-credential"
                :src="editedProfile.facePhoto"
                alt=""
              />
            </b-col>
          </b-row>
            </b-card>
        </Transition>
      </section>
      <hr />
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
import OptionsUploadImage from "./OptionsUploadImage.vue";

export default defineComponent({
  name: "EditAccountSeller",
  components: {
    OptionsUploadImage,
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedProfile: { ...this.profile },
      editCredentialFront: false,
      editCredentialBack: false,
      newfrontIdentificationPhoto:"",
      newBackIdentificationPhoto:"",
      newPhotoProfile:"",
      editProfile: false,
      timeCharging:false,
      timeCharging2:false,
      timeCharging3:false,
      progress1: 0,
      progress2: 0,
      progress3: 0, 
    };
  },
  methods: {
    getProfileSeller() {
      console.log("¿Lleno?");
      console.log(this.profile ? "Sí trae" : "No");
      console.log(this.profile);
    },
    editFront() {
      this.editCredentialFront = !this.editCredentialFront;
    },
    editBack() {
      this.editCredentialBack = !this.editCredentialBack;
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

.img-credential {
  width: 90%;
  max-height: 200px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  object-fit: cover;
}
</style>

<template>
  <div>
    <b-container class="my-3">
      <custom-overlay :isLoading="isLoading" />
      <section>
        <h5>Información personal</h5>
        <b-row>
          <b-col>
            <b-form-group label-for="input-name">
              <label> Nombre <span style="color: red">*</span> </label>
              <b-form-input
                id="input-name"
                type="text"
                v-model="v$.editedProfile.name.$model"
                :state="
                  v$.editedProfile.name.$dirty
                    ? !v$.editedProfile.name.$error
                    : null
                "
                @blur="v$.editedProfile.name.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.name.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label-for="input-firstLastName">
              <label>
                Apellido Materno <span style="color: red">*</span>
              </label>
              <b-form-input
                id="input-firstLastName"
                type="text"
                v-model="v$.editedProfile.fistLastName.$model"
                :state="
                  v$.editedProfile.fistLastName.$dirty
                    ? !v$.editedProfile.fistLastName.$error
                    : null
                "
                @blur="v$.editedProfile.fistLastName.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.fistLastName.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label-for="input-secondName">
              <label> Apellido paterno </label>
              <b-form-input
                id="input-secondName"
                type="text"
                v-model="v$.editedProfile.secondLastName.$model"
                :state="
                  v$.editedProfile.secondLastName.$dirty
                    ? !v$.editedProfile.secondLastName.$error
                    : null
                "
                @blur="v$.editedProfile.secondLastName.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.secondLastName.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
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
                  @update:image="newfrontIdentificationPhoto = $event"
                  :limitImages="1"
                  :progress-value="progress1"
                  @charge-image-upload="timeCharging = $event"
                />
              </b-col>
              <b-col class="text-center" v-if="timeCharging" cols="12" md="12">
                <img
                  class="img-credential"
                  :src="newfrontIdentificationPhoto[0].url"
                  :alt="newfrontIdentificationPhoto[0].name"
                />
              </b-col>
              <b-col v-if="!timeCharging" cols="12" md="6">
                <img
                  class="img-credential"
                  :src="editedProfile.frontIdentificationPhoto"
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
                  @update:image="newBackIdentificationPhoto = $event"
                  :limitImages="1"
                  :progress-value="progress2"
                  @charge-image-upload="timeCharging2 = $event"
                />
              </b-col>
              <b-col class="text-center" v-if="timeCharging2" cols="12" md="12">
                <img
                  class="img-credential"
                  :src="newBackIdentificationPhoto[0].url"
                  :alt="newBackIdentificationPhoto[0].name"
                />
              </b-col>
              <b-col v-if="!timeCharging2" cols="12" md="6">
                <img
                  class="img-credential"
                  :src="editedProfile.backIdentificationPhoto"
                />
              </b-col>
            </b-row>
          </b-card>
        </Transition>
        <Transition name="bounce">
          <b-card class="my-2" v-if="editProfile">
            <b-card-title>Foto de perfil</b-card-title>
            <b-row>
              <b-col cols="12" md="6" v-show="!timeCharging3">
                <OptionsUploadImage
                  :image="newPhotoProfile"
                  @update:image="newPhotoProfile = $event"
                  :limitImages="1"
                  :progress-value="progress3"
                  @charge-image-upload="timeCharging3 = $event"
                />
              </b-col>
              <b-col class="text-center" v-if="timeCharging3" cols="12" md="12">
                <img
                  class="img-credential"
                  :src="newPhotoProfile[0].url"
                  :alt="newPhotoProfile[0].name"
                />
              </b-col>
              <b-col v-if="!timeCharging3" cols="12" md="6">
                <img class="img-credential" :src="editedProfile.facePhoto" />
              </b-col>
            </b-row>
          </b-card>
        </Transition>
      </section>
      <hr />
      <div class="d-flex justify-content-end align-items-center mx-2 my-2">
        <b-button
          variant="red-palete"
          :disabled="!isStepValid"
          @click="updateDeliveryMan"
        >
          Editar información
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import EditDeliveryManViewModel from "../viewmodels/EditDeliveryManViewModel";

export default {
  name: "EditAccountSeller",
  components: {
    EditAccount: () => import("@/modules/auth/components/EditAccount.vue"),
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
    OptionsUploadImage: () => import("@/components/OptionsUploadImage.vue"),
  },
  mixins: [EditDeliveryManViewModel],
};
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

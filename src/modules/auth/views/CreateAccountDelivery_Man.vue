<template>
  <div>
    <navbar />
    <div class="d-flex align-items-center justify-content-center">
      <b-card class="custom-card my-3">
        <h2 class="text-center">Registro de Repartidor</h2>
        <!-- Usa v-model en el componente StepProgress para sincronizar el paso actual -->
        <StepProgress
          v-model="currentStep"
          :steps="steps"
          @submitForm="submitAccountForm"
        />

        <b-container fluid class="form-content">
          <h2 class="text-center my-3">{{ steps[currentStep - 1] }}</h2>
          <b-row class="d-flex align-items-center justify-content-center">
            <b-row v-if="steps[currentStep - 1] === 'Datos personales'">
              <b-col cols="12" md="4">
                <b-form-group
                  id="input-group-1"
                  label="Correo electrónico"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="email"
                    placeholder="maria@gmail.com"
                    v-model="v$.delivery_man.email.$model"
                    :state="v$.delivery_man.email.$dirty ? !v$.delivery_man.email.$error : null"
                    @blur="v$.delivery_man.email.$touch()"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.delivery_man.email.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group
                  id="input-group-1"
                  label="Contraseña"
                  label-for="input-1"
                >
                  <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                      <b-icon
                        :icon="passwordVisible ? 'eye' : 'eye-slash'"
                        @click="togglePasswordVisibility"
                        style="cursor: pointer"
                      ></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      :type="passwordVisible ? 'text' : 'password'"
                      placeholder="Ingresa tu contraseña"
                      v-model="v$.delivery_man.password.$model"
                      :state="v$.delivery_man.password.$dirty ? !v$.delivery_man.password.$error : null"
                      @blur="v$.delivery_man.password.$touch()"
                    ></b-form-input>
                  </b-input-group>
                  <b-form-invalid-feedback
                      v-for="error in v$.delivery_man.password.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group
                  id="input-group-1"
                  label="Repetir contraseña"
                  label-for="input-1"
                >
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                      <b-icon
                        :icon="passwordVisibleConfirm ? 'eye' : 'eye-slash'"
                        @click="togglePasswordVisibilityConfirm"
                        style="cursor: pointer"
                      ></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      :type="passwordVisibleConfirm ? 'text' : 'password'"
                      placeholder="Ingresa tu contraseña"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group
                  id="input-group-1"
                  label="Nombre(s)"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    placeholder="Maria"
                    v-model="v$.delivery_man.name.$model"
                      :state="v$.delivery_man.name.$dirty ? !v$.delivery_man.name.$error : null"
                      @blur="v$.delivery_man.name.$touch()"
                    ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.delivery_man.name.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group
                  id="input-group-1"
                  label="Apellido Paterno"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    placeholder="Lopez"
                    v-model="v$.delivery_man.first_last_name.$model"
                    :state="v$.delivery_man.first_last_name.$dirty ? !v$.delivery_man.first_last_name.$error : null"
                      @blur="v$.delivery_man.first_last_name.$touch()"
                    ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.delivery_man.first_last_name.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group
                  id="input-group-1"
                  label="Apellido Materno"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    v-model="v$.delivery_man.second_last_name.$model"
                    placeholder="Delgado"
                    :state="v$.delivery_man.second_last_name.$dirty ? !v$.delivery_man.second_last_name.$error : null"
                      @blur="v$.delivery_man.second_last_name.$touch()"
                    ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.delivery_man.second_last_name.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row
              v-if="
                steps[currentStep - 1] === 'Identificación oficial (Frontal)'
              "
            >
              <b-col cols="12" md="6">
                <b-alert show variant="warning">
                  <b>¡ADVERTENCIA!</b> Solo toma o sube la imagen
                  <b>FRONTAL</b> de tu credencial.
                </b-alert>
                <img
                  alt="example ine"
                  class="text-center"
                  width="400"
                  src="@/assets/ine.png"
                />
              </b-col>
              <b-col cols="12" md="6">
                <OptionsUploadImage
                  :image="delivery_man.front_identification_photo"
                  @update:image="
                    delivery_man.front_identification_photo = $event
                  "
                  v-show="timeCharging === false"
                  :progress-value="progress1" @charge-image-upload="timeCharging = $event"
                />
                <b-card
                  v-show="timeCharging"
                  class="my-5 text-center"
                >
                  <h4 >Imagen cargada correctamente</h4>
                  <img
                    :src="delivery_man.front_identification_photo"
                    class="photo"
                    height="200"
                  />
                </b-card>
              </b-col>
            </b-row>
            <b-row
              v-if="
                steps[currentStep - 1] === 'Identificación oficial (Trasera)'
              "
            >
              <b-col cols="12" md="6">
                <b-alert show variant="warning">
                  <b>¡ADVERTENCIA!</b> Solo toma o sube la imagen
                  <b>FRONTAL</b> de tu credencial.
                </b-alert>
                <img
                  alt="example ine"
                  class="text-center"
                  width="400"
                  src="@/assets/ine.png"
                />
              </b-col>
              <b-col cols="12" md="6">
                <OptionsUploadImage
                  :image="''"
                  @update:image="
                    delivery_man.back_identification_photo = $event
                  "
                  v-show="timeCharging2 === false"
                  @charge-image-upload="timeCharging2 = $event"
                  :progress-value="progress2"
                />

                <b-card
                  v-show="timeCharging2"
                  class="my-5 text-center"
                >
                  <h4 >Imagen cargada correctamente</h4>
                  <img
                    :src="delivery_man.back_identification_photo"
                    class="photo"
                    height="200"
                  />
                </b-card>
              </b-col>
            </b-row>
            <b-row v-if="steps[currentStep - 1] === 'Foto Facial'">
              <b-col cols="12" md="12">
                <OptionsUploadImage
                  :image="''"
                  @update:image="delivery_man.face_photo = $event"
                  :progress-value="progress3"
                  v-show="timeCharging3 === false"
                  @charge-image-upload="timeCharging3 = $event"
                />
                <b-card
                  v-show="timeCharging3"
                  class="my-5 text-center"
                >
                  <h4 >Imagen cargada correctamente</h4>
                  <img
                    :src="delivery_man.face_photo"
                    class="photo"
                    height="200"
                  />
                </b-card>
              </b-col>
            </b-row>
          </b-row>
          <b-row class="navigation-buttons">
            <b-col cols="6" md="6" class="text-left">
              <b-button
                variant="orange-primary"
                @click="prevStep"
                :disabled="currentStep === 1"
                >Regresar</b-button
              >
            </b-col>
            <b-col cols="6" md="6" class="text-right">
              <b-button
                v-if="currentStep < steps.length"
                variant="orange-primary"
                @click="nextStep"
              >
                Siguiente
              </b-button>
              <b-button v-else variant="red-palete" @click="submitAccountForm">
                Crear cuenta
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineAsyncComponent } from "vue";
import StepProgress from "@/components/StepProgress.vue";
import OptionsUploadImage from "@/components/OptionsUploadImage.vue";
import CreateAccountDelivery_ManViewModels from "../viewmodels/CreateAccountDelivery_ManViewModels";

export default {
  name: "CreateAccountDelivery_Man",
  components: {
    StepProgress,
    Navbar: () => import("@/modules/public/components/Navbar.vue"),
    OptionsUploadImage,
  },
  mixins: [CreateAccountDelivery_ManViewModels],
};
</script>

<style scoped>
.photo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>

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
                <b-form-group>
                  <label>
                    Correo electrónico: <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="email"
                    placeholder="maria@gmail.com"
                    v-model="v$.delivery_man.email.$model"
                    :state="
                      v$.delivery_man.email.$dirty
                        ? !v$.delivery_man.email.$error
                        : null
                    "
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
                <b-form-group>
                  <label> Contraseña: <span style="color: red">*</span> </label>
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
                      :state="
                        v$.delivery_man.password.$dirty
                          ? !v$.delivery_man.password.$error
                          : null
                      "
                      @blur="v$.delivery_man.password.$touch()"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.delivery_man.password.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group>
                  <label>
                    Confirmar Contraseña: <span style="color: red">*</span>
                  </label>
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
                      v-model="v$.delivery_man.confirmPassword.$model"
                      :state="
                        v$.delivery_man.confirmPassword.$dirty
                          ? !v$.delivery_man.confirmPassword.$error
                          : null
                      "
                      @blur="v$.delivery_man.confirmPassword.$touch()"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.delivery_man.confirmPassword.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group>
                  <label> Nombre(s): <span style="color: red">*</span> </label>
                  <b-form-input
                    type="text"
                    placeholder="Maria"
                    v-model="v$.delivery_man.name.$model"
                    :state="
                      v$.delivery_man.name.$dirty
                        ? !v$.delivery_man.name.$error
                        : null
                    "
                    @blur="v$.delivery_man.name.$touch()"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.delivery_man.name.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group>
                  <label>
                    Apellido Paterno: <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="text"
                    placeholder="Lopez"
                    v-model="v$.delivery_man.firstLastName.$model"
                    :state="
                      v$.delivery_man.firstLastName.$dirty
                        ? !v$.delivery_man.firstLastName.$error
                        : null
                    "
                    @blur="v$.delivery_man.firstLastName.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.delivery_man.firstLastName.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group label="Apellido Materno">
                  <b-form-input
                    type="text"
                    v-model="v$.delivery_man.secondLastName.$model"
                    placeholder="Delgado"
                    :state="
                      v$.delivery_man.secondLastName.$dirty
                        ? !v$.delivery_man.secondLastName.$error
                        : null
                    "
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.delivery_man.secondLastName.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="steps[currentStep - 1] === 'Identificación oficial'">
              <b-col cols="12" md="6">
                <b-alert show variant="warning">
                  <b>¡TEN CUIDADO!</b> Solo toma o sube la imagen de las dos
                  caras de tu identificación.
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
                  :image="identifiactionPhoto"
                  @update:image="identifiactionPhoto = $event"
                  v-show="timeCharging === false"
                  :progress-value="progress1"
                  @charge-image-upload="timeCharging = $event"
                  :limitImages="2"
                />
                <b-card v-show="timeCharging" class="my-5 text-center">
                  <h4>Imagen cargada correctamente</h4>
                  <b-row>
                    <b-col
                      class="my-2"
                      cols="12"
                      md="12"
                      v-for="(item, index) in identifiactionPhoto"
                      :key="index"
                    >
                      <img :src="item.url" class="photo" height="100" />
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
            <b-row v-if="steps[currentStep - 1] === 'Foto Facial'">
              <b-col cols="12" md="12">
                <OptionsUploadImage
                  :image="profilePhoto"
                  @update:image="profilePhoto = $event"
                  :progress-value="progress3"
                  v-show="timeCharging3 === false"
                  @charge-image-upload="timeCharging3 = $event"
                  :limitImages="1"
                />
                <b-card v-show="timeCharging3" class=" text-center">
                  <h4>Imagen cargada correctamente</h4>
                  <img  :src="profilePhoto[0]?.url || placeholderImage" class="photo-profile" height="200"  />
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
                :disabled="!isStepValid"
              >
                Siguiente
              </b-button>
              <b-button v-else variant="red-palete" :disabled="!isStepValid" @click="submitAccountForm">
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
  max-width: 200px;
  margin: 0 auto;
}

.photo-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>

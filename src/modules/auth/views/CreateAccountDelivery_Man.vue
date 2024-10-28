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
          <b-row class="d-flex align-items-center justify-content-center">
            <h2 class="text-center my-3">{{ steps[currentStep - 1] }}</h2>
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
                    v-model="delivery_man.email"
                    placeholder="maria@gmail.com"
                    required
                  ></b-form-input>
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
                      v-model="delivery_man.password"
                      placeholder="Ingresa tu contraseña"
                    ></b-form-input>
                  </b-input-group>
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
                      v-model="aaa"
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
                    v-model="delivery_man.name"
                    required
                  ></b-form-input>
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
                    v-model="delivery_man.first_last_name"
                    required
                  ></b-form-input>
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
                    v-model="delivery_man.second_last_name"
                    placeholder="Delgado"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="steps[currentStep - 1] === 'Identificación oficial (Frontal)'">
                <b-col cols="12" md="6" >
                    <b-alert show variant="warning">
                        <b>¡ADVERTENCIA!</b> Solo toma o sube la imagen <b>FRONTAL</b> de tu credencial.
                    </b-alert>
                    <img alt="example ine" class="text-center" width="300" src="@/assets/ine.png" />
                </b-col>
                <b-col cols="12" md="6" >
                    <b-row>
                        <b-col cols="12" md="6" class="text-rigth">
                        <b-button variant="brown-cacao" ><b-icon icon="camera" aria-hidden="true"></b-icon>Tomar Foto</b-button>
                        </b-col>
                        <b-col cols="12" md="6" class="text-left">
                        <b-button variant="brown-cacao"> <b-icon icon="box-arrow-in-up" aria-hidden="true"></b-icon>Subir Foto</b-button>
                        </b-col>
                    </b-row>
                    <b-card  class="my-2">

                    </b-card>

                </b-col>
            </b-row>
            <b-row v-if="steps[currentStep - 1] === 'Identificación oficial  (Trasera)'">
            </b-row>
            <b-row v-if="steps[currentStep - 1] === 'Foto Facial'">
            </b-row>
          </b-row>

          <!-- Botones de navegación en las esquinas inferiores -->
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
import CreateAccountDelivery_ManViewModels from "../viewmodels/CreateAccountDelivery_ManViewModels";

export default {
  name: "CreateAccountDelivery_Man",
  components: {
    StepProgress,
    Navbar: defineAsyncComponent(
      () => import("@/modules/public/components/Navbar.vue")
    ),
  },
  mixins: [CreateAccountDelivery_ManViewModels],
};
</script>

<style scoped>
.img-ine{
    widows: 5%;
}
</style>
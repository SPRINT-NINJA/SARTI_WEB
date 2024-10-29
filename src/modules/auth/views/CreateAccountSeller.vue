<template>
  <div>
    <navbar />
    <div class="d-flex align-items-center justify-content-center">
      <b-card class="custom-card my-3">
        <h2 class="text-center">Registro de Emprendedor</h2>
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
                    v-model="seller.email"
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
                      v-model="seller.password"
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
                    v-model="seller.name"
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
                    v-model="seller.first_last_name"
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
                    v-model="seller.second_last_name"
                    placeholder="Delgado"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="steps[currentStep - 1] === 'Dirección'">
              <b-col cols="12" md="6">
                <b-form-group
                  id="input-group-1"
                  label="Ciudad"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    placeholder="Emiliano Zapata"
                    v-model="seller.address.city"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="input-group-1"
                  label="Colonia"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    placeholder="Palo escrito"
                    v-model="seller.address.colony"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="input-group-1"
                  label="Estado"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    placeholder="Morelos"
                    v-model="seller.address.state"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="input-group-1"
                  label="Calle"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    placeholder="Dos rosas"
                    v-model="seller.address.street"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6">
                <b-form-group
                  id="input-group-1"
                  label="Localidad"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    placeholder="3 de Mayo"
                    v-model="seller.address.locality"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6">
                <b-form-group
                  id="input-group-1"
                  label="Tipo de Residencia"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    placeholder="Local propio/Negocio"
                    v-model="seller.address.address_type"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group
                  id="input-group-1"
                  label="N.Exterior"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="number"
                    placeholder="3"
                    v-model="seller.address.external_number"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group
                  id="input-group-1"
                  label="N.Interior"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="number"
                    placeholder="2"
                    v-model="seller.address.internal_number"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="input-group-1"
                  label="Código Postal:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="number"
                    placeholder="67982"
                    v-model="seller.address.zip_code"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="12">
                <b-form-group
                  id="input-group-1"
                  label="Referencia"
                  label-for="input-1"
                >
                  <b-form-textarea
                    id="textarea"
                    placeholder="Local pintado de rojo ,etc..."
                    v-model="seller.address.reference_near"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <b-col
              cols="12"
              md="12"
              v-if="steps[currentStep - 1] === 'Descripción del negocio'"
            >
              <b-form-group
                id="input-group-1"
                label="Descripción"
                label-for="input-1"
              >
                <b-form-textarea
                  id="textarea"
                  placeholder="Ingresa brevemente alguna descripción de tu emprendimiento..."
                  rows="3"
                  max-rows="6"
                  v-model="seller.description"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
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
import StepProgress from "@/components/StepProgress.vue";
import CreateAccountSellerViewModel from "../viewmodels/CreateAccountSellerViewModel";

export default {
  name: "CreateAccountSeller",
  components: {
    StepProgress,
    Navbar: () => import("@/modules/public/components/Navbar.vue"),
  },
  mixins:[CreateAccountSellerViewModel],
 
};
</script>


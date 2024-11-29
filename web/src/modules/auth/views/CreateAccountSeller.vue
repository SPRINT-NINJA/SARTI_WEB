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
                    placeholder="maria@gmail.com"
                    v-model="v$.seller.email.$model"
                    :state="v$.seller.email.$dirty ? !v$.seller.email.$error : null"
                    @blur="v$.seller.email.$touch()"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.email.$errors"
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
                      v-model="v$.seller.password.$model"
                      :state="v$.seller.password.$dirty ? !v$.seller.password.$error : null"
                      @blur="v$.seller.password.$touch()"
                    ></b-form-input>
                  </b-input-group>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.password.$errors"
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
                    v-model="v$.seller.name.$model"
                      :state="v$.seller.name.$dirty ? !v$.seller.name.$error : null"
                      @blur="v$.seller.name.$touch()"
                    ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.name.$errors"
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
                    v-model="v$.seller.first_last_name.$model"
                    :state="v$.seller.first_last_name.$dirty ? !v$.seller.first_last_name.$error : null"
                      @blur="v$.seller.first_last_name.$touch()"
                    ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.first_last_name.$errors"
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
                    v-model="v$.seller.second_last_name.$model"
                    placeholder="Delgado"
                    :state="v$.seller.second_last_name.$dirty ? !v$.seller.second_last_name.$error : null"
                      @blur="v$.seller.second_last_name.$touch()"
                    ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.second_last_name.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
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
                    v-model="v$.seller.address.city.$model"
                    :state="v$.seller.address.city.$dirty ? !v$.seller.address.city.$error : null"
                    @blur="v$.seller.address.city.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.address.city.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
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
                    v-model="v$.seller.address.colony.$model"
                    :state="v$.seller.address.colony.$dirty ? !v$.seller.address.colony.$error : null"
                    @blur="v$.seller.address.colony.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.address.colony.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
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
                    v-model="v$.seller.address.state.$model"
                    :state="v$.seller.address.state.$dirty ? !v$.seller.address.state.$error : null"
                    @blur="v$.seller.address.state.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.address.state.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
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
                    v-model="v$.seller.address.street.$model"
                    :state="v$.seller.address.street.$dirty ? !v$.seller.address.street.$error : null"
                    @blur="v$.seller.address.street.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.address.street.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
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
                    v-model="v$.seller.address.locality.$model"
                    :state="v$.seller.address.locality.$dirty ? !v$.seller.address.locality.$error : null"
                    @blur="v$.seller.address.locality.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.address.locality.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
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
                    v-model="v$.seller.address.address_type.$model"
                    :state="v$.seller.address.address_type.$dirty ? !v$.seller.address.address_type.$error : null"
                    @blur="v$.seller.address.address_type.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.address.address_type.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
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
                    v-model="v$.seller.address.external_number.$model"
                    :state="v$.seller.address.external_number.$dirty ? !v$.seller.address.external_number.$error : null"
                    @blur="v$.seller.address.external_number.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.address.external_number.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
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
                    v-model="v$.seller.address.internal_number.$model"
                    :state="v$.seller.address.internal_number.$dirty ? !v$.seller.address.internal_number.$error : null"
                    @blur="v$.seller.address.internal_number.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.address.city.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
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
                    v-model="v$.seller.address.zip_code.$model"
                    :state="v$.seller.address.zip_code.$dirty ? !v$.seller.address.zip_code.$error : null"
                    @blur="v$.seller.address.zip_code.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.address.zip_code.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
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
                    v-model="v$.seller.address.reference_near.$model"
                    :state="v$.seller.address.reference_near.$dirty ? !v$.seller.address.reference_near.$error : null"
                    @blur="v$.seller.address.reference_near.$touch()"
                  ></b-form-textarea>
                  <b-form-invalid-feedback
                      v-for="error in v$.seller.address.reference_near.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
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
                  v-model="v$.seller.description.$model"
                  :state="v$.seller.description.$dirty ? !v$.seller.description.$error : null"
                    @blur="v$.seller.description.$touch()"
                ></b-form-textarea>
                <b-form-invalid-feedback
                      v-for="error in v$.seller.description.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
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


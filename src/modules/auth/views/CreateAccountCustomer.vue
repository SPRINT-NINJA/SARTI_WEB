<template>
  <div>
    <navbar />
    <div class="d-flex align-items-center justify-content-center">
      <b-card class="custom-card my-3">
        <h2 class="text-center">Registro de Cliente</h2>
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
                    v-model="v$.customer.email.$model"
                    :state="v$.customer.email.$dirty ? !v$.customer.email.$error : null"
                    @blur="v$.customer.email.$touch()"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.email.$errors"
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
                      v-model="v$.customer.password.$model"
                      :state="v$.customer.password.$dirty ? !v$.customer.password.$error : null"
                      @blur="v$.customer.password.$touch()"
                    ></b-form-input>
                  </b-input-group>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.password.$errors"
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
                    v-model="v$.customer.name.$model"
                      :state="v$.customer.name.$dirty ? !v$.customer.name.$error : null"
                      @blur="v$.customer.name.$touch()"
                    ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.name.$errors"
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
                    v-model="v$.customer.first_last_name.$model"
                    :state="v$.customer.first_last_name.$dirty ? !v$.customer.first_last_name.$error : null"
                      @blur="v$.customer.first_last_name.$touch()"
                    ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.first_last_name.$errors"
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
                    v-model="v$.customer.second_last_name.$model"
                    placeholder="Delgado"
                    :state="v$.customer.second_last_name.$dirty ? !v$.customer.second_last_name.$error : null"
                      @blur="v$.customer.second_last_name.$touch()"
                    ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.second_last_name.$errors"
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
                    v-model="v$.customer.address.city.$model"
                    :state="v$.customer.address.city.$dirty ? !v$.customer.address.city.$error : null"
                    @blur="v$.customer.address.city.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.address.city.$errors"
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
                    v-model="v$.customer.address.colony.$model"
                    :state="v$.customer.address.colony.$dirty ? !v$.customer.address.colony.$error : null"
                    @blur="v$.customer.address.colony.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.address.colony.$errors"
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
                    v-model="v$.customer.address.state.$model"
                    :state="v$.customer.address.state.$dirty ? !v$.customer.address.state.$error : null"
                    @blur="v$.customer.address.state.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.address.state.$errors"
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
                    v-model="v$.customer.address.street.$model"
                    :state="v$.customer.address.street.$dirty ? !v$.customer.address.street.$error : null"
                    @blur="v$.customer.address.street.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.address.street.$errors"
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
                    v-model="v$.customer.address.locality.$model"
                    :state="v$.customer.address.locality.$dirty ? !v$.customer.address.locality.$error : null"
                    @blur="v$.customer.address.locality.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.address.locality.$errors"
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
                    v-model="v$.customer.address.address_type.$model"
                    :state="v$.customer.address.address_type.$dirty ? !v$.customer.address.address_type.$error : null"
                    @blur="v$.customer.address.address_type.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.address.address_type.$errors"
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
                    v-model="v$.customer.address.external_number.$model"
                    :state="v$.customer.address.external_number.$dirty ? !v$.customer.address.external_number.$error : null"
                    @blur="v$.customer.address.external_number.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.address.external_number.$errors"
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
                    v-model="v$.customer.address.internal_number.$model"
                    :state="v$.customer.address.internal_number.$dirty ? !v$.customer.address.internal_number.$error : null"
                    @blur="v$.customer.address.internal_number.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.address.city.$errors"
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
                    v-model="v$.customer.address.zip_code.$model"
                    :state="v$.customer.address.zip_code.$dirty ? !v$.customer.address.zip_code.$error : null"
                    @blur="v$.customer.address.zip_code.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.address.zip_code.$errors"
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
                    v-model="v$.customer.address.reference_near.$model"
                    :state="v$.customer.address.reference_near.$dirty ? !v$.customer.address.reference_near.$error : null"
                    @blur="v$.customer.address.reference_near.$touch()"
                  ></b-form-textarea>
                  <b-form-invalid-feedback
                      v-for="error in v$.customer.address.reference_near.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
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
import CreateAccountCustomerViewModels from "../viewmodels/CreateAccountCustomerViewModels";

export default {
  name: "CreateAccountcustomer",
  components: {
    StepProgress,
    Navbar: () => import("@/modules/public/components/Navbar.vue"),
  },
  mixins: [CreateAccountCustomerViewModels],
};
</script>

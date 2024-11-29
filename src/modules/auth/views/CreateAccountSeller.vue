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
          <h2 class="text-center my-3">{{ steps[currentStep - 1] }}</h2>
          <b-row class="d-flex align-items-center justify-content-center">
            <b-row v-if="steps[currentStep - 1] === 'Datos personales'">
              <b-col cols="12" md="4">
                <b-form-group label="Correo electrónico">
                  <b-form-input
                    type="email"
                    placeholder="maria@gmail.com"
                    v-model="v$.seller.email.$model"
                    :state="
                      v$.seller.email.$dirty ? !v$.seller.email.$error : null
                    "
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
                <b-form-group label="Contraseña">
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
                      :state="
                        v$.seller.password.$dirty
                          ? !v$.seller.password.$error
                          : null
                      "
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
                <b-form-group label="Repetir contraseña">
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
                <b-form-group label="Nombre(s)">
                  <b-form-input
                    type="text"
                    placeholder="Maria"
                    v-model="v$.seller.name.$model"
                    :state="
                      v$.seller.name.$dirty ? !v$.seller.name.$error : null
                    "
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
                <b-form-group label="Apellido Paterno">
                  <b-form-input
                    type="text"
                    placeholder="Lopez"
                    v-model="v$.seller.firstLastName.$model"
                    :state="
                      v$.seller.firstLastName.$dirty
                        ? !v$.seller.firstLastName.$error
                        : null
                    "
                    @blur="v$.seller.firstLastName.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.seller.firstLastName.$errors"
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
                    v-model="v$.seller.secondLastName.$model"
                    placeholder="Delgado"
                    :state="
                      v$.seller.secondLastName.$dirty
                        ? !v$.seller.secondLastName.$error
                        : null
                    "
                    @blur="v$.seller.secondLastName.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.seller.secondLastName.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="steps[currentStep - 1] === 'Dirección'">
              <b-col cols="12" md="6">
                <b-form-group label="Ciudad">
                  <b-form-input
                    type="text"
                    placeholder="Emiliano Zapata"
                    v-model="v$.seller.address.city.$model"
                    :state="
                      v$.seller.address.city.$dirty
                        ? !v$.seller.address.city.$error
                        : null
                    "
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
                <b-form-group label="País:">
                  <b-form-input
                    type="number"
                    placeholder="67982"
                    v-model="v$.seller.address.country.$model"
                    :state="
                      v$.seller.address.country.$dirty
                        ? !v$.seller.address.country.$error
                        : null
                    "
                    @blur="v$.seller.address.country.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.seller.address.country.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6">
                <b-form-group label="Estado">
                  <b-form-input
                    type="text"
                    placeholder="Morelos"
                    v-model="v$.seller.address.state.$model"
                    :state="
                      v$.seller.address.state.$dirty
                        ? !v$.seller.address.state.$error
                        : null
                    "
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
                <b-form-group label="Calle">
                  <b-form-input
                    type="text"
                    placeholder="Dos rosas"
                    v-model="v$.seller.address.street.$model"
                    :state="
                      v$.seller.address.street.$dirty
                        ? !v$.seller.address.street.$error
                        : null
                    "
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
                <b-form-group label="Colonia">
                  <b-form-input
                    type="text"
                    placeholder="Palo escrito"
                    v-model="v$.seller.address.colony.$model"
                    :state="
                      v$.seller.address.colony.$dirty
                        ? !v$.seller.address.colony.$error
                        : null
                    "
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
                <b-form-group label="Localidad">
                  <b-form-input
                    type="text"
                    placeholder="3 de Mayo"
                    v-model="v$.seller.address.locality.$model"
                    :state="
                      v$.seller.address.locality.$dirty
                        ? !v$.seller.address.locality.$error
                        : null
                    "
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
              <b-col cols="12" md="3">
                <b-form-group label="N.Exterior">
                  <b-form-input
                    type="number"
                    placeholder="3"
                    v-model="v$.seller.address.externalNumber.$model"
                    :state="
                      v$.seller.address.externalNumber.$dirty
                        ? !v$.seller.address.externalNumber.$error
                        : null
                    "
                    @blur="v$.seller.address.externalNumber.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.seller.address.externalNumber.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group label="N.Interior">
                  <b-form-input
                    type="number"
                    placeholder="2"
                    v-model="v$.seller.address.internalNumber.$model"
                    :state="
                      v$.seller.address.internalNumber.$dirty
                        ? !v$.seller.address.internalNumber.$error
                        : null
                    "
                    @blur="v$.seller.address.internalNumber.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.seller.address.city.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group label="Código Postal:">
                  <b-form-input
                    type="number"
                    placeholder="67982"
                    v-model="v$.seller.address.zipCode.$model"
                    :state="
                      v$.seller.address.zipCode.$dirty
                        ? !v$.seller.address.zipCode.$error
                        : null
                    "
                    @blur="v$.seller.address.zipCode.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.seller.address.zipCode.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group label="Tipo de Residencia">
                  <b-form-input
                    type="text"
                    placeholder="Local propio/Negocio"
                    v-model="v$.seller.address.addressType.$model"
                    :state="
                      v$.seller.address.addressType.$dirty
                        ? !v$.seller.address.addressType.$error
                        : null
                    "
                    @blur="v$.seller.address.addressType.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.seller.address.addressType.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="12">
                <b-form-group label="Referencia">
                  <b-form-textarea
                    id="textarea"
                    placeholder="Local pintado de rojo ,etc..."
                    v-model="v$.seller.address.referenceNear.$model"
                    :state="
                      v$.seller.address.referenceNear.$dirty
                        ? !v$.seller.address.referenceNear.$error
                        : null
                    "
                    @blur="v$.seller.address.referenceNear.$touch()"
                  ></b-form-textarea>
                  <b-form-invalid-feedback
                    v-for="error in v$.seller.address.referenceNear.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="steps[currentStep - 1] === 'Descripción del negocio'">
              <b-col cols="12" md="12">
                <b-alert show variant="warning" class="text-center">
                  <b>ALERTA:</b> Por favor, ingresa únicamente el correo
                  asociado a PayPal, ya que será donde recibirás el dinero de
                  las cuentas.
                </b-alert>
              </b-col>
              <b-col cols="12" md="12">
                <b-form-group label="Correo Paypal:" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    type="text"
                    placeholder="paypal@correo.com"
                    v-model="v$.seller.wallet.$model"
                    :state="
                      v$.seller.wallet.$dirty ? !v$.seller.wallet.$error : null
                    "
                    @blur="v$.seller.wallet.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.seller.wallet.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="12">
                <b-form-group
                  label="Nombre de Marca/Empresa:"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    type="text"
                    placeholder="Tacos el inge"
                    v-model="v$.seller.bussinessName.$model"
                    :state="
                      v$.seller.bussinessName.$dirty
                        ? !v$.seller.bussinessName.$error
                        : null
                    "
                    @blur="v$.seller.bussinessName.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.seller.bussinessName.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="12">
                <b-form-group label="Descripción">
                  <b-form-textarea
                    id="textarea"
                    placeholder="Ingresa brevemente alguna descripción de tu emprendimiento..."
                    rows="3"
                    max-rows="6"
                    v-model="v$.seller.description.$model"
                    :state="
                      v$.seller.description.$dirty
                        ? !v$.seller.description.$error
                        : null
                    "
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
  mixins: [CreateAccountSellerViewModel],
};
</script>

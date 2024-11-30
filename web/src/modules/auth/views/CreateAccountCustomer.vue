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
            <h2 class="text-center my-3">{{ steps[currentStep - 1] === 'Dirección' && goTocreate ? "":steps[currentStep - 1] }}</h2>
          <b-row class="d-flex align-items-center justify-content-center">
            <b-row v-if="steps[currentStep - 1] === 'Datos personales'">
              <b-col cols="12" md="4">
                <b-form-group >
                  <label>
                    Correo electrónico: <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="email"
                    placeholder="maria@gmail.com"
                    v-model="v$.customer.email.$model"
                    :state="
                      v$.customer.email.$dirty ? !v$.customer.email.$error : null
                    "
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
                <b-form-group >
                  <label>
                    Contraseña: <span style="color: red">*</span>
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
                      v-model="v$.customer.password.$model"
                      :state="
                        v$.customer.password.$dirty
                          ? !v$.customer.password.$error
                          : null
                      "
                      @blur="v$.customer.password.$touch()"
                    ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.customer.password.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                  </b-input-group>
                  
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group >
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
                      v-model="v$.customer.confirmPassword.$model"
                      :state="
                        v$.customer.confirmPassword.$dirty
                          ? !v$.customer.confirmPassword.$error
                          : null
                      "
                      @blur="v$.customer.confirmPassword.$touch()"
                    ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.customer.confirmPassword.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group >
                  <label>
                    Nombre(s): <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="text"
                    placeholder="Maria"
                    v-model="v$.customer.name.$model"
                    :state="
                      v$.customer.name.$dirty ? !v$.customer.name.$error : null
                    "
                    @blur="v$.customer.name.$touch()"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.customer.name.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <b-form-group >
                  <label>
                    Apellido Paterno: <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="text"
                    placeholder="Lopez"
                    v-model="v$.customer.firstLastName.$model"
                    :state="
                      v$.customer.firstLastName.$dirty
                        ? !v$.customer.firstLastName.$error
                        : null
                    "
                    @blur="v$.customer.firstLastName.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.customer.firstLastName.$errors"
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
                    v-model="v$.customer.secondLastName.$model"
                    placeholder="Delgado"
                    :state="
                      v$.customer.secondLastName.$dirty
                        ? !v$.customer.secondLastName.$error
                        : null
                    "
                    
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.customer.secondLastName.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="steps[currentStep - 1] === 'Dirección'">
              <section v-show="!addAdress && !goTocreate"  class="text-center">
                  <img src="../../../assets/location.svg" >
                  <h5>¿Deseas agregar tu dirección?</h5>
                  <b-button variant="orange-primary" @click="addAdress=!addAdress" >Agregar Dirección</b-button>
                  <br>
                  <span>
                    <a href="#" @click="goTocreate = !goTocreate" >
                    Omitir
                    </a>
                  </span>
              </section>
              <Transition  name="bounce">
              <section v-if="goTocreate"  class="text-center">
                  <img src="../../../assets/buyOrder.svg" >
                  <h5>¿Estas list@ para formar parte?</h5>
                  <b-button variant="red-palete" @click="submitAccountForm" >Crear cuenta</b-button>
              </section>
              <section v-if="addAdress" class="mx-2">
                <b-row>
              <b-col cols="12" md="6">
                <b-form-group>
                <label>
                    Ciudad: <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="text"
                    placeholder="Emiliano Zapata"
                    v-model="v$.customer.address.city.$model"
                    :state="
                      v$.customer.address.city.$dirty
                        ? !v$.customer.address.city.$error
                        : null
                    "
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
                <b-form-group>
                <label>
                    País: <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="text"
                    placeholder="México"
                    v-model="v$.customer.address.country.$model"
                    :state="
                      v$.customer.address.country.$dirty
                        ? !v$.customer.address.country.$error
                        : null
                    "
                    @blur="v$.customer.address.country.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.customer.address.country.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group>
                <label>
                    Estado: <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="text"
                    placeholder="Morelos"
                    v-model="v$.customer.address.state.$model"
                    :state="
                      v$.customer.address.state.$dirty
                        ? !v$.customer.address.state.$error
                        : null
                    "
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
                <b-form-group>
                <label>
                    Calle <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="text"
                    placeholder="Dos rosas"
                    v-model="v$.customer.address.street.$model"
                    :state="
                      v$.customer.address.street.$dirty
                        ? !v$.customer.address.street.$error
                        : null
                    "
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
                <b-form-group>
                <label>
                    Colonia <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="text"
                    placeholder="Palo escrito"
                    v-model="v$.customer.address.colony.$model"
                    :state="
                      v$.customer.address.colony.$dirty
                        ? !v$.customer.address.colony.$error
                        : null
                    "
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
                <b-form-group>
                <label>
                    Localidad <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="text"
                    placeholder="3 de Mayo"
                    v-model="v$.customer.address.locality.$model"
                    :state="
                      v$.customer.address.locality.$dirty
                        ? !v$.customer.address.locality.$error
                        : null
                    "
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
              <b-col cols="12" md="3">
                <b-form-group>
                <label>
                  N.Exterior <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="number"
                    placeholder="3"
                    v-model="v$.customer.address.externalNumber.$model"
                    :state="
                      v$.customer.address.externalNumber.$dirty
                        ? !v$.customer.address.externalNumber.$error
                        : null
                    "
                    @blur="v$.customer.address.externalNumber.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.customer.address.externalNumber.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group>
                <label>
                    N.Interior <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="number"
                    placeholder="2"
                    v-model="v$.customer.address.internalNumber.$model"
                    :state="
                      v$.customer.address.internalNumber.$dirty
                        ? !v$.customer.address.internalNumber.$error
                        : null
                    "
                    @blur="v$.customer.address.internalNumber.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.customer.address.city.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group>
                <label>
                    Código Postal: <span style="color: red">*</span>
                  </label>
                  <b-form-input
                    type="number"
                    placeholder="67982"
                    v-model="v$.customer.address.zipCode.$model"
                    :state="
                      v$.customer.address.zipCode.$dirty
                        ? !v$.customer.address.zipCode.$error
                        : null
                    "
                    @blur="v$.customer.address.zipCode.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.customer.address.zipCode.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group>
                <label>
                    Tipo de Residencia <span style="color: red">*</span>
                  </label>
                  <b-form-select
                    :options="options"
                    v-model="v$.customer.address.addressType.$model"
                    :state="
                      v$.customer.address.addressType.$dirty
                        ? !v$.customer.address.addressType.$error
                        : null
                    "
                    @blur="v$.customer.address.addressType.$touch()"
                  ></b-form-select>
                  <b-form-invalid-feedback
                    v-for="error in v$.customer.address.addressType.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="12">
                <b-form-group>
                  <label>
                    Referencia <span style="color: red">*</span>
                  </label>
                  <b-form-textarea
                    id="textarea"
                    placeholder="Local pintado de rojo ,etc..."
                    v-model="v$.customer.address.referenceNear.$model"
                    :state="
                      v$.customer.address.referenceNear.$dirty
                        ? !v$.customer.address.referenceNear.$error
                        : null
                    "
                    @blur="v$.customer.address.referenceNear.$touch()"
                  ></b-form-textarea>
                  <b-form-invalid-feedback
                    v-for="error in v$.customer.address.referenceNear.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
                  </b-row>  
              </section>
              </Transition>
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
              <b-button v-else v-show="addAdress" variant="red-palete" @click="submitAccountForm">
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

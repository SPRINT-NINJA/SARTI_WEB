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
        <h5>Información tienda</h5>
        <b-row>
          <b-col>
            <b-form-group>
              <label>
                Correo asociado Paypal <span style="color: red">*</span>
              </label>
              <b-form-input
                type="text"
                v-model="v$.editedProfile.wallet.$model"
                :state="
                  v$.editedProfile.wallet.$dirty
                    ? !v$.editedProfile.wallet.$error
                    : null
                "
                @blur="v$.editedProfile.wallet.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.wallet.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <label> Nombre Tienda <span style="color: red">*</span> </label>
              <b-form-input
                type="text"
                v-model="v$.editedProfile.bussinessName.$model"
                :state="
                  v$.editedProfile.bussinessName.$dirty
                    ? !v$.editedProfile.bussinessName.$error
                    : null
                "
                @blur="v$.editedProfile.bussinessName.$touch()"
                max="45"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.bussinessName.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <label>
                Descripción de la tienda <span style="color: red">*</span>
              </label>
              <b-form-textarea
                type="text"
                v-model="v$.editedProfile.description.$model"
                :state="
                  v$.editedProfile.description.$dirty
                    ? !v$.editedProfile.description.$error
                    : null
                "
                @blur="v$.editedProfile.description.$touch()"
                max="255"
              >
              </b-form-textarea>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.description.$errors"
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
        <h5>Dirección</h5>
        <b-row>
          <b-col cols="12" md="4">
            <b-form-group>
              <label> Ciudad <span style="color: red">*</span> </label>
              <b-form-input
                type="text"
                v-model="v$.editedProfile.address.city.$model"
                :state="
                  v$.editedProfile.address.city.$dirty
                    ? !v$.editedProfile.address.city.$error
                    : null
                "
                @blur="v$.editedProfile.address.city.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.address.city.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group>
              <label> Colonia <span style="color: red">*</span> </label>
              <b-form-input
                type="text"
                v-model="v$.editedProfile.address.colony.$model"
                :state="
                  v$.editedProfile.address.colony.$dirty
                    ? !v$.editedProfile.address.colony.$error
                    : null
                "
                @blur="v$.editedProfile.address.colony.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.address.colony.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group>
              <label> Calle <span style="color: red">*</span> </label>
              <b-form-input
                type="text"
                v-model="v$.editedProfile.address.street.$model"
                :state="
                  v$.editedProfile.address.street.$dirty
                    ? !v$.editedProfile.address.street.$error
                    : null
                "
                @blur="v$.editedProfile.address.street.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.address.street.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group>
              <label> Estado <span style="color: red">*</span> </label>
              <b-form-input
                type="text"
                v-model="v$.editedProfile.address.state.$model"
                :state="
                  v$.editedProfile.address.state.$dirty
                    ? !v$.editedProfile.address.state.$error
                    : null
                "
                @blur="v$.editedProfile.address.state.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.address.state.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group>
              <label> Ciudad <span style="color: red">*</span> </label>
              <b-form-input
                type="text"
                v-model="v$.editedProfile.address.country.$model"
                :state="
                  v$.editedProfile.address.country.$dirty
                    ? !v$.editedProfile.address.country.$error
                    : null
                "
                @blur="v$.editedProfile.address.country.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.address.country.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group>
              <label> Localidad <span style="color: red">*</span> </label>
              <b-form-input
                type="text"
                v-model="v$.editedProfile.address.locality.$model"
                :state="
                  v$.editedProfile.address.locality.$dirty
                    ? !v$.editedProfile.address.locality.$error
                    : null
                "
                @blur="v$.editedProfile.address.locality.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.address.locality.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="4">
            <b-form-group>
              <label> N.Exterior <span style="color: red">*</span> </label>
              <b-form-input
                type="number"
                v-model="v$.editedProfile.address.externalNumber.$model"
                :state="
                  v$.editedProfile.address.externalNumber.$dirty
                    ? !v$.editedProfile.address.externalNumber.$error
                    : null
                "
                @blur="v$.editedProfile.address.externalNumber.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.address.externalNumber.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group>
              <label> N.Interior </label>
              <b-form-input
                type="text"
                v-model="v$.editedProfile.address.internalNumber.$model"
                :state="
                  v$.editedProfile.address.internalNumber.$dirty
                    ? !v$.editedProfile.address.internalNumber.$error
                    : null
                "
                @blur="v$.editedProfile.address.internalNumber.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.address.internalNumber.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group>
              <label> Código postal <span style="color: red">*</span> </label>
              <b-form-input
                type="text"
                v-model="v$.editedProfile.address.zipCode.$model"
                :state="
                  v$.editedProfile.address.zipCode.$dirty
                    ? !v$.editedProfile.address.zipCode.$error
                    : null
                "
                @blur="v$.editedProfile.address.zipCode.$touch()"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.address.zipCode.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group>
              <label>
                Tipo de Residencia <span style="color: red">*</span>
              </label>
              <b-form-select
                :options="options"
                v-model="v$.editedProfile.address.addressType.$model"
                :state="
                  v$.editedProfile.address.addressType.$dirty
                    ? !v$.editedProfile.address.addressType.$error
                    : null
                "
                @blur="v$.editedProfile.address.addressType.$touch()"
              ></b-form-select>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.address.addressType.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group>
              <label> Referencia <span style="color: red">*</span> </label>
              <b-form-textarea
                type="text"
                v-model="v$.editedProfile.address.referenceNear.$model"
                :state="
                  v$.editedProfile.address.referenceNear.$dirty
                    ? !v$.editedProfile.address.referenceNear.$error
                    : null
                "
              >
              </b-form-textarea>
              <b-form-invalid-feedback
                v-for="error in v$.editedProfile.address.referenceNear.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
      <div class="d-flex justify-content-end align-items-center mx-2 my-2">
        <b-button
          variant="red-palete"
          :disabled="!isStepValid"
          @click="updateProfile"
        >
          Editar información
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import EditSellerViewModel from "../viewmodels/EditSellerViewModel";

export default {
  name: "EditSellerAccount",
  components: {
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
  },
  mixins: [EditSellerViewModel],
};
</script>

<style scoped>
hr {
  background-color: var(--orange-primary);
  height: 0.3px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in versions below Vue 2.1.8 */ {
  opacity: 0;
}
</style>

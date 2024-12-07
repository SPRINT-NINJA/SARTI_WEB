<template>
  <div>
    <navbar />
    <b-container fluid class="vh-100">
      <b-row no-gutters class="w-100 mt-5">
        <!-- Sección Izquierda -->
        <b-col
          cols="12"
          md="4"
          class="d-flex flex-column align-items-center section-left p-4"
        >
          <section v-if="!isVerifiedAccount">
            <h1 class="text-center mb-4">
              Ingresa tu correo electrónico para recuperar tu contraseña
            </h1>
          </section>
          <section v-else>
            <h1 class="text-center mb-4">
              Ingresa tu código de seguridad y nueva contraseña
            </h1>
          </section>
        </b-col>

        <!-- Sección Derecha -->
        <b-col
          cols="12"
          md="8"
          class="d-flex flex-column align-items-center section-right p-4"
        >
          <b-card class="w-100 h-100 shadow">
            <b-form>
              <div class="p-5">
                <section v-if="!isVerifiedAccount">
                  <b-form-group
                    id="input-group-1"
                    label="Correo electrónico:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      type="email"
                      v-model="v$.verifiedEmail.email.$model"
                      placeholder="example@gmail.com"
                      required
                      :state="
                        v$.verifiedEmail.email.$dirty
                          ? !v$.verifiedEmail.email.$error
                          : null
                      "
                      @blur="v$.verifiedEmail.email.$touch()"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.verifiedEmail.email.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-button block variant="orange-primary" @click="sendCode"
                    >Verificar correo</b-button
                  >
                </section>
                <section v-else>
                  <b-form-group
                    id="input-group-1"
                    label="Código de seguridad:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      type="text"
                      maxLength="5"
                      placeholder="*****"
                      required
                      v-model="v$.recoveryPasswordPayload.code.$model"
                      :state="
                        v$.recoveryPasswordPayload.code.$dirty
                          ? !v$.recoveryPasswordPayload.code.$error
                          : null
                      "
                      @blur="v$.recoveryPasswordPayload.code.$touch()"
                      @keydown="enterOnlyNumbers"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.recoveryPasswordPayload.code.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group
                    id="input-group-1"
                    label="Nueva contraseña:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      type="text"
                      placeholder="********"
                      required
                      v-model="v$.recoveryPasswordPayload.password.$model"
                      :state="
                        v$.recoveryPasswordPayload.password.$dirty
                          ? !v$.recoveryPasswordPayload.password.$error
                          : null
                      "
                      @blur="v$.recoveryPasswordPayload.password.$touch()"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.recoveryPasswordPayload.password.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-button block variant="orange-primary" @click="recoveryPassword"
                    >Cambiar contraseña</b-button
                  >
                </section>
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script lang="ts">
import RecoveryPasswordViewModel from "@/modules/auth/viewmodels/RecoveryPasswordViewModel";
export default {
  name: "RecoveryPassword",
  components: {
    Navbar: () => import("@/modules/public/components/Navbar.vue"),
  },
  mixins: [RecoveryPasswordViewModel],
};
</script>
<style scoped></style>

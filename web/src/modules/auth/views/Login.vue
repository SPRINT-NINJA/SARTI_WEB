<template>
  <div>
    <custom-overlay :isLoading="isLoading" />
    <navbar />
    <b-container fluid class="vh-100">
      <b-row class="mt-5 g-0">
        <!-- Sección Izquierda -->
        <b-col
          cols="12"
          md="4"
          class="d-flex flex-column align-items-center section-left p-3 p-md-4"
        >
          <section v-if="!isVerifiedAccount">
            <h1 class="text-center mb-4">
              Ingresa tu correo electrónico para iniciar sesión
            </h1>
          </section>
          <section v-else>
            <h1 class="text-center mb-4">Ingresa tu contraseña de SARTI</h1>
            <div class="d-flex justify-content-center">
              <b-list-group class="w-100" style="max-width: 300px">
                <b-list-group-item
                  class="d-flex align-items-center justify-content-start"
                >
                  <b-avatar class="me-3" size="60px"></b-avatar>
                  <span class="text-white">
                    <b style="color: black">{{
                      userData.customer
                        ? userData.customer.name
                        : userData.deliveryMan
                        ? userData.deliveryMan.name
                        : userData.seller
                        ? userData.seller.name
                        : ""
                    }}</b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </div>
          </section>
        </b-col>

        <!-- Sección Derecha -->
        <b-col
          cols="12"
          md="8"
          class="d-flex flex-column align-items-center section-right p-3 p-md-4"
        >
          <b-card class="w-100 h-100 shadow">
            <b-form @submit.prevent>
              <div class="p-3 p-md-5">
                <section v-if="!isVerifiedAccount">
                  <b-form-group
                    id="input-group-1"
                    label="Correo electrónico:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      type="email"
                      v-model="email"
                      placeholder="example@gmail.com"
                      required
                      :state="v$.email.$dirty ? !v$.email.$error : null"
                      @blur="v$.email.$touch()"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.email.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-button
                    block
                    variant="orange-primary"
                    @click="verifyEmail"
                    :disabled="v$.email.$invalid"
                    >Continuar
                    <b-icon icon="arrow-right" aria-hidden="true"></b-icon
                  ></b-button>
                  <br />
                  <div class="text-center mb-4">
                    <a
                      to="create-account"
                      href="create-account"
                      style="color: black"
                      >Crear cuenta</a
                    >
                  </div>
                </section>
                <section v-else>
                  <b-form-group
                    id="input-group-1"
                    label="Contraseña:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      type="password"
                      placeholder="********"
                      required
                      v-model="v$.password.$model"
                      :state="v$.password.$dirty ? !v$.password.$error : null"
                      @blur="v$.password.$touch()"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.password.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-button
                    block
                    variant="orange-primary"
                    @click="sigin"
                    :disabled="!v$.password.$dirty || v$.password.$invalid"
                    >Iniciar Sesión
                    <b-icon icon="arrow-right" aria-hidden="true"></b-icon
                  ></b-button>
                  <br />
                  <div class="text-center mb-4">
                    <a
                      to="login"
                      href="./recovery-pass"
                      style="color: black"
                      >¿Olvidaste tu contraseña?</a
                    >
                  </div>
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
import Vue, { defineAsyncComponent } from "vue";
import LoginViewModel from "../viewmodels/LoginViewModel";
import CustomOverlay from "@/modules/public/components/CustomOverlay.vue";
export default {
  name: "Login",
  components: {
    Navbar: () => import("@/modules/public/components/Navbar.vue"),
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
  },
  mixins: [LoginViewModel],
};
</script>
<style scoped></style>

<template>
    <div>
        <navbar />
        <b-container fluid class="vh-100">
            <b-row no-gutters class="w-100 mt-5">
                <!-- Sección Izquierda -->
                <b-col cols="12" md="4" class="d-flex flex-column align-items-center section-left p-4">
                    <section v-if="!isVerifiedAccount">
                        <h1 class="text-center mb-4">
                            Ingresa tu correo electrónico para iniciar sesión
                        </h1>
                    </section>
                    <section v-else>
                        <h1 class="text-center mb-4">
                            Ingresa tu contraseña de SARTI
                        </h1>
                    </section>
                </b-col>

                <!-- Sección Derecha -->
                <b-col cols="12" md="8" class="d-flex flex-column align-items-center section-right p-4">
                    <b-card class="w-100 h-100 shadow">
                        <b-form>
                            <div class="p-5">
                                <section v-if="!isVerifiedAccount">
                                    <b-form-group id="input-group-1" label="Correo electrónico:" label-for="input-1">
                                        <b-form-input id="input-1" type="email" v-model="v$.email.$model"
                                            placeholder="example@gmail.com" required
                                            :state="v$.email.$dirty ? !v$.email.$error : null"
                                            @blur="v$.email.$touch()"></b-form-input>
                                        <b-form-invalid-feedback v-for="error in v$.email.$errors" :key="error.$uid">
                                            {{ error.$message }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-button block variant="orange-primary" @click="verifyEmail" :disabled="!v$.email.$dirty || v$.email.$invalid">Continuar <b-icon icon="arrow-right" aria-hidden="true"></b-icon></b-button>
                                        <br>
                                        <div class="text-center mb-4">
                                            <a block to="create-account" href="" style="color:black;">Crear cuenta</a>
                                        </div>
                                </section>
                                <section v-else>
                                    <b-form-group id="input-group-1" label="Contraseña:" label-for="input-1">
                                        <b-form-input id="input-1" type="email" placeholder="********" required
                                            v-model="v$.recoveryPassword.password.$model" :state="v$.recoveryPassword.password.$dirty
                                                    ? !v$.recoveryPassword.password.$error
                                                    : null
                                                " @blur="v$.recoveryPassword.password.$touch()"></b-form-input>
                                        <b-form-invalid-feedback v-for="error in v$.recoveryPassword.password.$errors"
                                            :key="error.$uid">
                                            {{ error.$message }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-button block variant="orange-primary" @click="verifyEmail" :disabled="!v$.recoveryPassword.password.$dirty || v$.recoveryPassword.password.$invalid">Iniciar Sesión <b-icon icon="arrow-right" aria-hidden="true"></b-icon></b-button>
                                    <br>
                                    <div class="text-center mb-4">
                                        <a block to="login" href="" style="color:black;">¿Olvidaste tu contraseña?</a>
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
export default {
    name: "Login",
    components: {
        Navbar: () => import("@/modules/public/components/Navbar.vue"),
    },
    mixins: [LoginViewModel],
};
</script>
<style scoped></style>
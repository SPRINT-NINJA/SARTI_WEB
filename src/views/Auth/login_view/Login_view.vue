<template>
    <div class="container-fluid">
        <b-row class="login-message justify-content-center">
            <b-col cols="12" md="1"></b-col>

            <b-col cols="12" md="3" class="text-center mb-3">
                <h1>Ingresa tu correo electrónico para iniciar sesión</h1>
            </b-col>

            <b-col cols="12" md="6">
                <b-card class="card-login-email">
                    <div class="card-login-email-div">
                        <b-form>
                            <b-form-group id="input-group-1" label="Correo electrónico:" label-for="input-1">
                                <b-form-input v-model="userData.email" id="input-1" type="email"
                                    placeholder="Example@email.com" required class="w-100"
                                    style="background-color: #F2F4F8;" />
                                <div class="text-center mt-4 mb-4">
                                    <b-button class="button-continue w-100" @click="login()" id="orange-primary">
                                        <b>Continuar
                                            <b-icon icon="arrow-right" aria-hidden="true"></b-icon>
                                        </b>
                                    </b-button>
                                </div>
                                <div class="text-center">
                                    <b>
                                        <a style="color:black;" @click="createAccount()" href="#">
                                            Crear cuenta
                                        </a>
                                    </b>
                                </div>
                            </b-form-group>
                        </b-form>
                    </div>
                </b-card>
            </b-col>

            <b-col cols="12" md="1"></b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
export default {
    name: 'LoginView',
    data() {
        return {
            userData: {
                email: '',
            },
        };
    },
    methods: {
        login() {
            console.log(this.userData.email);
            this.$router.push({ name: 'login-password' });
        },
        createAccount() {
            this.$router.push({ name: 'create-account' });
        },
    },
};
</script>

<style scoped>
.login-message {
    margin-top: 100px;
}

.card-login-email {
    min-height: 300px;
}

.card-login-email-div {
    margin: 25px;
}

.button-continue {
    width: 100%;
}
</style>

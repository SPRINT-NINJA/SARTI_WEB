<template>
    <div>
        <!-- Navbar -->
        <div>
            <b-navbar toggleable="lg" type="dark" style="background-color: #F6A249;">
                <b-navbar-brand to="/">
                    <img src="./../../assets/logo/ICON-SARTI.png" alt="SARTI">
                </b-navbar-brand>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-button variant="hide" class="mb-2">
                            <b-icon variant="white" icon="cart3" font-scale="2"></b-icon>
                        </b-button>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>

        <!-- Main content -->
        <b-row class="login-message">
            <b-col cols="1">

            </b-col>
            <b-col cols="3">
                <h1>
                    Ingresa tu correo eléctronico para iniciar sesión
                </h1>
            </b-col>
            <b-col cosl="1">

            </b-col>

            <b-col cols="6">
                <div>
                    <b-card class="card-login-email">
                        <div class="card-login-email-div">
                            <b-form>
                                <b-form-group id="input-group-1" label="Correo electrónico:" label-for="input-1">
                                    <b-form-input 
                                        v-model="userData.email"
                                        id="input-1" 
                                        type="email"
                                        placeholder="Example@email.com" 
                                        required
                                        style="width: 100%; background-color: #F2F4F8;">
                                    </b-form-input>

                                    <div class="text-center" style="margin-top: 25px; margin-bottom: 25px;">
                                        <b-button class="button-continue mb-2" @click="login()" style="background-color: #F6A249;" >
                                            <b>Continuar <b-icon icon="arrow-right" aria-hidden="true"></b-icon></b>
                                        </b-button>
                                    </div>

                                    <div class="text-center">
                                        <b><a style="color:black;" @click="createAccount()" href="">Crear cuenta</a></b>
                                    </div>
                                </b-form-group>
                            </b-form>
                        </div>
                    </b-card>
                </div>
            </b-col>

            <b-col cosl="1">

            </b-col>
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
            }
        }
    },
    
    methods: {
        login() {
            console.log(this.userData.email);

            this.$router.push({ name: 'login-password' });
        },
        createAccount() {
            this.$router.push({ name: 'create-account' });
        }
    }
}
</script>

<style>
img {
    width: 40px;
    height: 50px;
}

.login-message {
    margin-top: 100px;
}

.card-login-email{
    min-height: 300px;
}

.card-login-email-div{
    margin-top: 25px;
    margin-left: 25px;
    margin-right: 25px;
    margin-bottom: 25px;
}

.button-continue{
    width: 100%;
}
</style>
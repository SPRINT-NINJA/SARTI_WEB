<template>
    <div>


        <!-- Main content -->
        <b-row class="login-message">
            <b-col cols="1">

            </b-col>
            <b-col cols="3">
                <h1>
                    Ingresa tu contraseña de SARTI
                </h1>

                <div style="margin-top: 25px;">
                    <b-list-group style="max-width: 300px;">
                        <b-list-group-item class="d-flex align-items-center" style="background-color: #F6A249;">
                            <b-avatar class="mr-3" :src="usuario.avatar"></b-avatar>
                            <span class="mr-auto" style="color: white; "><b>{{ usuario.name }}</b></span>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>
            <b-col cosl="1">

            </b-col>

            <b-col cols="6">
                <div>
                    <b-card class="card-login-email">
                        <div class="card-login-email-div">
                            <b-form>
                                <b-form-group id="input-group-1" label="Contraseña:" label-for="input-1">
                                    <b-form-input 
                                        id="password" 
                                        type="text"
                                        placeholder="********" 
                                        required
                                        style="width: 100%; background-color: #F2F4F8;">
                                    </b-form-input>

                                    <div class="text-center" style="margin-top: 25px; margin-bottom: 25px;">
                                        <b-button style="background-color: #F6A249; width: 100%;" class="mb-2">
                                            <b>Iniciar sesión <b-icon icon="arrow-right" aria-hidden="true"></b-icon></b>
                                        </b-button>
                                    </div>

                                    <div class="text-center">
                                        <b><a style="color:black;" href="">¿Olvidaste tu contraseña?</a></b>
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
import Vue from 'vue';

export default {
    name: 'LoginViewPassword',
    setup() {
        return {
            usuario: {
                name: 'Alan Matthew Esteban',
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/024/859/554/small/cat-portrait-isolated-illustration-ai-generative-png.png'
            }
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
</style>
<template>
    <div class="container-fluid">
        <b-row class="login-message justify-content-center">
            <b-col cols="12" md="1"></b-col>

            <b-col cols="12" md="3" class="text-center mb-3">
                <h1>Ingresa tu contraseña de SARTI</h1>
                <div class="d-flex justify-content-center">
                    <b-list-group class="w-100" style="max-width: 300px;">
                        <b-list-group-item class="d-flex align-items-center flex-wrap justify-content-center"
                            bg-variant="orange-primary">
                            <b-avatar class="mr-3 mb-2 mb-md-0" :src="usuario.avatar" size="60px"></b-avatar>
                            <span class="text-white text-center">
                                <b>{{ usuario.name }}</b>
                            </span>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>

            <b-col cols="12" md="6">
                <b-card class="card-login-email">
                    <div class="card-login-email-div">
                        <b-form>
                            <b-form-group id="input-group-1" label="Contraseña:" label-for="input-1">
                                <b-form-input id="password" type="password" placeholder="********" required
                                    class="w-100" style="background-color: #F2F4F8;" />
                                <div class="text-center mt-4 mb-4">
                                    <b-button class="w-100 mb-2" bg-variant="orange-primary">
                                        <b>Iniciar sesión
                                            <b-icon icon="arrow-right" aria-hidden="true"></b-icon>
                                        </b>
                                    </b-button>
                                </div>

                                <div class="text-center">
                                    <b>
                                        <a href="#" style="color: black;">¿Olvidaste tu contraseña?</a>
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
    name: 'LoginViewPassword',
    setup() {
        return {
            usuario: {
                name: 'Alan Matthew Esteban',
                avatar:
                    'https://static.vecteezy.com/system/resources/thumbnails/024/859/554/small/cat-portrait-isolated-illustration-ai-generative-png.png',
            },
        };
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


b-avatar {
    border: 2px solid white;
    border-radius: 50%;
}
</style>

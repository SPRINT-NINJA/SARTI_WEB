<template>
    <div>
        <navbar />
        <!-- Main content -->
        <b-row class="login-message justify-content-center">
            <b-col cols="12" md="1">

            </b-col>
            <b-col cols="12" md="3" class="text-center mb-3">
                <h1>
                    ¡Crea tu cuenta y forma parte de algo grande!
                </h1>
                <br>
                <h5>
                    Selecciona el rol con el que quieres unirte
                </h5>
            </b-col>
            <b-col cols="12" md="1">

            </b-col>

            <b-col cols="12" md="6">
                <div>
                    <b-card class="card-login-email">
                        <div class="card-login-email-div">
                            <div class="text-center" style="margin-top: 25px; margin-bottom: 25px;">
                                <b-button class="button-continue mb-2" variant="orange-primary">
                                    <b>Repartidor <b-icon icon="bicycle" aria-hidden="true"></b-icon></b>
                                </b-button>
                            </div>

                            <div class="text-center" style="margin-top: 25px; margin-bottom: 25px;">
                                <b-button class="button-continue mb-2" variant="orange-primary">
                                    <b>Emprendedor <b-icon icon="building" aria-hidden="true"></b-icon></b>
                                </b-button>
                            </div>

                            <div class="text-center" style="margin-top: 25px; margin-bottom: 25px;">
                                <b-button class="button-continue mb-2" variant="orange-primary">
                                    <b>Comprador <b-icon icon="person-fill" aria-hidden="true"></b-icon></b>
                                </b-button>
                            </div>
                        </div>
                    </b-card>
                </div>
            </b-col>

            <b-col cols="12" md="1">

            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts">

export default {
    name: 'CraeteAccount',
    components: {
        Navbar: () => import("@/modules/public/components/Navbar.vue"),
    },

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

.card-login-email {
    min-height: 300px;
}

.card-login-email-div {
    margin-top: 25px;
    margin-left: 25px;
    margin-right: 25px;
    margin-bottom: 25px;
}

.button-continue {
    width: 100%;
}
</style>
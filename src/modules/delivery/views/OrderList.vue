<template>
    <div>
        <navbar />
        <div class="container-fluid card-container">
            <b-row class="justify-content-center mt-4">
                <b-col cols="12" md="6" lg="6" class="mb-4" v-for="(order, index) in orders" :key="index">
                    <b-card class="h-100">
                        <b-row class="flex-column flex-md-row no-gutters">
                            <b-col cols="12" md="4" class="p-0">
                                <b-img
                                    :src="order.image"
                                    class="object-cover img-size"
                                    fluid
                                    alt="Imagen del producto"
                                ></b-img>
                            </b-col>

                            <b-col cols="12" md="8" class="p-3">
                                <h5 class="mb-2">{{ order.name }}</h5>
                                <p><b>Precio:</b> ${{ order.price }}</p>
                                <p><b>Descripción:</b> {{ order.description }}</p>
                                <p><b>Usuario:</b> {{ order.userInfo.name }}</p>
                                <p><b>Dirección:</b> {{ order.userInfo.address }}</p>
                                
                                <!-- Botones de acciones -->
                                <div class="button-group mt-3">
                                    <b-button variant="faded" class="mr-2 p-1">
                                        <b-icon icon="eye"></b-icon>
                                    </b-button>
                                    <b-button variant="success" class="mr-2">Aceptar Pedido</b-button>
                                    <b-button variant="danger">Rechazar Pedido</b-button>
                                </div>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { defineAsyncComponent } from "vue";
import OrderListViewModel from "../viewmodels/OrderListViewModel";
export default {
    name: "DeliveryOrderList",
    components: {
        Navbar: () => import("@/modules/public/components/Navbar.vue")
    },
    mixins: [OrderListViewModel],
};
</script>

<style>
.mt-4 {
    margin-top: 1.5rem;
}

.mb-4 {
    margin-bottom: 1.5rem;
}

.card-container {
    margin: 20px;
}

/* Estilo para la imagen */
.object-cover {
    object-fit: cover;
}

/* Tamaño mínimo y máximo para la imagen, ajustado para responsividad */
.img-size {
    width: 100%;
    height: auto;
    max-height: 250px;
}

/* Card con bordes redondeados y sombra */
b-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

/* Espaciado entre botones en el grupo de acciones */
.button-group {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.button-group .mr-2 {
    margin-right: 0.5rem;
}

@media (max-width: 768px) {
    .img-size {
        max-height: 200px;
    }
    .button-group {
        flex-direction: column;
        align-items: stretch;
    }
    .button-group .mr-2 {
        margin-right: 0;
        margin-bottom: 0.5rem;
    }
}

@media (max-width: 576px) {
    .img-size {
        max-height: 150px;
    }
}
</style>

<template>
    <div>
        <navbar />
        <div class="container-fluid card-container">
            <!-- Título de la sección -->
            <h2 class="section-title">Pedidos disponibles</h2>
            <b-row class="justify-content-center mt-4">
                <!-- Muestra solo los pedidos en la página actual -->
                <b-col cols="12" md="6" lg="6" class="mb-4" v-for="(order, index) in paginatedOrders" :key="index">
                    <b-card class="h-100">
                        <b-row class="flex-column flex-md-row no-gutters">
                            <b-col cols="12" md="4" class="p-0">
                                <b-img :src="order.image" class="object-cover img-size" fluid
                                    alt="Imagen del producto"></b-img>
                            </b-col>
                            <b-col cols="12" md="8" class="p-3">
                                <h5 class="mb-2">{{ order.name }}</h5>
                                <p><b>Precio:</b> ${{ order.price }}</p>
                                <p><b>Descripción:</b> {{ order.description }}</p>
                                <p><b>Usuario:</b> {{ order.userInfo.name }}</p>
                                <p><b>Dirección:</b> {{ order.userInfo.address }}</p>

                                <div class="button-group mt-3">
                                    <b-button variant="faded" class="mr-2 p-1" @click="openOrderModal(order.id)">
                                        <b-icon icon="eye"></b-icon>
                                    </b-button>
                                    <b-button variant="red-palete" @click="declineOrder()">Rechazar Pedido</b-button>
                                    <b-button variant="orange-primary" @click="acceptOrder()">Aceptar Pedido</b-button>
                                </div>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
            <div class="text-center">
                <b-pagination v-model="currentPage" :total-rows="orders.length" :per-page="itemsPerPage"
                    aria-controls="order-list" class="mt-4"></b-pagination>
            </div>

            <!-- Modal para mostrar detalles del pedido -->
            <b-modal id="order-modal" title="Detalles del Pedido" v-if="selectedOrder" size="lg" centered>
                <div class="modal-content-wrapper">
                    <p><b>Producto:</b> {{ selectedOrder.name }}</p>
                    <p><b>Precio:</b> ${{ selectedOrder.price }}</p>
                    <p><b>Usuario:</b> {{ selectedOrder.userInfo.name }}</p>
                    <p><b>Descripción:</b> {{ selectedOrder.description }}</p>
                    <p><b>Dirección:</b> {{ selectedOrder.userInfo.address }}</p>
                    <div class="image-center">
                        <img :src="selectedOrder.image" alt="Imagen del producto" class="img-fluid img-card" />
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
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
.img-card {
    max-width: 350px;
    max-height: 350px;
}

.image-center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
}

/* Estilo del título de la sección */
.section-title {
    font-size: 2rem;
    font-weight: bold;
    text-align: left;
    margin-bottom: 1rem;
    margin-top: 20px;
}

@media (max-width: 768px) {
    .section-title {
        font-size: 1.5rem;
        margin-left: 15px;
    }
}

@media (max-width: 576px) {
    .section-title {
        font-size: 1.2rem;
        margin-left: 10px;
    }
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
    gap: 0.5rem;
}

@media (max-width: 768px) {
    .img-size {
        max-height: 200px;
    }

    .button-group {
        flex-direction: column;
        align-items: stretch;
    }
}

@media (max-width: 576px) {
    .img-size {
        max-height: 150px;
    }
}
</style>

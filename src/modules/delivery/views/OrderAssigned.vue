<template>
    <div>
        <navbar />
        <div class="container-fluid card-container">
            <b-row class="mt-4">
                <b-col cols="12" md="6" lg="6" class="mb-4">
                    <h2 class="section-title">Historial de Pedidos</h2>
                </b-col>
                <b-col cols="12" md="6" lg="6" class="mb-4">
                    <h2 class="section-title">Pedido Asignado</h2>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import OrderAssignedViewModel from "../viewmodels/OrderAssignedViewModel";
export default {
    name: "DeliveryOrderAssigned",
    components: {
        Navbar: () => import("@/modules/public/components/Navbar.vue")
    },
    mixins: [OrderAssignedViewModel],
};
</script>

<style>

</style>

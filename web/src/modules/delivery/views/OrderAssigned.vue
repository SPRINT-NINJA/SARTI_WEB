<template>
  <div>
    <navbar />
    <div class="container-fluid card-container">
      <b-row class="mt-4">
        <b-col cols="12" md="6" lg="6" class="mb-4">
          <h2 class="section-title">Historial de Pedidos</h2>
          <b-row class="justify-content-center mt-4 px-2">
            <!-- Muestra los pedidos disponibles -->
            <b-col
              cols="12"
              v-for="(orderDeliveryHistory, index) in orderDeliveriesHistory"
              :key="index"
            >
              <b-card>
                <b-row>
                  <!-- Información principal del pedido -->
                  <b-col cols="12" class="px-3 pt-3">
                    <h5 class="mb-2 order-title">
                      <span>Pedido:</span>
                      {{ orderDeliveryHistory.orderNumber }}
                    </h5>
                    <p>
                      <b>Estado:</b>
                      {{ orderDeliveryHistory.orderDeliveryStep }}
                    </p>
                    <p>
                      <b>Cliente:</b>
                      {{ orderDeliveryHistory.sartiOrder.customer.name }}
                      {{
                        orderDeliveryHistory.sartiOrder.customer.fistLastName
                      }}
                    </p>
                    <p>
                      <b>Dirección:</b>
                      {{ orderDeliveryHistory.address.street }},
                      {{ orderDeliveryHistory.address.colony }},
                      {{ orderDeliveryHistory.address.city }} -
                      {{ orderDeliveryHistory.address.zipCode }}
                    </p>
                    <p>
                      <b>Total:</b> ${{ orderDeliveryHistory.sartiOrder.total }}
                    </p>
                  </b-col>
                  <b-col cols="12" class="d-flex justify-content-end my-2">
                    <b-button
                      variant="link"
                      @click="() => (isShowProducts = !isShowProducts)"
                      >{{
                        isShowProducts
                          ? "Ocultar productos"
                          : "Mostrar productos"
                      }}</b-button
                    >
                  </b-col>
                </b-row>
                <b-row v-if="isShowProducts">
                  <!-- Productos del pedido -->
                  <b-col
                    cols="12"
                    v-for="product in orderDeliveryHistory.sartiOrder
                      .orderProducts"
                    :key="product.id"
                    class="mt-1"
                  >
                    <b-card no-body shadow w-100 class="py-2 px-2 mb-2">
                      <b-row class="align-items-center h-100">
                        <b-col cols="auto">
                          <div>
                            <b-avatar
                              :src="product.product.mainImage"
                              size="100px"
                              rounded
                            ></b-avatar>
                          </div>
                        </b-col>
                        <b-col cols="12" md="8" class="pl-3 my-3">
                          <div><b>Producto:</b> {{ product.product.name }}</div>
                          <div>
                            <b>Descripción:</b>
                            {{ product.product.description }}
                          </div>
                          <div><b>Precio:</b> ${{ product.product.price }}</div>
                          <div><b>Cantidad:</b> {{ product.amount }}</div>
                          <div><b>Total:</b> ${{ product.total }}</div>
                        </b-col>
                      </b-row>
                    </b-card>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
            <b-col cols="12">
              <div
                class="d-flex align-items-center justify-content-center my-2"
              >
                <b-pagination
                  v-model="pagination.page"
                  :total-rows="totalRows"
                  :per-page="pagination.size"
                  size="sm"
                  pills
                  @change="handlePageChange"
                ></b-pagination>
              </div>
            </b-col>
          </b-row>
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
    Navbar: () => import("@/modules/public/components/Navbar.vue"),
  },
  mixins: [OrderAssignedViewModel],
};
</script>

<style>
/* Estilo del título de la sección */
.section-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 1rem;
  margin-top: 20px;
}

/* Pedido título con énfasis */
.order-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6f00;
}
</style>

<template>
  <div>
    <custom-overlay :isLoading="isLoading" />
    <navbar />
    <div class="container-fluid card-container">
      <!-- Título de la sección -->
      <h2 class="section-title">Pedidos disponibles</h2>
      <b-row class="justify-content-center mt-4">
        <!-- Muestra los pedidos disponibles -->
        <b-col
          cols="12"
          class="mb-4"
          v-for="(orderToTake, index) in ordersToTake"
          :key="index"
        >
          <b-card>
            <b-row>
              <!-- Información principal del pedido -->
              <b-col cols="12" class="p-3">
                <h5 class="mb-2 order-title">
                  <span>Pedido:</span> {{ orderToTake.orderNumber }}
                </h5>
                <p><b>Estado:</b> {{ orderToTake.orderDeliveryStep }}</p>
                <p>
                  <b>Cliente:</b> {{ orderToTake.sartiOrder.customer.name }}
                  {{ orderToTake.sartiOrder.customer.fistLastName }}
                </p>
                <p>
                  <b>Dirección:</b> {{ orderToTake.address.street }},
                  {{ orderToTake.address.colony }},
                  {{ orderToTake.address.city }} -
                  {{ orderToTake.address.zipCode }}
                </p>
                <p><b>Total:</b> ${{ orderToTake.sartiOrder.total }}</p>
              </b-col>
            </b-row>
            <b-row>
              <!-- Productos del pedido -->
              <b-col
                cols="12"
                v-for="product in orderToTake.sartiOrder.orderProducts"
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
                        <b>Descripción:</b> {{ product.product.description }}
                      </div>
                      <div><b>Precio:</b> ${{ product.product.price }}</div>
                      <div><b>Cantidad:</b> {{ product.amount }}</div>
                      <div><b>Total:</b> ${{ product.total }}</div>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
            <!-- Botones de acción alineados a la derecha -->
            <div class="d-flex justify-content-end mt-3">
              <b-button
                variant="orange-primary"
                @click="acceptOrder(orderToTake)"
                >Aceptar Pedido</b-button
              >
            </div>
          </b-card>
        </b-col>
      </b-row>
      <!-- Paginación -->
      <div class="d-flex align-items-center justify-content-center my-2">
        <b-pagination
          v-model="pagination.page"
          :total-rows="totalRows"
          :per-page="pagination.size"
          size="sm"
          pills
          @change="handlePageChange"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import OrderListViewModel from "../viewmodels/OrderListViewModel";
export default {
  name: "DeliveryOrderList",
  components: {
    Navbar: () => import("@/modules/public/components/Navbar.vue"),
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
  },
  mixins: [OrderListViewModel],
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

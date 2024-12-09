<template>
  <div>
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
                <h5 class="mb-2 pedido-titulo">
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
                    <b-col cols="12" md="8" class="pl-4">
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
            <div class="button-group mt-3">
              <b-button
                variant="faded"
                class="mr-2 p-1"
                @click="openOrderModal(orderToTake.id)"
              >
                <b-icon icon="eye"></b-icon> Ver Pedido
              </b-button>
              <b-button variant="red-palete" @click="declineOrder(orderToTake)"
                >Rechazar Pedido</b-button
              >
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
    <!-- Modal para mostrar detalles del pedido -->
    <b-modal
      id="order-to-take-modal"
      title="Detalles del Pedido"
      v-if="selectedOrder"
      size="lg"
      centered
      hide-footer
    >
      <div class="modal-content-wrapper">
        <h5>Pedido: {{ selectedOrder.orderNumber }}</h5>
        <p><b>Fecha del Pedido:</b> {{ selectedOrder.sartiOrder.orderDate }}</p>
        <p><b>Total:</b> ${{ selectedOrder.sartiOrder.total }}</p>
        <p><b>Estado:</b> {{ selectedOrder.orderDeliveryStep }}</p>
        <p>
          <b>Cliente:</b> {{ selectedOrder.sartiOrder.customer.name }}
          {{ selectedOrder.sartiOrder.customer.fistLastName }}
        </p>
        <p>
          <b>Dirección:</b> {{ selectedOrder.address.street }},
          {{ selectedOrder.address.colony }}, {{ selectedOrder.address.city }} -
          {{ selectedOrder.address.zipCode }}
        </p>
        <p>
          <b>Notas del Pedido:</b>
          {{ selectedOrder.sartiOrder.notes || "Sin notas adicionales" }}
        </p>
        <p>
          <b>Total de Productos:</b>
          {{ selectedOrder.sartiOrder.orderProducts.length }}
        </p>

        <!-- Lista de productos -->
        <b-row>
          <b-col
            cols="12"
            v-for="product in selectedOrder.sartiOrder.orderProducts"
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
                <b-col cols="12" md="8" class="pl-4">
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
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import OrderListViewModel from "../viewmodels/OrderListViewModel";
export default {
  name: "DeliveryOrderList",
  components: {
    Navbar: () => import("@/modules/public/components/Navbar.vue"),
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
.pedido-titulo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6f00;
}

/* Espaciado entre botones y alineación a la derecha */
.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>

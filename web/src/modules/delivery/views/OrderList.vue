<template>
  <div>
    <custom-overlay :isLoading="isLoading" />
    <div class="container-fluid card-container">
      <!-- Título de la sección -->
      <h2 class="section-title">Pedidos disponibles</h2>
      <order-deliveries-list
        :orderDeliveriesProp="ordersToTake"
        :initialToggleStateProp="true"
        :isCustomerHistoryProp="false"
        :isDeliveryManToTakeListProp="true"
        @reload="fetchOrderDeliveriesToTake"
      />
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
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
    OrderDeliveriesList: () =>
      import("@/modules/delivery/views/components/OrderDeliveriesList.vue"),
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
</style>

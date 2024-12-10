<template>
  <!-- Agregar componente de cristian -->
  <div>
    <banner-overlay
      :imgSrc="require('@/assets/banner-pedido.svg')"
      :content="'MIS PEDIDOS'"
    />
    <div class="d-flex align-items-center justify-content-center">
      <b-card
        class="mt-4"
        bg-variant="orange-soft"
        text-variant="dark"
        border-variant="light"
      >
        <!-- Encabezado -->
        <b-row class="text-center mb-3">
          <b-col>
            <h5 class="mb-2"><b>¡Tu opinión importa!</b></h5>
            <p>Comparte tu experiencia sobre estos productos.</p>
          </b-col>
        </b-row>

        <!-- Contenido principal -->
        <b-row class="align-items-center">
          <!-- Avatar del producto -->
          <b-col cols="auto">
            <b-avatar
              size="70px"
              src="https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp"
              :badge="totalMissingRate"
              badge-variant="danger"
            ></b-avatar>
          </b-col>

          <!-- Texto descriptivo -->
          <b-col class="ml-3">
            <p class="mb-1 font-weight-bold">¡Dinos qué piensas!</p>
            <p class="mb-0">
              Estos productos esperan tu reseña. Tómate un momento para
              contarnos tu experiencia.
            </p>
          </b-col>

          <!-- Botón de acción -->
          <b-col
            cols="auto"
            class="d-flex justify-content-end align-items-end align-self-end mt-auto"
          >
            <b-button
              variant="light"
              size="md"
              pill
              class="font-weight-bold d-flex align-items-center btn-transition"
              @click="goToOrderWithoutRate"
            >
              <i class="bi bi-pencil mr-2"></i> Comenzar a reseñar
            </b-button>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <!-- Listado de pedidos -->
    <order-deliveries-list
      :orderDeliveriesProp="orderDeliveries"
      :initialToggleStateProp="true"
      :isCustomerHistoryProp="true"
      :isDeliveryManToTakeListProp="false"
    />
    <!-- Paginador -->
    <b-row class="justify-content-center mt-4">
      <b-col cols="12">
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
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import CustomerOrderListViewModel from "../viewmodels/CustomerOrderListViewModel";
import BannerComponent from "@/modules/public/components/BannerComponent.vue";
import BannerOverlay from "@/modules/public/components/BannerOverlay.vue";
export default {
  name: "CustomerOrderListView",
  components: {
    BannerComponent: BannerComponent,
    BannerOverlay: BannerOverlay,
    OrderDeliveriesList: () =>
      import("@/modules/delivery/views/components/OrderDeliveriesList.vue"),
  },
  mixins: [CustomerOrderListViewModel],
};
</script>

<style scoped>
.img-main-product {
  display: flex;
  align-items: baseline;
  justify-content: right;
  width: 80px;
  height: 80px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  transition: transform 0.3s ease;
  /* Agrega una transición suave para el efecto de zoom */
  object-fit: cover;
}

.date-text {
  color: #969595;
  font-style: italic;
}

hr {
  width: 100%;
  height: 0.3px;
  background-color: rgb(0, 0, 0);
}
</style>

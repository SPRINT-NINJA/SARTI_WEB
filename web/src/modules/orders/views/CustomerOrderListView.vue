<template>
  <!-- Agregar componente de cristian -->
  <div>
    <banner-overlay
      :imgSrc="require('../../../assets/banner-pedido.svg')"
      :content="'MIS PEDIDOS'"
    />
    <div class="d-flex align-items-center justify-content-center">
      <b-card bg-variant="orange-soft" class="card-preview-order my-2">
        <b-container>
          <!-- Producto en espera de una opinión -->
          <b-row>
            <b-col cols="12" md="9">
              <b-row>
                <b-col cols="12" md="3">
                  <b-avatar
                    size="60px"
                    src="https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp"
                    badge="3"
                    variant="warning"
                    badge-variant="danger"
                  >
                  </b-avatar>
                </b-col>
                <b-col
                  cols="12"
                  md="9"
                  class="d-flex justify-content-right align-items-center"
                >
                  <b-card-text>Un producto espera tu opinión</b-card-text>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              cols="12"
              md="3"
              class="d-flex justify-content-end align-items-center"
            >
              <b-button size="sm" variant="red-palete" @click="goToOrderWithoutRate" > Crear reseña </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </div>
    <!-- pedido preview -->
    <div
      class="d-flex align-items-center justify-content-center my-2"
      v-for="order in paginatedOrders"
      :key="order.order.dateForArrive"
    >
      <b-card class="card-preview-order">
        <b-card-text class="date-text">
          {{ parseDateByRead(order.order.dateForArrive) }}
        </b-card-text>
        <hr />
        <b-container>
          <b-row>
            <b-col cols="12" md="8">
              <b-row cols="12" md="8">
                <b-col cols="12" md="3">
                  <img
                    :src="order.order.product.mainImage"
                    alt="producto"
                    class="img-main-product"
                  />
                </b-col>
                <b-col
                  cols="12"
                  md="9"
                  class="d-stretch justify-content-right align-items-center"
                >
                  <b-badge :variant="assignColorBystatus(order.order.status)">{{
                    order.order.status
                  }}</b-badge>
                  <br />
                  {{ order.order.product.name }}<br />
                  <p class="date-text">
                    ${{ order.order.product.price }} | unidades:
                    {{ order.order.amount }}
                  </p>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" md="4">
              <b-button class="my-2 mx-2" size="sm" variant="orange-secundary" @click="goToOrderDetails(order.order.id)" >
                Ver compra
              </b-button>
              <b-button variant="orange-primary" size="sm">
                Volver a comprar
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </div>

    <!-- Paginador -->
    <div class="d-flex align-items-center justify-content-center my-2">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="pageSize"
        size="sm"
        pills
        @input="updatePaginatedOrders"
      ></b-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineAsyncComponent } from "vue";
import CustomerOrderListViewModel from "../viewmodels/CustomerOrderListViewModel";
import BannerComponent from "@/modules/public/components/BannerComponent.vue";
import BannerOverlay from "@/modules/public/components/BannerOverlay.vue";
export default {
  name: "CustomerOrderListView",
  components: {
    BannerComponent: BannerComponent,
    BannerOverlay: BannerOverlay
  },
  mixins: [CustomerOrderListViewModel],
};
</script>

<style scoped>
.card-preview-order {
  width: 70%;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  border: none;
}

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

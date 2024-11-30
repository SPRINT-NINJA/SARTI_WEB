<template>
  <!-- Agregar componente de cristian -->
  <div>
    <banner-overlay
      :imgSrc="require('../../../assets/banner-pedido.svg')"
      :content="'MIS PEDIDOS'"
    />
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
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" md="4">
              <b-button
                class="my-2 mx-2 w-100"
                size="sm"
                variant="orange-secundary"
                @click="goToOrderCreateRate(order.order.id)"
              >
                crear reseña
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
import CustomerOrderWithoutRateListViewModel from "../viewmodels/CustomerOrderWithoutRateListViewModel";
import BannerComponent from "@/modules/public/components/BannerComponent.vue";
import BannerOverlay from "@/modules/public/components/BannerOverlay.vue";
export default {
  name: "CustomerOrderListWithoutRate",
  components: {
    BannerComponent: BannerComponent,
    BannerOverlay: BannerOverlay,
  },
  mixins: [CustomerOrderWithoutRateListViewModel],
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

<template>
  <!-- Agregar componente de cristian -->
  <div>
    <custom-overlay :isLoading="isLoading" />
    <banner-overlay
      :imgSrc="require('@/assets/banner-pedido.svg')"
      :content="'MIS PEDIDOS'"
    />
    <!-- Listado de productos -->
    <h2 class="ml-4 section-title">Productos que esperan tu opinión</h2>
    <b-row
      v-for="orderProduct in orderProducts"
      :key="orderProduct.id"
      class="justify-content-center mb-3"
    >
      <b-container>
        <b-col cols="12" class="px-4">
          <b-card no-body shadow w-100 class="py-2 px-2 mb-2">
            <b-container fluid>
              <b-row>
                <!-- Imagen del producto -->
                <b-col
                  cols="12"
                  md="2"
                  class="d-flex align-items-center justify-content-center"
                >
                  <b-avatar
                    :src="JSON.parse(orderProduct.productInfo).mainImage"
                    size="100px"
                    rounded
                  ></b-avatar>
                </b-col>
                <!-- Información del producto -->
                <b-col cols="12" md="8" class="d-flex flex-column">
                  <h6 class="font-weight-bold text-primary">
                    {{ JSON.parse(orderProduct.productInfo).name }}
                  </h6>
                  <p class="mb-1 text-muted">
                    <small>
                      Vendedor:
                      {{ JSON.parse(orderProduct.productInfo).sellerName }}
                    </small>
                  </p>
                  <p class="mb-1 text-muted">
                    <small>Cantidad: {{ orderProduct.amount }}</small>
                  </p>
                  <p class="mb-1 text-muted">
                    <small>Total: ${{ orderProduct.total }}</small>
                  </p>
                </b-col>
                <!-- Botón de acción -->
                <b-col
                  cols="12"
                  md="2"
                  class="d-flex align-items-end justify-content-end"
                >
                  <b-button
                    variant="orange-primary"
                    size="sm"
                    block
                    @click="goToOrderCreateRate(orderProduct.id)"
                  >
                    Crear reseña
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-container>
    </b-row>

    <!-- Paginador -->
    <b-row class="justify-content-center mt-4">
      <b-col cols="12" md="8" class="d-flex justify-content-center">
        <b-pagination
          v-model="pagination.page"
          :total-rows="totalRows"
          :per-page="pagination.size"
          size="md"
          pills
          align="center"
          @change="handlePageChange"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import CustomerOrderWithoutRateListViewModel from "../viewmodels/CustomerOrderWithoutRateListViewModel";
import BannerComponent from "@/modules/public/components/BannerComponent.vue";
import BannerOverlay from "@/modules/public/components/BannerOverlay.vue";
export default {
  name: "CustomerOrderListWithoutRate",
  components: {
    BannerComponent: BannerComponent,
    BannerOverlay: BannerOverlay,
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
  },
  mixins: [CustomerOrderWithoutRateListViewModel],
};
</script>

<style scoped>
.section-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 1rem;
  margin-top: 20px;
}
</style>

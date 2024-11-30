<template>
  <div class="w-100">
    <banner-overlay
      :imgSrc="require('../../../assets/banner-seller.svg')"
      :content="'Visita las tiendas de nuestros emprendedores'"
    />
    <b-container fluid class="mt-4 mb-4">
      <section>
        <div class="mb-2">
          <h3>Emprendedores</h3>
        </div>
        <b-row class="mt-2">
          <b-col
            cols="12"
            sm="4"
            md="4"
            lg="4"
            class="mt-2 mb-2 h-100"
            v-for="seller in paginatedOrders"
            :key="seller.id"

          >
            <b-card no-body class="custom-card w-100 shadow">
              <b-card-img
                :src="seller.mainImage"
                class="custom-img"
                role="button"
                @click="getsellerProduct(seller.id)"
              />
              <div class="p-2 text-center">
                <h5>Tienda <b>{{ seller.name }}</b>
                  <b-icon icon="check2-circle" variant="success" ></b-icon>
                </h5>
                <span>{{ seller.description }}</span>
              </div>
              <div class="text-center my-2">
                <b-row>
                  <b-col cols="12" md="12">
                    <b-button @click="getsellerProduct(seller.id)" variant="red-palete">Ver productos
                      <b-icon icon="box-arrow-in-up-right"></b-icon>
                    </b-button>
                  </b-col>
                </b-row>
              </div>
              
            </b-card>
          </b-col>
        </b-row>
      </section>
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
    </b-container>
  </div>
</template>

<script lang="ts">
import SellerListViewModel from '../viewmodels/SellerListViewModel';

import BannerComponent from "../components/BannerComponent.vue";
import BannerOverlay from "../components/BannerOverlay.vue";
export default {
  name: "SellerList",
  components: {
    BannerComponent: BannerComponent,
    BannerOverlay: BannerOverlay,
  },
  mixins:[SellerListViewModel]

}
</script>

<style scoped>
.custom-card {
  overflow: hidden;
  transition: transform 0.3s ease; /* Añade una transición suave */
  border-radius: 15px;
}
.custom-card:hover {
  transform: scale(1.02);
}
.custom-img {
  object-fit: cover; /* Hace que la imagen se adapte sin distorsionarse */
  height: 200px; /* Define una altura fija para mantener la consistencia */
  width: 100%; /* Ocupa todo el ancho del contenedor */
}
</style>
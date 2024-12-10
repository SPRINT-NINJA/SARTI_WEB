<template>
  <div class="w-100">
    <custom-overlay :isLoading="isLoading" />
    <banner-overlay
      :imgSrc="require('../../../assets/banner-principal.svg')"
      :content="'Los mejores productos se encuentran aquí'"
    />

    <b-container fluid class="mt-4 mb-4">
      <section class="mb-4">
        <b-row>
          <b-col cols="12" md="6" class="mb-2">
            <b-card no-body class="custom-card w-100 shadow">
              <img
                src="@/assets/sellerBackground.svg"
                alt="Emprendedores"
                class="custom-img"
                role="button"
                @click="goToSellers()"
              />
              <b-card-body>
                <b-card-title>Emprendedores</b-card-title>
              </b-card-body>
            </b-card>
          </b-col>
          <b-col cols="12" md="6">
            <b-card no-body class="custom-card w-100 shadow">
              <img
                src="@/assets/rateBackground.svg"
                alt="Mejores calificados"
                class="custom-img"
                role="button"
                @click="getTopRatedProduct()"
              />
              <b-card-body>
                <b-card-title>Mejores calificados</b-card-title>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </section>
      <section v-if="productsPublic.length === 0">
        <div class="mb-2 text-center ">
          <img src="@/assets/NoProducts.svg" class="w-70 sold-out-image" >
          <br>
          <h5>No hay productos, lo lamentamos se han acabado los productos</h5>
        </div>
      </section>
      <section v-if="productsPublic.length != 0" >
        <div class="mb-2">
          <h3>Te va a encantar</h3>
        </div>
        <b-row class="mt-2">
          <b-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="product in productsPublic"
            :key="product.id"
            class="mt-2 mb-2"
          >
            <b-card no-body class="custom-card w-100 shadow">
              <b-card-img
                :src="product.mainImage"
                :alt="product.name"
                class="custom-img"
                role="button"
                @click="getProductPerDetails(product)"
              />
              <div class="p-2">
                <span>{{ product.name }}</span>
              </div>
              <div>
                <b-row>
                  <b-col cols="11" md="11">
                    <b-form-rating
                      v-model="product.rating"
                      stars="10"
                      readonly
                      no-border
                      no-focus
                      variant="warning"
                    ></b-form-rating>
                  </b-col>
                </b-row>
              </div>
              <div class="d-flex justify-content-end p-2">
                <strong class="text-bold">${{ product.price }}</strong>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </section>
      <!-- Pagination -->
      <section v-if="productsPublic.length != 0">
            <b-row class="bg-light m-0 py-3 py-sm-2 py-lg-1">
              <b-col
                cols="12"
                md="3"
                class="d-flex justify-content-center justify-content-md-start"
              >
                <b class="fw-bold"
                  >Mostrando
                  {{
                    pagination.totalRows === 0
                      ? 0
                      : (pagination.page - 1) * pagination.size + 1
                  }}
                  a
                  {{
                    pagination.page * pagination.size > pagination.totalRows
                      ? pagination.totalRows
                      : pagination.page * pagination.size
                  }}
                  de {{ pagination.totalRows }} registros</b
                >
              </b-col>

              <b-col
                cols="6"
                md="6"
                class="d-flex align-items-end align-items-md-center justify-content-center"
              >
                <b-pagination
                  align="center"
                  size="sm"
                  class="my-0"
                  v-model="pagination.page"
                  :total-rows="pagination.totalRows"
                  :per-page="pagination.size"
                  aria-controls="table-transition-example"
                  @change="handlePageChange"
                  pills
                ></b-pagination>
              </b-col>
              <b-col cols="6" md="3">
                <div class="d-md-flex">
                  <b>Registros por página</b>
                  <b-form-select
                    size="sm"
                    v-model="pagination.size"
                    @change="handleResetPage"
                    :options="optionsFieldToPage"
                  ></b-form-select>
                </div>
              </b-col>
            </b-row>
          </section>
    </b-container>
  </div>
</template>
<script lang="ts">
import ProductListViewModel from "../viewmodels/ProductListViewModel";
import BannerComponent from "../components/BannerComponent.vue";
import BannerOverlay from "../components/BannerOverlay.vue";
export default {
  name: "HomePageView",
  components: {
    BannerComponent: BannerComponent,
    BannerOverlay: BannerOverlay,
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
  },
  mixins: [ProductListViewModel],
};
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

.sold-out-image{
  height: 300px;
}
</style>
